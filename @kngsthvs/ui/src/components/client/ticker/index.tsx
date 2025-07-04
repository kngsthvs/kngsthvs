// @ts-nocheck

"use client";

/**
 * @tutorial https://14islands.com/blog/interactive-marquee-with-framer-motion/
 */

import {
	type MotionProps,
	type SpringOptions,
	useMotionValue,
	useSpring,
} from "motion/react";
import * as m from "motion/react-m";
import normalizeWheel from "normalize-wheel";
import { Children, cloneElement, useEffect, useRef, useState } from "react";
import { useRafLoop } from "react-use";
import { useMeasureDirty } from "../../../functions/client/hooks/use-measure-dirty";
import { mapDataAttributes } from "../../../functions/shared/attributes";

export type Direction = "down" | "left" | "right" | "up";

export function Ticker({
	children,
	config = {
		damping: 45,
		mass: 5,
		stiffness: 90,
	},
	direction = "left",
	drag,
	dragFactor = 1.2,
	gap = 0,
	mask = 0,
	source = 1,
	threshold = 0.014,
	wheel,
	wheelFactor = 1.8,
	...props
}: React.PropsWithChildren<
	(Omit<React.HTMLProps<HTMLDivElement>, "ref"> & MotionProps) & {
		config?: SpringOptions;
		direction?: Direction;
		drag?: boolean;
		dragFactor?: number;
		gap?: number;
		mask?: number;
		source?: number;
		threshold?: number;
		wheel?: "element" | "window";
		wheelFactor?: number;
	}
>) {
	const data = mapDataAttributes({ drag, wheel });
	const dragging = useRef(false);
	const translate = useMotionValue(0);
	const itemRect = useRef({ height: 0, width: 0 });
	const itemRef = useRef<HTMLLIElement[]>([]);
	const offset = useRef(0);
	const ref = useRef<HTMLDivElement>(null);
	const rect = useMeasureDirty(ref);
	const scrolling = useRef(false);
	const wheeling = useRef<NodeJS.Timeout>();
	const spring = useSpring(source, config);
	const [count] = useState(Children.count(children));

	const axis = direction === "left" || direction === "right" ? "x" : "y";
	const aspect = axis === "y" ? "height" : "width";
	// The number of items needed to fill the screen
	// TODO: Set multiplier based on rect and itemRect not count
	const items =
		rect && itemRect.current[aspect]
			? Math.ceil(rect[aspect] / itemRect.current[aspect]) *
				(count === 1 ? 7 : 3)
			: 1;
	// Total distance the ticker needs to travel
	const distance = (itemRect.current[aspect] + gap * count) * 3;

	const dragProps = drag
		? {
				onDrag: (event, info) => {
					spring.set(
						dragFactor *
							(direction === "down" || direction === "right"
								? info.delta[axis]
								: -info.delta[axis]),
					);
				},
				onDragEnd: () => {
					dragging.current = false;
					ref.current && ref.current.setAttribute("data-dragging", "false");
					offset.current = source;
				},
				onDragStart: () => {
					dragging.current = true;
					ref.current && ref.current.setAttribute("data-dragging", "true");
					spring.set(0);
				},
			}
		: {};

	const wheelProps =
		wheel === "element"
			? {
					onWheel: (event) => {
						const normalized = normalizeWheel(event);

						offset.current = normalized.pixelY * wheelFactor;

						window.clearTimeout(wheeling.current);
						wheeling.current = setTimeout(() => spring.set(source), 30);
					},
				}
			: {};

	useEffect(() => {
		const current = ref.current;

		if (!current || !wheel) return;

		current.addEventListener("wheel", () => (scrolling.current = true));

		return () =>
			current?.removeEventListener("wheel", () => (scrolling.current = false));
	}, [wheel]);

	useEffect(() => {
		itemRef.current?.map((item) => {
			itemRect.current.height += item.clientHeight;
			itemRect.current.width += item.clientWidth;
		});
	}, []);

	// Drag
	useRafLoop(() => {
		if (dragging.current || Math.abs(offset.current) < threshold) return;

		offset.current *= 0.66;

		if (offset.current < 0) {
			offset.current = Math.min(offset.current, 0);
		} else {
			offset.current = Math.max(offset.current, 0);
		}

		spring.set(source + offset.current);
	}, true);

	// Offset
	useRafLoop(() => {
		translate.set(
			direction === "down" || direction === "right"
				? translate.get() + spring.get()
				: translate.get() - spring.get(),
		);

		if (translate.get() <= -distance) translate.set(0);
		if (translate.get() > 0) translate.set(-distance);
	}, true);

	// Scroll
	// useRafLoop(() => {
	//   if (dragging.current || Math.abs(offset.current) < threshold) return;

	//   offset.current *= 0.66;

	//   if (offset.current < 0) {
	//     offset.current = Math.min(offset.current, 0);
	//   } else {
	//     offset.current = Math.max(offset.current, 0);
	//   }

	//   spring.set(source + offset.current);
	// }, true);

	const position =
		axis === "y"
			? {
					bottom: direction === "down" ? 0 : "auto",
					left: 0,
					right: 0,
					top: direction === "up" ? 0 : "auto",
				}
			: {
					bottom: 0,
					left: direction === "left" ? 0 : "auto",
					right: direction === "right" ? 0 : "auto",
					top: 0,
				};
	const size =
		axis === "y"
			? {
					height: rect.width,
					width: rect.height,
				}
			: {
					height: rect.height,
					width: rect.width,
				};

	return (
		<m.section
			data-dragging={drag ? (dragging.current ? true : false) : undefined}
			data-scrolling={wheel ? (scrolling.current ? true : false) : undefined}
			drag={drag ? axis : undefined}
			dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
			dragElastic={0.0000001}
			style={{
				display: "flex",
				height: "100%",
				justifyContent: "center",
				margin: 0,
				maxHeight: "100vh",
				maxWidth: "100vw",
				overflow: "visible",
				padding: 0,
				placeItems: "center",
				position: "relative",
				WebkitMaskImage: `linear-gradient(to ${
					axis === "x" ? "right" : "top"
				}, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) ${mask}%, rgb(0, 0, 0) ${
					100 - mask
				}%, rgba(0, 0, 0, 0) 100%)`,
				width: "100%",
			}}
			{...{ ref, ...dragProps, ...wheelProps, ...data, ...props }}
		>
			<m.ul
				style={{
					[axis]: translate,
					display: "flex",
					flexDirection: axis === "y" ? "column" : "row",
					gap,
					listStyleType: "none",
					margin: "0 auto",
					maxHeight: "100vh",
					maxWidth: "100vw",
					padding: 0,
					placeItems: "center",
					position: "absolute",
					textIndent: "none",
					transform: "translateX(0px)",
					willChange: "transform",
					...position,
					...size,
				}}
			>
				{[...Array(items)].map((item, index) =>
					Children.map(children, (child, index) => (
						<li
							aria-hidden={index > 0 ? true : undefined}
							key={`slide-${index}`}
							ref={(element) => element && itemRef.current.push(element)}
							style={{
								minWidth: "auto",
							}}
							{...props}
							// style={index > 0 ? { display: "contents" } : undefined}
						>
							{cloneElement(child as React.ReactElement)}
						</li>
					)),
				)}
			</m.ul>
		</m.section>
	);
}
