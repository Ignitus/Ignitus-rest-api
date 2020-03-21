export class CustomError extends Error {
  public name: string;
  public status: number;
  public constructor(message: string, status: number) {
    super(message);
    this.name = 'CustomError';
    this.status = status;
  }
}
