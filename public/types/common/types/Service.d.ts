export interface Service {
    id: string;
    name: string;
    url: string;
    speech: boolean;
    write: boolean;
    enabled: boolean;
    color: {
        r: number;
        g: number;
        b: number;
    };
}
export interface ServiceError {
    id: number;
    url: string;
    method: string;
    webContentsId?: number;
    referrer: string;
    timestamp: number;
    responseHeaders?: Record<string, string[]>;
    statusCode: number;
    statusLine: string;
    error: string;
}
