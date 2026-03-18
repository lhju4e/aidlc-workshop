'use client';

interface Props {
  message: string;
  onRetry?: () => void;
}

export default function ErrorBanner({ message, onRetry }: Props) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center justify-between" data-testid="error-banner" role="alert">
      <span className="text-sm">{message}</span>
      {onRetry && (
        <button data-testid="error-banner-retry" onClick={onRetry} className="text-sm underline ml-4">
          재시도
        </button>
      )}
    </div>
  );
}
