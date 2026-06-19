import { ActionButton } from "./ActionButton";

type NotFoundStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
};

export function NotFoundState({
  actionHref,
  actionLabel,
  description,
  title = "요청하신 정보를 찾을 수 없습니다.",
}: NotFoundStateProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600 shadow-sm sm:p-6">
      <p className="text-sm font-bold text-teal-700">Not Found</p>
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
