import { BottomNav } from "@/components/layout/BottomNav";

type MobileShellProps = {
  children: React.ReactNode;
};

export function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="h-dvh max-h-dvh overflow-hidden bg-background sm:bg-transparent">
      <div className="mx-auto flex h-full max-h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-background shadow-[0_0_40px_rgba(0,0,0,0.08)] sm:h-[min(100dvh,900px)] sm:max-h-[min(100dvh,900px)] sm:rounded-[1.75rem] sm:border sm:border-border/80">
        <main className="shell-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
