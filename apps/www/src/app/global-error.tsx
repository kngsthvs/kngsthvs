"use client";

import { useEffect } from "react";
import { Heading } from "./(home)/_components/heading";

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <Heading
          description={
            <span>
              Something went wrong while you were working.
              <br />
              <button
                onClick={() => {
                  window.location.reload();
                }}
                type="button"
              >
                ↺ Reload page
              </button>
            </span>
          }
        >
          Global Error
        </Heading>
      </body>
    </html>
  );
}
