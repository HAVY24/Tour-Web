import { styled } from "@mui/material/styles";

export const StyledMenuItem = styled("div")(({ theme }) => ({
  padding: "15px",
  fontWeight: 500,
  color: "#f1f1f1", // Softer white for better contrast with dark background
  transform: "translateY(0)", // Initial position
  transition:
    "transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease", // Faster, smoother transitions
  cursor: "pointer",
  borderRadius: "8px", // Rounded corners
  "&:hover": {
    backgroundColor: "#4f6e92", // Muted blue for a smooth hover effect
    color: theme.palette.common.white,
    transform: "translateY(-2px) scale(1.02)", // Slight lift and subtle scaling
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Softer shadow for smoother look
  },
}));
