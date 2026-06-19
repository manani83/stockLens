import Link from "next/link";
import type { GuideArticle } from "@/domain/content/contentTypes";

type RelatedGuideLinksProps = {
  articles: GuideArticle[];
};

export function RelatedGuideLinks({ articles }: RelatedGuideLinksProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-slate-950">관련 가이드</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {articles.map((article) => (
          <Link
            className="rounded-md border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            href={`/guides/${article.slug}`}
            key={article.slug}
          >
            {article.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
