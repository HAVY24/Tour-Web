import * as React from "react";
import Typography from "@mui/material/Typography";
import SlideSouthTour from "../../../Slideshow/SlideSouthTour";
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

export default function SouthTour({ item }) {
  // Di chuyển khai báo useState vào đây để sử dụng trong component chính
  const [selectedOption, setSelectedOption] = useState(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const text = `Nam Bộ (hay còn gọi là Miền Nam) là một trong 3 miền địa lý của Việt Nam (gồm Bắc Bộ, Trung Bộ và Nam Bộ). Phần lớn địa hình Nam Bộ là đồng bằng phù sa thuộc hệ thống sông Đồng Nai và sông Cửu Long, Nam Bộ được chia làm hai vùng là Đông Nam Bộ và Đồng bằng sông Cửu Long (hay còn gọi là Tây Nam Bộ, miền Tây). Từ thế kỷ 17, Nam Bộ là phần lãnh thổ mới nhất của Việt Nam trong quá trình Nam tiến, và từng được gọi là Gia Định rồi Nam Kỳ (1832–1945). Năm 1945, nơi này được Đế quốc Việt Nam gọi là "Nam Bộ" và tên gọi này từ 1975 được tái sử dụng.

Thời Pháp thuộc, Nam Bộ là một xứ thuộc địa với tên gọi Nam Kỳ, vốn xuất hiện từ thời vua Minh Mạng của Nhà Nguyễn. Tên gọi Nam Bộ ra đời từ thời Đế quốc Việt Nam năm 1945. Nam Bộ còn được gọi là Nam Việt (1949-1954) và sau đấy là Nam Phần (1954-1975) thời Quốc gia Việt Nam và Việt Nam Cộng hòa.[1]`;

  return (
    <>
      <SlideSouthTour />
      <p className={styles.tilte_introduction}>SouthTour( Việt Nam )</p>
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
            SouthTour
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
          <p className={styles.mainText}>Discover SouthTour</p>
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
          Famous Southern tourist attractions
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
          Famous destinations in the South
        </h2>
        <TourSection2 region={"EastSide"} />
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
              Travel tips when visiting Southern
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
                  Miền Nam Việt Nam có hai mùa rõ rệt: mùa mưa (tháng 5-11) và
                  mùa khô (tháng 12-4). Mùa khô là thời điểm lý tưởng nhất để
                  tham quan, với thời tiết nắng đẹp và ít mưa. Nhiệt độ ở miền
                  Nam thường ổn định, dao động từ 25-35°C. Đừng quên mang mũ,
                  kính râm và kem chống nắng để bảo vệ cơ thể khi khám phá!
                </p>
              )}
              {selectedOption === "Vehicles" && (
                <p>
                  Các phương tiện phổ biến để di chuyển tại miền Nam gồm xe
                  khách, tàu hỏa, máy bay, và xe máy. Tại TP. Hồ Chí Minh, bạn
                  có thể sử dụng xe buýt, taxi, hoặc xe máy công nghệ để di
                  chuyển linh hoạt. Với các địa điểm như miền Tây hay Phú Quốc,
                  xe khách và tàu cao tốc là lựa chọn hợp lý. Hãy lên kế hoạch
                  để tận hưởng chuyến đi của bạn!
                </p>
              )}
              {selectedOption === "Activities" && (
                <p>
                  Miền Nam có nhiều hoạt động thú vị như tham quan chợ nổi Cái
                  Răng, khám phá rừng tràm Trà Sư, và thư giãn trên các bãi biển
                  ở Phú Quốc hay Vũng Tàu. Bạn cũng có thể trải nghiệm cuộc sống
                  đồng quê tại miền Tây sông nước và thưởng thức các món đặc sản
                  như hủ tiếu, cá kho tộ, và bánh xèo Nam Bộ!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
