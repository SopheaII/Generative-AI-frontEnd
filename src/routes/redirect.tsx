import { Navigate, useNavigate } from "react-router-dom";
import { webRoutes } from "./web";

const Redirect = () => {
  const isLogin = localStorage.getItem("token");
  console.log("------ ", isLogin)

  return (
    <Navigate to={isLogin ? webRoutes.home : webRoutes.login} replace />
  );
};

export default Redirect;
