import * as React from "react";
import Typography from "@mui/material/Typography";
import SlideEuropeTour from "../../../Slideshow/SlideEuropeTour";
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

export default function EuropeTour({ item }) {
  // Di chuyển khai báo useState vào đây để sử dụng trong component chính
  const [selectedOption, setSelectedOption] = useState(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const text = `Châu Âu hay Âu Châu (tiếng Latinh: Europa, tiếng Anh: Europe) về mặt địa chất và địa lý là một bán đảo hay tiểu lục địa, hình thành nên phần cực tây của đại lục Á-Âu, hay thậm chí Âu-Phi-Á, tùy cách nhìn. Theo quy ước, nó được coi là lục địa, trong trường hợp này chỉ là sự phân biệt thuần về văn hóa hơn là địa lý. Phía Bắc giáp Bắc Băng Dương, phía Tây giáp Đại Tây Dương, phía Nam giáp Địa Trung Hải và biển Đen, tuy nhiên về phía Đông thì hiện không rõ ràng. Tuy nhiên có thể coi dãy núi Ural được coi là vùng đất với địa lý và kiến tạo rõ rệt đánh dấu ranh giới giữa châu Á và châu Âu (xem chi tiết trong bài Địa lý châu Âu). Khi được coi là lục địa thì châu Âu thuộc loại nhỏ thứ 2 thế giới về diện tích, vào khoảng 10.180.000 km², và chỉ lớn hơn Châu Đại Dương. Xét về dân số thì nó là lục địa xếp thứ 4 sau châu Á, châu Phi và châu Mỹ.`;

  return (
    <>
      <SlideEuropeTour />
      <p className={styles.tilte_introduction}>EuropeTour( Châu Âu )</p>
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
            EuropeTour
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
          <p className={styles.mainText}>Discover EuropeTour</p>
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
          Famous Europe tourist attractions
        </h2>
        <TourSection2 region={"EuropeTour"} />
        <hr className={styles.separator} />
        <h2
          style={{
            width: "70%",
            margin: "35px auto -35px auto",
            textAlign: "left",
            fontSize: "24px",
          }}
        >
          Famous destinations in the Europe
        </h2>
        <TourSection2 region={"AmericaTour"} />
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
        <TourSection2 region={"AsiaTour"} />
      </div>
      <div className={styles.Taskbox}>
        <div className={styles.tipsContainer}>
          <div className={styles.iconTaskCircle}>
            <FactCheckIcon />
          </div>
          <div className={styles.tasktext}>
            <p className={styles.mainTaskText}>
              Travel tips when visiting Europe
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
                  Châu Âu có khí hậu ôn đới với bốn mùa rõ rệt. Mùa xuân (tháng
                  3-5) và mùa thu (tháng 9-11) là thời điểm lý tưởng nhất để du
                  lịch, với thời tiết mát mẻ và cảnh sắc thiên nhiên rực rỡ. Mùa
                  đông (tháng 12-2) là mùa của lễ hội và các hoạt động trượt
                  tuyết, trong khi mùa hè (tháng 6-8) lại là mùa du lịch cao
                  điểm với nhiệt độ ấm áp.
                </p>
              )}
              {selectedOption === "Vehicles" && (
                <p>
                  Châu Âu có hệ thống giao thông phát triển với tàu cao tốc, xe
                  buýt và máy bay giá rẻ. Tàu điện ngầm là phương tiện phổ biến
                  tại các thành phố lớn như Paris, London, hay Berlin. Để khám
                  phá các vùng nông thôn, xe hơi hoặc xe đạp là lựa chọn lý
                  tưởng. Hãy sử dụng thẻ Eurail để tiết kiệm chi phí khi di
                  chuyển giữa các quốc gia!
                </p>
              )}
              {selectedOption === "Activities" && (
                <p>
                  Châu Âu nổi tiếng với các hoạt động văn hóa và lịch sử như
                  tham quan tháp Eiffel, đấu trường La Mã Colosseum, hoặc khám
                  phá lâu đài Neuschwanstein. Bạn cũng có thể trải nghiệm các lễ
                  hội độc đáo như Oktoberfest ở Đức hay lễ hội ánh sáng tại
                  Lyon. Đừng quên thử các món ăn nổi tiếng như pizza Ý, bánh
                  sừng bò Pháp và xúc xích Đức!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
