import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Box,
  CircularProgress,
  Pagination,
} from "@mui/material";
import PostCard from "../Post/PostCard";
import { getArrangePost, getPosts } from "../../../api/Services/PostServices";
import FilterBox from "../Post/FilterBox";

const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPosts();
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
          res = await getPosts();
          break;
        case "asc":
          res = await getArrangePost("asc");
          break;
        case "desc":
          res = await getArrangePost("desc");
          break;
        default:
          throw new Error("Invalid filter type");
      }
      setPosts(res);
    } catch (error) {
      alert("Failed to fetch data");
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
                  <PostCard post={post} />
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

export default BlogSection;
