export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8" data-testid="loading-spinner">
      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}
