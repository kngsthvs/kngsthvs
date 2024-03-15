import { Context } from "./_components/context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Context>{children}</Context>;
}
