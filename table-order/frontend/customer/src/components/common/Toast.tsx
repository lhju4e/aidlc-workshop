interface Props {
  message: string;
  type: 'info' | 'success' | 'error';
  onClose: () => void;
}

const colors = {
  info: 'bg-blue-500',
  success: 'bg-green-500',
  error: 'bg-red-500',
};

export default function Toast({ message, type, onClose }: Props) {
  return (
    <div
      data-testid="toast"
      className={`${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between min-w-[280px]`}
      role="alert"
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-3 font-bold" data-testid="toast-close">✕</button>
    </div>
  );
}
