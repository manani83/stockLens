type InfoCardProps = {
  label: string;
  value: string;
  description?: string;
};

export function InfoCard({ description, label, value }: InfoCardProps) {
  return (
    <div className="rounded-md bg-slate-50 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-base font-bold text-slate-950">{value}</p>
      {description ? (
        <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
      ) : null}
    </div>
  );
}
