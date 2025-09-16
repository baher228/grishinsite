export declare class ApiResponse<T> {
    status: number;
    data: T;
    error: string | null;
    constructor(status: number | null, data: T, error: string | null);
}
