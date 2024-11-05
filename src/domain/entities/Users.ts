export class User {
  id: string;
  email: string;
  password: string;
  name: string;

  constructor({
    id,
    email,
    password,
    name,
  }: {
    id: string;
    email: string;
    password: string;
    name: string;
  }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
  }
}
