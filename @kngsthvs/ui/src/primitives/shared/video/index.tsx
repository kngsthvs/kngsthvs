/**
 * @see https://vercel.com/blog/guide-to-fast-websites-with-next-js-tips-for-maximizing-server-speeds#how-to-load-videos-more-efficiently
 */

import { getImageProps } from "next/image";
// import { preload } from "react-dom";

export function Video({
  loading,
  playbackId,
  src,
  ...props
}: {
  loading: "lazy" | "eager";
  playbackId: string;
  src?: string;
} & React.HTMLAttributes<HTMLVideoElement>) {
  const {
    props: { src: poster },
  } = getImageProps({
    alt: "",
    fill: true,
    src: `https://image.mux.com/${playbackId}/thumbnail.webp?fit_mode=smartcrop&time=0`,
  });

  // Preload the poster when applicable
  // if (loading === "eager") {
  //   preload(poster, {
  //     as: "image",
  //     fetchPriority: "high",
  //   });
  // }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      {...{ poster, ...props }}
    >
      <source
        src={src ?? `https://stream.mux.com/${playbackId}/high.mp4`}
        type="video/mp4"
      />
      <source
        src={src ?? `https://stream.mux.com/${playbackId}/high.webm`}
        type="video/webm"
      />
    </video>
  );
}
