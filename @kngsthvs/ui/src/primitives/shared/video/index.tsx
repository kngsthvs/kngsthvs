import { forwardRef } from "react";

export const Video = forwardRef<
  HTMLVideoElement,
  {
    poster?: string;
    playbackId?: string;
    src?: string;
  } & React.HTMLAttributes<HTMLVideoElement>
>(({ poster, playbackId, src, ...props }, ref) => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      poster={
        poster ?? `https://image.mux.com/${playbackId}/thumbnail.webp?time=0`
      }
      preload="none"
      {...{ ref, ...props }}
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
