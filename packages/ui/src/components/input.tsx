"use client";

/**
 * @see https://developer.1password.com/docs/web/compatible-website-design/
 */

import { Field } from "@base-ui-components/react/field";
import { Input as ReactInput } from "@base-ui-components/react/input";
import styles from "./input.module.css";

export function RootLabel({
	children,
}: React.ComponentProps<typeof Field.Label> & {
	label?: string;
}) {
	return <Field.Label className={styles.label}>{children}</Field.Label>;
}

function Root({
	disabled,
	error,
	label,
	name,
	placeholder,
	required,
	...props
}: React.ComponentProps<typeof ReactInput> & {
	error?: string;
	label?: string;
	name: string;
}) {
	return (
		<Field.Root
			className={styles.root}
			data-disabled={disabled}
			{...{ name, placeholder }}
		>
			<RootLabel {...{ label }}>{label}</RootLabel>

			<ReactInput
				autoComplete={
					name === "email"
						? "email"
						: name === "city"
							? "address-level2"
							: name === "country"
								? "country"
								: name === "firstName"
									? "given-name"
									: name === "lastName"
										? "family-name"
										: name === "phone"
											? "tel-national"
											: name === "state"
												? "address-level1"
												: name === "street"
													? "street-address"
													: name === "zip"
														? "postal-code"
														: "off"
				}
				className={styles.input}
				type={name === "email" ? name : name === "phone" ? "tel" : "text"}
				{...{ disabled, placeholder, required, ...props }}
			/>

			{error ? <Field.Error>{error}</Field.Error> : null}
		</Field.Root>
	);
}

function Group({
	children,
	...props
}: React.PropsWithChildren<React.HTMLProps<HTMLDivElement>>) {
	return (
		<div className={styles.group} {...props}>
			{children}
		</div>
	);
}

export const Input = Object.assign(Root, { Group });
