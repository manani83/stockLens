"use client";

import Link from "next/link";
import { ErrorState, PageContainer, PageHero } from "@/components/common";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <PageContainer>
      <PageHero
        eyebrow="Error"
        title="문제가 발생했습니다"
        description="오류 상세 정보는 사용자에게 노출하지 않습니다. 잠시 후 다시 시도하거나 메인 페이지로 이동해주세요."
      />
      <ErrorState />
      <div className="flex flex-wrap gap-3">
        <button
          className="rounded-md bg-teal-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-teal-800"
          onClick={reset}
          type="button"
        >
          다시 시도
        </button>
        <Link
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          href="/"
        >
          메인으로 이동
        </Link>
      </div>
    </PageContainer>
  );
}
