import { visuallyHidden } from "@base-ui-components/react/utils";
import Image from "next/image";
import styles from "./cover.module.css";

export function Cover({ children }: { children?: React.ReactNode }) {
	return (
		<section className={styles.root}>
			<div>
				<Image
					alt="Chi Rho"
					height={512}
					loading="eager"
					priority
					src="/chi-rho.svg"
					width={512}
				/>

				<Image
					alt="Kings & Thieves logo"
					height={80}
					loading="eager"
					src="/word.svg"
					width={512}
				/>

				<div style={visuallyHidden}>Kings & Thieves</div>
			</div>

			{children}
		</section>
	);
}
