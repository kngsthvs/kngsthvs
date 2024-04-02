import "client-only";

/**
 * @see https://paco.me/writing/disable-theme-transitions
 * @see https://github.com/pacocoursey/next-themes/blob/main/next-themes/src/index.tsx#L218
 */

export function disableAnimation(callback?: void | (() => void | undefined)) {
  const css = document.createElement("style");
  css.type = "text/css";
  css.appendChild(
    document.createTextNode(
      `* {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        -ms-transition: none !important;
        transition: none !important;
      }`,
    ),
  );
  document.head.appendChild(css);

  // Run callback
  callback?.();

  // Calling getComputedStyle forces the browser to redraw
  (() => window.getComputedStyle(css).opacity)();

  // Wait for next tick before removing
  setTimeout(() => {
    document.head.removeChild(css);
  }, 1);
}
