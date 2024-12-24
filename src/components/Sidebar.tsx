import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { LayoutDashboard, FolderOpen, BarChart2, LogOut, FileSearch } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: "/home", label: "Home", icon: FolderOpen },
    { path: "/analytics", label: "Analytics", icon: BarChart2 },
    { path: "/data-analysis", label: "Data Analysis", icon: FileSearch },
    { path: "/results", label: "Results", icon: LayoutDashboard },
  ];

  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed left-0 top-0 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold">File Processor</h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;