import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="relative">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
