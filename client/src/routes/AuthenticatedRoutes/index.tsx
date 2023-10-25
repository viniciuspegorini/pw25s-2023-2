import AuthService from "@/services/AuthService";
import { Navigate, Outlet } from "react-router-dom";

export function AuthenticatedRoutes() {
    const isAuthenticated = AuthService.isAuthenticated();

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    )
}