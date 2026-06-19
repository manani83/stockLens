import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dividend Lab Korea | 미국주식 배당·ETF 계산기",
    template: "%s",
  },
  description:
    "SCHD, JEPI, JEPQ, QQQI, QYLD 같은 미국 배당 ETF의 예상 월 배당금과 세후 배당금을 원화 기준으로 계산해보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
