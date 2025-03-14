import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    },
});

// Upload Image
export const uploadImage = async (file: File, token: string): Promise<{
    file_url: any; success: boolean; message: string 
}> => {
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await axiosInstance.post("/api/v2/images/upload", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Image Upload Response:", response); // Debugging
        return response.data;
    } catch (error: any) {
        console.error("Error uploading image:", error);
        throw error.response.data.message;
    }
};

// Fetch Images
export const fetchImages = async (token: string): Promise<{ images: string[] }> => {
    try {
        const response = await axiosInstance.get("/api/v2/images/list", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Fetch Images Response:", response);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching images:", error);
        throw error.response.data.message;
    }
};