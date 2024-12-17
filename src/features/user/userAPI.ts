import { UserProfile } from "../../types";

export const updateProfile = async (token: string | null, user: UserProfile) => {
    try {
        const bearer = "Bearer " + token;
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
            method: "PUT",
            headers: {
                "Authorization": bearer,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
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