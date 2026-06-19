import { EmptyState } from "../common";

export function EmptyWatchlist() {
  return (
    <EmptyState
      title="아직 관심종목이 없습니다."
      description="SCHD, JEPI, JEPQ 같은 ETF를 관심종목에 추가해보세요."
      actionLabel="ETF 랭킹 보기"
      actionHref="/rankings"
    />
  );
}
