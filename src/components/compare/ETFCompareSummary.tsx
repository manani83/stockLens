import {
  buildCompareSummary,
  compareEtfs,
} from "@/domain/compare/compareService";
import type { ETFDividendInfo } from "@/domain/etf/etfTypes";

type ETFCompareSummaryProps = {
  first: ETFDividendInfo;
  second: ETFDividendInfo;
};

export function ETFCompareSummary({ first, second }: ETFCompareSummaryProps) {
  const comparison = compareEtfs(first, second);

  return (
    <section className="rounded-lg border border-teal-200 bg-teal-50 p-5 text-sm leading-6 text-teal-950">
      <h2 className="text-xl font-bold text-teal-950">비교 요약</h2>
      <p className="mt-3">{buildCompareSummary(comparison)}</p>
      <p className="mt-3">
        비교 결과는 단순 참고용이며 실제 수익률, 배당금, 세금, 환율, 운용
        정책에 따라 달라질 수 있습니다. 투자 판단의 최종 책임은 투자자
        본인에게 있습니다.
      </p>
    </section>
  );
}
