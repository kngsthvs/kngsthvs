import Home from "./(pages)/home/page";
import Layout from "./(pages)/layout";
import { FeatureFlags } from "./_components/feature-flags";

export default function Page() {
  return (
    <Layout>
      <Home />

      {/* Vercel */}
      <FeatureFlags />
    </Layout>
  );
}
