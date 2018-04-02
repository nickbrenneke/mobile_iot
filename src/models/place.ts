import { Location } from "./location";

export class Place {
  constructor(public title: string,
              public description: string,
              public duration: number,
              public close: Date,
              public reward: string,
              public location: Location,
              public imageUrl: string) {
  }
}
