"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_TABS } from "@/lib/navigation";

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden
      className={`h-[22px] w-[22px] ${active ? "text-primary" : "text-muted"}`}
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={active ? 0 : 2}
      viewBox="0 0 24 24"
    >
      {active ? (
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      ) : (
        <path
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function GlucoseIcon({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden
      className={`h-[22px] w-[22px] ${active ? "text-primary" : "text-muted"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        d="M4 19h16M6 16l3-9 3 5 3-7 3 11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LearnIcon({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden
      className={`h-[22px] w-[22px] ${active ? "text-primary" : "text-muted"}`}
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={active ? 0 : 2}
      viewBox="0 0 24 24"
    >
      {active ? (
        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L21 9 12 3zm0 2.18l6 3.27-6 3.27-6-3.27 6-3.27z" />
      ) : (
        <path
          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824 2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function ChallengeIcon({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden
      className={`h-[22px] w-[22px] ${active ? "text-primary" : "text-muted"}`}
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={active ? 0 : 2}
      viewBox="0 0 24 24"
    >
      {active ? (
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      ) : (
        <path
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

const TAB_ICONS = {
  inicio: HomeIcon,
  glucosa: GlucoseIcon,
  aprende: LearnIcon,
  retos: ChallengeIcon,
} as const;

function isTabActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación principal"
      className="shrink-0 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur-md"
    >
      <ul className="grid grid-cols-4 px-1 pb-1.5 pt-1.5">
        {NAV_TABS.map((tab) => {
          const active = isTabActive(pathname, tab.href);
          const Icon = TAB_ICONS[tab.id];

          return (
            <li key={tab.id}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex flex-col items-center gap-0.5 rounded-xl px-1 py-2 transition-colors duration-200 active:scale-95 ${
                  active ? "text-primary" : "text-muted"
                }`}
              >
                <span
                  className={`absolute inset-x-2 top-0 h-0.5 rounded-full bg-primary transition-opacity duration-200 ${active ? "opacity-100" : "opacity-0"}`}
                  aria-hidden
                />
                <Icon active={active} />
                <span
                  className={`max-w-full truncate text-[10px] font-bold leading-none transition-colors duration-200 ${
                    active ? "text-primary" : "text-muted"
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
