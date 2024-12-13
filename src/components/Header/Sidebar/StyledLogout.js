import styled from "styled-components";
import { StyledMenuItem } from "./StyledMenuItem";

export const StyledLogout = styled(StyledMenuItem)`
  background-color: #f44336; // Red color to highlight the logout button
  color: white; // White text for contrast
  font-weight: bold; // Make the font bold to make it stand out
  border-radius: 8px; // Slightly rounded corners for a smooth look
  margin-top: auto; // Push it to the bottom if needed
  padding: 12px 24px; // Add some padding for a bigger clickable area
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f; // Darker red on hover
    transform: scale(1.05); // Slight scaling effect on hover
    transition: all 0.3s ease; // Smooth transition for the hover effect
  }
`;
