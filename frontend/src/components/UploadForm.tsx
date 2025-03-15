import { useState, useRef, useContext } from "react";
import { uploadImage } from "../api/image";
import { AuthContext } from "../context/AuthContext";
import { RotateCcwIcon } from "lucide-react";

const UploadForm = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    let fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to input element
    const { token, setImage } = useContext(AuthContext) as any;

    const handleUpload = async () => {
        setIsLoading(true);
        if (!file || !token) {
            setIsLoading(false);
            setError('Choose a file to upload');
            return;
        };
        
        try {
            const response = await uploadImage(file, token);
            const image_url = response.file_url;
            setImage(image_url);
            setError(null);
        } catch (error: any) {
            setError(error);
            // console.error("Upload failed", error);
        } finally{
            setFile(null);
            fileInputRef.current = null;
            setIsLoading(false);
        }
    };

    const handleFilePickerClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger the input's click event
        }
    };

    return (
        <div className="bg-gray-100 mt-5 h-72 flex items-center">
            <div
                className="container mx-auto w-1/2 p-4 rounded-xl flex flex-col gap-5 items-center justify-center text-center
                bg-gray-300 text-gray-700"
            >
                {/* The clickable div that triggers the file picker */}
                <div
                    className="flex relative items-center gap-5 bg-gray-500 text-white p-2 rounded-lg cursor-pointer"
                    onClick={handleFilePickerClick} // Trigger file input on div click
                >
                    <input
                        type="file"
                        className="w-1/2"
                        ref={fileInputRef}
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <p className="bg-gray-400 rounded-full w-1/3 absolute right-2">Choose</p>
                </div>
                <button 
                    onClick={handleUpload}
                    className="text-violet-400 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-violet-400 hover:text-white transition-all duration-200 cursor-pointer">
                        Upload {loading && <RotateCcwIcon size={20} className=" animate-spin"/>}
                </button>

                {error && <span className="text-red-500">{error}</span>}
            </div>
        </div>
    );
};

export default UploadForm;
