import Image from "next/image";

type ReferencesProps = {
  className?: string;
};

export function References({ className = "" }: ReferencesProps) {
  return (
    <section
      aria-label="Referencias"
      className={`flex flex-col items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 ${className}`}
    >
      <p className="text-[11px] font-bold uppercase tracking-wide text-muted">
        Referencias
      </p>
      <a
        href="https://impeccable.com"
        target="_blank"
        rel="noopener noreferrer"
        className="pressable rounded-lg p-1"
        aria-label="Visitar Impeccable (impeccable.com)"
      >
        <Image
          src="/references.png"
          alt="Código QR para impeccable.com"
          width={128}
          height={128}
          className="h-28 w-28"
        />
      </a>
      <p className="max-w-[220px] text-center text-[10px] leading-snug text-muted">
        Escanea el código o toca para abrir Impeccable
      </p>
    </section>
  );
}
