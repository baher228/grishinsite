import { ApiResponse } from '../Infrastructure/DTO/Response/ApiResponse';

export abstract class ApiBaseController {
  protected FormatResponse<T>(data: T): ApiResponse<T> {
    return new ApiResponse(200, data, null);
  }
}
