import Image from "next/image";

export default function ReferencePage() {
  return (
    <div className="flex min-h-[50dvh] flex-col items-center justify-center py-8">
      <Image
        src="/references.png"
        alt="Código QR"
        width={160}
        height={160}
        className="h-40 w-40"
        priority
      />
    </div>
  );
}
