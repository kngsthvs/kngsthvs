"use client";

import { useTheme } from "@kngsthvs/ui/functions/client/context/theme";
import { disableAnimation } from "@kngsthvs/ui/functions/client/disable-animation";
import styles from "./color.module.css";

export function Color() {
	const [
		{
			cookies: { colorScheme },
			localStorage: { colorScheme: local },
			prefers: { colorScheme: prefersColorScheme },
		},
		{
			cookies: { colorScheme: updateColorScheme },
		},
	] = useTheme();

	if (!colorScheme && prefersColorScheme) {
		updateColorScheme(prefersColorScheme);
	}

	return (
		<div className={styles.root}>
			{/* <button
        data-active={
          colorScheme === "normal" || prefersColorScheme === "normal"
        }
        data-local={local ? "true" : "false"}
        onClick={() => {
          disableAnimation(updateColorScheme("light"));
        }}
        type="button"
      >
        system
      </button> */}

			<button
				data-active={
					colorScheme === "light" ||
					(colorScheme === "normal" && prefersColorScheme === "light")
				}
				data-local={local ? "true" : "false"}
				onClick={() => {
					disableAnimation(updateColorScheme("light"));
				}}
				type="button"
			>
				light
			</button>

			<button
				data-active={
					colorScheme === "dark" ||
					(colorScheme === "normal" && prefersColorScheme === "dark")
				}
				onClick={() => {
					disableAnimation(updateColorScheme("dark"));
				}}
				type="button"
			>
				dark
			</button>
		</div>
	);
}
