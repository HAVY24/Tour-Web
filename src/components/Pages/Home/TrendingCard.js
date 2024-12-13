import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { getTourStars } from "../../../api/Services/TourAndPackageServices";
import { NoEncryption } from "@mui/icons-material";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: "0 auto",
  borderRadius: "15px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)",
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200,
  backgroundSize: "cover",
  borderRadius: "15px 15px 0 0",
});

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledTypographyTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

const StyledTypographyDetails = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
}));

const StyledStarIcon = styled(StarIcon)({
  color: "#FFD700",
  verticalAlign: "middle",
  marginRight: "4px",
});

const StyledPrice = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginTop: theme.spacing(1),
}));

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  justifyContent: "space-between",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.primary.main,
  transition: "color 0.3s ease",
  "&:hover": {
    color: theme.palette.primary.dark,
  },
}));

const TrendingCard = ({ item }) => {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTourStars(item.Id);
      setStars(res);
    };
    fetchData();
  }, []);

  const {
    Name: title,
    Image: img,
    Price: price,
    starRating = stars,
    available,
  } = item;

  return (
    <StyledCard>
      <Link to={`/detail/${item.Id}`}>
        <StyledCardMedia
          image={`${distributionUrl}/Tours/${img}`}
          title={title}
        />
      </Link>
      <StyledCardContent>
        <StyledTypographyTitle>{title}</StyledTypographyTitle>
        <Link to={`/detail/${item.Id}`} style={{ textDecoration: "none" }}>
          <StyledTypographyDetails>
            <Typography component="span">
              {available ? "Available for booking" : "Sold out"}
            </Typography>
            <br />
            <StyledStarIcon />
            <span>{starRating ? starRating : "0"}</span>
            <br />
            <StyledPrice>
              {price ? `${price} VND` : "Contact us for more details"}
            </StyledPrice>
          </StyledTypographyDetails>
        </Link>
      </StyledCardContent>
      <StyledCardActions>
        <StyledButton>Share</StyledButton>
        <Link to={`/detail/${item.Id}`}>
          <StyledButton>Detail</StyledButton>
        </Link>
      </StyledCardActions>
    </StyledCard>
  );
};

export default TrendingCard;
