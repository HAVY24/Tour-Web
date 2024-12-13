import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
}));

const PostCard = ({ post, onAccept, onDecline }) => {
  const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

  const postHashtags =
    post.Hashtags && typeof post.Hashtags === "string"
      ? post.Hashtags.split(",")
      : [];
  const postTitle = post.Title || "Untitled Post";
  const postDatetime = post.Datetime || "No Date Provided";
  const postImage = post.Image
    ? `${distributionUrl}/Posts/${post.Image}`
    : "https://via.placeholder.com/300x200?text=No+Image";
  const postContent = post.Content || "No content available.";
  const postOwner = post.Owner || "";
  const postOwnerName =
    post.FirstName && post.LastName
      ? `${post.FirstName} ${post.LastName}`
      : "Unknown";

  const adminBadge =
    postOwner === "admin" ? (
      <span style={{ color: "red", fontWeight: "bold" }}>(Admin)</span>
    ) : null;

  const avatarSrc = post.Avatar
    ? `/${post.Avatar}`
    : "https://via.placeholder.com/36?text=U";

  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 500,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 4,
        },
      }}
    >
      {/* User Info */}
      <Box display="flex" alignItems="center" sx={{ p: 2, pb: 1 }}>
        <StyledLink to={`/profile/${post.UserId}`}>
          <Avatar
            sx={{ width: 36, height: 36, backgroundColor: "#6c63ff", mr: 1.5 }}
            alt={postOwnerName}
            src={avatarSrc}
          />
        </StyledLink>
        <Box>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center", fontWeight: 600 }}
          >
            <StyledLink to={`/profile/${post.UserId}`}>
              {postOwnerName}
            </StyledLink>{" "}
            {adminBadge}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
            <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
            {postDatetime}
          </Typography>
        </Box>
      </Box>

      {/* Title & Hashtags */}
      <Box sx={{ px: 2, py: 1 }}>
        <StyledLink to={`/post/${post.Id}`}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            {postTitle}
          </Typography>
        </StyledLink>
        <Typography variant="caption" color="text.secondary">
          {postHashtags.map((hashtag, index) => (
            <span key={index} style={{ marginRight: 8 }}>
              #{hashtag}
            </span>
          ))}
        </Typography>
      </Box>

      {/* Post Image */}
      <StyledLink to={`/post/${post.Id}`}>
        <Box
          component="img"
          src={postImage}
          alt={postTitle}
          sx={{
            width: "100%",
            height: 240,
            objectFit: "cover",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
      </StyledLink>

      {/* Action Buttons */}
      <Box display="flex" justifyContent="space-around" sx={{ p: 2, pt: 1 }}>
        <Button
          variant="contained"
          color="success"
          onClick={onAccept}
          fullWidth
          style={{ marginRight: "10px" }}
        >
          Accept
        </Button>
        <Button variant="outlined" color="error" onClick={onDecline} fullWidth>
          Decline
        </Button>
      </Box>
    </Box>
  );
};

export default PostCard;
