"use client";

import { downloadBackupFile } from "@/domain/backup/backupService";

export function BackupExportButton() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-slate-950">백업 내보내기</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        브라우저에 저장된 관심종목, 알림 규칙, 포트폴리오 데이터를 JSON 파일로
        저장합니다.
      </p>
      <button
        className="mt-4 rounded-md bg-teal-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
        onClick={downloadBackupFile}
        type="button"
      >
        JSON 백업 다운로드
      </button>
    </section>
  );
}
