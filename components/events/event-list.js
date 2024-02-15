// import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";

import EventItem from "./event-item";
import classes from "./event-list.module.css";

function EventList(props) {
  const { items } = props;

  //   // client-side page-guard
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // client-side page-guard
  //   getSession().then((session) => {
  //     if (!session) {
  //       window.location.href = "/auth";
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.list}>Loading...</p>;
  // }

  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem key={event.id} {...event} />
      ))}
    </ul>
  );
}

export default EventList;
