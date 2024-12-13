import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { getTourStars } from "../../../../api/Services/TourAndPackageServices";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

const Card2 = ({ item }) => {
  const navigate = useNavigate();
  const [Rating, setTourStars] = useState(0);

  const { Id, Name, Description, MinPrice, Image } = item;

  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        const response = await getTourStars(item.Id);
        setTourStars(response);
      } catch (error) {
        console.error("Error fetching tour detail:", error);
      }
    };
    fetchTourDetail();
  }, [item.Id]);

  const handleCardClick = () => {
    navigate(`/detail/${Id}`); // Chuyển hướng đến trang DetailPage với `Id`
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (Rating >= i + 1) {
        stars.push(<StarIcon key={i} sx={{ color: "gold" }} />);
      } else if (Rating > i && Rating < i + 1) {
        stars.push(<StarHalfIcon key={i} sx={{ color: "gold" }} />);
      } else {
        stars.push(<StarBorderIcon key={i} sx={{ color: "gold" }} />);
      }
    }
    return stars;
  };

  return (
    <Card
      sx={{
        margin: "10px",
        maxWidth: "300px",
        height: "500px",
        boxShadow: 3,
        cursor: "pointer",
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        sx={{ height: "180px", objectFit: "cover" }}
        image={
          `${distributionUrl}/Tours/${Image}` ||
          "https://via.placeholder.com/300"
        }
        title={Name}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ height: "80px" }}
        >
          {Name || "Default Title"}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {Description || "Default description goes here."}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ width: "100%" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <span style={{ fontWeight: "bold" }}>Price:</span>
            <Box component="span" sx={{ ml: 1 }}>
              ${MinPrice || "0.00"}
            </Box>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            Rating: {renderStars()}
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Card2;
