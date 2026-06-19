import type { GuideArticle } from "@/domain/content/contentTypes";
import { GuideArticleCard } from "./GuideArticleCard";

type GuideArticleListProps = {
  articles: GuideArticle[];
};

export function GuideArticleList({ articles }: GuideArticleListProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {articles.map((article) => (
        <GuideArticleCard article={article} key={article.slug} />
      ))}
    </section>
  );
}
