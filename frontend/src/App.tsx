import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProductManagementPage from "./pages/ProductManagementPage";
import DailyEntryPage from "./pages/DailyEntryPage";
import CustomerManagementPage from "./pages/CustomerManagementPage";
import ReportsPage from "./pages/CustomerReportPage";
import PaymentsPage from "./pages/PaymentPage";
import BillingPage from "./pages/BillingPage";
import BulkBillPrintPage from "./pages/BulkBillPrintPage";
import SingleBillPrintPage from "./pages/SingleBillPrintingPage";
import AppLayout from "./AppLayout";
import DashboardPage from "./pages/DashboardPage";

const Router =
  window.location.protocol === "file:"
      ? HashRouter
      : BrowserRouter;

function App() {
  return (
      <Router>

          <Routes>

              <Route
                  path="/"
                  element={
                      <Navigate
                          to="/dashboard"
                      />
                  }
              />

              <Route
                  element={<AppLayout />}
              >

                  <Route
                      path="/dashboard"
                      element={<DashboardPage />}
                  />

                  <Route
                      path="/daily-entry"
                      element={<DailyEntryPage />}
                  />

                  <Route
                      path="/customer"
                      element={<CustomerManagementPage />}
                  />

                  <Route
                      path="/product"
                      element={<ProductManagementPage />}
                  />

                  <Route
                      path="/payments"
                      element={<PaymentsPage />}
                  />

                  <Route
                      path="/report"
                      element={<ReportsPage />}
                  />

                  <Route
                      path="/billing"
                      element={<BillingPage />}
                  />

                  <Route
                      path="/bulk-bills"
                      element={<BulkBillPrintPage />}
                  />

                  <Route
                      path="/single-bill"
                      element={<SingleBillPrintPage />}
                  />

              </Route>

          </Routes>

      </Router>
  );
}

export default App;