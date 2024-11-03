export const getAdminStatus = async () => {
    try {
        // TODO: REPLACE WITH API CALL
        const response = await fetch("http://localhost:3001/api/auth/status", {
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) throw new Error("Failed to fetch admin status");

        const data = await response.json();
        return data.isAdmin;
    } catch (error) {
        console.error("Error fetching admin status:", error);
        return false;
    }
};
