"use client";

import sitemap from "@/content/sitemap.json";
import { useTheme } from "@kngsthvs/ui/functions/client/context/theme";
import { type ColorScheme } from "@kngsthvs/ui/functions/types/theme";
import { Link as LinkPrimitive } from "@kngsthvs/ui/primitives/shared/link";
import {
  Background,
  Handle,
  Panel,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  useStore,
  type BackgroundVariant,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import { useEffect, useMemo } from "react";
import { useWindowSize } from "react-use";
import { useKey } from "ui/hooks/use-key";
import styles from "./flow.module.css";
import "./styles.css";

const nodes = sitemap.map((node, index) => ({
  data: {
    disabled: node.disabled,
    href: node.href,
    label: node.name,
    keys: node.keys,
  },
  id: node.id,
  position: node.position ?? { x: 0, y: index * 50 + 500 },
  type: node.href ? "link" : "label",
}));
const edges = sitemap
  .filter((node) => node.parent)
  .map((node) => ({
    id: `${node.parent}-${node.id}`,
    selectable: false,
    source: node.parent,
    target: node.id,
    type: "step",
  }))
  .filter(Boolean) as Edge[];

function Label({ data }: { data: { label: string; keys: string } }) {
  return (
    <>
      <Handle position={Position.Top} type="target" />

      <div className={`nodrag ${styles.label}`}>
        {data.keys ? <kbd>[{data.keys.at(-1)}]</kbd> : null}

        {data.label}
      </div>

      <Handle position={Position.Left} type="source" />
    </>
  );
}

function Link({
  data,
}: {
  data: { disabled?: boolean; href: string; label: string; keys: string };
}) {
  const { every, states } = data.disabled
    ? { every: false, states: [false] }
    : useKey({
        href: "href" in data ? String(data.href) : undefined,
        keys: data.keys ?? "",
      });

  return (
    <>
      <Handle position={Position.Left} type="target" />
      <Handle position={Position.Right} type="target" />

      {data.disabled ? (
        <div aria-disabled="true" className={`nodrag ${styles.link}`}>
          {data.keys ? <kbd>[{data.keys.at(-1)}]</kbd> : null}
          <span>{data.label}</span>
        </div>
      ) : (
        <LinkPrimitive
          className={`nodrag ${styles.link}`}
          data-first={states[0]}
          data-pressed={every}
          href={data.href}
        >
          {data.keys ? <kbd>[{data.keys.at(-1)}]</kbd> : null}
          <span>{data.label}</span>
        </LinkPrimitive>
      )}

      <Handle position={Position.Bottom} type="source" />
    </>
  );
}

export default function NodeInspector() {
  const viewport = useStore(
    (s) =>
      `x: ${Number(s.transform[0] * -1).toFixed(0)} / y: ${s.transform[1].toFixed(0)}`,
  );

  return (
    <Panel className={styles.node} position="top-right">
      {viewport}
    </Panel>
  );
}

export function Flow(props: { colorScheme?: ColorScheme }) {
  const [
    {
      cookies: { colorScheme },
    },
  ] = useTheme();
  const nodeTypes = useMemo(() => ({ label: Label, link: Link }), []);
  const { fitBounds } = useReactFlow();
  const rect = useWindowSize();

  useEffect(() => {
    fitBounds({ ...rect, x: 0, y: 0 });
  }, []);

  return (
    <div className={styles.root}>
      <ReactFlowProvider>
        <ReactFlow
          colorMode={
            (colorScheme ?? props.colorScheme) === "dark" ? "dark" : "light"
          }
          maxZoom={1}
          minZoom={1}
          panOnScroll
          proOptions={{ hideAttribution: true }}
          snapGrid={[16, 16]}
          snapToGrid
          translateExtent={[
            [-777, -777],
            [rect.width + 777, rect.height + 777],
          ]}
          zoomOnDoubleClick={false}
          zoomOnPinch={false}
          zoomOnScroll={false}
          {...{ edges, nodes, nodeTypes }}
        >
          <Background gap={32} size={2} variant={"dots" as BackgroundVariant} />
          <NodeInspector />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
