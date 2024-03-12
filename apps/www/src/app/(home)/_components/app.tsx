import Link from "next/link";
import styles from "./app.module.css";

function Icon({ path }: { path?: string }) {
  switch (path) {
    case "crowsnest":
      return (
        <svg
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 7.5H4.5M24 7.5H19.5M12 7.5V0M12 7.5V15M12 7.5H19.5M12 7.5H4.5M12 24V15M12 15L19.5 7.5M12 15L4.5 7.5"
            stroke="black"
          />
        </svg>
      );
    case "quarters":
      return (
        <svg
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1182_42)">
            <path
              d="M8.70711 4L12 0.707107L15.2929 4L12 7.29289L8.70711 4Z"
              stroke="black"
            />
            <path
              d="M16.7071 12L20 8.70711L23.2929 12L20 15.2929L16.7071 12Z"
              stroke="black"
            />
            <path
              d="M8.70711 20L12 16.7071L15.2929 20L12 23.2929L8.70711 20Z"
              stroke="black"
            />
            <path
              d="M0.707107 12L4 8.70711L7.29289 12L4 15.2929L0.707107 12Z"
              stroke="black"
            />
            <path
              d="M12.3536 7.64645L12 7.29289L11.6464 7.64645L7.64645 11.6464L7.29289 12L7.64645 12.3536L11.6464 16.3536L12 16.7071L12.3536 16.3536L16.3536 12.3536L16.7071 12L16.3536 11.6464L12.3536 7.64645Z"
              stroke="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_1182_42">
              <rect fill="white" height="24" width="24" />
            </clipPath>
          </defs>
        </svg>
      );
    default:
      return null;
  }
}

export function App({ path, name }: { path?: string; name?: string }) {
  return (
    <li className={styles.root}>
      {name ? (
        <Link href={`/${path}`}>
          <Icon {...{ path }} />
        </Link>
      ) : (
        <div />
      )}
    </li>
  );
}
