/**
 * @see https://github.com/pacocoursey/next-themes
 */

"use client";

import type Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { createContext, use, useEffect } from "react";
import { useCookie, useLocalStorage } from "react-use";
import type {
	ColorScheme,
	Contrast,
	GetThemeReturn,
	ReducedMotion,
	ReducedTransparency,
} from "../../types/theme";
import { disableAnimation } from "../disable-animation";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_features
 */
interface MediaFeatures {
	colorScheme: ColorScheme | null;
	contrast: Contrast | null;
	reducedMotion: ReducedMotion | null;
	reducedTransparency: ReducedTransparency | null;
}
interface State {
	cookies: MediaFeatures & {
		theme: string | null;
	};
	localStorage: MediaFeatures & {
		theme: string | null;
	};
	prefers: MediaFeatures;
}
type SetCookie<T> = (
	newValue: T,
	options?: typeof Cookies.attributes | undefined,
) => void;
interface UpdateState {
	cookies: {
		colorScheme: SetCookie<ColorScheme>;
		contrast: SetCookie<Contrast>;
		reducedMotion: SetCookie<ReducedMotion>;
		reducedTransparency: SetCookie<ReducedTransparency>;
		theme: SetCookie<string>;
	};
	localStorage: {
		colorScheme: React.Dispatch<React.SetStateAction<ColorScheme | undefined>>;
		contrast: React.Dispatch<React.SetStateAction<Contrast | undefined>>;
		reducedMotion: React.Dispatch<
			React.SetStateAction<ReducedMotion | undefined>
		>;
		reducedTransparency: React.Dispatch<
			React.SetStateAction<ReducedTransparency | undefined>
		>;
		theme: React.Dispatch<React.SetStateAction<string | undefined>>;
	};
}
interface DeleteState {
	cookies: {
		colorScheme: () => void;
		contrast: () => void;
		reducedMotion: () => void;
		reducedTransparency: () => void;
		theme: () => void;
	};
	localStorage: {
		colorScheme: () => void;
		contrast: () => void;
		reducedMotion: () => void;
		reducedTransparency: () => void;
		theme: () => void;
	};
}
export const Context = createContext<
	[State, UpdateState, DeleteState] | undefined
>(undefined);

export function useTheme() {
	const context = use(Context);

	if (context === undefined) {
		throw new Error("useTheme must be used within an Theme.Provider");
	}

	return context;
}

export function Provider<T>({
	children,
	...props
}: React.PropsWithChildren<GetThemeReturn<T>>) {
	const [colorScheme, updateColorScheme, deleteColorScheme] =
		useCookie("colorScheme");
	const [contrast, updateContrast, deleteContrast] = useCookie("contrast");
	const [
		prefersColorScheme,
		updatePrefersColorScheme,
		_deletePrefersColorScheme,
	] = useCookie("prefersColorScheme");
	const [prefersContrast, updatePrefersContrast, _deletePrefersContrast] =
		useCookie("prefersContrast");
	const [
		prefersReducedMotion,
		updatePrefersReducedMotion,
		_deletePrefersReducedMotion,
	] = useCookie("prefersReducedMotion");
	const [
		prefersReducedTransparency,
		updatePrefersReducedTransparency,
		_deletePrefersReducedTransparency,
	] = useCookie("prefersReducedTransparency");
	const [reducedMotion, updateReducedMotion, deleteReducedMotion] =
		useCookie("reducedMotion");
	const [
		reducedTransparency,
		updateReducedTransparency,
		deleteReducedTransparency,
	] = useCookie("reducedTransparency");
	const [theme, updateTheme, deleteTheme] = useCookie("theme");
	const [localColorScheme, setLocalColorScheme, removeLocalColorScheme] =
		useLocalStorage<ColorScheme | undefined>("colorScheme", undefined);
	const [localContrast, setLocalContrast, removeLocalContrast] =
		useLocalStorage<Contrast | undefined>("contrast", undefined);
	const [localReducedMotion, setLocalReducedMotion, removeLocalReducedMotion] =
		useLocalStorage<ReducedMotion | undefined>("reducedMotion", undefined);
	const [
		localReducedTransparency,
		setLocalReducedTransparency,
		removeLocalReducedTransparency,
	] = useLocalStorage<ReducedTransparency | undefined>("theme", undefined);
	const [localTheme, setLocalTheme, removeLocalTheme] = useLocalStorage<
		string | undefined
	>("theme", undefined);
	const pathname = usePathname();

	useEffect(() => {
		if (
			!prefersColorScheme ||
			(props.prefers?.colorScheme &&
				props.prefers?.colorScheme !== prefersColorScheme)
		) {
			updatePrefersColorScheme(
				window.matchMedia("(prefers-color-scheme: dark)").matches
					? "dark"
					: window.matchMedia("(prefers-color-scheme: light)").matches
						? "light"
						: "normal",
			);
		}

		if (
			!prefersContrast ||
			(props.prefers?.contrast && props.prefers?.contrast !== prefersContrast)
		) {
			updatePrefersContrast(
				window.matchMedia("(prefers-contrast: more)").matches
					? "more"
					: window.matchMedia("(prefers-contrast: less)").matches
						? "less"
						: window.matchMedia("(prefers-contrast: custom)").matches
							? "custom"
							: "no-preference",
			);
		}

		if (
			!prefersReducedMotion ||
			(props.prefers?.reducedMotion &&
				props.prefers?.reducedMotion !== prefersReducedMotion)
		) {
			updatePrefersReducedMotion(
				window.matchMedia("(prefers-reduced-motion)").matches ||
					window.matchMedia("(prefers-reduced-motion: reduce)").matches
					? "reduce"
					: "no-preference",
			);
		}

		if (
			!prefersReducedTransparency ||
			(props.prefers?.reducedTransparency &&
				props.prefers?.reducedTransparency !== prefersReducedTransparency)
		) {
			updatePrefersReducedTransparency(
				window.matchMedia("(prefers-reduced-transparency)").matches ||
					window.matchMedia("(prefers-reduced-transparency: reduce)").matches
					? "reduce"
					: "no-preference",
			);
		}
	}, []);

	useEffect(() => {
		disableAnimation(() => {
			removeLocalColorScheme();
			removeLocalContrast();
			removeLocalReducedMotion();
			removeLocalReducedTransparency();
			removeLocalTheme();
		});
	}, [pathname]);

	return (
		<Context.Provider
			value={[
				{
					cookies: {
						colorScheme: colorScheme ?? props.colorScheme,
						contrast: contrast ?? props.contrast,
						reducedMotion: reducedMotion ?? props.reducedMotion,
						reducedTransparency:
							reducedTransparency ?? props.reducedTransparency,
						theme: theme ?? props.theme,
					},
					localStorage: {
						colorScheme: localColorScheme,
						contrast: localContrast,
						reducedMotion: localReducedMotion,
						reducedTransparency: localReducedTransparency,
						theme: localTheme,
					},
					prefers: {
						colorScheme: prefersColorScheme ?? props.prefers?.colorScheme,
						contrast: prefersContrast ?? props.prefers?.contrast,
						reducedMotion: prefersReducedMotion ?? props.prefers?.reducedMotion,
						reducedTransparency:
							prefersReducedTransparency ?? props.prefers?.reducedTransparency,
					},
				} as State,
				{
					cookies: {
						colorScheme: updateColorScheme,
						contrast: updateContrast,
						reducedMotion: updateReducedMotion,
						reducedTransparency: updateReducedTransparency,
						theme: updateTheme,
					},
					localStorage: {
						colorScheme: setLocalColorScheme,
						contrast: setLocalContrast,
						reducedMotion: setLocalReducedMotion,
						reducedTransparency: setLocalReducedTransparency,
						theme: setLocalTheme,
					},
				},
				{
					cookies: {
						colorScheme: deleteColorScheme,
						contrast: deleteContrast,
						reducedMotion: deleteReducedMotion,
						reducedTransparency: deleteReducedTransparency,
						theme: deleteTheme,
					},
					localStorage: {
						colorScheme: removeLocalColorScheme,
						contrast: removeLocalContrast,
						reducedMotion: removeLocalReducedMotion,
						reducedTransparency: removeLocalReducedTransparency,
						theme: removeLocalTheme,
					},
				},
			]}
		>
			{children}
		</Context.Provider>
	);
}

export const Theme = {
	Context,
	Provider,
};
