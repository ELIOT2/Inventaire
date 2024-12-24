import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">File Processor</div>
        <div className="flex space-x-4">
          <Link to="/home" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/analytics" className="hover:text-gray-300">
            Analytics
          </Link>
          <Link to="/results" className="hover:text-gray-300">
            Results
          </Link>
          <button
            onClick={handleLogout}
            className="hover:text-gray-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
