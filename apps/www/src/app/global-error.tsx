"use client";

import { useEffect } from "react";
import { Error } from "./_components/error";

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <Error title="Global Error">
          <span>Something went wrong while you were working.</span>

          <button
            onClick={() => {
              window.location.reload();
            }}
            type="button"
          >
            Reload page
          </button>
        </Error>
      </body>
    </html>
  );
}
