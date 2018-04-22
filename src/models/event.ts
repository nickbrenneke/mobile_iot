// import { Location } from "./location";

export class Event {
  public id: number;
  public title: string;
  public description: string;
  public duration: number;
  public close_time: Date;
  public reward: string;
  // public location: Location;
  public longitude: number;
  public latitude: number;
  public imageUrl: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
