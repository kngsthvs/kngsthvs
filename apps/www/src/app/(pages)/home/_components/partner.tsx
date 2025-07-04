import { Link } from "@kngsthvs/ui/primitives/shared/link";
import { BaseHubImage } from "basehub/next-image";
import appStyles from "../../_components/app.module.css";
import styles from "./partner.module.css";

export function Partner({
	href,
	logo,
	...props
}: {
	href?: string | null;
	logo?: { alt?: string | null; rawUrl: string } | null;
}) {
	return (
		<li className={`${styles.root} ${appStyles.partner}`} {...props}>
			{href && logo?.rawUrl ? (
				<Link {...{ href }}>
					<BaseHubImage
						alt={logo.alt ?? "logo"}
						height={40}
						quality={100}
						src={logo.rawUrl}
						width={200}
					/>
				</Link>
			) : null}
		</li>
	);
}
