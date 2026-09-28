import type { Photo } from "../photos";

type Props = {
  photo: Photo;
  sizes: string;
  className?: string;
  priority?: boolean;
  position?: string;
};

/** Responsive photo with reserved space (no layout shift) and a dominant-colour placeholder while loading. */
export function Picture({ photo, sizes, className = "", priority = false, position = "center" }: Props) {
  return (
    <img
      src={photo.src}
      srcSet={photo.srcset}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={photo.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`block h-full w-full object-cover ${className}`}
      style={{ backgroundColor: photo.color, objectPosition: position }}
    />
  );
}
