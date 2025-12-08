import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, Settings } from 'lucide-react';
import logo from '../assets/img/Riaya.png'
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
export default function Sidebar() {

    const { logout, user } = useContext(AuthContext);

    return (
        <div className="w-64 h-screen bg-white shadow-md p-4 flex flex-col">
            {/* Logo */}
            <div className="mb-8 flex flex-col items-center space-y-2">
                <img src={logo} alt="Logo" className="w-36 h-36 rounded-full" />
                <h2 className="text-xl font-bold">MyDashboard</h2>
            </div>

            {/* Navigation */}
            {user.role === "Admin" ?
                <nav className="space-y-4">
                    <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/dashboard/users" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                        <Users size={20} />
                        <span>Users</span>
                    </Link>
                    <Link to="/dashboard/settings" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                        <Settings size={20} />
                        <span>Settings</span>
                    </Link>
                </nav>
                :
                <nav className="space-y-4">
                    <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/dashboard/rendez-vous" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                        <Users size={20} />
                        <span>Rendez-vous en attente</span>
                    </Link>
                    <Link to="/dashboard/rendez-vous-accepted" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                        <Users size={20} />
                        <span>rendez-vous Accepté</span>
                    </Link>

                    <Link to="/dashboard/settings" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                        <Settings size={20} />
                        <span>Settings</span>
                    </Link>
                </nav>


            }
        </div>
    );
}
