import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { DeleteForever, Restore, AccessTime } from "@mui/icons-material";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

const DeletedPostCard = ({ post, handleDeleteForever, handleRestorePost }) => {
  const postHashtags =
    post.Hashtags && typeof post.Hashtags === "string"
      ? post.Hashtags.split(",")
      : [];

  function formatDate(jsonDate) {
    const timestamp = parseInt(jsonDate.match(/\d+/)[0], 10);
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate} ${formattedTime}`;
  }

  const postTitle = post.Title || "Untitled Post";
  const postDatetime = formatDate(post.Datetime) || "No Date Provided";
  const deleteDatetime = formatDate(post.DeletedAt) || "No Date Provided";

  const postImage = post.Image || "https://example.com/default-image.jpg";
  const postContent = post.Content || "No content available.";
  const postOwner = post.Owner || "";
  const postOwnerName = (
    <>
      {post.FirstName && post.LastName
        ? `${post.FirstName} ${post.LastName} `
        : "Unknown"}
      {postOwner === "admin" && (
        <span style={{ color: "red", fontWeight: "bold" }}>(Admin)</span>
      )}
    </>
  );

  const confirmDelete = (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the post. This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteForever(postId);
        Swal.fire({
          title: "Deleted!",
          text: "The post has been permanently deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const confirmRestore = (postId) => {
    Swal.fire({
      title: "Restore Post?",
      text: "Are you sure you want to restore this post?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, restore it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleRestorePost(postId);
        Swal.fire({
          title: "Restored!",
          text: "The post has been successfully restored.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

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
        height: "600px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 4,
        },
      }}
    >
      {/* User Avatar and Title Section */}
      <Box display="flex" alignItems="center" sx={{ p: 2, pb: 1 }}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            backgroundColor: "#6c63ff",
            marginRight: 1.5,
          }}
          alt={postOwnerName}
          src={`/${post.Avatar}`}
        />
        <Box flexGrow={1}>
          {/* Post Author Name */}
          <Typography
            variant="body2"
            color="text.primary"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontWeight: "600",
            }}
          >
            {postOwnerName}
          </Typography>

          {/* Post Date */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <AccessTime sx={{ fontSize: "14px" }} />
            {postDatetime}
          </Typography>
        </Box>
      </Box>

      {/* Title and Hashtags Section */}
      <Link to={`/post/${post.Id}`} style={{ textDecoration: "none" }}>
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: "700", marginBottom: 1 }}>
            {postTitle}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {postHashtags.map((hashtag, index) => (
              <span key={index} style={{ marginRight: 8 }}>
                #{hashtag}
              </span>
            ))}
          </Typography>
        </Box>
      </Link>

      {/* Image Section */}
      <Link to={`/post/${post.Id}`} style={{ textDecoration: "none" }}>
        <Box
          component="img"
          src={`${distributionUrl}/Posts/${postImage}`}
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
      </Link>
      {/* Content Section */}
      <Box sx={{ px: 2, py: 1 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 2,
          }}
        >
          {postContent}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "15px",
            color: "red",
          }}
        >
          Deleted At: {deleteDatetime}
        </Typography>
      </Box>

      {/* Action Section */}
      <Box display="flex" justifyContent="space-around" sx={{ p: 2, pt: 1 }}>
        <Button
          variant="outlined"
          color="success"
          startIcon={<Restore />}
          onClick={() => confirmRestore(post.Id)}
          sx={{
            borderColor: "green",
            "&:hover": {
              backgroundColor: "green",
              color: "#fff",
            },
          }}
        >
          Restore
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteForever />}
          onClick={() => confirmDelete(post.Id)}
          sx={{
            borderColor: "red",
            "&:hover": {
              backgroundColor: "red",
              color: "#fff",
            },
          }}
        >
          Delete Forever
        </Button>
      </Box>
    </Box>
  );
};

export default DeletedPostCard;
