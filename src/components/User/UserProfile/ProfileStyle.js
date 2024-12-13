export const cardProfileStyle = {
  borderRadius: "20px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
};

export const cardProfileImageStyle = {
  position: "relative", // Set relative positioning on the parent to control absolute child positioning
  height: "200px",
  width: "200px",
};

export const imgStyle = {
  position: "absolute", // Make the image position absolute
  top: "-30%", // Push the image upwards to overlap
  left: "-30%", // Push the image left to overlap
  width: "100%", // Increase the size of the image
  height: "100%", // Ensure it covers the full height
  objectFit: "cover", // Keep the aspect ratio and cover the area
  borderRadius: "50%", // Keep it rounded
  border: "3px solid white", // Optional border for the image
  zIndex: 10, // Ensure the image is above the other content
};

export const imgStyle2 = {
  position: "absolute", // Make the image position absolute
  top: "-30%", // Push the image upwards to overlap
  left: "20%", // Push the image left to overlap
  width: "100%", // Increase the size of the image
  height: "100%", // Ensure it covers the full height
  objectFit: "cover", // Keep the aspect ratio and cover the area
  borderRadius: "50%", // Keep it rounded
  border: "3px solid white", // Optional border for the image
  zIndex: 10, // Ensure the image is above the other content
};

export const cardHeaderStyle = {
  backgroundColor: "#f7f7f7",
  borderRadius: "20px",
  padding: "1rem 2rem",
};

export const buttonStyle = {
  borderRadius: "50px",
};

export const cardBodyStyle = {
  backgroundColor: "#ffffff", // Light background color
  borderColor: "#f0f0f0", // Subtle border color
  color: "#333", // Text color (dark gray)
  padding: "2rem",
  marginTop: "-90px",
};

export const cardStatsStyle = {
  display: "flex",
  justifyContent: "space-around", // Space out the items evenly
  marginTop: "2rem",
  marginBottom: "2rem",
  flexDirection: "row", // Ensure horizontal layout
  alignItems: "center", // Align items vertically centered
  gap: "1rem", // Add gap between the items (adjust as necessary)
};

export const nameStyle = {
  fontWeight: "600",
  fontSize: "2rem",
  color: "#333",
};

export const lightFontStyle = {
  fontWeight: "300",
};

export const locationStyle = {
  color: "#777",
};

export const jobStyle = {
  color: "#777",
};

export const educationStyle = {
  color: "#777",
};

export const descriptionStyle = {
  color: "#777",
};

export const showMoreLinkStyle = {
  color: "#4c9e9e",
};

export const settingsCardStyle = {
  borderRadius: "20px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
};

export const headingStyle = {
  fontWeight: "500",
  fontSize: "1.2rem",
  color: "#4c9e9e",
};

export const inputStyle = {
  borderRadius: "10px",
  boxShadow: "none",
  border: "1px solid #ddd",
  padding: "0.75rem 1rem",
  fontSize: "1rem",
};

export const textareaStyle = {
  resize: "none",
  minHeight: "100px",
};

export const buttonContainerStyle = {
  marginTop: "2rem",
};

export const containerStyle = {
  maxWidth: "1200px", // Limit the container width to center the layout
  margin: "0 auto", // Center the container
  padding: "0 1.5rem", // Add some padding for smaller screens
};
