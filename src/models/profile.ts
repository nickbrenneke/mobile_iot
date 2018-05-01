export class Profile {
  public id: number;
  public name: string;
  public phone: string;
  public email: string;

  
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}