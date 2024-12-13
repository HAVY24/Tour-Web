import React, { useEffect, useState, useRef, useContext } from "react";
import { Typography, Box, Grid, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Card } from "antd";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  getPostByUserId,
  deleteSoftPost,
} from "../../../api/Services/PostServices";
import UserContext from "../../../UserContext";

export default function Post() {
  const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const user = useContext(UserContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostByUserId(user.userId);
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("Expected an array but got:", data);
          setPosts([]);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setPosts([]);
      }
    };
    if (user?.userId) {
      fetchPost();
    }
  }, [user]);

  const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.common.black,
  }));

  const handleDelete = async (postId) => {
    try {
      const res = await deleteSoftPost(postId);
      if (res.message === "Success") {
        Swal.fire({
          icon: "success",
          title: "Delete Successful",
          text: "You can see the deleted post in the trash can and permanently delete it.",
          confirmButtonText: "OK",
        });
        setPosts((prevPosts) => prevPosts.filter((post) => post.Id !== postId));
      } else {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: "Unable to delete the post.",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while deleting the post.",
        confirmButtonText: "OK",
      });
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const nextPage = () =>
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const prevPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <Card
      bordered={false}
      style={{
        backgroundColor: "#f0f2f5",
        borderRadius: 12,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
      }}
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h6 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Posts</h6>
            <p style={{ color: "#888" }}>Your Posts on the Blog Page</p>
          </div>
          <Link to="/create/post">
            <Button type="primary" size="large" style={{ fontWeight: "bold" }}>
              Add New Post
            </Button>
          </Link>
        </div>
      }
    >
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          {currentPosts.map((post, index) => {
            const postHashtags =
              post.Hashtags && typeof post.Hashtags === "string"
                ? post.Hashtags.split(",")
                : [];

            return (
              <Grid item xs={12} md={4} key={post.Id}>
                <Card
                  bordered={false}
                  style={{
                    width: "340px",
                    height: "400px",
                    borderRadius: 12,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  cover={
                    <img
                      alt={post.Title}
                      src={`${distributionUrl}/Posts/${post.Image}`}
                      style={{
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                        height: "240px",
                        objectFit: "cover",
                      }}
                    />
                  }
                >
                  <Typography
                    sx={{ color: "#333", fontWeight: "bold", mb: 1 }}
                    variant="subtitle1"
                  >
                    <StyledLink to={`/post/${post.Id}`}>
                      {post.Title}
                    </StyledLink>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {postHashtags.map((hashtag, index) => (
                      <span key={index} style={{ marginRight: 4 }}>
                        #{hashtag}
                      </span>
                    ))}
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {post.Status == "accept" && (
                      <>
                        <StyledLink to={`/update/post/${[post.Id]}`}>
                          <Button type="primary" style={{ fontWeight: "bold" }}>
                            UPDATE
                          </Button>
                        </StyledLink>
                        <Button
                          onClick={() =>
                            Swal.fire({
                              title: "Are you sure?",
                              text: "This post will be moved to the trash can.",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                handleDelete(post.Id);
                              }
                            })
                          }
                          style={{
                            fontWeight: "bold",
                            backgroundColor: "#ff4d4f",
                            color: "#fff",
                            borderColor: "#ff4d4f",
                          }}
                        >
                          DELETE
                        </Button>
                      </>
                    )}

                    {post.Status === "decline" && (
                      <>
                        <Typography
                          variant="body1"
                          color="error"
                          sx={{
                            fontWeight: "bold",
                            backgroundColor: "#fdecea",
                            padding: "8px 16px",
                            borderRadius: "4px",
                            width: "200px",
                          }}
                        >
                          This post has been declined.
                        </Typography>
                        <Button
                          onClick={() =>
                            Swal.fire({
                              title: "Are you sure?",
                              text: "This post will be moved to the trash can.",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                handleDelete(post.Id);
                              }
                            })
                          }
                          style={{
                            fontWeight: "bold",
                            backgroundColor: "#ff4d4f",
                            color: "#fff",
                            borderColor: "#ff4d4f",
                            marginTop: "10px",
                            height: "40px",
                          }}
                        >
                          DELETE
                        </Button>
                      </>
                    )}
                    {post.Status === "waiting" && (
                      <Typography
                        variant="body1"
                        color="warning"
                        sx={{
                          fontWeight: "bold",
                          backgroundColor: "#fff4e5",
                          padding: "8px 16px",
                          borderRadius: "4px",
                        }}
                      >
                        This post is pending approval.
                      </Typography>
                    )}
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Pagination Controls */}
      <Box textAlign="center" mt={4}>
        <Button
          type="secondary"
          onClick={prevPage}
          disabled={currentPage === 1}
          style={{ fontWeight: "bold", marginRight: "1rem" }}
        >
          Previous
        </Button>
        <span style={{ fontWeight: "bold" }}>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          type="primary"
          onClick={nextPage}
          disabled={currentPage === totalPages}
          style={{ fontWeight: "bold", marginLeft: "1rem" }}
        >
          Next
        </Button>
      </Box>
    </Card>
  );
}
