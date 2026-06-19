export type GuideArticleCategory =
  | "DividendBasics"
  | "ETFComparison"
  | "Tax"
  | "Simulation"
  | "Portfolio"
  | "Risk"
  | "Beginner";

export type GuideArticle = {
  slug: string;
  title: string;
  description: string;
  category: GuideArticleCategory;
  keywords: string[];
  body: string;
  relatedSlugs: string[];
  createdAt: string;
  updatedAt: string;
};
