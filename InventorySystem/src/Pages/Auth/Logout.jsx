import { logoutUser } from "@/Services/auth";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate(); // ✅ must be inside the component

  const handleLogout = async () => {
    try {
      await logoutUser();         // 🔐 Call your auth service
      navigate("/");              // 🔁 Redirect to login/home
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-all">
      Logout
    </button>
  );
}