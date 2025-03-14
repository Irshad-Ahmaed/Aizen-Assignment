import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const {user, token, setToken, setUser, setImage} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setImage(null);
    navigate("/login");
  };

  return (
    <nav className="w-full py-2 border-gray-200 shadow">
      <div className="container mx-auto flex w-full justify-between items-center">
        <h1 className="text-purple-500 text-4xl font-semibold cursor-pointer hover:text-purple-400">AIZEN</h1>
        
        <div>
          {
            !token ?
            <div className="flex gap-4 items-center">
              <button onClick={()=> navigate('/login')} className="border py-1 px-4 rounded-lg cursor-pointer text-violet-500 hover:bg-violet-300 hover:text-white transition-all duration-400">Login</button>
              <button onClick={()=> navigate('/register')} className="border py-1 px-4 rounded-lg cursor-pointer bg-violet-300 hover:bg-violet-500 text-white transition-all duration-400">SignUp</button>
            </div>
            :
            <div className="flex gap-4 items-center">
              <div>Welcome, {user ?? 'Anonymous'}</div>
              <button onClick={handleLogout} className="border py-1 px-4 rounded-lg cursor-pointer bg-violet-300 hover:bg-violet-500 text-white transition-all duration-400">Logout</button>
            </div>
          }
        </div>

      </div>
    </nav>
  )
}

export default Navbar