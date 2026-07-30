const BANK_STOCKS = [
  ["000001","平安银行"],["001227","兰州银行"],["600000","浦发银行"],["600015","华夏银行"],
  ["600016","民生银行"],["600036","招商银行"],["600908","无锡银行"],["600919","江苏银行"],
  ["600926","杭州银行"],["600928","西安银行"],["601009","南京银行"],["601077","渝农商行"],
  ["601128","常熟银行"],["601166","兴业银行"],["601169","北京银行"],["601187","厦门银行"],
  ["601229","上海银行"],["601288","农业银行"],["601328","交通银行"],["601398","工商银行"],
  ["601528","瑞丰银行"],["601577","长沙银行"],["601658","邮储银行"],["601665","齐鲁银行"],
  ["601818","光大银行"],["601825","沪农商行"],["601838","成都银行"],["601860","紫金银行"],
  ["601916","浙商银行"],["601939","建设银行"],["601963","重庆银行"],["601988","中国银行"],
  ["601997","贵阳银行"],["601998","中信银行"],["603323","苏农银行"],["002142","宁波银行"],
  ["002807","江阴银行"],["002839","张家港行"],["002936","郑州银行"],["002948","青岛银行"],
  ["002958","青农商行"],["002966","苏州银行"]
].map(([code,name])=>[code,name,"银行"]);

// 中证红利（000922）沪深成分股，成分日期 2026-07-29；北交所同力股份因网页行情源无连续历史暂不纳入。
const DIVIDEND_STOCKS = [
  ["000090","天健集团","基建地产"],["000157","中联重科","基建工程"],["000408","藏格矿业","资源材料"],
  ["000429","粤高速A","交通运输"],["000651","格力电器","消费制造"],["000672","上峰材料","资源材料"],
  ["000895","双汇发展","消费制造"],["000933","神火股份","资源材料"],["000983","山西焦煤","能源煤炭"],
  ["002043","兔宝宝","消费制造"],["002154","报喜鸟","消费制造"],["002233","塔牌集团","资源材料"],
  ["002267","陕天然气","公用事业"],["002416","爱施德","商贸服务"],["002540","亚太科技","资源材料"],
  ["002563","森马服饰","消费制造"],["002572","索菲亚","消费制造"],["002601","龙佰集团","资源材料"],
  ["002737","葵花药业","医药健康"],["002756","永兴材料","资源材料"],["002867","周大生","消费制造"],
  ["301109","军信股份","公用事业"],["600012","皖通高速","交通运输"],["600015","华夏银行","银行"],
  ["600016","民生银行","银行"],["600028","中国石化","能源煤炭"],["600036","招商银行","银行"],
  ["600039","四川路桥","基建工程"],["600057","厦门象屿","商贸服务"],["600064","南京高科","基建地产"],
  ["600096","云天化","资源材料"],["600123","兰花科创","能源煤炭"],["600153","建发股份","商贸服务"],
  ["600177","雅戈尔","消费制造"],["600188","兖矿能源","能源煤炭"],["600256","广汇能源","能源煤炭"],
  ["600273","嘉化能源","资源材料"],["600282","南钢股份","资源材料"],["600295","鄂尔多斯","资源材料"],
  ["600348","华阳股份","能源煤炭"],["600350","山东高速","交通运输"],["600373","中文传媒","传媒出版"],
  ["600398","海澜之家","消费制造"],["600461","洪城环境","公用事业"],["600502","安徽建工","基建工程"],
  ["600546","山煤国际","能源煤炭"],["600585","海螺水泥","资源材料"],["600729","重百集团","商贸服务"],
  ["600737","中粮糖业","消费制造"],["600741","华域汽车","消费制造"],["600755","厦门国贸","商贸服务"],
  ["600757","长江传媒","传媒出版"],["600901","江苏金租","非银金融"],["600919","江苏银行","银行"],
  ["600938","中国海油","能源煤炭"],["600971","恒源煤电","能源煤炭"],["600985","淮北矿业","能源煤炭"],
  ["600997","开滦股份","能源煤炭"],["601000","唐山港","交通运输"],["601001","晋控煤业","能源煤炭"],
  ["601006","大秦铁路","交通运输"],["601009","南京银行","银行"],["601019","山东出版","传媒出版"],
  ["601077","渝农商行","银行"],["601088","中国神华","能源煤炭"],["601098","中南传媒","传媒出版"],
  ["601101","昊华能源","能源煤炭"],["601166","兴业银行","银行"],["601168","西部矿业","资源材料"],
  ["601169","北京银行","银行"],["601187","厦门银行","银行"],["601216","君正集团","资源材料"],
  ["601225","陕西煤业","能源煤炭"],["601229","上海银行","银行"],["601288","农业银行","银行"],
  ["601318","中国平安","非银金融"],["601328","交通银行","银行"],["601398","工商银行","银行"],
  ["601598","中国外运","交通运输"],["601658","邮储银行","银行"],["601666","平煤股份","能源煤炭"],
  ["601668","中国建筑","基建工程"],["601699","潞安环能","能源煤炭"],["601717","中创智领","基建工程"],
  ["601818","光大银行","银行"],["601825","沪农商行","银行"],["601838","成都银行","银行"],
  ["601857","中国石油","能源煤炭"],["601916","浙商银行","银行"],["601919","中远海控","交通运输"],
  ["601928","凤凰传媒","传媒出版"],["601939","建设银行","银行"],["601963","重庆银行","银行"],
  ["601988","中国银行","银行"],["601997","贵阳银行","银行"],["601998","中信银行","银行"],
  ["603565","中谷物流","交通运输"],["603706","东方环宇","公用事业"],["603967","中创物流","交通运输"]
];

const stockMap=new Map(BANK_STOCKS.map((x)=>[x[0],x]));
DIVIDEND_STOCKS.forEach((x)=>stockMap.set(x[0],x));
export const STOCKS=[...stockMap.values()].sort((a,b)=>a[2].localeCompare(b[2],"zh-CN")||a[0].localeCompare(b[0]));
export const CATEGORIES=["全部",...new Set(STOCKS.map((x)=>x[2]))];
export const DIVIDEND_COUNT=DIVIDEND_STOCKS.length;

function jsonp(base, params, timeout = 20000) {
  return new Promise((resolve, reject) => {
    const callback = `__bank_rsi_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const timer = setTimeout(() => finish(new Error("行情请求超时")), timeout);
    function finish(error, value) {
      clearTimeout(timer);
      delete window[callback];
      script.remove();
      error ? reject(error) : resolve(value);
    }
    window[callback] = (value) => finish(null, value);
    script.onerror = () => finish(new Error("行情源连接失败"));
    const search = new URLSearchParams({ ...params, cb: callback });
    script.src = `${base}?${search}`;
    document.head.appendChild(script);
  });
}

function secid(code) { return `${code.startsWith("6") ? 1 : 0}.${code}`; }
function marketCode(code) { return `${code.startsWith("6") ? "sh" : code.startsWith("9") ? "bj" : "sz"}${code}`; }
function num(v, d, min, max) {
  const n = Number(v); return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : d;
}
const PERIODS = {
  day: { tencent: "day", eastmoney: 101, label: "日线", annual: 252 },
  week: { tencent: "week", eastmoney: 102, label: "周线", annual: 52 },
  month: { tencent: "month", eastmoney: 103, label: "月线", annual: 12 }
};
async function historyEastmoney(code, start, end, timeframe) {
  const period=PERIODS[timeframe]||PERIODS.week;
  const json = await jsonp("https://push2his.eastmoney.com/api/qt/stock/kline/get", {
    secid:secid(code),klt:period.eastmoney,fqt:2,beg:start.replaceAll("-",""),end:end.replaceAll("-",""),
    lmt:10000,fields1:"f1,f2,f3,f4,f5,f6",fields2:"f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61"
  });
  return (json?.data?.klines || []).map((s) => {
    const x=s.split(","); return {date:x[0],open:+x[1],close:+x[2],high:+x[3],low:+x[4],volume:+x[5]};
  }).filter((x)=>Number.isFinite(x.close)&&Number.isFinite(x.high)&&Number.isFinite(x.low));
}
async function historyTencent(code, start, end, timeframe) {
  const symbol=marketCode(code);
  const period=PERIODS[timeframe]||PERIODS.week;
  const ranges=[];
  if(timeframe==="day"){
    const firstYear=new Date(start).getFullYear(),lastYear=new Date(end).getFullYear();
    for(let year=firstYear;year<=lastYear;year++){
      ranges.push([year===firstYear?start:`${year}-01-01`,year===lastYear?end:`${year}-12-31`]);
    }
  }else ranges.push([start,end]);
  const rows=[];
  for(const [rangeStart,rangeEnd] of ranges){
    const params=new URLSearchParams({param:`${symbol},${period.tencent},${rangeStart},${rangeEnd},1000,hfq`});
    const res=await fetch(`https://web.ifzq.gtimg.cn/appstock/app/fqkline/get?${params}`,{
      method:"GET",mode:"cors",cache:"no-store"
    });
    if(!res.ok)throw new Error(`腾讯行情 HTTP ${res.status}`);
    const json=await res.json();
    if(json?.code!==0)throw new Error(json?.msg||"腾讯行情返回异常");
    const node=json?.data?.[symbol];
    rows.push(...(node?.[`hfq${period.tencent}`]||node?.[period.tencent]||[]));
  }
  const uniqueRows=[...new Map(rows.map((x)=>[x[0],x])).values()].sort((a,b)=>a[0].localeCompare(b[0]));
  return uniqueRows.map((x)=>({date:x[0],open:+x[1],close:+x[2],high:+x[3],low:+x[4],volume:+x[5]}))
    .filter((x)=>Number.isFinite(x.open)&&Number.isFinite(x.close)&&Number.isFinite(x.high)&&Number.isFinite(x.low)&&x.open>0&&x.close>0);
}
async function history(code,start,end,timeframe) {
  try {
    const bars=await historyTencent(code,start,end,timeframe);
    if(bars.length>5)return{bars,source:"腾讯证券"};
    throw new Error("腾讯行情无有效K线");
  } catch(primaryError) {
    try {
      const bars=await historyEastmoney(code,start,end,timeframe);
      if(bars.length)return{bars,source:"东方财富"};
      throw new Error("东方财富无有效K线");
    } catch(fallbackError) {
      throw new Error(`腾讯：${primaryError.message}；东方财富：${fallbackError.message}`);
    }
  }
}
function rsi(closes, period) {
  const out=Array(closes.length).fill(null); if(closes.length<=period)return out;
  let gain=0,loss=0;
  for(let i=1;i<=period;i++){const d=closes[i]-closes[i-1];gain+=Math.max(d,0);loss+=Math.max(-d,0);}
  let ag=gain/period,al=loss/period; out[period]=al===0?100:100-100/(1+ag/al);
  for(let i=period+1;i<closes.length;i++){const d=closes[i]-closes[i-1];ag=(ag*(period-1)+Math.max(d,0))/period;al=(al*(period-1)+Math.max(-d,0))/period;out[i]=al===0?100:100-100/(1+ag/al);}
  return out;
}
function stats(series,trades,annualPeriods=52) {
  if(series.length<2)return{totalReturn:0,annualReturn:0,maxDrawdown:0,sharpe:0,trades};
  const years=Math.max((new Date(series.at(-1).date)-new Date(series[0].date))/31557600000,.02);
  const total=series.at(-1).value/series[0].value-1;let peak=series[0].value,dd=0;const returns=[];
  for(let i=1;i<series.length;i++){peak=Math.max(peak,series[i].value);dd=Math.min(dd,series[i].value/peak-1);returns.push(series[i].value/series[i-1].value-1);}
  const mean=returns.reduce((a,b)=>a+b,0)/returns.length;
  const sd=Math.sqrt(returns.reduce((a,b)=>a+(b-mean)**2,0)/Math.max(1,returns.length-1));
  return{totalReturn:total*100,annualReturn:(Math.pow(1+total,1/years)-1)*100,maxDrawdown:dd*100,sharpe:sd?mean/sd*Math.sqrt(annualPeriods):0,trades};
}
function backtest(bars,p) {
  const closes=bars.map((x)=>x.close);
  const periods=p.rsiPeriods;
  const rsiSeries=periods.map((period)=>rsi(closes,period));
  const signalRsi=rsiSeries[0];
  const warmup=Math.max(...periods);
  let cash=p.principal,shares=0,pending=null,closedTrades=0,openTrade=null;
  const curve=[],benchmark=[],tradeRecords=[],markers=[],signalMarkers=[];
  for(let i=warmup;i<bars.length;i++){
    let executed=null;
    if(pending?.type==="buy"&&!shares){
      const invested=cash;
      shares=cash*(1-p.buyCost)/bars[i].open;
      openTrade={buyDate:bars[i].date,buyPrice:bars[i].open,shares,invested,signalDate:pending.signalDate};
      cash=0;
      executed="buy";
    }
    else if(pending?.type==="sell"&&shares){
      const proceeds=shares*bars[i].open*(1-p.sellCost);
      const profit=proceeds-openTrade.invested;
      const holdingDays=Math.round((new Date(bars[i].date)-new Date(openTrade.buyDate))/86400000);
      tradeRecords.push({...openTrade,sellDate:bars[i].date,sellPrice:bars[i].open,
        proceeds,profit,returnPct:profit/openTrade.invested*100,holdingDays,status:"closed"});
      cash=proceeds;shares=0;closedTrades++;openTrade=null;executed="sell";
    }
    pending=null;
    // 严格状态机：空仓只判断买入；持仓只判断卖出。信号于本周期收盘确认，下周期开盘执行。
    if(!shares&&signalRsi[i]!==null&&signalRsi[i]<p.buy){
      pending={type:"buy",signalDate:bars[i].date,signalRsi:signalRsi[i]};
      signalMarkers.push({date:bars[i].date,value:signalRsi[i],type:"buy"});
    }else if(shares&&signalRsi[i]!==null&&signalRsi[i]>p.sell){
      pending={type:"sell",signalDate:bars[i].date,signalRsi:signalRsi[i]};
      signalMarkers.push({date:bars[i].date,value:signalRsi[i],type:"sell"});
    }
    const nav=(cash+shares*bars[i].close)/p.principal;
    curve.push({date:bars[i].date,value:nav});
    benchmark.push({date:bars[i].date,value:bars[i].close/bars[warmup].close});
    if(executed)markers.push({date:bars[i].date,value:nav,type:executed});
  }
  if(shares&&openTrade){
    const last=bars.at(-1);
    const currentValue=shares*last.close*(1-p.sellCost);
    const profit=currentValue-openTrade.invested;
    const holdingDays=Math.round((new Date(last.date)-new Date(openTrade.buyDate))/86400000);
    tradeRecords.push({...openTrade,sellDate:null,sellPrice:null,currentDate:last.date,currentPrice:last.close,
      proceeds:currentValue,profit,returnPct:profit/openTrade.invested*100,holdingDays,status:"open"});
  }
  const signalByDate=new Map(signalMarkers.map((x)=>[x.date,x]));
  const indicators=bars.map((bar,i)=>{
    const point={date:bar.date};
    periods.forEach((period,index)=>{point[`rsi${index+1}`]=rsiSeries[index][i];});
    const signal=signalByDate.get(bar.date);
    point.buySignal=signal?.type==="buy"?signal.value:null;
    point.sellSignal=signal?.type==="sell"?signal.value:null;
    return point;
  }).filter((x)=>periods.some((_,index)=>x[`rsi${index+1}`]!==null));
  const markerByDate=new Map(markers.map((x)=>[x.date,x.type]));
  const kline=bars.map((bar)=>({...bar,range:[bar.low,bar.high],
    buyPrice:markerByDate.get(bar.date)==="buy"?bar.low:null,
    sellPrice:markerByDate.get(bar.date)==="sell"?bar.high:null}));
  return{curve,benchmark,markers,signalMarkers,indicators,kline,tradeRecords,stats:stats(curve,closedTrades,p.annualPeriods)};
}
function aggregate(items) {
  const dates=[...new Set(items.flatMap((x)=>x.test.curve.map((p)=>p.date)))].sort();
  const maps=items.map((x)=>new Map(x.test.curve.map((p)=>[p.date,p.value])));
  const bmaps=items.map((x)=>new Map(x.test.benchmark.map((p)=>[p.date,p.value])));
  const last=Array(items.length).fill(1),blast=Array(items.length).fill(1);
  return dates.map((date)=>{maps.forEach((m,i)=>{if(m.has(date))last[i]=m.get(date)});bmaps.forEach((m,i)=>{if(m.has(date))blast[i]=m.get(date)});return{date,strategy:last.reduce((a,b)=>a+b,0)/last.length,benchmark:blast.reduce((a,b)=>a+b,0)/blast.length};});
}
async function mapLimited(rows, limit, worker) {
  const out=Array(rows.length);let cursor=0;
  async function lane(){while(cursor<rows.length){const i=cursor++;out[i]=await worker(rows[i]);}}
  await Promise.all(Array.from({length:Math.min(limit,rows.length)},lane));return out;
}

export async function runBankBacktest(form) {
  const {start,end}=form;
  if(new Date(start)>=new Date(end))throw new Error("开始日期必须早于结束日期。");
  const timeframe=PERIODS[form.timeframe]?form.timeframe:"week";
  const rsiPeriods=[
    num(form.rsi1,6,2,60),num(form.rsi2,12,2,60),num(form.rsi3,24,2,60)
  ].map(Math.round);
  const p={rsiPeriods,buy:num(form.buy,30,1,49),sell:num(form.sell,70,51,99),
    annualPeriods:PERIODS[timeframe].annual,
    principal:num(form.principal,100000,1000,1000000000),
    buyCost:(num(form.fee,.03,0,1)+num(form.slippage,.05,0,1))/100,
    sellCost:(num(form.fee,.03,0,1)+num(form.tax,.05,0,1)+num(form.slippage,.05,0,1))/100};
  const selected=STOCKS.find(([code])=>code===form.target);
  if(!selected)throw new Error("请选择一只有效的股票。");
  const stocks=[selected];
  const loaded=await mapLimited(stocks,1,async([code,name,category])=>{try{const loadedBars=await history(code,start,end,timeframe);if(loadedBars.bars.length<=Math.max(...rsiPeriods)+5)throw new Error(`有效${PERIODS[timeframe].label}不足`);return{code,name,category,source:loadedBars.source,test:backtest(loadedBars.bars,p)};}catch(e){return{code,name,category,error:e.message};}});
  const ok=loaded.filter((x)=>!x.error);
  if(!ok.length)throw new Error(`行情获取失败：${loaded[0]?.error||"未知错误"}。请稍后重试。`);
  const markerMap=new Map(ok[0].test.markers.map((x)=>[x.date,x]));
  const equity=aggregate(ok).map((x)=>{
    const marker=markerMap.get(x.date);
    return{...x,buyMarker:marker?.type==="buy"?marker.value:null,sellMarker:marker?.type==="sell"?marker.value:null};
  });
  const combined=equity.map((x)=>({date:x.date,value:x.strategy}));
  const trades=ok.reduce((a,x)=>a+x.test.stats.trades,0);
  const portfolio=stats(combined,trades,p.annualPeriods);
  portfolio.profitAmount=p.principal*portfolio.totalReturn/100;
  portfolio.endingCapital=p.principal+portfolio.profitAmount;
  return{meta:{stockCount:ok.length,stockCode:ok[0].code,stockName:ok[0].name,category:ok[0].category,dataSource:ok[0].source,start,end,timeframe,timeframeLabel:PERIODS[timeframe].label,generatedAt:new Date().toLocaleString("zh-CN")},
    portfolio,equity,markers:ok[0].test.markers,signalMarkers:ok[0].test.signalMarkers,
    indicators:ok[0].test.indicators,kline:ok[0].test.kline,
    trades:ok[0].test.tradeRecords,principal:p.principal,buyThreshold:p.buy,sellThreshold:p.sell,
    rsiPeriods,
    results:ok.map((x)=>({code:x.code,name:x.name,...x.test.stats})),
    warnings:loaded.filter((x)=>x.error).map((x)=>`${x.name}（${x.error}）`)};
}
