import { Ticker as TickerRoot } from "@kngsthvs/ui/components/client";

export function Ticker({
  children,
  drag,
  wheel,
  ...props
}: React.PropsWithChildren<
  { drag?: boolean; wheel?: boolean } & typeof TickerRoot
> &
  typeof TickerRoot) {
  return <TickerRoot {...props}>{children}</TickerRoot>;
}
