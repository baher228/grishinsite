import { ApiResponse } from '../Infrastructure/DTO/Response/ApiResponse';
export declare abstract class ApiBaseController {
    protected FormatResponse<T>(data: T): ApiResponse<T>;
}
