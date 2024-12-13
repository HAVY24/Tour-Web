import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../UserContext";
import { StyledName } from "./StyledName";
import { StyledSidebar } from "./StyledSidebar";
import { StyledOverlay } from "./StyledOverlay";
import { signout } from "../../../api/Services/AuthServices";
import UserSlidebar from "./UserSlidebar";
import AdminSlidebar from "./AdminSildebar";

const Sidebar = ({ toggleSidebar, sidebarOpen }) => {
  const user = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const data = await signout();
      console.log(data);
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      navigate("/login");
      window.location.reload();
    } catch (err) {
      console.log("Error", err);
    }
  };

  const handleMenuItemClick = () => {
    toggleSidebar();
  };

  return (
    <>
      <StyledOverlay open={sidebarOpen} onClick={toggleSidebar} />

      <StyledSidebar sx={{ marginTop: "-30px" }} open={sidebarOpen}>
        <StyledName>Enjoy Our Service, @{user.username}</StyledName>

        {user.role == "admin" && (
          <AdminSlidebar
            user={user}
            handleMenuItemClick={handleMenuItemClick}
            handleSignOut={handleSignOut}
          />
        )}

        {user.role == "user" && (
          <UserSlidebar
            user={user}
            handleMenuItemClick={handleMenuItemClick}
            handleSignOut={handleSignOut}
          />
        )}
      </StyledSidebar>
    </>
  );
};

export default Sidebar;
