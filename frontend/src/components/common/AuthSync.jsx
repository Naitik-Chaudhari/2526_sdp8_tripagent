import { useEffect, useRef } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { syncUser } from "../../services/userService";

function AuthSync() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const hasSynced = useRef(false); // 🔥 prevents multiple calls

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;

    // Prevent multiple sync calls
    if (hasSynced.current) return;

    hasSynced.current = true;

    console.log("🔥 Syncing user to PostgreSQL (ONE TIME)...");
    syncUser(user, getToken);
  }, [isLoaded, isSignedIn, user, getToken]);

  return null;
}

export default AuthSync;