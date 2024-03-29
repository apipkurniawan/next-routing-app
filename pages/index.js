import Head from "next/head";

import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";
import { getFeaturedEvents } from "../lib/api-util";

// client side
function HomePage(props) {
  return (
    <div>
      <Head>
        <title>Next app events</title>
        <meta name="description" content="find a lot of great events..." />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

// server side
export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
