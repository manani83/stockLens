type FormErrorMessageProps = {
  message?: string;
};

export function FormErrorMessage({ message }: FormErrorMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <div
      className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-900"
      role="alert"
    >
      {message}
    </div>
  );
}
