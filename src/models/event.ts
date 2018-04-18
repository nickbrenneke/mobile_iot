export class Event {
  id: number;
  title: string;
  description: string;
  duration: number;
  close_time: Date;
  reward: string;
  lat: number;
  lng: number;
  imageUrl: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
