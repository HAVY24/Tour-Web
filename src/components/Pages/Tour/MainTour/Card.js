import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

export default function TourCard({ item }) {
  return (
    <Card
      sx={{
        width: "100%",
        minHeight: "420px",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)", // Stronger shadow for depth
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        backgroundColor: "#ffffff", // Subtle background color
        "&:hover": {
          transform: "translateY(-8px)", // Lift card on hover
          boxShadow: "0 12px 36px rgba(0, 0, 0, 0.2)", // Enhanced hover shadow
        },
      }}
    >
      {/* Tour Image */}
      <Link to={`/detail/${item.Id}`}>
        <CardMedia
          component="img"
          image={`${distributionUrl}/Tours/${item.Image}`} // API Image
          alt={item.Name}
          sx={{
            height: "240px",
            objectFit: "cover",
          }}
        />
      </Link>

      {/* Card Content */}
      <Link to={`/detail/${item.Id}`} style={{ textDecoration: "none" }}>
        <CardContent
          sx={{
            padding: "20px",
          }}
        >
          {/* Tour Name */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              fontSize: "1.25rem",
              marginBottom: "12px",
              textAlign: "center",
              color: "primary.main", // Use theme primary color
            }}
          >
            {item.Name}
          </Typography>

          {/* Region and Country */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "text.secondary",
              }}
            >
              Region: {item.Region}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "text.secondary",
              }}
            >
              Country: {item.Country}
            </Typography>
          </Box>

          {/* Tour Price */}
          <Box
            sx={{
              textAlign: "center",
              marginTop: "12px",
              padding: "8px 16px",
              borderRadius: "8px",
              backgroundColor: "rgba(249, 115, 11, 0.1)", // Soft orange background
              color: "rgb(249, 115, 11)", // Bright orange text
              fontWeight: 700,
              fontSize: "1rem",
            }}
          >
            {item.MinPrice
              ? `Price: $${item.MinPrice}`
              : "Contact us for pricing"}
          </Box>
        </CardContent>
      </Link>
    </Card>
  );
}
