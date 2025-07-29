import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation, setUser } from "../../features/auth/authSlice";
import { LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await logout().unwrap();
      console.log("Server logout successful");
    } catch (error) {
      console.error("Server logout failed, proceeding with client-side logout:", error);
    } finally {
      dispatch(setUser(null));
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      navigate("/");
      
      console.log("Client-side logout completed");
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout} 
      disabled={isLoading}
      className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
      
    </Button>
  );
}

export default Logout;