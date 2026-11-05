import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

export function BackLink({
  href,
  children = "Back",
}: {
  href: string;
  children?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#00AEEF] transition hover:text-[#0095cc]"
    >
      <span aria-hidden>←</span>
      {children}
    </Link>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  backHref,
  backLabel = "Back",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <div className="space-y-3">
      {backHref ? <BackLink href={backHref}>{backLabel}</BackLink> : null}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          {eyebrow ? (
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#00AEEF]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-1 font-display text-[26px] font-extrabold tracking-tight text-[#0B1B32] sm:text-[30px]">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#5B6577]">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}

export function PortalButton({
  children,
  href,
  variant = "solid",
  className = "",
  type = "button",
  onClick,
}: {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  const styles =
    variant === "solid"
      ? "bg-[#00AEEF] text-white hover:bg-[#0095cc]"
      : variant === "outline"
        ? "border border-[#0B1B32] bg-white text-[#0B1B32] hover:border-[#00AEEF] hover:text-[#00AEEF]"
        : "bg-[#F5F7FA] text-[#0B1B32] hover:bg-[#E6F7FE] hover:text-[#00AEEF]";

  const cls = `inline-flex h-10 items-center justify-center gap-2 rounded-[8px] px-4 text-[13px] font-bold transition ${styles} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-[14px] border border-[#E3E8EF] bg-white p-4 shadow-[0_8px_24px_-18px_rgba(11,27,54,0.2)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B93A3]">
        {label}
      </p>
      <p className="mt-2 font-display text-[28px] font-extrabold text-[#0B1B32]">
        {value}
      </p>
      {hint ? <p className="mt-1 text-[12px] text-[#6B7280]">{hint}</p> : null}
    </div>
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[16px] border border-[#E3E8EF] bg-white p-5 shadow-[0_8px_24px_-18px_rgba(11,27,54,0.18)] ${className}`}
    >
      {children}
    </div>
  );
}

export function StatusPill({
  status,
}: {
  status: "Live" | "Draft" | "Pending" | string;
}) {
  const tone =
    status === "Live"
      ? "bg-[#E8FBF3] text-[#0B9B6B]"
      : status === "Pending"
        ? "bg-[#FFF6E5] text-[#C47F00]"
        : "bg-[#F5F7FA] text-[#6B7280]";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${tone}`}
    >
      {status}
    </span>
  );
}

export function Disclaimer() {
  return (
    <div className="rounded-[12px] border border-[#E3E8EF] bg-[#F8FAFC] px-4 py-3 text-[12px] leading-relaxed text-[#5B6577]">
      SellPlan signposts independent providers. We do not guarantee grants,
      training places, advertising results, or the accuracy of external
      information. External sites open in a new tab and have their own terms.
    </div>
  );
}
