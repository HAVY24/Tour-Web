import SlideNorthTour from "../../../Slideshow/SlideNorthTour";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import styles from "../../../../styles/NorthTour.module.css";
import { useState } from "react";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import TourSection2 from "../ChildTour/TourSection2";
import FactCheckIcon from "@mui/icons-material/FactCheck";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function NorthTour({ item }) {
  // Di chuyển khai báo useState vào đây để sử dụng trong component chính
  const [selectedOption, setSelectedOption] = useState(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const text = `Miền Bắc Việt Nam là một khái niệm để chỉ vùng địa lý ở phía bắc nước Việt Nam. Tuy nhiên, tùy theo từng thời điểm lịch sử và thói quen sử dụng mà khái niệm này đôi lúc còn được dùng để chỉ các vùng lãnh thổ chính trị khác nhau một cách không chính thức.

Miền Bắc Việt Nam có thể là:
- Phân định địa lý đồng nghĩa với Bắc Bộ Việt Nam
- Phân định địa chính trị ở phía bắc sông Gianh (nay thuộc tỉnh Quảng Bình) (Đàng Ngoài)
- Phân định hành chính đồng nghĩa với Bắc Kỳ hay Bắc Thành của nhà Nguyễn vào thời Pháp thuộc và là một trong 3 vùng lãnh thổ chính (gồm Bắc Bộ, Trung Bộ và Nam Bộ) của Việt Nam.
- Phân định theo Hiệp định Genève là khu vực tập kết quân sự tạm thời của Quân đội nhân dân Việt Nam và khu vực thuộc quyền quản lý hành chính tạm thời của Việt Nam Dân chủ Cộng hòa nằm phía bắc giới tuyến quân sự tạm thời là vĩ tuyến 17. Căn cứ Điều 14, Khoản a trong Hiệp định Geneve 1954, Việt Nam Dân chủ Cộng hòa có chủ quyền trên toàn bộ lãnh thổ Việt Nam, tạm thời có quyền quản lý hành chính phía bắc vĩ tuyến 17 cho tới khi tổ chức tổng tuyển cử trên toàn Việt Nam. Liên hiệp Pháp từ bỏ chủ quyền và quyền chủ quyền ở Việt Nam nhưng vẫn có quyền quản lý hành chính phía Nam vĩ tuyến 17.
- Ngày nay, miền Bắc Việt Nam được hiểu là phần lãnh thổ các tỉnh từ Hà Giang tới Ninh Bình.`;

  return (
    <>
      <SlideNorthTour />
      <p className={styles.tilte_introduction}>NorthTour( Việt Nam )</p>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            color: "rgba(3, 18, 26, 1)", // Màu mặc định
            fontSize: "13px",
            lineHeight: "40px",
            margin: "18px auto",
            width: "70%",
            textAlign: "left",
            fontWeight: "bold",
          }}
        >
          <Link
            underline="hover"
            color="inherit"
            to="/tour"
            className="breadcrumbsLink"
            sx={{
              color: "rgb(255,165,0)", // Màu cho link
              "&:hover": {
                color: "rgb(255,165,0)", // Màu khi hover
                textDecoration: "underline",
              },
            }}
          >
            Tour
          </Link>
          <Link
            underline="hover"
            color="inherit"
            to="/tour"
            sx={{
              color: "rgb(255,165,0)", // Màu cho link
              "&:hover": {
                color: "rgb(255,165,0)", // Màu khi hover
                textDecoration: "underline",
              },
            }}
          >
            DomesticTour
          </Link>
          <Typography
            sx={{
              color: "rgba(3, 18, 26, 1)",
              fontWeight: "bold", // Màu và kiểu chữ cho Typography
            }}
          >
            NorthTour
          </Typography>
        </Breadcrumbs>
      </div>

      {/* Nội dung với chức năng See More/See Less */}
      <div className={styles.SeeLessMore}>
        <p>
          {isExpanded ? text : `${text.slice(0, 380)}...`}{" "}
          {/* Hiển thị phần ngắn hoặc dài tùy vào trạng thái */}
        </p>

        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "See less" : "Read more"}
        </button>
      </div>
      {/* icon tip */}
      <div className={styles.tipsContainer}>
        <div className={styles.iconCircle}>
          <TipsAndUpdatesIcon />
        </div>
        <div className={styles.text}>
          <p className={styles.mainText}>Discover NorthTour</p>
          <p className={styles.subText}>
            Tour the highlights of this destination
          </p>
        </div>
      </div>
      <div className="Slider">
        <hr className={styles.separator} />
        <h2
          style={{
            width: "70%",
            margin: "35px auto -35px auto",
            textAlign: "left",
            fontSize: "24px",
          }}
        >
          Famous Northern tourist attractions
        </h2>
        <TourSection2 region={"NorthSide"} />
        <hr className={styles.separator} />
        <h2
          style={{
            width: "70%",
            margin: "35px auto -35px auto",
            textAlign: "left",
            fontSize: "24px",
          }}
        >
          Famous destinations in the North
        </h2>
        <TourSection2 region={"SouthSide"} />
        <hr className={styles.separator} />
        <h2
          style={{
            width: "70%",
            margin: "35px auto -35px auto",
            textAlign: "left",
            fontSize: "24px",
          }}
        >
          Other destinations
        </h2>
        <TourSection2 region={"WestSide"} />
      </div>
      <div className={styles.Taskbox}>
        <div className={styles.tipsContainer}>
          <div className={styles.iconTaskCircle}>
            <FactCheckIcon />
          </div>
          <div className={styles.tasktext}>
            <p className={styles.mainTaskText}>
              Travel tips when visiting Northern
            </p>
            <p className={styles.subTaskText}>
              Things you need to know before coming here
            </p>
          </div>
        </div>
        <hr className={styles.Taskseparator} />

        {/* Nội dung bổ sung vào bên trong TaskBox */}
        <div className={styles.transportContainer}>
          <div className={styles.transportButtons}>
            <button
              className={styles.transportButton}
              onClick={() => setSelectedOption("Weather")}
            >
              Weather
            </button>
            <button
              className={styles.transportButton}
              onClick={() => setSelectedOption("Vehicles")}
            >
              Vehicles
            </button>
            <button
              className={styles.transportButton}
              onClick={() => setSelectedOption("Activities")}
            >
              Activities
            </button>
          </div>
          {selectedOption && (
            <div className={styles.transportInfo}>
              {selectedOption === "Weather" && (
                <p>
                  Miền Bắc Việt Nam có bốn mùa rõ rệt: Xuân, Hạ, Thu, Đông. Mùa
                  thu (tháng 9-11) với khí hậu mát mẻ và nắng dịu là thời điểm
                  lý tưởng nhất để du lịch. Mùa đông (tháng 12-2) khá lạnh, đặc
                  biệt tại các vùng núi như Sapa, có thể xuống dưới 0°C. Đừng
                  quên chuẩn bị trang phục phù hợp với thời tiết!
                </p>
              )}
              {selectedOption === "Vehicles" && (
                <p>
                  Các phương tiện di chuyển phổ biến ở miền Bắc gồm xe khách,
                  tàu hỏa, và máy bay. Nếu thăm Hà Nội, bạn có thể sử dụng taxi
                  hoặc xe buýt để khám phá thành phố. Với các điểm đến như Sapa
                  hay Hà Giang, xe máy là lựa chọn lý tưởng để chiêm ngưỡng cảnh
                  đẹp. Hãy chọn phương tiện phù hợp với lịch trình của bạn!
                </p>
              )}
              {selectedOption === "Activities" && (
                <p>
                  Các hoạt động nổi bật tại miền Bắc gồm trekking tại Sapa, chèo
                  thuyền kayak ở vịnh Hạ Long, và tham quan phố cổ Hà Nội. Bạn
                  cũng có thể khám phá các bản làng dân tộc thiểu số để trải
                  nghiệm văn hóa đặc sắc. Đừng bỏ lỡ cơ hội thưởng thức ẩm thực
                  địa phương như phở, bún chả, và chả cá Lã Vọng!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
