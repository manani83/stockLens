import { ActionButton } from "./ActionButton";

type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
};

export function EmptyState({
  actionHref,
  actionLabel,
  description,
  title,
}: EmptyStateProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600 shadow-sm">
      <h2 className="text-base font-bold text-slate-950">{title}</h2>
      {description ? <p className="mt-2">{description}</p> : null}
      {actionHref && actionLabel ? (
        <div className="mt-4">
          <ActionButton href={actionHref} variant="secondary">
            {actionLabel}
          </ActionButton>
        </div>
      ) : null}
    </section>
  );
}
