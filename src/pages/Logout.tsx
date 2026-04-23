import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";

export function Logout() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  async function logout() {
    await context.logout();
    navigate("/main");
  }

  return (
    <Button
      onClick={logout}
      variant="outline"
      className="border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all flex items-center gap-2"
    >
      <LogOut size={16} />
      Logout
    </Button>
  );
}