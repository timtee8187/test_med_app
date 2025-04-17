import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate, Link } from "react-router-dom"; // Added Link import
import "./ProfileCard.css";

const ProfileCard = ({ onLogout }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    joinDate: ""
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authtoken = sessionStorage.getItem("auth-token");
        const email = sessionStorage.getItem("email");

        if (!authtoken) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${API_URL}/api/auth/user`, {
          headers: {
            "Authorization": `Bearer ${authtoken}`,
            "Email": email,
          },
        });

        if (response.ok) {
          const user = await response.json();
          setUserDetails({
            name: user.name || "User",
            email: user.email,
            phone: user.phone || "Not provided",
            joinDate: new Date(user.createdAt || new Date()).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long' 
            })
          });
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return <div className="profile-card loading">Loading profile...</div>;
  }

  return (
    <div className="profile-card">
      <div className="profile-header">
        <h3>{userDetails.name}'s Profile</h3>
      </div>
      <div className="profile-content">
        <div className="profile-info">
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Phone:</strong> {userDetails.phone}</p>
          <p><strong>Member Since:</strong> {userDetails.joinDate}</p>
        </div>
        <div className="profile-actions">
          <Link to="/profile" className="btn2">
            Edit Profile
          </Link>
          <button className="btn2 logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;