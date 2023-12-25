import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

enum StatusCode {
    Unauthorized = 401,
    Forbidden = 403,
    TooManyRequests = 429,
    InternalServerError = 500,
}

const headers: Readonly<Record<string, string | boolean>> = {
    Accept: '*/*',
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Credentials': true,
    'X-Requested-With': 'XMLHttpRequest',
};

const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return config;
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        };
        return config;
    } catch (error: any) {
        throw new Error(error);
    }
};

class Http {
    private instance: AxiosInstance | null = null;
    private get http(): AxiosInstance {
        return this.instance != null ? this.instance : this.initHttp();
    }
    initHttp() {
        const http = axios.create({
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/api/',
            headers,
        });
        http.interceptors.request.use(injectToken, (error) => Promise.reject(error));
        http.interceptors.response.use(
            (response) => response,
            (error) => {
                const { response } = error;
                return this.handleError(response);
            },
        );
        this.instance = http;
        return http;
    }
    request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
        return this.http.request(config);
    }

    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.get<T, R>(url, config);
    }

    post<T = any, F = any, R = AxiosResponse<F>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
        return this.http.post<T, R>(url, data, config);
    }

    put<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
        return this.http.put<T, R>(url, data, config);
    }

    patch<T = any, F = any, R = AxiosResponse<F>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
        return this.http.patch<T, R>(url, data, config);
    }

    delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.delete<T, R>(url, config);
    }
    private handleError(error: any) {
        const { status } = error;

        switch (status) {
            case StatusCode.InternalServerError: {
                // Handle InternalServerError
                break;
            }
            case StatusCode.Forbidden: {
                // Handle Forbidden
                break;
            }
            case StatusCode.Unauthorized: {
                // Handle Unauthorized
                break;
            }
            case StatusCode.TooManyRequests: {
                // Handle TooManyRequests
                break;
            }
        }
        return Promise.reject(error.data);
    }
}

export const http = new Http();
