import { useState, useEffect, useContext } from "react";
import { fetchImages } from "../api/image";
import { AuthContext } from "../context/AuthContext";

const ImageList = () => {
    const [images, setImages] = useState<any>([]);
    const { token, image, setError } = useContext(AuthContext) as any;

    useEffect(() => {
        if (token) {
            fetchImages(token)
            .then(data=> setImages(data))
            .catch(error=> {setError(error.message); console.log('error', error.message)});
        }
    }, [token, image]);

    return (
        <div className="grid items-center gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10">
            {images.length > 0 ? images.map((image: any, index: number) => (
                <div
                key={index}
                className="bg-neutral-200 p-4 rounded-lg flex flex-col shadow-md 
                           hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
                <div
                    className="bg-orange-200 rounded-lg w-full h-96 grid grid-rows-2 overflow-hidden"
                >
                    {/* Image Section */}
                    <div className="overflow-hidden">
                        <img
                            src={image.file_url}
                            alt="Uploaded"
                            className="w-full h-full object-cover"
                        />
                    </div>
            
                    {/* Scrollable Text Section */}
                    {image.ai_description && (
                        <div className="p-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                            <p className="text-center text-sm sm:text-base md:text-lg">
                                <span className="underline font-semibold">AI Suggestion:</span> {image.ai_description}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            
                ))
                :
                <p className="mt-5 text-center font-semibold text-2xl text-gray-500">No Data Available</p>
            }
        </div>
    );
};

export default ImageList;