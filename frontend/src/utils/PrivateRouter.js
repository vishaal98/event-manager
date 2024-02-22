import { enqueueSnackbar } from "notistack";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  if (!token)
    enqueueSnackbar("Login to access this page", { variant: "warning" });
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
