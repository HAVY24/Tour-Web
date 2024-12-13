import { styled } from "@mui/material/styles";

export const StyledOverlay = styled("div")(({ theme, open }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: open ? "rgba(0, 0, 0, 0.5)" : "transparent", // Overlay effect
  zIndex: open ? 999 : -1, // Show overlay when sidebar is open
  pointerEvents: open ? "all" : "none", // Block interactions when sidebar is open
  transition: "opacity 0.3s ease", // Smooth transition for overlay
}));
