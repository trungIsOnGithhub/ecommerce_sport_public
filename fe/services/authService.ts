import { http } from '../utils/axios';

interface User {
    phone: string;
    email: string;
    photo: string;
    role: string;
}

interface AuthUser {
    status: string;
    token?: string;
    data: User;
}

interface InputAuth {
    username: string;
    password: string;
}
interface InputSignup {
    name: string;
    phone: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

interface InputForgotPassword {
    username: string;
}

interface InputResetPassword {
    otp: string;
    username: string;
    password: string;
    passwordConfirm: string;
}

interface ForgotPassword {
    status: string;
    message: string;
}

class AuthService {
    async login(data: InputAuth) {
        const res = await http.post<InputAuth, AuthUser>('/auth/signin', data);
        if (res.data.token) localStorage.setItem('token', res.data.token);
        return res;
    }

    async signup(data: InputSignup) {
        const res = await http.post<InputSignup, AuthUser>('/auth/signup', data);
        if (res.data.token) localStorage.setItem('token', res.data.token);
        return res;
    }

    async forgotPassword(data: string) {
        return await http.patch<InputForgotPassword, ForgotPassword>('/auth/forgotPassword', { username: data });
    }

    async resetPassword(data: InputResetPassword) {
        return await http.patch<InputResetPassword, AuthUser>('/auth/resetPassword', data);
    }

    async getCurrentUser() {
        return await http.get<AuthUser>('/auth/current_user');
    }

    async sendOTPbyPhone(){
        return await http.get('/auth/validate_phone_number');
    }

    async checkOTP(otp: string){
        return await http.post('/auth/is_validated_phone_number', {otp: otp});
    }

    async changePassword({ currentPassword, newPassword, newConfirmPassword } : {currentPassword: string, newPassword: string, newConfirmPassword: string}){
        const res = await http.patch('/auth/change_password', { currentPassword : currentPassword, newPassword : newPassword, newConfirmPassword : newConfirmPassword });
        if (res.data.token) localStorage.setItem('token', res.data.token);
        return res;
    }

    logout() {
        localStorage.removeItem('token');
    }
}

export default new AuthService();
