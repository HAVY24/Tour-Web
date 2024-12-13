import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Box,
  CircularProgress,
  Pagination,
} from "@mui/material";
import PostCard from "./PostCard";
import {
  getArrangeVefifyPost,
  getPostsNeedAuth,
  verifyPost,
} from "../../../api/Services/PostServices";
import FilterBox from "./FilterBox";
import Swal from "sweetalert2";

const PostManagement = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostsNeedAuth();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleFilter = async (filterType) => {
    try {
      let res;
      switch (filterType) {
        case "all":
          res = await getPostsNeedAuth();
          break;
        case "asc":
          res = await getArrangeVefifyPost("asc");
          break;
        case "desc":
          res = await getArrangeVefifyPost("desc");
          break;
        default:
          throw new Error("Invalid filter type");
      }
      setPosts(res);
    } catch (error) {
      alert("Failed to fetch data");
    }
  };

  const handleAccept = async (postId) => {
    try {
      const res = await verifyPost(postId, "accept");
      console.log(res);
      setPosts(posts.filter((post) => post.Id !== postId));

      // Success alert using SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Post Accepted",
        text: "The post has been successfully accepted!",
      });
    } catch (error) {
      // Error alert using SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to accept the post. Please try again.",
      });
    }
  };

  const handleDecline = async (postId) => {
    try {
      const res = await verifyPost(postId, "decline");
      console.log(res);
      setPosts(posts.filter((post) => post.Id !== postId));

      // Success alert using SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Post Declined",
        text: "The post has been successfully declined.",
      });
    } catch (error) {
      // Error alert using SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to decline the post. Please try again.",
      });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ padding: "2rem 0" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={2}>
          <FilterBox handleFilter={handleFilter} />
        </Grid>

        {/* Main Blog Posts */}
        <Grid item xs={12} md={10}>
          <Grid container spacing={2}>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  py: 4,
                }}
              >
                <CircularProgress />
              </Box>
            ) : currentPosts.length === 0 ? (
              <Typography
                variant="h6"
                color="text.secondary"
                align="center"
                sx={{ width: "100%", py: 4 }}
              >
                No blog posts available at the moment.
              </Typography>
            ) : (
              currentPosts.map((post) => (
                <Grid item key={post.Id} xs={12} sm={6} md={4}>
                  <PostCard
                    post={post}
                    onAccept={() => handleAccept(post.Id)}
                    onDecline={() => handleDecline(post.Id)}
                  />
                </Grid>
              ))
            )}
          </Grid>

          {/* Pagination */}
          {!loading && posts.length > postsPerPage && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: 4,
              }}
            >
              <Pagination
                count={Math.ceil(posts.length / postsPerPage)} // Total pages
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PostManagement;
