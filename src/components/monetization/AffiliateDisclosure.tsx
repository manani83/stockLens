type AffiliateDisclosureProps = {
  className?: string;
};

export function AffiliateDisclosure({ className = "" }: AffiliateDisclosureProps) {
  return (
    <p
      className={`rounded-lg border border-slate-200 bg-white px-4 py-3 text-xs leading-5 text-slate-500 ${className}`}
    >
      이 페이지에는 향후 제휴 링크가 포함될 수 있습니다. 제휴 링크를 통해
      서비스에 가입하거나 상품을 이용할 경우 사이트 운영자가 일정 수수료를
      받을 수 있습니다. 단, 투자 판단의 최종 책임은 투자자 본인에게 있습니다.
    </p>
  );
}
