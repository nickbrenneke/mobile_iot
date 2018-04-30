import { Signup } from "./signup";

export class Event {
  public id: number;
  public title: string;
  public description: string;
  public duration: number;
  public create_time: Date;
  public close_time: Date;
  public reward: string;
  // public location: Location;
  public longitude: number;
  public latitude: number;
  public status: string;
  public pic: string;
  public signups: Signup[]; 

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
