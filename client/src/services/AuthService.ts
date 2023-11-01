import { IUserLogin, IUserSignup } from "@/commons/interfaces";
import { api } from "@/lib/axios";

const login = (user: IUserLogin) => {
    return api.post('/login', user);
}

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
    }
    return token ? true : false;
}

const logout = () => { 
    localStorage.removeItem('token');
}

const signup = (user: IUserSignup) => { 
    return api.post('/users', user);
}

const AuthService = {
    login,
    isAuthenticated,
    logout,
    signup
}

export default AuthService;