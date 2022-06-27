export class Profile{
  name: string;
  birthday: Date;
  hobby: string;
  document: string;
  image: string;
  constructor(name = '', birthday = new Date(), document='', hobby = '', image = ''){
    this.name = name;
    this.birthday = birthday;
    this.document = document;
    this.hobby = hobby;
    this.image = image;
  }
}
