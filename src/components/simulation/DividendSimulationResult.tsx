import type { DividendSimulationResult as DividendSimulationResultType } from "@/domain/simulation/simulationTypes";
import { DividendSimulationSummary } from "./DividendSimulationSummary";
import { DividendSimulationTable } from "./DividendSimulationTable";

type DividendSimulationResultProps = {
  result: DividendSimulationResultType;
};

export function DividendSimulationResult({ result }: DividendSimulationResultProps) {
  return (
    <div className="grid gap-6">
      <DividendSimulationSummary result={result} />
      <DividendSimulationTable results={result.yearlyResults} />
    </div>
  );
}
