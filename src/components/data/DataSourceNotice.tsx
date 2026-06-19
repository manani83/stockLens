type DataSourceNoticeProps = {
  className?: string;
};

export function DataSourceNotice({ className = "" }: DataSourceNoticeProps) {
  return (
    <aside
      className={`rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-600 ${className}`}
    >
      본 사이트의 ETF 정보는 초기 MVP용 정적 데이터이며, 실제 투자 전 운용사
      공식 자료와 최신 공시를 반드시 확인해야 합니다.
    </aside>
  );
}
