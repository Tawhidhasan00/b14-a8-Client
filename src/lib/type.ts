export type EventCardData = {
  _id: string;
  title: string;
  eventType: string;
  location: string;
  date: string;
  duration: number;
  description: string;
  thumbnail?: string;
  image?: string;
};

export type EventDetailsData = {
  title: string;
  eventType: string;
  location: string;
  date: string;
  duration: number;
  description: string;
  meetingPoint: string;
  whatToBring: string;
  creatorName: string;
  thumbnail?: string;
  image?: string;
};

