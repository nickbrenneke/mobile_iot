class User {
	public id:string;
	public username:string;
	public email:string;
	public first_name:string;
	public last_name:string;
}

export class Profile {
  public phone: string;
  public pic_url: string;
  public pic_id_url: string;
  public user: User = new User();

  
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}