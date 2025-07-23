"use client";

import { visuallyHidden } from "@base-ui-components/react/utils";
import { Link } from "@repo/ui/primitives/link";
import { usePathname } from "next/navigation";
import styles from "./app.module.css";

function Icon({ path }: { path?: string }) {
  switch (path) {
    case "crowsnest":
      return (
        <svg
          aria-label="Crow’s Nest icon"
          fill="none"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#app_clip)">
            <path
              d="M0 7.5H4.5M24 7.5H19.5M12 0V15M12 24V15M12 15L19.5 7.5M12 15L4.5 7.5M19.5 7.5H4.5"
              stroke="black"
            />
          </g>
          <defs>
            <clipPath id="app_clip">
              <rect fill="white" height="24" width="24" />
            </clipPath>
          </defs>
        </svg>
      );
    case "hold":
      return (
        <svg
          aria-label="Hold icon"
          fill="none"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 23.5V19.5M15.5 23.5V19.5M15.5 0.5V4.5M8.5 0.5V4.5M15.5 9.5V14.5M15.5 9.5H8.5M15.5 9.5V4.5M8.5 9.5V14.5M8.5 9.5V4.5M8.5 14.5H15.5M8.5 14.5V19.5M15.5 14.5V19.5M8.5 4.5H15.5M15.5 19.5H8.5"
            stroke="black"
          />
        </svg>
      );
    case "tackle":
      return (
        <svg
          aria-label="Tackle icon"
          fill="none"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#app_clip)">
            <path
              d="M15.2929 4L12 7.29289L8.70711 4L12 0.707107L15.2929 4ZM8.70711 20L12 16.7071L15.2929 20L12 23.2929L8.70711 20ZM16.7071 12L20 8.70711L23.2929 12L20 15.2929L16.7071 12ZM0.707107 12L4 8.70711L7.29289 12L4 15.2929L0.707107 12Z"
              stroke="black"
            />
            <path
              d="M12.3536 7.64645L12 7.29289L11.6464 7.64645L7.64645 11.6464L7.29289 12L7.64645 12.3536L11.6464 16.3536L12 16.7071L12.3536 16.3536L16.3536 12.3536L16.7071 12L16.3536 11.6464L12.3536 7.64645Z"
              stroke="black"
            />
          </g>
          <defs>
            <clipPath id="app_clip">
              <rect fill="white" height="24" width="24" />
            </clipPath>
          </defs>
        </svg>
      );
    default:
      return null;
  }
}

export function App({
  keys,
  path,
  name,
}: {
  keys?: string;
  path?: string;
  name?: string;
}) {
  const pathname = usePathname();

  return (
    <li
      className={styles.root}
      data-active={
        pathname.slice(1)?.split("/").at(-1) === path?.split("/").at(-1)
      }
    >
      {name ? (
        <Link href={path} keys={`Shift+${keys}`} side="left" sideOffset={24}>
          <Icon path={path?.split("/").at(-1)} />

          <div style={visuallyHidden}>{name}</div>
        </Link>
      ) : (
        <div />
      )}
    </li>
  );
}
