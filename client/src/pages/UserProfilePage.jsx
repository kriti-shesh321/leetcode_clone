import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import UserProfile from "../components/UserProfile";
import { toast } from "react-toastify";

const UserProfilePage = () => {
  const { getUserDetails, updateUserDetails } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails();
        setUser(userDetails);

      } catch (error) {
        console.log('Error fetching data.');

      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();

  }, [getUserDetails]);

  if (loading) return <p>Loading...</p>;

  const editUserDetails = async (updatedUser) => {
    try {
      await updateUserDetails(updatedUser);
      toast.success("Details Updated Succesfully.");

    } catch (error) {
      toast.error("Error updating details.")
      console.log('Error updating user data.');

    } finally {
      setLoading(false);
    }
  };

  return (
    user && <UserProfile user={user} updateUser={editUserDetails}/>
  )
}
export default UserProfilePage