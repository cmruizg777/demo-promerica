export class Pokemon{
  id: number;
  name: string;
  url_image: string;
  url_image2!: string;
  types: string[] = [];
  constructor(id = 0, name = '', url = ''){
    this.id = id;
    this.name = name;
    this.url_image = url;
  }
}
