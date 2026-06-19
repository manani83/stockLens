import Link from "next/link";

type ActionButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ActionButtonProps = {
  children: React.ReactNode;
  variant?: ActionButtonVariant;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

const variantClasses: Record<ActionButtonVariant, string> = {
  primary: "bg-teal-700 text-white hover:bg-teal-800",
  secondary: "border border-slate-300 text-slate-700 hover:bg-slate-50",
  ghost: "text-teal-700 hover:bg-teal-50",
  danger: "border border-rose-300 text-rose-700 hover:bg-rose-50",
};

export function ActionButton({
  children,
  disabled = false,
  href,
  onClick,
  type = "button",
  variant = "secondary",
}: ActionButtonProps) {
  const className = `inline-flex rounded-md px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:bg-slate-300 ${variantClasses[variant]}`;

  if (href) {
    return (
      <Link className={className} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
