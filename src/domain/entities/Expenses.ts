export class Expenses {
  constructor(
    public readonly id: string,
    public description: string,
    public date: Date,
    public userId: string,
    public value: number
  ) {}
}
