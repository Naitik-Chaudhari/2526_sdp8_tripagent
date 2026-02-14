import axios from "axios";

export const syncUser = async (user, getToken) => {
  try {
    if (!user) return;

    console.log("📡 Calling backend /api/users/sync");

    const token = await getToken();

    const response = await axios.post(
      "http://localhost:5000/api/users/sync",
      {
        email: user.primaryEmailAddress?.emailAddress,
        clerkId: user.id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ Sync success:", response.data);
  } catch (error) {
    console.error("❌ Sync API failed:", error.response?.data || error.message);
  }
};