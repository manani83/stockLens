import { AffiliateDisclosure } from "./AffiliateDisclosure";

type BrokerAffiliateBoxProps = {
  className?: string;
};

export function BrokerAffiliateBox({ className = "" }: BrokerAffiliateBoxProps) {
  return (
    <aside
      className={`rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      <p className="text-sm font-bold text-teal-700">Affiliate Area</p>
      <h2 className="mt-2 text-xl font-bold text-slate-950">
        투자 플랫폼 비교 준비 중
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
        향후 미국주식 투자에 필요한 증권사, 환전, 수수료 정보를 비교할 수
        있도록 준비 중입니다.
      </p>
      <button
        className="mt-4 rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-500"
        disabled
        type="button"
      >
        준비 중
      </button>
      <AffiliateDisclosure className="mt-4" />
    </aside>
  );
}
