import type { BackupData } from "@/domain/backup/backupTypes";

type BackupDataPreviewProps = {
  data?: BackupData;
};

export function BackupDataPreview({ data }: BackupDataPreviewProps) {
  if (!data) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
        선택된 백업 데이터가 없습니다.
      </section>
    );
  }

  const items = [
    ["백업 버전", data.version],
    ["내보낸 시간", data.exportedAt],
    ["관심종목 개수", `${data.watchlist.length}개`],
    ["알림 규칙 개수", `${data.alertRules.length}개`],
    ["포트폴리오 항목 개수", `${data.portfolio.length}개`],
  ];

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-slate-950">백업 데이터 미리보기</h2>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([label, value]) => (
          <div className="rounded-md bg-slate-50 p-4" key={label}>
            <dt className="text-sm text-slate-500">{label}</dt>
            <dd className="mt-1 text-sm font-bold text-slate-950">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
