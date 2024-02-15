import Link from "next/link";
import classes from "./main-header.module.css";
import Button from "../ui/button";
import { signOut } from "next-auth/client";

function MainHeader() {
  function logoutHandler() {
    signOut({ callbackUrl: "/auth" });
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">NextEvents</Link>
      </div>
      <nav className={classes.navigation}>
        <ul className={classes.tab}>
          <li>
            <Link href="/events">Browse All Events</Link>
          </li>
          <li>
            <Button onClick={logoutHandler}>Logout</Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
