import type {ComponentProps} from "react";
import clsx from "clsx";

import styles from "./labeledInput.module.css"

interface LabeledInputProps extends ComponentProps<"input">{
  label: string
  id: string
}

export function LabeledInput({id, label, className, ...inputProps}: LabeledInputProps) {
  return (
    <label htmlFor={id}>
      <span>{label}</span>
      <input
        {...inputProps}
        id={id}
        className={clsx(styles.input, className)}
      />
    </label>
  );
}
