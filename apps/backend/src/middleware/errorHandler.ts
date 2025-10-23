import { Request, Response, NextFunction } from 'express'

export interface AppError extends Error {
  statusCode?: number
  isOperational?: boolean
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err }
  error.message = err.message

  // Mongoose错误处理
  if (err.name === 'CastError') {
    const message = '资源不存在'
    error = { message, statusCode: 404 } as AppError
  }

  if (err.name === 'ValidationError') {
    const message = Object.values((err as any).errors).map((val: any) => val.message).join(', ')
    error = { message, statusCode: 400 } as AppError
  }

  if (err.name === 'MongoError' && (err as any).code === 11000) {
    const message = '资源已存在'
    error = { message, statusCode: 400 } as AppError
  }

  // JWT错误处理
  if (err.name === 'JsonWebTokenError') {
    const message = '无效的token'
    error = { message, statusCode: 401 } as AppError
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'token已过期'
    error = { message, statusCode: 401 } as AppError
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || '服务器内部错误'
  })
}

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
