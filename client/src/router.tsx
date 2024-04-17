import { createBrowserRouter } from "react-router-dom";
import Customer from "./pages/Customer/Customer";
import AddCustomer from "./pages/Customer/AddCustomer";
import NotFoundPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Customer />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/add",
    element: <AddCustomer />,
  },
  {
    path: "/edit/:custId",
    element: <AddCustomer />,
  },
]);

export default router;
