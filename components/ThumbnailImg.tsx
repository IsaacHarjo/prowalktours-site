"use client";

type ThumbnailImgProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
};

export default function ThumbnailImg({ src, alt, className, loading = "lazy" }: ThumbnailImgProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
}
