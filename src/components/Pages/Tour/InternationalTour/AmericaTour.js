import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import styles from "../../../../styles/NorthTour.module.css";
import { useState } from "react";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import TourSection2 from "../ChildTour/TourSection2";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import SlideAmericaTour from "../../../Slideshow/SlideAmericaTour";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function AmericaTour({ item }) {
  // Di chuyển khai báo useState vào đây để sử dụng trong component chính
  const [selectedOption, setSelectedOption] = useState(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const text = `Tên gọi trong tiếng Việt của châu Mỹ bắt nguồn từ tên gọi tiếng Trung "美洲" (Hán-Việt: Mỹ châu). Chữ "Mỹ" 美 trong "Mỹ châu" 美洲 là gọi tắt của "Á Mỹ Lợi Gia" 亞美利加.[1][2] "Á Mỹ Lợi Gia" (亞美利加 - "Yà měi lì jiā") là phiên âm tiếng Trung của danh xưng tiếng Bồ Đào Nha "América".[3]

Việc sử dụng lần đầu tiên cái tên America cho vùng đất rộng lớn này được biết đến là vào ngày 25 tháng 4 năm 1507, và được sử dụng để chỉ nơi mà ngày nay là Nam Mỹ. Nó xuất hiện lần đầu tiên trên một bản đồ thế giới với 12 múi giờ, cùng với một bản đồ treo tường lớn nhất làm ra từ trước đến nay, cả hai đều do người chuyên vẽ bản đồ người Đức là Martin Waldseemüller vẽ tại Saint-Dié-des-Vosges (Pháp). Đây là bản đồ đầu tiên thể hiện châu Mỹ như là một vùng đất lớn tách biệt với châu Á. Một cuốn sách đi kèm, Cosmographiae Introductio, vô danh nhưng rõ ràng được viết bởi cộng tác viên của Waldseemüller là Matthias Ringmann,[4] đã thuật rằng, "Tôi không thấy bất kỳ một điều gì để phản đối việc gọi phần này [đại lục Nam Mỹ], theo Americus là người đã khám phá ra nó và ông là một người đàn ông thông minh, Amerigen, là Vùng đất của Americus, hay America: do cả châu Âu (Europa) và châu Á (Asia) đều mang tên có gốc từ một phụ nữ". Americus Vespucius là tên gọi Latinh hóa của nhà thám hiểm Florentine tên là Amerigo Vespucci, và America là dạng giống cái của Americus. Amerigen được giải thích là Amerigo cộng với gen, tân cách trong tiếng Hi Lạp của từ 'Trái Đất', và có nghĩa là 'vùng đất của Amerigo'.[4]. Amerigo là một từ tiếng Ý có gốc từ tiếng Latin cổ Emericus.[5]

Vespucci dường như đã không biết được việc tên của mình đã được dùng để đặt cho vùng đất mới, do bản đồ của Waldseemüller đã không được đưa đến Tây Ban Nha cho đến vào năm sau khi ông mất.[4] Ringmann có vẻ đã được dẫn dắt thêm tên Vespucci khi cho đăng tải rộng rãi Bức thư Soderini, một phiên bản đã được biên tập từ một trong các bức thư thật của Vespucci ghi chép về việc vạch bản vẽ bờ biển Nam Mỹ, trong đó tán dương khám phá này và ngụ ý rằng ông công nhận Nam Mỹ là một lục địa tách biệt với châu Á. Tây Ban Nha chính thức từ chối chấp thuận tên gọi America trong suốt hai thế kỷ, nói rằng Colombo nên được tán dương, và các bản đồ cuối cùng của Waldseemüller, sau khi ông đã ngừng hợp tác với Ringmann, không bao gồm tên gọi đó; tuy nhiên, việc sử dụng lại bắt đầu khi Gerardus Mercator áp dụng tên gọi này cho bản đồ Thế giới Mới của ông năm 1538.`;

  return (
    <>
      <SlideAmericaTour />
      <p className={styles.tilte_introduction}>AmericaTour( Châu Mỹ )</p>
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
            AmericaTour
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
          <p className={styles.mainText}>Discover AmericaTour</p>
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
          Famous America tourist attractions
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
          Famous destinations in the America
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
              Travel tips when visiting America
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
                  Châu Mỹ có sự đa dạng khí hậu, từ khí hậu nhiệt đới ở khu vực
                  Nam Mỹ như Brazil, đến khí hậu ôn đới và lạnh tại Bắc Mỹ như
                  Canada. Mùa xuân và mùa thu là thời điểm lý tưởng để du lịch ở
                  các nước Bắc Mỹ, trong khi mùa hè là mùa cao điểm tại các quốc
                  gia Nam Mỹ. Đừng quên kiểm tra khí hậu tại điểm đến trước khi
                  đi!
                </p>
              )}
              {selectedOption === "Vehicles" && (
                <p>
                  Ở châu Mỹ, phương tiện di chuyển phổ biến bao gồm máy bay cho
                  các chuyến đi giữa các quốc gia hoặc khu vực rộng lớn, xe buýt
                  và tàu hỏa ở các thành phố lớn như New York, Toronto, hoặc
                  Buenos Aires. Tại các vùng nông thôn hoặc khu vực đặc biệt như
                  Amazon, bạn có thể cần đến thuyền hoặc xe địa hình. Hãy chọn
                  phương tiện phù hợp với hành trình của bạn!
                </p>
              )}
              {selectedOption === "Activities" && (
                <p>
                  Châu Mỹ mang đến nhiều hoạt động phong phú như khám phá Grand
                  Canyon tại Mỹ, tham quan rừng Amazon tại Brazil, và chiêm
                  ngưỡng thác Iguazu ở Argentina. Đừng quên trải nghiệm văn hóa
                  độc đáo tại Mexico City, hoặc tận hưởng các bãi biển tuyệt đẹp
                  ở vùng Caribbean. Ẩm thực đa dạng từ taco, poutine đến
                  churrasco sẽ làm hài lòng mọi du khách!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
