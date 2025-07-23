import { useState } from "react";

export function Copy({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) {
  const [icon, setIcon] = useState("\u2627");

  return (
    <button
      onClick={() => {
        if (text) {
          navigator.clipboard.writeText(text);
        }

        setIcon("\u2713");

        setTimeout(() => {
          setIcon("\u2627");
        }, 4000);
      }}
      type="button"
    >
      <span>{icon}</span>

      <span>{children}</span>
    </button>
  );
}
