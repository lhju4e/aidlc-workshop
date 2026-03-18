import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import TabLayout from './components/layout/TabLayout';
import MenuPage from './pages/MenuPage';

const SetupPage = lazy(() => import('./pages/SetupPage'));
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage'));
const OrderHistoryPage = lazy(() => import('./pages/OrderHistoryPage'));

export default function App() {
  const { isAuthenticated, isLoading, autoLogin } = useAuthStore();

  useEffect(() => { autoLogin(); }, []);

  if (isLoading) return <LoadingSpinner />;

  if (!isAuthenticated) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <SetupPage />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route
            path="*"
            element={
              <TabLayout>
                <Routes>
                  <Route path="/" element={<MenuPage />} />
                  <Route path="/history" element={<OrderHistoryPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </TabLayout>
            }
          />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
