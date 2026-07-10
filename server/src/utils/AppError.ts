/**
 * Operational, predictable errors. `isOperational = true` distinguishes
 * expected failures (validation, 404...) from unexpected bugs.
 */
export class AppError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;
  readonly isOperational = true;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static badRequest(message = "طلب غير صالح", details?: unknown) { return new AppError(400, "BAD_REQUEST", message, details); }
  static unauthorized(message = "غير مصرّح") { return new AppError(401, "UNAUTHORIZED", message); }
  static forbidden(message = "صلاحيات غير كافية") { return new AppError(403, "FORBIDDEN", message); }
  static notFound(message = "العنصر غير موجود") { return new AppError(404, "NOT_FOUND", message); }
  static conflict(message = "تعارض في البيانات") { return new AppError(409, "CONFLICT", message); }
  static tooMany(message = "محاولات كثيرة، حاول لاحقاً") { return new AppError(429, "RATE_LIMITED", message); }
  static internal(message = "خطأ في الخادم") { return new AppError(500, "INTERNAL", message); }
}
