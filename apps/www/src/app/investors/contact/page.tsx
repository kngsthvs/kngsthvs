"use client";

import { toast } from "@kngsthvs/ui/packages/sonner";
import { useState } from "react";
import { Button } from "ui/components/button";
import { Toast } from "ui/components/toast";
import slideStyles from "../[slide]/page.module.css";
import styles from "./page.module.css";

export default function Page() {
  const [icon, setIcon] = useState("\u2627");
  const copy = "investors@kngsthvs.com";

  return (
    <div className={`${slideStyles.root} ${styles.root}`}>
      <h1>Contact us</h1>

      <p>
        <Button
          className={styles.copy}
          onClick={() => {
            if (copy) {
              navigator.clipboard.writeText(copy);
            }

            toast.custom(() => <Toast>Email copied to clipboard</Toast>);

            setIcon("\u2713");

            setTimeout(() => {
              setIcon("\u2627");
            }, 4000); // should match toast duration
          }}
        >
          <span>{icon}</span>

          <span>investors@kngsthvs.com</span>
        </Button>
      </p>
    </div>
  );
}
