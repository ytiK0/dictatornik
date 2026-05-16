
import {Link} from "react-router";

type AsideMenuProps = React.ComponentProps<"div"> & {
  buttons: { label: string, href: string }[]
}

export default function AsideMenu({buttons, ...props}: AsideMenuProps) {
  return (
    <div {...props}>
      <h1>Dictatornik</h1>
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
