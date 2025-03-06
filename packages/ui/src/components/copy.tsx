import { useState } from "react";
import { toast } from "sonner";
import { Toast } from "./toast";

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

        toast.custom(() => <Toast>Email copied to clipboard</Toast>);

        setIcon("\u2713");

        setTimeout(() => {
          setIcon("\u2627");
        }, 4000); // should match toast duration
      }}
    >
      <span>{icon}</span>

      <span>{children}</span>
    </button>
  );
}
