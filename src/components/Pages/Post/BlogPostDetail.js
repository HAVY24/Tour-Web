import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Paper, Chip } from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { getPostDetail } from "../../../api/Services/PostServices";
import { Avatar } from "antd";

const PostDetail = () => {
  const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;
  const { postId } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const post = await getPostDetail(postId);
        setPost(post);
      } catch (err) {
        console.error("Error getting post detail: ", err);
      }
    };
    fetchPostDetail();
  }, [postId]);

  const postHashtags =
    post.Hashtags && typeof post.Hashtags === "string"
      ? post.Hashtags.split(",")
      : [];

  return (
    <Container maxWidth="lg" sx={{ padding: "2rem 0" }}>
      {/* Blog Post Title */}
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
          backgroundImage: `url(${distributionUrl}/Posts/${post.Image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 2,
          marginBottom: "1.5rem",
          boxShadow: 2,
        }}
      />

      {/* Post Metadata */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          color: "text.secondary",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              backgroundColor: "#6c63ff",
            }}
            src={`/${post.Avatar}`}
          />
          <Typography
            variant="body2"
            sx={{ fontWeight: "500", marginLeft: "5px" }}
          >
            {post?.FirstName + " " + post?.LastName || "Author"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccessTime sx={{ marginRight: "0.5rem" }} />
          <Typography variant="body2">{post.Datetime}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}></Box>
      </Box>

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

      {/* End of Blog Post */}
    </Container>
  );
};

export default PostDetail;
