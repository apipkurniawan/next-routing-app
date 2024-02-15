import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import Head from "next/head";
import { Fragment } from "react";

import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../lib/api-util";

function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>all events</title>
        <meta name="description" content="find a lot of great events..." />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

// server side
// export async function getStaticProps() {
//   const events = await getAllEvents();

//   return {
//     props: {
//       events: events,
//     },
//     revalidate: 60,
//   };
// }

// server-side page-guard
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  const events = await getAllEvents();

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      events: events,
      session,
    },
  };
}

export default AllEventsPage;
