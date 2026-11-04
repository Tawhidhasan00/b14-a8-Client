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
  creatorId?: string;
  email?: string;
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
  _id?: string;
};

