import Link from "next/link";
import type { ETFDividendInfo } from "@/domain/etf/etfTypes";
import { formatPercent } from "@/lib/format";
import { ETFRankingCard } from "./ETFRankingCard";

type ETFRankingTableProps = {
  etfs: ETFDividendInfo[];
};

export function ETFRankingTable({ etfs }: ETFRankingTableProps) {
  return (
    <section className="grid gap-4">
      <div className="grid gap-4 md:hidden">
        {etfs.map((etf, index) => (
          <ETFRankingCard etf={etf} key={etf.ticker} rank={index + 1} />
        ))}
      </div>
      <div className="hidden overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm md:block">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {["순위", "티커", "ETF 이름", "카테고리", "배당률", "운용보수", "배당주기", "위험도", "링크"].map((label) => (
                <th className="px-3 py-3 font-bold text-slate-700" key={label}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {etfs.map((etf, index) => (
              <tr className="border-b border-slate-100" key={etf.ticker}>
                <td className="px-3 py-3 font-bold text-slate-950">{index + 1}</td>
                <td className="px-3 py-3 font-bold text-slate-950">{etf.ticker}</td>
                <td className="px-3 py-3 text-slate-700">{etf.name}</td>
                <td className="px-3 py-3 text-slate-700">{etf.category}</td>
                <td className="px-3 py-3 text-slate-700">{formatPercent(etf.dividendYieldPercent)}</td>
                <td className="px-3 py-3 text-slate-700">{formatPercent(etf.expenseRatioPercent)}</td>
                <td className="px-3 py-3 text-slate-700">{etf.payoutCycle}</td>
                <td className="px-3 py-3 text-slate-700">{etf.riskLevel}</td>
                <td className="px-3 py-3">
                  <div className="flex gap-2">
                    <Link className="font-bold text-teal-700" href={`/etf/${etf.ticker.toLowerCase()}`}>
                      상세
                    </Link>
                    <Link className="font-bold text-teal-700" href={`/compare/schd-vs-${etf.ticker.toLowerCase()}`}>
                      비교
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
