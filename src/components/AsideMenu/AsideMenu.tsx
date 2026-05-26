import {Book} from '@gravity-ui/icons';
import { AsideMenuButton } from "../AsideMenuButton"
import type {ComponentProps} from "react";

import styles from "./asideMenu.module.css";

type AsideMenuProps = ComponentProps<"div"> & {
  buttons: ComponentProps<typeof AsideMenuButton>[]
}

export function AsideMenu({buttons, ...props}: AsideMenuProps) {
  return (
    <div {...props}>
      <h1 className={styles.menuHeading}>
        <Book />
        Dictatornik
      </h1>
      <nav>
        <ul>
          {
            buttons.map((props) => <li key={props.href}><AsideMenuButton {...props} /></li>)
          }
        </ul>
      </nav>
    </div>
  );
}
