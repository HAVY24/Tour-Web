import { StyledMenuItem } from "./StyledMenuItem";
import { StyledLink } from "./StyledLink";
import { StyledLogout } from "./StyledLogout";
import {
  PostAdd,
  LocalOffer,
  Logout,
  ManageAccounts,
  AccountCircle,
  AddLocationAlt,
  EventAvailable,
  ReceiptLong,
  DeleteOutline,
  BookOutlined,
} from "@mui/icons-material";

export default function UserSlidebar({
  user,
  handleMenuItemClick,
  handleSignOut,
}) {
  return (
    <>
      <StyledLink to={`/profile/${user.userId}`} onClick={handleMenuItemClick}>
        <StyledMenuItem>
          <AccountCircle style={{ fontSize: 20 }} /> Profile
        </StyledMenuItem>
      </StyledLink>

      <StyledLink to={`/account/${user.userId}`} onClick={handleMenuItemClick}>
        <StyledMenuItem>
          <ManageAccounts style={{ fontSize: 20 }} /> My Account
        </StyledMenuItem>
      </StyledLink>

      <StyledLink to={`/user/booking`}>
        <StyledMenuItem onClick={handleMenuItemClick}>
          <EventAvailable style={{ fontSize: 20 }} /> My Booking
        </StyledMenuItem>
      </StyledLink>

      <StyledLink to={"/billing"} onClick={handleMenuItemClick}>
        <StyledMenuItem>
          <ReceiptLong style={{ fontSize: 20 }} /> My Billing
        </StyledMenuItem>
      </StyledLink>

      <StyledLink
        to={`/profile/${user.userId}/#posts`}
        onClick={handleMenuItemClick}
      >
        <StyledMenuItem>
          <BookOutlined style={{ fontSize: 20 }} /> Manage Post
        </StyledMenuItem>
      </StyledLink>

      <StyledLink
        to={`post/delete/${user.userId}`}
        onClick={handleMenuItemClick}
      >
        <StyledMenuItem>
          <DeleteOutline style={{ fontSize: 23 }} /> Trash Can
        </StyledMenuItem>
      </StyledLink>

      <StyledLink to={"/create/post"} onClick={handleMenuItemClick}>
        <StyledMenuItem>
          <PostAdd style={{ fontSize: 20 }} /> Post
        </StyledMenuItem>
      </StyledLink>

      <StyledLogout style={{ marginTop: "150px" }} onClick={handleSignOut}>
        <Logout style={{ fontSize: 20 }} /> Log Out
      </StyledLogout>
    </>
  );
}
