export function Video({
  poster,
  playbackId,
  src,
  ...props
}: {
  poster?: string;
  playbackId?: string;
  src?: string;
} & React.HTMLAttributes<HTMLVideoElement>) {
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
      {...props}
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
