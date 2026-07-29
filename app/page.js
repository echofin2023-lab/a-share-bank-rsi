"use client";

import { useMemo, useState } from "react";
import {
  Area, AreaChart, CartesianGrid, Legend, Line, ResponsiveContainer,
  Tooltip, XAxis, YAxis
} from "recharts";

const money = new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 2 });
const pct = (v) => `${v >= 0 ? "+" : ""}${Number(v).toFixed(2)}%`;

function Metric({ label, value, tone }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong className={tone || ""}>{value}</strong>
    </div>
  );
}

export default function Home() {
  const [form, setForm] = useState({
    start: "2015-01-01", end: new Date().toISOString().slice(0, 10),
    period: 14, buy: 30, sell: 70, fee: 0.03, tax: 0.05, slippage: 0.05,
    target: "all"
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sort, setSort] = useState({ key: "totalReturn", dir: -1 });

  const set = (key, value) => setForm((x) => ({ ...x, [key]: value }));
  async function run() {
    setLoading(true); setError("");
    try {
      const qs = new URLSearchParams(form).toString();
      const res = await fetch(`/api/backtest?${qs}`);
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "回测失败");
      setData(body);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const rows = useMemo(() => {
    if (!data) return [];
    return [...data.results].sort((a, b) =>
      (Number(a[sort.key]) - Number(b[sort.key])) * sort.dir
    );
  }, [data, sort]);
  function sortBy(key) {
    setSort((s) => ({ key, dir: s.key === key ? -s.dir : -1 }));
  }

  return (
    <main>
      <header>
        <div>
          <p className="eyebrow">BANK FACTOR LAB / 银行因子实验室</p>
          <h1>A股银行 <em>RSI</em> 回测台</h1>
          <p className="lede">用周线观察极端情绪，把每一次买卖写进可复核的账本。</p>
        </div>
        <div className="status"><i /> 数据源 · 东方财富实时接口</div>
      </header>

      <section className="workspace">
        <aside>
          <div className="aside-head"><span>01</span><h2>策略参数</h2></div>
          <label>回测区间</label>
          <div className="pair">
            <input type="date" value={form.start} onChange={(e) => set("start", e.target.value)} />
            <b>→</b>
            <input type="date" value={form.end} onChange={(e) => set("end", e.target.value)} />
          </div>
          <label>RSI 周期 <output>{form.period} 周</output></label>
          <input type="range" min="3" max="30" value={form.period} onChange={(e) => set("period", e.target.value)} />
          <div className="pair fields">
            <div><label>买入阈值</label><input type="number" min="1" max="49" value={form.buy} onChange={(e) => set("buy", e.target.value)} /></div>
            <div><label>卖出阈值</label><input type="number" min="51" max="99" value={form.sell} onChange={(e) => set("sell", e.target.value)} /></div>
          </div>
          <label>标的范围</label>
          <select value={form.target} onChange={(e) => set("target", e.target.value)}>
            <option value="all">全部 A 股上市银行</option>
            <option value="state">六大国有银行</option>
          </select>
          <div className="costs">
            <span>单边佣金 <b>{form.fee}%</b></span>
            <span>卖出印花税 <b>{form.tax}%</b></span>
            <span>单边滑点 <b>{form.slippage}%</b></span>
          </div>
          <button onClick={run} disabled={loading}>{loading ? "正在获取行情并计算…" : "运行回测"} <span>↗</span></button>
          <p className="hint">信号按周五收盘确认，并在下一周首个交易日执行，避免未来函数。</p>
        </aside>

        <article>
          {!data && !loading && (
            <div className="empty">
              <div className="orbit"><span>RSI</span></div>
              <h2>参数就绪，等待首次回测</h2>
              <p>点击左侧「运行回测」，系统将获取全部银行股的真实历史行情。</p>
            </div>
          )}
          {loading && <div className="empty"><div className="loader" /><h2>正在穿越历史行情</h2><p>全市场计算通常需要十几秒，请稍候。</p></div>}
          {error && <div className="error"><b>回测未完成</b><p>{error}</p><button onClick={run}>重试</button></div>}
          {data && !loading && (
            <>
              <div className="summary-head">
                <div><p className="eyebrow">组合概览</p><h2>{data.meta.stockCount} 家银行 · 等权组合</h2></div>
                <p>{data.meta.start} — {data.meta.end}<br />更新于 {data.meta.generatedAt}</p>
              </div>
              <div className="metrics">
                <Metric label="累计收益" value={pct(data.portfolio.totalReturn)} tone={data.portfolio.totalReturn >= 0 ? "up" : "down"} />
                <Metric label="年化收益" value={pct(data.portfolio.annualReturn)} />
                <Metric label="最大回撤" value={pct(data.portfolio.maxDrawdown)} tone="down" />
                <Metric label="夏普比率" value={data.portfolio.sharpe.toFixed(2)} />
                <Metric label="完成交易" value={`${data.portfolio.trades} 笔`} />
              </div>
              <div className="chart">
                <div className="chart-title"><h3>组合净值曲线</h3><span>起始净值 = 1.00</span></div>
                <ResponsiveContainer width="100%" height={310}>
                  <AreaChart data={data.equity}>
                    <defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b52f2a" stopOpacity=".25"/><stop offset="1" stopColor="#b52f2a" stopOpacity="0"/></linearGradient></defs>
                    <CartesianGrid stroke="#e6e0d5" vertical={false} />
                    <XAxis dataKey="date" tick={{fontSize: 11}} minTickGap={45} />
                    <YAxis tick={{fontSize: 11}} domain={["auto", "auto"]} />
                    <Tooltip formatter={(v) => Number(v).toFixed(3)} />
                    <Legend />
                    <Area name="RSI 策略" type="monotone" dataKey="strategy" stroke="#b52f2a" fill="url(#fill)" strokeWidth={2} />
                    <Line name="买入并持有" type="monotone" dataKey="benchmark" stroke="#1d3141" dot={false} strokeWidth={1.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="table-head"><div><h3>个股表现</h3><p>点击表头排序</p></div><span>{rows.length} 个有效样本</span></div>
              <div className="table-wrap">
                <table>
                  <thead><tr>
                    <th>代码 / 名称</th>
                    <th onClick={() => sortBy("totalReturn")}>累计收益 ↕</th>
                    <th onClick={() => sortBy("annualReturn")}>年化收益 ↕</th>
                    <th onClick={() => sortBy("maxDrawdown")}>最大回撤 ↕</th>
                    <th onClick={() => sortBy("sharpe")}>夏普 ↕</th>
                    <th onClick={() => sortBy("trades")}>交易 ↕</th>
                  </tr></thead>
                  <tbody>{rows.map((r) => <tr key={r.code}>
                    <td><b>{r.name}</b><small>{r.code}</small></td>
                    <td className={r.totalReturn >= 0 ? "up" : "down"}>{pct(r.totalReturn)}</td>
                    <td>{pct(r.annualReturn)}</td><td className="down">{pct(r.maxDrawdown)}</td>
                    <td>{r.sharpe.toFixed(2)}</td><td>{r.trades}</td>
                  </tr>)}</tbody>
                </table>
              </div>
              {data.warnings?.length > 0 && <p className="warning">未纳入：{data.warnings.join("、")}</p>}
            </>
          )}
        </article>
      </section>
      <footer><span>仅供策略研究，不构成投资建议</span><span>周线 RSI · 后复权总回报口径近似 · 含交易成本</span></footer>
    </main>
  );
}
