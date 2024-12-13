import React, { useState, useEffect, useContext } from "react";
import { Container, Typography, Box, Grid, Tabs, Tab } from "@mui/material";
import {
  getDeletedPost,
  deletePost,
  restorePost,
} from "../../../api/Services/PostServices";
import UserContext from "../../../UserContext";
import DeletedPostCard from "./DeletedPostCard";
import DeletedTourPage from "../../Pages/Tour/DeletedTour/DeletedTourPage";

const DeletedItemsPage = () => {
  const [deletedPosts, setDeletedPosts] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const user = useContext(UserContext);
  const id = user.userId;

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchDeletedPosts = async () => {
      try {
        const posts = await getDeletedPost(id);
        console.log(posts);
        setDeletedPosts(posts);
      } catch (err) {}
    };

    fetchDeletedPosts();
  }, [id]);

  // Handle permanent deletion
  const handleDeleteForever = async (postId) => {
    try {
      await deletePost(postId);
      setDeletedPosts(deletedPosts.filter((post) => post.Id !== postId));
    } catch (err) {
      console.error("Error deleting post forever:", err);
      alert("Failed to delete post.");
    }
  };

  const handleRestorePost = async (postId) => {
    try {
      await restorePost(postId);
      setDeletedPosts(deletedPosts.filter((post) => post.Id !== postId));
    } catch (err) {
      console.error("Error restoring post:", err);
      alert("Failed to restore post.");
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ padding: "2rem 0" }}>
      {/* Tabs for switching between Deleted Posts and Deleted Tours */}
      {user.role == "admin" && (
        <>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="deleted items tabs"
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Deleted Posts" />
            <Tab label="Deleted Tours" />
          </Tabs>
          {/* Render the corresponding page based on the selected tab */}
          {activeTab === 0 && (
            <Box>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#333", marginBottom: "2rem" }}
              >
                Deleted Posts
              </Typography>
              {deletedPosts.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  No deleted posts found.
                </Typography>
              ) : (
                <Grid container spacing={3}>
                  {deletedPosts.map((post) => (
                    <Grid item xs={12} md={6} lg={4} key={post.Id}>
                      <DeletedPostCard
                        post={post}
                        handleDeleteForever={handleDeleteForever}
                        handleRestorePost={handleRestorePost}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}
          {activeTab === 1 && <DeletedTourPage />}{" "}
        </>
      )}

      {user.role == "user" && (
        <Box>
          {deletedPosts.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No deleted posts found.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {deletedPosts.map((post) => (
                <Grid item xs={12} md={6} lg={4} key={post.Id}>
                  <DeletedPostCard
                    post={post}
                    handleDeleteForever={handleDeleteForever}
                    handleRestorePost={handleRestorePost}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {/* Render the DeletedTourPage */}
    </Container>
  );
};

export default DeletedItemsPage;
