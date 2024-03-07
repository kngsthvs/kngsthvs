export function Video({ playbackId, ...props }: { playbackId: string }) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      poster={`https://image.mux.com/${playbackId}/thumbnail.webp?time=0`}
      preload="none"
      {...props}
    >
      <source
        src={`https://stream.mux.com/${playbackId}/high.mp4`}
        type="video/mp4"
      />
      <source
        src={`https://stream.mux.com/${playbackId}/high.webm`}
        type="video/webm"
      />
    </video>
  );
}
