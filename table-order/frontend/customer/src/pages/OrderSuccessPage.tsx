import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderNumber = (location.state as { orderNumber?: number })?.orderNumber;
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown <= 0) { navigate('/'); return; }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 gap-6" data-testid="order-success-page">
      <div className="text-6xl">✅</div>
      <h1 className="text-2xl font-bold">주문이 완료되었습니다!</h1>
      {orderNumber && <p className="text-gray-500 text-lg">주문 번호: #{orderNumber}</p>}
      <p className="text-gray-400">{countdown}초 후 메뉴 화면으로 이동합니다</p>
      <button
        data-testid="order-success-go-menu"
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium"
      >
        메뉴로 돌아가기
      </button>
    </div>
  );
}
