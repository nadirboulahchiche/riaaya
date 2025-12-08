import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function Topbar() {
    const { logout ,user} = useContext(AuthContext);
    
    return (
        <header className="bg-white shadow px-6 py-4">
            <div className='flex flex-row justify-between'>
                <div className="text-lg font-semibold">Welcome {user.email}</div>
                <div className="text-lg font-semibold">
                    <button className="bg-backgroundColor text-white px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition"
                    onClick={()=>{logout()}}
                    >Deconnexion</button>
                </div>

            </div>
        </header>
    );
}
