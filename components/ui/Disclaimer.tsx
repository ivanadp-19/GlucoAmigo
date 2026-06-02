type DisclaimerProps = {
  className?: string;
  variant?: "general" | "food";
  text?: string;
};

const GENERAL_TEXT =
  "Esta app es una herramienta educativa y de seguimiento. No sustituye la orientación de tu médico o nutriólogo.";

export function Disclaimer({
  className = "",
  variant = "general",
  text,
}: DisclaimerProps) {
  const message = text ?? GENERAL_TEXT;
  const isFood = variant === "food";

  return (
    <aside
      role="note"
      className={`rounded-xl border px-4 py-3 text-xs leading-relaxed ${
        isFood
          ? "border-secondary/40 bg-secondary-soft text-text"
          : "border-border bg-background text-muted"
      } ${className}`}
    >
      {isFood && (
        <p className="mb-1 font-bold text-secondary">ℹ️ Aviso nutricional</p>
      )}
      <p>{message}</p>
    </aside>
  );
}
