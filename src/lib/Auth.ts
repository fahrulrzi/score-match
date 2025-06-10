import axios from "axios";

export interface Login {
    email: string;
    password: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface Register {
    username: string;
    email: string;
    password: string;
}

export interface responseAuth {
    token: string;
    user: User;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (auth: Login) => {
    try {
        const res = await axios.post(`${API_URL}/auth/login`, auth, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        const { token, ...user } = res.data.data;

        // Simpan ke localStorage (opsional: pisahin logic ini ke tempat lain)
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        document.cookie = `auth-token=${token}; path=/`;

        return res.data;
    } catch (err) {
        let message = "Terjadi kesalahan.";

        if (axios.isAxiosError(err)) {
            // error dari Axios
            message = err.response?.data?.message || "Login gagal.";
        } else if (err instanceof Error) {
            // error JavaScript umum
            message = err.message;
        }

        throw new Error(message);
    }
};

export const register = async (auth: Register) => {
    console.log("isi register ->",auth);
    try {
        const response = await axios.post(`${API_URL}/auth/register`, auth, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        // Optional: simpan token/user kalau API return data
        const { token, ...user } = response.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        document.cookie = `auth-token=${token}; path=/`;
        return response;
    } catch (err) {
        let message = "Terjadi kesalahan saat register.";

        if (axios.isAxiosError(err)) {
            message = err.response?.data?.message || message;
        } else if (err instanceof Error) {
            message = err.message;
        }

        throw new Error(message);
    }
};