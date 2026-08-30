import Image from "next/image";

type ProjectFigureProps = {
  src: string;
  alt: string;
  width: string;
  height: string;
  caption: string;
};

export function ProjectFigure({
  src,
  alt,
  width,
  height,
  caption,
}: ProjectFigureProps) {
  return (
    <figure className="project-media">
      <Image
        className="project-media-image"
        src={src}
        alt={alt}
        width={Number(width)}
        height={Number(height)}
        sizes="(max-width: 768px) calc(100vw - 2rem), 46rem"
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

type ProjectVideoProps = {
  src: string;
  poster: string;
  caption: string;
  label: string;
};

export function ProjectVideo({
  src,
  poster,
  caption,
  label,
}: ProjectVideoProps) {
  return (
    <figure className="project-media">
      <video
        className="project-media-video"
        controls
        preload="metadata"
        poster={poster}
        aria-label={label}
      >
        <source src={src} type="video/webm" />
        Your browser does not support embedded video.
      </video>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
