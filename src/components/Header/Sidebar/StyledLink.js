import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none", // Remove the default underline
  color: theme.palette.common.white,
}));
