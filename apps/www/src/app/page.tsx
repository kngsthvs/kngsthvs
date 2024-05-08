import { FeatureFlags } from "@kngsthvs/ui/functions/server/feature-flags";
import Home from "./(pages)/home/page";
import Layout from "./(pages)/layout";

export default function Page() {
  return (
    <Layout>
      <Home />

      {/* Vercel */}
      <FeatureFlags id="www" />
    </Layout>
  );
}
