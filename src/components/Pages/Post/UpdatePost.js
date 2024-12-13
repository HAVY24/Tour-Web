import React, { useEffect, useState } from "react";
import { Input, Button, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getPostDetail, updatePost } from "../../../api/Services/PostServices";
import { Box, CardMedia } from "@mui/material";
import { sendImage } from "../../../api/Services/CloudServices";

export default function UpdatePost() {
  const distributorUrl = process.env.REACT_APP_DISTRIBUTION_URL;

  const { postId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const post = await getPostDetail(postId);
        setTitle(post.Title);
        setContent(post.Content || "");
        setHashtags(post.Hashtags || "");
        setImage(post.Image || "");
        setLoading(false);
      } catch (err) {
        console.error(err);
        message.error("Failed to load post details.");
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const updatedPost = {
        Title: title,
        Content: content,
        Hashtags: hashtags,
        Image: image,
      };
      await updatePost(updatedPost, postId);
      await sendImage(uploadImage, "Posts");

      message.success("Post updated successfully!");
      navigate("/blog");
    } catch (err) {
      console.error(err);
      message.error("Failed to update post.");
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadImage(file);
      setImage(file.name); // Store the file
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
        marginTop: "100px",
        padding: "2rem",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: 12,
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Update Post</h2>
      <div style={{ marginBottom: "1rem" }}>
        <label>Post Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Content</label>
        <Input.TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder="Enter the content"
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Hashtags</label>
        <Input
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          placeholder="Enter hashtags separated by commas"
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Post Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: "1rem" }}
        />

        {!imagePreview && (
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <img
              src={
                `${distributorUrl}/Posts/${image}` ||
                "https://via.placeholder.com/300"
              }
              alt="Image Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "300px",
                objectFit: "contain",
              }}
            />
          </Box>
        )}

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
        {image && (
          <img
            src={image}
            alt="Uploaded"
            style={{
              marginTop: "1rem",
              maxHeight: 150,
              display: "block",
              borderRadius: 8,
            }}
          />
        )}
      </div>
      <div style={{ textAlign: "center" }}>
        <Button
          type="primary"
          onClick={handleUpdate}
          loading={loading}
          style={{ width: "100%" }}
        >
          Update Post
        </Button>
      </div>
    </div>
  );
}
