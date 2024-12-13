import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserContext from "../../../UserContext";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
  Box,
  Chip,
  Alert,
} from "@mui/material";
import { createPost } from "../../../api/Services/PostServices";
import Swal from "sweetalert2";
import { sendImage } from "../../../api/Services/CloudServices";

const CreatePost = () => {
  const location = useLocation();

  const [title, setTitle] = useState(location.state?.data.Title || "");
  const [content, setContent] = useState(location.state?.data.Content || "");
  const [hashtags, setHashtags] = useState(location.state?.data.Hashtags || "");
  const [image, setImage] = useState(location.state?.data.Image || null);
  const [imageUpload, setImageUpload] = useState(
    location.state?.data.imageUpload || null
  );
  const [imagePreview, setImagePreview] = useState(
    location.state?.data.imagePreview || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = useContext(UserContext);
  const role = user.role;
  const user_id = user.userId;

  const data = {
    Hashtags: hashtags,
    Title: title,
    Image: image,
    Content: content,
    imagePreview: imagePreview,
    imageUpload: imageUpload,
  };

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUpload(file);
      setImage(file.name);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !hashtags) {
      setError("Title, content, and hashtags are required.");
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Title, content, and hashtags are required.",
        confirmButtonText: "OK",
      });
      return;
    }

    const hashtagsArray = hashtags
      .split(",")
      .map((hashtag) => hashtag.trim())
      .filter((hashtag) => hashtag)
      .join(",");

    const post = {
      Title: title,
      Content: content,
      Hashtags: hashtagsArray,
      Owner: role,
      Image: image,
    };

    const postData = {
      post: post,
      user_id: user_id,
    };

    setLoading(true);

    try {
      console.log(postData);
      const post = await createPost(postData);
      const res = await sendImage(imageUpload, "Posts");
      console.log(res);

      setTitle("");
      setContent("");
      setHashtags("");
      setImage(null);
      setImagePreview(null);
      setError(null);
      if (post.message == "success") {
        Swal.fire({
          icon: "success",
          title: "Post Created",
          text: "Your post has been created successfully!",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "There was an issue creating post!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      setError(error.message);

      Swal.fire({
        icon: "error",
        title: "Post Creation Failed",
        text: error.message || "Something went wrong. Please try again.",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoToProfile = () => {
    navigate(`/profile/${user.userId}/#posts`);
  };

  const handlePreviewPost = () => {
    navigate(`/post/preview`, { state: { data } });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" align="center">
          Create Post
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Hashtags (comma separated)"
            variant="outlined"
            fullWidth
            required
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Hashtags Preview */}
          <Box sx={{ marginBottom: "1.5rem" }}>
            {hashtags.split(",").map((hashtag, index) => (
              <Chip
                key={index}
                label={`#${hashtag.trim()}`}
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
          {/* File input for image */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: "1rem" }}
          />

          {/* Display image preview */}
          {imagePreview && (
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <img
                src={imagePreview}
                alt="Image Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  objectFit: "contain",
                }}
              />
            </Box>
          )}

          <Box sx={{ textAlign: "center" }}>
            <Box sx={{ textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: loading ? "#cccccc" : "#4caf50",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: loading ? "#cccccc" : "#388e3c",
                  },
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {loading ? <CircularProgress size={24} /> : "Create Post"}
              </Button>
            </Box>
          </Box>
        </form>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            variant="contained"
            onClick={handlePreviewPost}
            sx={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#6c63ff",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#5848c2",
              },
              textTransform: "uppercase",
              fontWeight: "bold",
              boxShadow: "0px 4px 10px rgba(108, 99, 255, 0.4)",
            }}
          >
            POST PREVIEW
          </Button>
        </Box>

        {/* Button to go to the profile page */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleGoToProfile}
            sx={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#ff9800",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#e68900",
              },
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Manage Posts
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreatePost;
