import Link from "next/link";

/**
 * Marca da D Cílios, desenhada em texto (como no Instagram): um "D" cursivo rosé
 * cruzando o nome "CÍLIOS" em letras finas. `size="lg"` é a versão grande do topo do site.
 */
export function Logo({ size = "sm" }: { size?: "sm" | "lg" }) {
  const lg = size === "lg";
  if (!lg) {
    return (
      <span className="flex items-baseline gap-1.5">
        <span aria-hidden="true" className="font-script text-4xl leading-none text-primary">
          D
        </span>
        <span className="font-display text-lg font-medium uppercase tracking-[0.3em] text-ink">Cílios</span>
      </span>
    );
  }
  return (
    <span className="relative inline-flex size-56 items-center justify-center sm:size-72">
      <span className="absolute inset-0 rounded-full border border-primary/25 bg-surface shadow-soft" />
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pb-6 font-script text-[9rem] leading-none text-primary/75 sm:text-[11.5rem]"
      >
        D
      </span>
      <span className="relative pl-[0.45em] font-display text-3xl font-medium uppercase tracking-[0.45em] text-ink sm:text-4xl">
        Cílios
      </span>
    </span>
  );
}

export function Brand({ name, href = "/" }: { name: string; href?: string }) {
  return (
    <Link href={href} aria-label={name}>
      <Logo />
    </Link>
  );
}
