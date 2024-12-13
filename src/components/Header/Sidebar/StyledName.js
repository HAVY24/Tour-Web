import { styled } from "@mui/material/styles";

export const StyledName = styled("div")(({ theme }) => ({
  padding: "15px", // Larger padding for a prominent area
  textAlign: "center",
  color: "#e0e0e0", // Soft off-white color for a refined look
  fontWeight: 700,
  fontSize: "18px", // Slightly larger font size for emphasis
  background: "linear-gradient(45deg, #4e6b8e, #2c3e56)", // A smooth gradient from slate blue to dark greyish-blue
  borderRadius: "12px", // Rounded corners for a softer look
  boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)", // Enhanced shadow for depth
  marginBottom: "8px", // Added space below for visual balance
  transform: "translateY(0)", // Smooth transition for when the sidebar opens
  transition: "transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease", // Transition effect on hover
  fontFamily: "'Roboto', sans-serif", // Modern font for a clean look
  textTransform: "uppercase", // Capitalize for emphasis
  letterSpacing: "1px", // Slightly increased letter spacing for better readability
  "&:hover": {
    transform: "translateY(-5px)", // Lift the element slightly on hover
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)", // Enhanced shadow for a glowing effect
    color: "#ffffff", // White text on hover for contrast
  },
}));
