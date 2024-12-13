import React, { useState } from "react";
import { Container, Typography, Box, Paper, Chip, Button } from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const PostPreview = () => {
  const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;
  const { postId } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(
    location.state?.data || {
      Hashtags: "",
      Title: "",
      Image: "",
      Content: "",
      imagePreview: "",
    }
  );

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/create/post", { state: { data: post } });
  };

  const postHashtags =
    post.Hashtags && typeof post.Hashtags === "string"
      ? post.Hashtags.split(",")
      : [];

  return (
    <Container maxWidth="lg" sx={{ padding: "2rem 0" }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "700",
          color: "#333",
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          lineHeight: 1.4,
          textShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        {post.Title}
      </Typography>

      {/* Blog Post Image */}
      <Box
        sx={{
          width: "100%",
          height: "400px",
          backgroundImage: `url(${post.imagePreview})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 2,
          marginBottom: "1.5rem",
          boxShadow: 2,
        }}
      />

      {/* Hashtags Section */}
      <Box sx={{ marginBottom: "1.5rem" }}>
        {postHashtags.map((hashtag, index) => (
          <Chip
            key={index}
            label={`#${hashtag}`}
            sx={{
              margin: "0.25rem",
              backgroundColor: "#e0e0e0",
              color: "#333",
              fontWeight: "bold",
              borderRadius: "16px",
              boxShadow: 1,
            }}
          />
        ))}
      </Box>

      {/* Blog Post Content */}
      <Paper
        sx={{
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#fafafa",
          color: "#444",
        }}
      >
        <Typography variant="body1" color="text.secondary" paragraph>
          {post.Content}
        </Typography>
      </Paper>

      {/* Buttons */}
      <Box sx={{ marginTop: "2rem", textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          sx={{ padding: "0.5rem 2rem", borderRadius: 2, marginRight: 2 }}
        >
          Back to Create Post
        </Button>
      </Box>
    </Container>
  );
};

export default PostPreview;
