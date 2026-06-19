"use client";

import { useEffect, useState } from "react";
import {
  getPortfolioHoldings,
  removePortfolioHolding,
} from "@/domain/portfolio/portfolioService";
import type { PortfolioHolding } from "@/domain/portfolio/portfolioTypes";
import { EmptyState } from "../common";
import { PORTFOLIO_UPDATED_EVENT } from "./PortfolioForm";
import { PortfolioHoldingCard } from "./PortfolioHoldingCard";

type PortfolioHoldingsListProps = {
  exchangeRate: number;
};

export function PortfolioHoldingsList({ exchangeRate }: PortfolioHoldingsListProps) {
  const [holdings, setHoldings] = useState<PortfolioHolding[]>([]);

  function refreshHoldings() {
    setHoldings(getPortfolioHoldings());
  }

  useEffect(() => {
    queueMicrotask(refreshHoldings);
    window.addEventListener(PORTFOLIO_UPDATED_EVENT, refreshHoldings);
    window.addEventListener("storage", refreshHoldings);

    return () => {
      window.removeEventListener(PORTFOLIO_UPDATED_EVENT, refreshHoldings);
      window.removeEventListener("storage", refreshHoldings);
    };
  }, []);

  function handleRemove(id: string) {
    removePortfolioHolding(id);
    window.dispatchEvent(new Event(PORTFOLIO_UPDATED_EVENT));
    refreshHoldings();
  }

  if (holdings.length === 0) {
    return (
      <EmptyState
        title="저장된 보유 ETF가 없습니다."
        description="보유 ETF를 추가하면 예상 월 배당금과 포트폴리오 캘린더를 확인할 수 있습니다."
      />
    );
  }

  return (
    <section className="grid gap-4">
      {holdings.map((holding) => (
        <PortfolioHoldingCard
          exchangeRate={exchangeRate}
          holding={holding}
          key={holding.id}
          onRemove={handleRemove}
        />
      ))}
    </section>
  );
}
