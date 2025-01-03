import jwt from 'jsonwebtoken';

export const getDataFromToken = (request) => {
    try {
        const cookies = request.cookies;
        if (!cookies) {
            throw new Error("Cookies are undefined");
        }

        const token = cookies.get("token")?.value || "";
        if (!token) {
            throw new Error("Token not found in cookies");
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken.id;
    } catch (error) {
        console.error("Error verifying token:", error.message);
        throw new Error("Error fetching token");
    }
};
