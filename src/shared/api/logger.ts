import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// API 요청 로깅
export const logRequest = (config: AxiosRequestConfig) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    console.log('Config:', {
      method: config.method,
      url: config.url,
      headers: config.headers,
      data: config.data,
    });
    console.groupEnd();
  }
};

// API 응답 로깅
export const logResponse = (response: AxiosResponse) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(
      `✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`,
    );
    console.log('Status:', response.status);
    console.groupEnd();
  }
};

// API 에러 로깅
export const logError = (error: AxiosError) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`);
    console.log('Status:', error.response?.status);
    console.log('Error:', error.message);
    console.log('Response Data:', error.response?.data);
    console.groupEnd();
  }
};

// 성능 측정을 위한 로깅
export const logPerformance = (startTime: number, endTime: number, url: string) => {
  if (process.env.NODE_ENV === 'development') {
    const duration = endTime - startTime;
    console.log(`⏱️ API Performance: ${url} - ${duration.toFixed(2)}ms`);
  }
};
