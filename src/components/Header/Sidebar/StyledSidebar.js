import { styled } from "@mui/material/styles";

export const StyledSidebar = styled("div")(({ theme, open }) => ({
  background: "linear-gradient(180deg, #3b4b6b 0%, #1e2a47 100%)", // A darker gradient from deep blue to navy
  position: "fixed", // Fixed position on the left
  top: 0,
  left: 0,
  bottom: 0, // Take full height
  width: "270px", // Sidebar width
  zIndex: 1000, // Sidebar on top of other content
  transform: open ? "translateX(0)" : "translateX(-100%)", // Initially hidden off-screen
  opacity: open ? 1 : 0, // Fade in/out
  transition: "transform 0.3s ease, visibility 0s 0.3s, opacity 0.3s ease", // Smooth transition for transform and opacity
  paddingTop: "50px", // Space for the top logo
}));
