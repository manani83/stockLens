import { guideArticles } from "../../data/guideArticles";
import type { GuideArticle, GuideArticleCategory } from "./contentTypes";

function sortByUpdatedAt(articles: GuideArticle[]): GuideArticle[] {
  return [...articles].sort((first, second) =>
    second.updatedAt.localeCompare(first.updatedAt),
  );
}

export function getAllGuideArticles(): GuideArticle[] {
  return sortByUpdatedAt(guideArticles);
}

export function getGuideArticleBySlug(slug: string): GuideArticle | undefined {
  return guideArticles.find((article) => article.slug === slug);
}

export function getGuideArticlesByCategory(
  category: GuideArticleCategory,
): GuideArticle[] {
  return sortByUpdatedAt(
    guideArticles.filter((article) => article.category === category),
  );
}

export function searchGuideArticles(keyword: string): GuideArticle[] {
  const normalizedKeyword = keyword.trim().toLowerCase();

  if (!normalizedKeyword) {
    return getAllGuideArticles();
  }

  return sortByUpdatedAt(
    guideArticles.filter((article) => {
      return [article.title, article.description, ...article.keywords].some(
        (value) => value.toLowerCase().includes(normalizedKeyword),
      );
    }),
  );
}

export function getRelatedGuideArticles(slug: string): GuideArticle[] {
  const article = getGuideArticleBySlug(slug);

  if (!article) {
    return [];
  }

  return article.relatedSlugs
    .map((relatedSlug) => getGuideArticleBySlug(relatedSlug))
    .filter((relatedArticle): relatedArticle is GuideArticle => Boolean(relatedArticle));
}
