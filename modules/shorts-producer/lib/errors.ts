export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Unknown error';
}

export function isErrnoException(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error;
}
