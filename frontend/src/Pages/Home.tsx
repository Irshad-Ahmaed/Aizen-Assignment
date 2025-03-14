import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Dashboard from "./Dashboard";
import Login from "./Login";

const Home = () => {
    const {token} = useContext(AuthContext);
    
    return (
        <div>
            
            {
                token ?
                <div>
                    <h1>Welcome to Image Manager</h1>
                    <Dashboard/>
                </div>
                :
                <Login/>
            }
        </div>
    );
};

export default Home;
