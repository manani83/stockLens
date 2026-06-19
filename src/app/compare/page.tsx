import Link from "next/link";
import type { Metadata } from "next";
import { ETFCompareSelector } from "@/components/compare";
import { InternalLinkSection } from "@/components/seo/InternalLinkSection";
import { buildPageTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: buildPageTitle("ETF 비교"),
  description:
    "SCHD, JEPI, JEPQ, QQQI, QYLD 같은 미국 배당 ETF를 2개씩 선택해 비교해보세요.",
};

const representativePairs = [
  ["SCHD vs JEPI", "/compare/schd-vs-jepi"],
  ["JEPI vs JEPQ", "/compare/jepi-vs-jepq"],
  ["QQQI vs QYLD", "/compare/qqqi-vs-qyld"],
  ["SCHD vs QYLD", "/compare/schd-vs-qyld"],
];

export default function ComparePage() {
  return (
    <main className="page-shell grid gap-6 py-8 sm:py-10">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm font-bold text-teal-700">Compare</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">ETF 비교</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          SCHD, JEPI, JEPQ, QQQI, QYLD 같은 미국 배당 ETF를 비교해보세요.
        </p>
      </section>

      <ETFCompareSelector />

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-slate-950">대표 비교 링크</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {representativePairs.map(([label, href]) => (
            <Link
              className="rounded-md border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              href={href}
              key={href}
            >
              {label}
            </Link>
          ))}
        </div>
      </section>
      <InternalLinkSection />
    </main>
  );
}
