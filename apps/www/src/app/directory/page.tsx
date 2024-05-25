import { getTheme } from "@kngsthvs/ui/functions/server/theme";
import { ReactFlowProvider } from "@xyflow/react";
import { Flow } from "./_components/flow";

export default async function Page() {
  const { colorScheme } = await getTheme();

  return (
    <section>
      <ReactFlowProvider>
        <Flow {...{ colorScheme }} />
      </ReactFlowProvider>
    </section>
  );
}
