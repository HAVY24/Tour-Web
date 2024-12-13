import * as React from "react";
import Typography from "@mui/material/Typography";
import SlideMiddleTour from "../../../Slideshow/SlideMiddleTour";
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

export default function MiddleTour({ item }) {
  // Di chuyển khai báo useState vào đây để sử dụng trong component chính
  const [selectedOption, setSelectedOption] = useState(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const text = `Trung Bộ (hay còn gọi là Miền Trung) là khu vực địa lý nằm ở phần giữa đất liền của Việt Nam, nối Bắc Bộ với Nam Bộ. Hiện nay, Trung Bộ là miền có diện tích lớn nhất trong 3 miền tại Việt Nam với 151.234 km². Trung Bộ có nhiều đồi núi lan sát ra biển, chia cắt các đồng bằng nhỏ hẹp. Khí hậu và phần lớn đất đai thường khắc nghiệt hơn hai miền còn lại. Trung Bộ được chia thành 3 khu vực là vùng Bắc Trung Bộ, vùng Duyên hải Nam Trung Bộ và vùng Tây Nguyên; với trung tâm là thành phố TW Đà Nẵng. Tùy vào ngữ cảnh, một phần của Bắc Trung Bộ cùng với vùng Bắc Bộ được gọi chung là Miền Bắc Việt Nam; Tây Nguyên, Duyên hải Nam Trung Bộ, phần còn lại của Bắc Trung Bộ cùng với vùng Nam Bộ được gọi chung là Miền Nam Việt Nam.

Trung Bộ nằm ở vị trí chuyển tiếp giữa Bắc Bộ và Nam Bộ. Ngoài hai xứ Thanh – Nghệ, Trung Bộ chứng kiến quá trình Nam tiến của người Việt diễn ra trên lãnh thổ từng thuộc nước Chăm Pa cổ. Các xung đột quân sự và ranh giới chia cắt Việt Nam trong một số thời kỳ lịch sử như thời Trịnh – Nguyễn phân tranh và Chiến tranh Việt Nam cũng nằm trên Trung Bộ.

Thời Pháp thuộc, Trung Bộ là một xứ bảo hộ lấy tên là Trung Kỳ, vốn có từ thời vua Minh Mạng của Nhà Nguyễn. Tên gọi Trung Bộ ra đời từ thời Đế quốc Việt Nam năm 1945. Trung Bộ còn được gọi là Trung Phần (1948–1975) dưới thời Quốc gia Việt Nam và Việt Nam Cộng hòa.`;

  return (
    <>
      <SlideMiddleTour />
      <p className={styles.tilte_introduction}>MiddleTour( Việt Nam )</p>
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
            MiddleTour
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
          <p className={styles.mainText}>Discover MiddleTour</p>
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
          Famous Midthern tourist attractions
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
          Famous destinations in the Middle
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
        <TourSection2 region={"NorthSide"} />
      </div>
      <div className={styles.Taskbox}>
        <div className={styles.tipsContainer}>
          <div className={styles.iconTaskCircle}>
            <FactCheckIcon />
          </div>
          <div className={styles.tasktext}>
            <p className={styles.mainTaskText}>
              Travel tips when visiting Midthern
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
                  Miền Trung Việt Nam có khí hậu nhiệt đới gió mùa, chia thành
                  hai mùa chính: mùa mưa (tháng 9-12) và mùa khô (tháng 1-8).
                  Mùa khô là thời điểm lý tưởng nhất để khám phá, với bầu trời
                  trong xanh và nắng nhẹ. Trong mùa mưa, một số vùng có thể bị
                  ảnh hưởng bởi bão, đặc biệt từ tháng 9-11. Đừng quên kiểm tra
                  thời tiết trước khi lên kế hoạch!
                </p>
              )}
              {selectedOption === "Vehicles" && (
                <p>
                  Các phương tiện phổ biến để khám phá miền Trung bao gồm xe
                  khách, tàu hỏa và máy bay. Nếu tham quan các thành phố như Đà
                  Nẵng, Hội An, bạn có thể thuê xe máy hoặc xe đạp để di chuyển
                  linh hoạt. Với các điểm xa hơn như Huế hay Phong Nha, tàu hỏa
                  và xe khách là lựa chọn hợp lý. Hãy chọn phương tiện phù hợp
                  với nhu cầu của bạn!
                </p>
              )}
              {selectedOption === "Activities" && (
                <p>
                  Các hoạt động thú vị tại miền Trung gồm tham quan phố cổ Hội
                  An, khám phá di sản Huế, và tắm biển tại Đà Nẵng hoặc Nha
                  Trang. Bạn cũng có thể trải nghiệm đi thuyền trên sông Hương
                  hay khám phá hệ thống hang động ở Phong Nha - Kẻ Bàng. Đừng
                  quên thưởng thức đặc sản như mì Quảng, bánh xèo, và cao lầu!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
