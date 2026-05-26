import {type ComponentProps} from "react";
import clsx from "clsx";

import styles from "./button.module.css";

type ButtonView = "normal" | "action"

type ButtonProps = ComponentProps<"button"> & {
  view?: ButtonView
}

export function Button({className, view="normal", ...btnProps}: ButtonProps) {
  const viewClassName = styles[`button_${view}`]

  return (
    <button
      className={clsx(styles.button, viewClassName, className)}
      {...btnProps}
    />
  );
}
