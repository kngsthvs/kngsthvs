import Link from "next/link";

export default async function Page() {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        height: "100vh",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <h1>Coming soon.</h1>
      <Link href="/">{"<-"} Return home</Link>
    </div>
  );
}
