import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FALLBACK = [
  ["600000","浦发银行"],["600015","华夏银行"],["600016","民生银行"],["600036","招商银行"],
  ["600908","无锡银行"],["600919","江苏银行"],["600926","杭州银行"],["600928","西安银行"],
  ["601009","南京银行"],["601077","渝农商行"],["601128","常熟银行"],["601166","兴业银行"],
  ["601169","北京银行"],["601187","厦门银行"],["601229","上海银行"],["601288","农业银行"],
  ["601328","交通银行"],["601398","工商银行"],["601577","长沙银行"],["601658","邮储银行"],
  ["601665","齐鲁银行"],["601818","光大银行"],["601838","成都银行"],["601860","紫金银行"],
  ["601916","浙商银行"],["601939","建设银行"],["601963","重庆银行"],["601988","中国银行"],
  ["601997","贵阳银行"],["601998","中信银行"],["603323","苏农银行"],["002142","宁波银行"],
  ["002807","江阴银行"],["002839","张家港行"],["002936","郑州银行"],["002948","青岛银行"],
  ["002958","青农商行"],["002966","苏州银行"]
];
const STATE = new Set(["601398","601939","601288","601988","601328","601658"]);

function secid(code) { return `${code.startsWith("6") ? 1 : 0}.${code}`; }
function num(v, d, min, max) {
  const n = Number(v); return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : d;
}

async function universe(target) {
  if (target === "state") return FALLBACK.filter(([c]) => STATE.has(c));
  try {
    const u = "https://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=100&po=1&np=1&fltt=2&invt=2&fid=f3&fs=b:BK0475&fields=f12,f14";
    const res = await fetch(u, { cache: "no-store", signal: AbortSignal.timeout(10000) });
    const json = await res.json();
    const rows = json?.data?.diff?.map((x) => [String(x.f12), x.f14]).filter((x) => /^\d{6}$/.test(x[0]));
    return rows?.length ? rows : FALLBACK;
  } catch { return FALLBACK; }
}

async function history(code, start, end) {
  const beg = start.replaceAll("-", ""), finish = end.replaceAll("-", "");
  const fields1 = "f1,f2,f3,f4,f5,f6", fields2 = "f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61";
  const u = `https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=${secid(code)}&klt=102&fqt=2&beg=${beg}&end=${finish}&lmt=1000&fields1=${fields1}&fields2=${fields2}`;
  const res = await fetch(u, { cache: "no-store", signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`行情 HTTP ${res.status}`);
  const json = await res.json();
  return (json?.data?.klines || []).map((s) => {
    const x = s.split(",");
    return { date: x[0], open: +x[1], close: +x[2] };
  }).filter((x) => Number.isFinite(x.close));
}

function rsi(closes, period) {
  const out = Array(closes.length).fill(null);
  if (closes.length <= period) return out;
  let gain = 0, loss = 0;
  for (let i = 1; i <= period; i++) {
    const d = closes[i] - closes[i - 1]; gain += Math.max(d, 0); loss += Math.max(-d, 0);
  }
  let ag = gain / period, al = loss / period;
  out[period] = al === 0 ? 100 : 100 - 100 / (1 + ag / al);
  for (let i = period + 1; i < closes.length; i++) {
    const d = closes[i] - closes[i - 1];
    ag = (ag * (period - 1) + Math.max(d, 0)) / period;
    al = (al * (period - 1) + Math.max(-d, 0)) / period;
    out[i] = al === 0 ? 100 : 100 - 100 / (1 + ag / al);
  }
  return out;
}

function stats(series, trades) {
  if (series.length < 2) return { totalReturn: 0, annualReturn: 0, maxDrawdown: 0, sharpe: 0, trades };
  const years = Math.max((new Date(series.at(-1).date) - new Date(series[0].date)) / 31557600000, .02);
  const total = series.at(-1).value / series[0].value - 1;
  let peak = series[0].value, dd = 0;
  const returns = [];
  for (let i = 1; i < series.length; i++) {
    peak = Math.max(peak, series[i].value);
    dd = Math.min(dd, series[i].value / peak - 1);
    returns.push(series[i].value / series[i - 1].value - 1);
  }
  const mean = returns.reduce((a,b)=>a+b,0) / returns.length;
  const sd = Math.sqrt(returns.reduce((a,b)=>a+(b-mean)**2,0) / Math.max(1, returns.length-1));
  return {
    totalReturn: total * 100,
    annualReturn: (Math.pow(1 + total, 1 / years) - 1) * 100,
    maxDrawdown: dd * 100,
    sharpe: sd ? mean / sd * Math.sqrt(52) : 0,
    trades
  };
}

function backtest(bars, p) {
  const rs = rsi(bars.map((x) => x.close), p.period);
  let cash = 1, shares = 0, pending = null, trades = 0;
  const curve = [], benchmark = [];
  for (let i = p.period + 1; i < bars.length; i++) {
    if (pending === "buy" && !shares) {
      shares = cash * (1 - p.buyCost) / bars[i].open; cash = 0;
    } else if (pending === "sell" && shares) {
      cash = shares * bars[i].open * (1 - p.sellCost); shares = 0; trades++;
    }
    pending = null;
    if (!shares && rs[i - 1] >= p.buy && rs[i] < p.buy) pending = "buy";
    if (shares && rs[i - 1] <= p.sell && rs[i] > p.sell) pending = "sell";
    curve.push({ date: bars[i].date, value: cash + shares * bars[i].close });
    benchmark.push({ date: bars[i].date, value: bars[i].close / bars[p.period + 1].close });
  }
  if (shares) trades++;
  return { curve, benchmark, stats: stats(curve, trades) };
}

function aggregate(items) {
  const allDates = [...new Set(items.flatMap((x) => x.test.curve.map((p) => p.date)))].sort();
  const maps = items.map((x) => new Map(x.test.curve.map((p) => [p.date, p.value])));
  const bmaps = items.map((x) => new Map(x.test.benchmark.map((p) => [p.date, p.value])));
  const last = Array(items.length).fill(1), blast = Array(items.length).fill(1);
  return allDates.map((date) => {
    maps.forEach((m, i) => { if (m.has(date)) last[i] = m.get(date); });
    bmaps.forEach((m, i) => { if (m.has(date)) blast[i] = m.get(date); });
    return { date, strategy: last.reduce((a,b)=>a+b,0)/last.length, benchmark: blast.reduce((a,b)=>a+b,0)/blast.length };
  });
}

export async function GET(req) {
  try {
    const q = req.nextUrl.searchParams;
    const start = q.get("start") || "2015-01-01", end = q.get("end") || new Date().toISOString().slice(0,10);
    const p = {
      period: num(q.get("period"),14,3,30), buy:num(q.get("buy"),30,1,49), sell:num(q.get("sell"),70,51,99),
      buyCost:(num(q.get("fee"),.03,0,1)+num(q.get("slippage"),.05,0,1))/100,
      sellCost:(num(q.get("fee"),.03,0,1)+num(q.get("tax"),.05,0,1)+num(q.get("slippage"),.05,0,1))/100
    };
    if (new Date(start) >= new Date(end)) return NextResponse.json({error:"开始日期必须早于结束日期。"}, {status:400});
    const stocks = await universe(q.get("target"));
    const loaded = await Promise.all(stocks.map(async ([code,name]) => {
      try {
        const bars = await history(code,start,end);
        if (bars.length <= p.period + 5) throw new Error("有效周线不足");
        return {code,name,test:backtest(bars,p)};
      } catch (e) { return {code,name,error:e.message}; }
    }));
    const ok = loaded.filter((x)=>!x.error);
    if (!ok.length) throw new Error("行情源暂时不可用，请稍后重试。");
    const equity = aggregate(ok);
    const combined = equity.map((x)=>({date:x.date,value:x.strategy}));
    const trades = ok.reduce((a,x)=>a+x.test.stats.trades,0);
    return NextResponse.json({
      meta:{stockCount:ok.length,start,end,generatedAt:new Date().toLocaleString("zh-CN",{timeZone:"Asia/Shanghai"})},
      portfolio:stats(combined,trades),
      equity,
      results:ok.map((x)=>({code:x.code,name:x.name,...x.test.stats})),
      warnings:loaded.filter((x)=>x.error).map((x)=>`${x.name}（${x.error}）`)
    });
  } catch (e) {
    return NextResponse.json({error:e.message || "服务器暂时无法完成回测。"}, {status:500});
  }
}
