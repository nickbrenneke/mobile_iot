export class Profile {
  public id: number;
  public name: string;
  public mobile: string;
  public email: string;

  
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}