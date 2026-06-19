type DisclaimerBoxProps = {
  children: React.ReactNode;
};

export function DisclaimerBox({ children }: DisclaimerBoxProps) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
      {children}
    </div>
  );
}
