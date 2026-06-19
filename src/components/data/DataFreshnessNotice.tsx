type DataFreshnessNoticeProps = {
  dataAsOf?: string;
  message?: string;
  className?: string;
};

const DEFAULT_MESSAGE =
  "본 데이터는 정적 데이터이며 실제 배당률, 운용보수, 분배금 정책과 다를 수 있습니다.";

export function DataFreshnessNotice({
  dataAsOf,
  message = DEFAULT_MESSAGE,
  className = "",
}: DataFreshnessNoticeProps) {
  return (
    <aside
      className={`rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-6 text-sky-950 ${className}`}
    >
      {dataAsOf ? <p className="font-bold">데이터 기준일: {dataAsOf}</p> : null}
      <p className={dataAsOf ? "mt-1" : ""}>{message}</p>
    </aside>
  );
}
