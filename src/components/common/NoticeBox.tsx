type NoticeBoxVariant = "info" | "warning" | "danger";

type NoticeBoxProps = {
  title?: string;
  children: React.ReactNode;
  variant?: NoticeBoxVariant;
  className?: string;
};

const variantClasses: Record<NoticeBoxVariant, string> = {
  info: "border-sky-200 bg-sky-50 text-sky-950",
  warning: "border-amber-200 bg-amber-50 text-amber-950",
  danger: "border-rose-200 bg-rose-50 text-rose-950",
};

export function NoticeBox({
  children,
  className = "",
  title,
  variant = "info",
}: NoticeBoxProps) {
  return (
    <section className={`rounded-lg border p-5 text-sm leading-6 ${variantClasses[variant]} ${className}`}>
      {title ? <h2 className="font-bold">{title}</h2> : null}
      <div className={title ? "mt-2" : ""}>{children}</div>
    </section>
  );
}
