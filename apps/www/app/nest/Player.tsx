"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import styles from "./styles.module.css";

export default function Player({ playbackId }: { playbackId: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <MuxPlayer
      autoPlay
      className={styles.video}
      loop
      onCanPlay={() => setLoaded(true)}
      maxResolution="2160p"
      muted
      nohotkeys
      streamType="on-demand"
      style={{
        opacity: loaded ? 100 : 0,
      }}
      {...{ playbackId }}
    />
  );
}
