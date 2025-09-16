export class ApiResponse<T> {
  public status: number;

  public data: T;

  public error: string | null;

  constructor(status: number | null, data: T, error: string | null) {
    this.data = data;
    this.status = status != null ? status : 200;
    this.error = error;
  }
}
