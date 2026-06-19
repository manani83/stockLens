import { ActionButton } from "./ActionButton";

type ErrorStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
};

export function ErrorState({
  actionHref,
  actionLabel,
  description = "잠시 후 다시 시도해주세요.",
  title = "문제가 발생했습니다.",
}: ErrorStateProps) {
  return (
    <section className="rounded-lg border border-rose-200 bg-white p-5 text-sm leading-6 text-slate-600 shadow-sm sm:p-6">
      <p className="text-sm font-bold text-rose-700">Error</p>
      <h2 className="mt-2 text-xl font-bold text-slate-950">{title}</h2>
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
