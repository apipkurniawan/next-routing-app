import { usePathname } from "next/navigation";
import { useContext, Fragment } from "react";
import MainHeader from "./main-header";
import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";

function Layout(props) {
  const notifCtx = useContext(NotificationContext);
  const pathname = usePathname();

  const activeNotification = notifCtx.notification;

  const routeWithoutHeader = ["/auth"];

  return (
    <Fragment>
      {!routeWithoutHeader.includes(pathname) && <MainHeader />}
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
