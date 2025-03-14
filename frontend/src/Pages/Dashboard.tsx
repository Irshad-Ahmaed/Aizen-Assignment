import UploadForm from "../components/UploadForm";
import ImageList from "../components/ImageList";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
    const {user} = useContext(AuthContext) as any;

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-semibold text-gray-400 mt-5">Welcome, {user ?? 'User'} </h1>
            <UploadForm />
            <ImageList />
        </div>
    );
};

export default Dashboard;