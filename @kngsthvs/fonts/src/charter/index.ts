import localFont from "next/font/local";

export const Charter = localFont({
  src: [
    {
      path: "./regular.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "./italic.woff2",
      style: "italic",
      weight: "600",
    },
    {
      path: "/bold.woff2",
      style: "normal",
      weight: "bold",
    },
    {
      path: "./bold-italic.woff2",
      style: "italic",
      weight: "bold",
    },
  ],
  variable: "--font-charter",
});
