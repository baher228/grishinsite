"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    status;
    data;
    error;
    constructor(status, data, error) {
        this.data = data;
        this.status = status != null ? status : 200;
        this.error = error;
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=ApiResponse.js.map