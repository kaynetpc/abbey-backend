export interface IResponse<T> {
    statusCode: number;
    hasError: boolean;
    message: string;
    data?: T | T[];
}
