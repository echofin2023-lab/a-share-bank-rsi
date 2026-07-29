import "./globals.css";

export const metadata = {
  title: "A股银行 RSI 回测台",
  description: "A股银行股周线 RSI 策略回测工具"
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
