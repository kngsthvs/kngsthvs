"use client";

import { useEffect } from "react";
import { env } from "@/env";
import { Fallback } from "./_components/fallback";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section>
      <Fallback title="Error">
        <span>
          Something went wrong while you were{" "}
          {env.NODE_ENV === "development" ? "working" : "browsing"}.
        </span>

        <button
          onClick={() => {
            window.location.reload();
          }}
          type="button"
        >
          Reload page
        </button>
      </Fallback>
    </section>
  );
}
