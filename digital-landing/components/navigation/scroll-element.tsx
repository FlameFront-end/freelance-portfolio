import type { ReactNode } from "react";

type ScrollElementProps = {
  name: "features" | "showcase";
  children: ReactNode;
};

export function ScrollElement({ name, children }: ScrollElementProps) {
  return <div id={name}>{children}</div>;
}
