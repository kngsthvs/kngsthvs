import { forwardRef } from "react";
import { LinkType, type LinkProps } from "../../types";
import { Link } from "../link";

export const Button = forwardRef<LinkType, LinkProps>(
  ({ type = "button", ...props }, ref) => {
    return <Link {...{ ref, type, ...props }} />;
  },
);

Button.displayName = "Button";
