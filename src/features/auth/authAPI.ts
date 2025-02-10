import { LoginCredentials } from "../../types";

export const fetchToken = async (credentials: LoginCredentials) => {
    try {
        const response = await fetch("http://localhost:3001/api/v1/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || response.statusText);
        }
        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        else {
            throw new Error("Unknown error");
        }
    }
}

export const fetchProfile = async (token: string | null) => {
    try {
        const bearer = "Bearer " + token;
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
            method: "POST",
            headers: {
                "Authorization": bearer,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || response.statusText);
        }
        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        else {
            throw new Error("Unknown error");
        }
    }
}