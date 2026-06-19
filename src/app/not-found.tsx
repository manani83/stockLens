import Link from "next/link";
import { NotFoundState, PageContainer, PageHero } from "@/components/common";

const links = [
  ["메인으로 이동", "/"],
  ["배당금 계산기로 이동", "/"],
  ["ETF 랭킹으로 이동", "/rankings"],
];

export default function NotFoundPage() {
  return (
    <PageContainer>
      <PageHero
        eyebrow="404"
        title="페이지를 찾을 수 없습니다"
        description="주소가 잘못되었거나 페이지가 이동되었을 수 있습니다."
      />
      <NotFoundState
        title="요청한 페이지가 없습니다."
        description="아래 링크에서 주요 기능으로 다시 이동할 수 있습니다."
      />
      <nav className="grid gap-3 sm:grid-cols-3" aria-label="404 page links">
        {links.map(([label, href]) => (
          <Link
            className="rounded-md border border-slate-300 bg-white px-4 py-3 text-center text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
            href={href}
            key={label}
          >
            {label}
          </Link>
        ))}
      </nav>
    </PageContainer>
  );
}
