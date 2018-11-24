const isDev = process.env.NODE_ENV === 'development'

export const baseUrl = isDev ? 'http://127.0.0.1:3000/api/public' : 'https://weapp.ynagtech.com/api/public'

// 输出日志信息
export const noConsole = false
