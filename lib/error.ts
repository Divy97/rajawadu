export class AppError extends Error {
  constructor(message: string, public statusCode: number = 400) {
    super(message);
    this.name = "AppError";
  }
}

export const handleError = (error: unknown) => {
  if (error instanceof AppError) {
    return error;
  }

  console.error("Unexpected error:", error);
  return new AppError("Something went wrong", 500);
};
