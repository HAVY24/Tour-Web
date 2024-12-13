import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import { minHeight } from "@mui/system";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

export default function TopDealCard({ item }) {
  return (
    <Card sx={{ maxWidth: 400, objectFit: "cover" , alignItems:"center", marginBottom: "20px",}}>
      <Link to={`/detail/${item.Id}`} style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          height="140"
          image={`${distributionUrl}/Tours/${item.Image}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.Name}
            <Badge
              badgeContent={`-${Math.round(Math.random() * 100)}%`}
              color="primary"
              style={{ marginLeft: "30px" }}
            />
          </Typography>

          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} style={{ color: "gold" }} />
          ))}
          <Typography variant="body2" sx={{ color: "text.secondary", minHeight:"100px", marginTop:"20px" }}>
            {item.Description}
          </Typography>
        </CardContent>
      </Link>
     
    </Card>
  );
}
