import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";
import { routes } from "../router/routes";

type Props = {
  roles?: string[];
};

export default function RequireAuth({ roles }: Props) {
  const { isAuthenticated, user } = useAuth();

  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={routes.login} replace state={{ from: location }} />;
  }

  if (roles && !roles.some((role) => user?.roles.includes(role))) {
    return <Navigate to={routes.home} replace />;
  }
  return <Outlet />;
}
