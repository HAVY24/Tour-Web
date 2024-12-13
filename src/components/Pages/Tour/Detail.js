import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPackageByTourId,
  getReviews,
  getTourDetail,
  getTourStars,
} from "../../../api/Services/TourAndPackageServices";
import DetailCard from "./DetailCard";

export default function DetailPage() {
  const { tourId } = useParams();
  const [tour, setTour] = useState(null);
  const [packages, setPackages] = useState([]);
  const [tourstars, setTourStars] = useState(0);
  const [reviews, setReviews] = useState([]);

  // Get info tour
  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        const response = await getTourDetail(tourId);
        setTour(response);
      } catch (error) {
        console.error("Error fetching tour detail:", error);
      }
    };
    fetchTourDetail();
  }, [tourId]);

  // Get info Tourpackage
  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        const response = await getPackageByTourId(tourId);
        setPackages(response);
      } catch (error) {
        console.error("Error fetching tour detail:", error);
      }
    };
    fetchTourDetail();
  }, [tourId]);

  // Get info TourStar
  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        const response = await getTourStars(tourId);
        setTourStars(response);
      } catch (error) {
        console.error("Error fetching tour detail:", error);
      }
    };
    fetchTourDetail();
  }, [tourId]);

  //Get info Review
  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        const response = await getReviews(tourId);
        setReviews(response);
      } catch (error) {
        console.error("Error fetching tour detail:", error);
      }
    };
    fetchTourDetail();
  }, [tourId]);

  // Hiển thị thông báo nếu không tìm thấy tour
  if (!tour) return <div>Loading...</div>;

  return (
    <div>
      <DetailCard
        item={tour}
        packages={packages}
        rating={tourstars}
        reviews={reviews}
      />
    </div>
  );
}
