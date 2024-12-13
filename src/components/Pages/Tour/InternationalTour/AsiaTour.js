import * as React from "react";
import Typography from "@mui/material/Typography";
import SlideAsiaTour from "../../../Slideshow/SlideAsiaTour";
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

export default function AsiaTour({ item }) {
  // Di chuyển khai báo useState vào đây để sử dụng trong component chính
  const [selectedOption, setSelectedOption] = useState(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const text = `Châu Á phần lớn nằm ở Bắc bán cầu, là châu lục có diện tích lớn nhất trên thế giới. Thiên nhiên của châu Á rất đa dạng. Diện tích châu lục này bao phủ 8,7% tổng diện tích Trái Đất (hoặc chiếm 29,4% tổng diện tích lục địa).

Đại bộ phận lãnh thổ châu Á nằm ở Bắc Bán cầu và Bán cầu Đông. Ranh giới giữa châu Á với châu Phi là kênh đào Suez, với châu Âu là Dãy núi Ural, sông Ural, Biển Caspi, mạch núi Kavkaz, eo biển Thổ Nhĩ Kỳ, biển Địa Trung Hải và Biển Đen. Bốn điểm cực đất liền lớn châu Á: điểm cực đông là mũi Dezhnev ở eo biển Bering (66°4′45″B, 169°39′7″T), điểm cực nam là mũi Tanjung Piai ở eo biển Malacca (1°16′B, 103°31′Đ)[5], điểm cực tây là mũi Baba ở biển Aegea (39°27′B, 26°3′Đ), điểm cực bắc là mũi Chelyuskin ở eo biển Vilkitsky (77°44′B, 104°15′Đ).

Hang lớn nhất là hang Sơn Đoòng (hang động tự nhiên lớn nhất thế giới), Đỉnh núi cao nhất là đỉnh Everest (cao nhất thế giới), điểm thấp nhất là sụt lún Biển Chết (thấp nhất thế giới), cao nguyên cao nhất là cao nguyên Thanh Tạng (cao nhất thế giới), sông dài nhất là Trường Giang (dài thứ ba thế giới), hồ lớn nhất là biển Caspi (lớn nhất thế giới), hồ sâu nhất là hồ Baikal (sâu nhất thế giới), sa mạc lớn nhất là sa mạc Arabi (lớn thứ năm thế giới). Vượt qua kinh độ và vĩ độ rộng vô cùng, chênh lệch thời gian đông - tây đạt đến từ 11 đến 13 giờ đồng hồ. Vùng đất phía tây và châu Âu nối liền lẫn nhau, hình thành lục địa Âu – Á - lục địa lớn nhất trên Trái Đất. Trừ đất liền ra, diện tích đảo lớn và đảo cồn của châu Á chừng 2,7 triệu kilômét vuông, chỉ đứng sau Bắc Mỹ.

Châu Á là nơi bắt nguồn ba tôn giáo lớn của thế giới Phật giáo, Hồi giáo và Cơ Đốc giáo. Trong bốn nước xưa có nền văn minh lớn thì có ba nước xưa ở vào châu Á (Ấn Độ, Iraq (Lưỡng Hà) và Trung Quốc).

Trong số các quốc gia và vùng lãnh thổ thuộc châu Á, Nhật Bản, Hàn Quốc, Đài Loan, Singapore, Israel, Hồng Kông và Ma Cao được công nhận là những quốc gia và vùng lãnh thổ có nền kinh tế công nghiệp phát triển, số còn lại là các nước đang phát triển, trong đó, Trung Quốc và Ấn Độ là 2 nước đang phát triển có diện tích và dân số lớn nhất trên thế giới.`;

  return (
    <>
      <SlideAsiaTour />
      <p className={styles.tilte_introduction}>AsiaTour( Châu Á )</p>
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
            AsiaTour
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
          <p className={styles.mainText}>Discover AsiaTour</p>
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
          Famous Asia tourist attractions
        </h2>
        <TourSection2 region={"AsiaTour"}/>
        <hr className={styles.separator} />
        <h2
          style={{
            width: "70%",
            margin: "35px auto -35px auto",
            textAlign: "left",
            fontSize: "24px",
          }}
        >
          Famous destinations in the Asia
        </h2>
        <TourSection2 region={"AmericaTour"}/>
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
        <TourSection2 region={"EuropeTour"}/>
      </div>
      <div className={styles.Taskbox}>
        <div className={styles.tipsContainer}>
          <div className={styles.iconTaskCircle}>
            <FactCheckIcon />
          </div>
          <div className={styles.tasktext}>
            <p className={styles.mainTaskText}>
              Travel tips when visiting Asia
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
                  Châu Á có khí hậu rất đa dạng, từ khí hậu nhiệt đới ở Đông Nam
                  Á, khí hậu ôn đới ở Đông Á, đến khí hậu lục địa ở Trung Á.
                  Thời điểm du lịch lý tưởng phụ thuộc vào khu vực: mùa thu và
                  mùa xuân ở Nhật Bản, mùa khô (tháng 11-2) ở Đông Nam Á, và mùa
                  hè ở vùng Trung Á như Kazakhstan. Hãy kiểm tra thời tiết cụ
                  thể trước khi lên kế hoạch!
                </p>
              )}
              {selectedOption === "Vehicles" && (
                <p>
                  Châu Á có nhiều phương tiện di chuyển như tàu cao tốc ở Nhật
                  Bản và Trung Quốc, xe buýt và xe máy phổ biến tại Đông Nam Á.
                  Tại các thành phố lớn như Tokyo, Seoul hay Bangkok, tàu điện
                  ngầm là lựa chọn tiện lợi. Đối với các chuyến đi xa hơn, máy
                  bay nội địa là phương tiện phù hợp để tiết kiệm thời gian.
                </p>
              )}
              {selectedOption === "Activities" && (
                <p>
                  Châu Á có vô vàn hoạt động thú vị như chiêm ngưỡng hoa anh đào
                  tại Nhật Bản, khám phá vịnh Hạ Long ở Việt Nam, và tham quan
                  ngôi đền Taj Mahal ở Ấn Độ. Đừng bỏ qua cơ hội thưởng thức ẩm
                  thực đa dạng như sushi, dim sum, phở, và các món ăn đường phố
                  ở Thái Lan. Châu Á là điểm đến lý tưởng cho mọi loại hình du
                  lịch!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
