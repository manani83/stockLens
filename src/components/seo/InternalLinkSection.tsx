import Link from "next/link";

const internalLinks = [
  ["배당금 계산기", "/"],
  ["배당 재투자 시뮬레이션", "/simulation"],
  ["월배당 ETF 순위", "/rankings/monthly-dividend-etfs"],
  ["고배당 ETF 순위", "/rankings/high-dividend-etfs"],
  ["SCHD 상세", "/etf/schd"],
  ["JEPI 상세", "/etf/jepi"],
  ["JEPQ 상세", "/etf/jepq"],
  ["QQQI 상세", "/etf/qqqi"],
  ["QYLD 상세", "/etf/qyld"],
  ["SCHD vs JEPI", "/compare/schd-vs-jepi"],
  ["JEPI vs JEPQ", "/compare/jepi-vs-jepq"],
  ["QQQI vs QYLD", "/compare/qqqi-vs-qyld"],
];

export function InternalLinkSection() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-slate-950">주요 페이지 바로가기</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {internalLinks.map(([label, href]) => (
          <Link
            className="rounded-md border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            href={href}
            key={href}
          >
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
}
