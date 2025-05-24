// Theme

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
 */
export type ColorScheme = "normal" | "light" | "dark";
// | "light dark"
// | "only light"
// | "only dark";
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast#syntax
 */
export type Contrast = "no-preference" | "more" | "less" | "custom";
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion#syntax
 */
export type ReducedMotion = "no-preference" | "reduce";
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency#syntax
 */
export type ReducedTransparency = "no-preference" | "reduce";
export interface GetThemeReturn<T = undefined> {
	colorScheme?: ColorScheme;
	contrast?: Contrast;
	prefers?: {
		colorScheme?: ColorScheme;
		contrast?: Contrast;
		reducedMotion?: ReducedMotion;
		reducedTransparency?: ReducedTransparency;
	};
	reducedMotion?: ReducedMotion;
	reducedTransparency?: ReducedTransparency;
	theme: T;
}
