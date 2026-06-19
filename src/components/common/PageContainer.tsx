type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <main className={`page-shell grid gap-6 py-8 sm:py-10 ${className}`}>
      {children}
    </main>
  );
}
