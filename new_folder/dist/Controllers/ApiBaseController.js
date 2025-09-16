"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiBaseController = void 0;
const ApiResponse_1 = require("../Infrastructure/DTO/Response/ApiResponse");
class ApiBaseController {
    FormatResponse(data) {
        return new ApiResponse_1.ApiResponse(200, data, null);
    }
}
exports.ApiBaseController = ApiBaseController;
//# sourceMappingURL=ApiBaseController.js.map