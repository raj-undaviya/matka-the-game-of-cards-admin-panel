export default function PageContainer({ children }) {
  return (
    <main className="w-full min-w-0 flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 xl:p-8 space-y-4 md:space-y-6">
      {children}
    </main>
  );
}
