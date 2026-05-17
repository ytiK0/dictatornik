import {Book} from '@gravity-ui/icons';
import { AsideMenuButton } from "../AsideMenuButton"
import type {ComponentProps} from "react";

type AsideMenuProps = ComponentProps<"div"> & {
  buttons: ComponentProps<typeof AsideMenuButton>[]
}

export function AsideMenu({buttons, ...props}: AsideMenuProps) {
  return (
    <div {...props}>
      <h1><Book /> Dictatornik</h1>
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
