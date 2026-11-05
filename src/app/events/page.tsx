import EventsList from '@/components/eventList';


const EventPage = () => {
    return (
    <section className="container mx-auto min-h-[65vh] w-[min(1200px,calc(100%-64px))] pb-[85px] pt-[55px] text-[#17251d] dark:text-foreground max-[600px]:w-[calc(100%-36px)] max-[600px]:pb-[60px] max-[600px]:pt-[35px]">
      <div className="mb-[34px] max-w-[680px]">
        <p className="mb-3 text-[10px] font-bold uppercase leading-[1.5] tracking-[1.7px] text-[#166534] dark:text-(--home-green) max-[600px]:text-[8px] max-[600px]:tracking-[1.2px]">YOUR NEXT GOOD THING</p>
        <h1 className="text-[clamp(30px,4vw,43px)] font-semibold leading-[1.2] tracking-[-1.5px]">Find a cause close to home.</h1>
        <p className="mt-[14px] text-sm leading-[1.8] text-[#59675e] dark:text-muted-foreground">
          A little time can make a real difference. Explore upcoming initiatives
          and find where you belong.
        </p>
      </div>
      <EventsList />
    </section>
    );
};

export default EventPage;
