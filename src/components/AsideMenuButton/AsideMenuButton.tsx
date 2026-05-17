import type { ReactNode } from "react";
import {Link, useLocation} from "react-router";

import styles from "./asideMenuButton.module.css"
import clsx from "clsx";

interface AsideMenuButtonProps {
  label: string,
  href: string,
  icon: ReactNode
}

export function AsideMenuButton({href, label, icon}: AsideMenuButtonProps) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link to={href}>
      <div className={clsx(styles.buttonWrapper, { [styles.buttonWrapper_active]: isActive })} >
        {icon}
        <span className={styles.buttonLabel}>
          {label}
        </span>
      </div>
    </Link>
  );
}
