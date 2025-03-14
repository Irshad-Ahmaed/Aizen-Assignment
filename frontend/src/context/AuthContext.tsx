import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    user: string | null;
    setUser: (name: string | null) => void;
    image: string | null;
    setImage: (image: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);
    const [user, setUser] = useState<string | null>(localStorage.getItem("user") || null);
    const [image, setImage] = useState<string | null>(localStorage.getItem("image") || null);
    // const [error, setError] = useState<string | null>(null);

    // useEffect(()=>{
    //     console.log('error', error);
    //     if(error === 'Request failed with status code 401'){
    //         localStorage.removeItem("token");
    //         localStorage.removeItem("user");
    //         localStorage.removeItem("image");
    //         setToken(null);
    //         setUser(null);
    //         setImage(null);
    //     }
    // }, [error])

    const handleSetToken = (newToken: string | null): void => {
        if (newToken) {
            localStorage.setItem("token", newToken);
        } else {
            localStorage.removeItem("token");
        }
        setToken(newToken);
    };

    const handleUserDetail = (name: string | null): void =>{
        if (name) {
            localStorage.setItem("user", name);
        } else {
            localStorage.removeItem("user");
        }
        setUser(name);
    };

    const handleImageDetail = (image: string | null): void =>{
        if (image) {
            localStorage.setItem("image", image);
        } else {
            localStorage.removeItem("image");
        }
        setImage(image);
    }

    return (
        <AuthContext.Provider value={{ token, setToken: handleSetToken, user, setUser:handleUserDetail, image, setImage: handleImageDetail }}>
            {children}
        </AuthContext.Provider>
    );
};