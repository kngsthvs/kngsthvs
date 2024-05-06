/**
 * @see https://vercel.com/blog/guide-to-fast-websites-with-next-js-tips-for-maximizing-server-speeds#how-to-load-videos-more-efficiently
 */

import { getImageProps } from "next/image";
import { forwardRef } from "react";
// import { preload } from "react-dom";

export const Video = forwardRef<
  HTMLVideoElement,
  {
    loading: "lazy" | "eager";
    playbackId: string;
    src?: string;
  } & React.HTMLAttributes<HTMLVideoElement>
>(({ loading, playbackId, src, ...props }, ref) => {
  const {
    props: { src: poster },
  } = getImageProps({
    src: `https://image.mux.com/${playbackId}/thumbnail.webp?fit_mode=smartcrop&time=0`,
    alt: "",
    fill: true,
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
      {...{ poster, ref, ...props }}
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
});

Video.displayName = "Video";
