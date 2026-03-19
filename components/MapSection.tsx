import type { ComponentPropsWithoutRef, ReactNode } from "react";

type MapSectionProps = {
  id?: string;
  eyebrow: ReactNode;
  heading: ReactNode;
  description: ReactNode;
  iframeSrc: string;
  iframeTitle: string;
  fullMapButtonLabel?: string;
  fullMapButtonHref?: string;
  children?: ReactNode;
  className?: string;
  eyebrowClassName?: string;
  headingClassName?: string;
  descriptionClassName?: string;
  mapCardClassName?: string;
  mapBackgroundClassName?: string;
  buttonClassName?: string;
  iframeLoading?: ComponentPropsWithoutRef<"iframe">["loading"];
  iframeReferrerPolicy?: ComponentPropsWithoutRef<"iframe">["referrerPolicy"];
  fullMapButtonTarget?: ComponentPropsWithoutRef<"a">["target"];
  fullMapButtonRel?: string;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function MapSection({
  id,
  eyebrow,
  heading,
  description,
  iframeSrc,
  iframeTitle,
  fullMapButtonLabel,
  fullMapButtonHref,
  children,
  className,
  eyebrowClassName,
  headingClassName,
  descriptionClassName,
  mapCardClassName,
  mapBackgroundClassName,
  buttonClassName,
  iframeLoading,
  iframeReferrerPolicy,
  fullMapButtonTarget = "_blank",
  fullMapButtonRel = "noreferrer",
}: MapSectionProps) {
  return (
    <div id={id} className={className}>
      <p
        className={joinClasses(
          "text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]",
          eyebrowClassName
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={joinClasses(
          "mt-3 text-3xl font-bold text-[#2f261d]",
          headingClassName
        )}
      >
        {heading}
      </h2>
      <p
        className={joinClasses(
          "mt-3 max-w-3xl text-[17px] leading-8 text-[#6c5b49]",
          descriptionClassName
        )}
      >
        {description}
      </p>

      <div
        className={joinClasses(
          "mt-6 overflow-hidden rounded-[1.5rem] border border-[#d8c7b5] bg-white shadow-sm sm:rounded-[2rem]",
          mapCardClassName
        )}
      >
        <div
          className={joinClasses(
            "h-[420px] w-full bg-[#f8f3ec] sm:h-[480px] lg:h-auto lg:aspect-[16/9]",
            mapBackgroundClassName
          )}
        >
          <iframe
            className="h-full w-full"
            src={iframeSrc}
            title={iframeTitle}
            loading={iframeLoading}
            referrerPolicy={iframeReferrerPolicy}
          />
        </div>
      </div>

      {fullMapButtonLabel && fullMapButtonHref ? (
        <a
          href={fullMapButtonHref}
          target={fullMapButtonTarget}
          rel={fullMapButtonRel}
          className={joinClasses(
            "mt-6 inline-flex items-center justify-center rounded-full border border-[#167fd5] bg-white px-6 py-3 text-base font-semibold text-[#167fd5] transition hover:bg-[#edf6fd]",
            buttonClassName
          )}
        >
          {fullMapButtonLabel}
        </a>
      ) : null}

      {children}
    </div>
  );
}