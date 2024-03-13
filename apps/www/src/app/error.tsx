"use client";

import { useEffect } from "react";
import { Error as ErrorRoot } from "./_components/error";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section>
      <ErrorRoot title="Error">
        <span>Something went wrong while you were working.</span>

        <button
          onClick={() => {
            window.location.reload();
          }}
          type="button"
        >
          Reload page
        </button>
      </ErrorRoot>
    </section>
  );
}
