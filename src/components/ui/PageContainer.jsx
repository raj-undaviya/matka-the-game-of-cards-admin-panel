export default function PageContainer({ children }) {
  return (
    <main className="p-4 md:p-6 lg:p-8 space-y-6 flex-1 ml-0 lg:ml-64 h-screen overflow-y-auto">
      {children}
    </main>
  );
}