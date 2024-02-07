import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-utils";

// client side
function HomePage(props) {
  return (
    <div>
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
