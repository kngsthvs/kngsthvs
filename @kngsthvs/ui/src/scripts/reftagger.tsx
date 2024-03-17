import Script from "next/script";
import { type PrefersColorScheme } from "../functions/types";

export function Reftagger({
  settings,
  strategy = "afterInteractive",
}: {
  settings?: {
    bibleVersion?: string;
    customStyle?: {
      body?: {
        color?: string;
        fontFamily?: string;
        fontSize?: string;
      };
      heading?: {
        backgroundColor?: string;
        color?: string;
        fontFamily?: string;
        fontSize?: string;
      };
    };
    roundedCorners?: boolean;
    tooltipStyle?: PrefersColorScheme;
  };
  strategy: "afterInteractive" | "lazyOnload" | "beforeInteractive" | "worker";
}) {
  return (
    <Script id="reftagger" {...{ strategy }}>
      {`var refTagger = ${JSON.stringify({ bibleVersion: "KJV", ...settings })};

        (function(d, t) {
          var n=d.querySelector("[nonce]");
          refTagger.settings.nonce = n && (n.nonce||n.getAttribute("nonce"));
          var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
          g.src = "https://api.reftagger.com/v2/RefTagger.js";
          g.nonce = refTagger.settings.nonce;
          s.parentNode.insertBefore(g, s);
        }(document, "script"))`}
    </Script>
  );
}
