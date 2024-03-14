export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <meta content="#000000" name="theme-color" />

      {children}
    </>
  );
}
