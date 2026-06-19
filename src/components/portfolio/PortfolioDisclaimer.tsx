export function PortfolioDisclaimer() {
  return (
    <section className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
      포트폴리오 기능은 브라우저 localStorage에만 저장되는 MVP 기능입니다.
      브라우저 데이터 삭제 시 입력 정보가 사라질 수 있습니다. 계산 결과는
      단순 참고용이며 실제 수익률, 배당금, 환율, 세금과 다를 수 있습니다.
    </section>
  );
}
