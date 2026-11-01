import EventsList from '@/components/eventList';


const EventPage = () => {
    return (
    <section className="container page-section">
      <div className="page-heading">
        <p className="eyebrow">YOUR NEXT GOOD THING</p>
        <h1>Find a cause close to home.</h1>
        <p>
          A little time can make a real difference. Explore upcoming initiatives
          and find where you belong.
        </p>
      </div>
      <EventsList />
    </section>
    );
};

export default EventPage;