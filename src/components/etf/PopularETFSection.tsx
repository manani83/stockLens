import { getAllEtfs } from "@/domain/etf/etfRepository";
import { PopularETFCard } from "./PopularETFCard";

export function PopularETFSection() {
  const etfs = getAllEtfs();

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {etfs.map((etf) => (
        <PopularETFCard etf={etf} key={etf.ticker} />
      ))}
    </div>
  );
}
