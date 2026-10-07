import { useEffect, useRef, useState, type ReactNode } from "react";

const clamp = { 2: "line-clamp-2", 3: "line-clamp-3", 4: "line-clamp-4" } as const;

/**
 * Cuts long text to a few lines with an ellipsis and shows all of it on hover.
 * Touch and keyboard users get the same by tapping or tabbing to it (it only becomes
 * focusable when it is actually cut). Screen readers always get the full text.
 * Extra reveal triggers, like a parent's hover, can be passed in `className`.
 */
export function Truncate({
  lines,
  children,
  className = "",
  focusable = true,
}: {
  lines: keyof typeof clamp;
  children: ReactNode;
  className?: string;
  focusable?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [truncated, setTruncated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => {
      if (el.matches(":hover, :focus, :focus-within") || el.closest(":hover")) return; // expanded right now
      setTruncated(el.scrollHeight > el.clientHeight + 1);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      tabIndex={focusable && truncated ? 0 : undefined}
      className={`${clamp[lines]} hover:line-clamp-none focus:line-clamp-none focus-visible:outline-offset-4 ${
        truncated ? "cursor-default" : ""
      } ${className}`}
    >
      {children}
    </span>
  );
}
