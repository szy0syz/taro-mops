const isDev = process.env.NODE_ENV === 'development'

// export const baseUrl = isDev ? 'http://127.0.0.1:3000/api' : 'https://weapp.ynagtech.com/api'
export const baseUrl = isDev ? 'http://127.0.0.1:7001' : 'https://weapp.ynagtech.com'

// 输出日志信息
export const noConsole = !isDev