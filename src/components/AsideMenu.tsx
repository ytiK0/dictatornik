
import {Link} from "react-router";

type AsideMenuProps = React.ComponentProps<"div"> & {
  buttons: { label: string, href: string }[]
}

export default function AsideMenu({buttons, ...props}: AsideMenuProps) {
  return (
    <div {...props}>
      <nav>
        <ul>
          {
            buttons.map(({ label, href }) => <li key={href}><Link to={href}>{label}</Link></li>)
          }
        </ul>
      </nav>
    </div>
  );
}
