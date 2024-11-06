export class Expenses {
  constructor(
    public readonly id: string,
    public description: string,
    public date: Date,
    public amount: number,
    public user: { id: string }
  ) {}
}
