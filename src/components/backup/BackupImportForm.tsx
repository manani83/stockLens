"use client";

import { useState } from "react";
import {
  importBackupData,
  validateBackupData,
} from "@/domain/backup/backupService";
import type {
  BackupData,
  BackupImportMode,
} from "@/domain/backup/backupTypes";
import { FormErrorMessage } from "../common";
import { BackupDataPreview } from "./BackupDataPreview";

export function BackupImportForm() {
  const [mode, setMode] = useState<BackupImportMode>("Merge");
  const [backupData, setBackupData] = useState<BackupData | undefined>();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const raw = await file.text();
    const result = validateBackupData(raw);

    if (!result.valid || !result.data) {
      setBackupData(undefined);
      setMessage(result.message ?? "백업 파일을 확인해주세요.");
      setIsError(true);
      return;
    }

    setBackupData(result.data);
    setMessage("백업 파일을 읽었습니다. 가져오기 방식을 확인해주세요.");
    setIsError(false);
  }

  function handleImport() {
    if (!backupData) {
      setMessage("먼저 백업 JSON 파일을 선택해주세요.");
      setIsError(true);
      return;
    }

    const confirmed = window.confirm(
      mode === "Replace"
        ? "기존 데이터를 모두 덮어씁니다. 계속할까요?"
        : "기존 데이터와 백업 데이터를 병합합니다. 계속할까요?",
    );

    if (!confirmed) {
      return;
    }

    const result = importBackupData(backupData, mode);
    setMessage(result.message ?? "");
    setIsError(!result.success);
  }

  return (
    <section className="grid gap-4">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-slate-950">백업 가져오기</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-800">JSON 파일</span>
            <input
              accept="application/json,.json"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3"
              onChange={handleFileChange}
              type="file"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-800">가져오기 방식</span>
            <select
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3"
              onChange={(event) => setMode(event.target.value as BackupImportMode)}
              value={mode}
            >
              <option value="Merge">기존 데이터와 병합</option>
              <option value="Replace">기존 데이터 덮어쓰기</option>
            </select>
          </label>
        </div>
        <button
          className="mt-4 rounded-md bg-teal-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={!backupData}
          onClick={handleImport}
          type="button"
        >
          가져오기 실행
        </button>
        {isError ? <FormErrorMessage message={message} /> : null}
        {!isError && message ? (
          <p className="mt-4 text-sm font-bold text-slate-700">{message}</p>
        ) : null}
      </div>
      <BackupDataPreview data={backupData} />
    </section>
  );
}
