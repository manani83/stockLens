type LoadingStateProps = {
  message?: string;
};

export function LoadingState({ message = "불러오는 중입니다." }: LoadingStateProps) {
  return (
    <div
      className="rounded-lg border border-slate-200 bg-white p-5 text-sm font-medium text-slate-600 shadow-sm"
      role="status"
    >
      {message}
    </div>
  );
}
