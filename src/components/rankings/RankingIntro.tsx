type RankingIntroProps = {
  title: string;
  description: string;
};

export function RankingIntro({ title, description }: RankingIntroProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <p className="text-sm font-bold text-teal-700">ETF Rankings</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
        {description}
      </p>
      <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
        ETF 랭킹은 정적 데이터 기반의 단순 비교이며 실제 수익률, 배당금,
        세금, 환율, 운용 정책에 따라 달라질 수 있습니다. 높은 배당률은 높은
        위험을 동반할 수 있습니다. 투자 판단의 최종 책임은 투자자 본인에게
        있습니다.
      </p>
    </section>
  );
}
