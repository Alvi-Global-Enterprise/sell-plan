import Image from "next/image";
import Link from "next/link";

export default function Logo({
  className = "",
  tone = "dark",
  size = "nav",
}: {
  className?: string;
  tone?: "dark" | "light";
  size?: "nav" | "footer";
}) {
  const src =
    tone === "light" ? "/assets/logo-on-light.png" : "/assets/logo-on-dark.png";

  const box =
    size === "footer"
      ? "h-12 w-[82px] sm:h-14 sm:w-[96px]"
      : "h-9 w-[62px] sm:h-10 sm:w-[70px]";

  return (
    <Link href="/" className={`inline-flex shrink-0 items-center ${className}`}>
      <span className={`relative block ${box}`}>
        <Image
          src={src}
          alt="SellPlan.com"
          fill
          sizes="96px"
          priority={size === "nav"}
          className="object-contain object-left"
        />
      </span>
    </Link>
  );
}
