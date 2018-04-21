export class Event {
  id: number;
  title: string;
  description: string;
  duration: number;
  close_time: Date;
  reward: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
