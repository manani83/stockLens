import Link from "next/link";
import type { GuideArticle } from "@/domain/content/contentTypes";

type GuideArticleCardProps = {
  article: GuideArticle;
};

export function GuideArticleCard({ article }: GuideArticleCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold text-teal-700">{article.category}</p>
      <h2 className="mt-2 text-xl font-bold text-slate-950">{article.title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{article.description}</p>
      <p className="mt-3 text-xs text-slate-500">업데이트: {article.updatedAt}</p>
      <Link
        className="mt-4 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        href={`/guides/${article.slug}`}
      >
        {article.title} 읽기
      </Link>
    </article>
  );
}
