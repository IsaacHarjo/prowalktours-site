// Visible "Checked …" line for dated visitor information. Every block of
// dates, hours, prices or transport in a guide shows when it was last checked
// against its official source, in the site's day-month date style.

export function formatGuideDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export default function CheckedNote({ on, label = "Checked", note, className = "" }: { on: string; label?: string; note?: string; className?: string }) {
  return <p className={`text-xs leading-6 text-[#657069] ${className}`}>
    {label} <time dateTime={on}>{formatGuideDate(on)}</time>.{note ? ` ${note}` : ""}
  </p>;
}
