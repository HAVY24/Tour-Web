import React from "react";
import { MDBFooter, MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Image from "react-bootstrap/Image";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

export default function Footer() {
  return (
    <div style={{ marginTop: "50px" }}>
      <MDBFooter
        style={{
          backgroundColor: "rgb(28,41,48)",
          color: "rgb(255,255,255)",
        }}
        className="text-center text-lg-start text-muted"
      >
        {/* Footer Content */}
        <section className="py-4">
          <MDBRow className="gy-4">
            {/* Logo and Info */}
            <MDBCol md="3" lg="3" xl="3" className="mx-auto text-center">
              <Image
                src={`${distributionUrl}/Static/logo_vvba.jpg`}
                style={{ width: "120px", height: "120px" }}
                roundedCircle
              />
              <h6
                className="mt-3 text-uppercase fw-bold"
                style={{ color: "rgb(255,255,255)" }}
              >
                VVBA
              </h6>
              <p style={{ color: "rgb(255,255,255)" }}>
                Join our mailing list to get the latest updates and offers.
              </p>
            </MDBCol>

            {/* Products */}
            <MDBCol md="2" lg="2" xl="2" className="mx-auto">
              <h6
                className="text-uppercase fw-bold"
                style={{ color: "rgb(255,255,255)" }}
              >
                Products
              </h6>
              <ul className="list-unstyled small">
                <li>
                  <a
                    href="#!"
                    style={{
                      color: "rgb(255,255,255)",
                      textDecoration: "none",
                      display: "block", // Đảm bảo rằng thẻ a chiếm toàn bộ chiều rộng của phần tử li
                      marginBottom: "5px", // Tạo khoảng cách dưới mỗi thẻ a
                    }} // Thay đổi màu ở đây
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    style={{
                      color: "rgb(255,255,255)",
                      textDecoration: "none",
                      display: "block", // Đảm bảo rằng thẻ a chiếm toàn bộ chiều rộng của phần tử li
                      marginBottom: "5px", // Tạo khoảng cách dưới mỗi thẻ a
                    }} // Thay đổi màu ở đây
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    style={{
                      color: "rgb(255,255,255)",
                      textDecoration: "none",
                      display: "block", // Đảm bảo rằng thẻ a chiếm toàn bộ chiều rộng của phần tử li
                      marginBottom: "5px", // Tạo khoảng cách dưới mỗi thẻ a
                    }} // Thay đổi màu ở đây
                  >
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    style={{
                      color: "rgb(255,255,255)",
                      textDecoration: "none",
                      display: "block", // Đảm bảo rằng thẻ a chiếm toàn bộ chiều rộng của phần tử li
                      marginBottom: "5px", // Tạo khoảng cách dưới mỗi thẻ a
                    }} // Thay đổi màu ở đây
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </MDBCol>

            {/* Useful Links */}
            <MDBCol md="2" lg="2" xl="2" className="mx-auto">
              <h6
                className="text-uppercase fw-bold"
                style={{ color: "rgb(255,255,255)" }}
              >
                Useful Links
              </h6>
              <ul className="list-unstyled small">
                <li>
                  <a
                    href="#!"
                    style={{
                      color: "rgb(255,255,255)",
                      textDecoration: "none",
                      display: "block", // Đảm bảo rằng thẻ a chiếm toàn bộ chiều rộng của phần tử li
                      marginBottom: "5px", // Tạo khoảng cách dưới mỗi thẻ a
                    }} // Thay đổi màu ở đây
                  >
                    Investor Relations
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    style={{
                      color: "rgb(255,255,255)",
                      textDecoration: "none",
                      display: "block", // Đảm bảo rằng thẻ a chiếm toàn bộ chiều rộng của phần tử li
                      marginBottom: "5px", // Tạo khoảng cách dưới mỗi thẻ a
                    }} // Thay đổi màu ở đây
                  >
                    Account
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    style={{
                      color: "rgb(255,255,255)",
                      textDecoration: "none",
                      display: "block", // Đảm bảo rằng thẻ a chiếm toàn bộ chiều rộng của phần tử li
                      marginBottom: "5px", // Tạo khoảng cách dưới mỗi thẻ a
                    }} // Thay đổi màu ở đây
                  >
                    Legal
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    className="text-reset"
                    style={{
                      color: "rgb(255,255,255)",
                      textDecoration: "none",
                      display: "block", // Đảm bảo rằng thẻ a chiếm toàn bộ chiều rộng của phần tử li
                      marginBottom: "5px", // Tạo khoảng cách dưới mỗi thẻ a
                    }} // Thay đổi màu ở đây
                  >
                    Help
                  </a>
                </li>
              </ul>
            </MDBCol>

            {/* Contact */}
            <MDBCol md="4" lg="3" xl="3" className="mx-auto">
              <h6
                className="text-uppercase fw-bold"
                style={{ color: "rgb(255,255,255)" }}
              >
                Contact
              </h6>
              <ul className="list-unstyled small">
                <li
                  style={{
                    color: "rgb(255,255,255)",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  <MDBIcon icon="home" className="me-2" />
                  Team VVBA
                </li>
                <li
                  style={{
                    color: "rgb(255,255,255)",
                    display: "block", // Đảm bảo rằng thẻ a chiếm toàn bộ chiều rộng của phần tử li
                    marginBottom: "5px",
                  }}
                >
                  <MDBIcon icon="envelope" className="me-2" />
                  info@example.com
                </li>
                <li
                  style={{
                    color: "rgb(255,255,255)",
                    display: "block", // Đảm bảo rằng thẻ a chiếm toàn bộ chiều rộng của phần tử li
                    marginBottom: "5px",
                  }}
                >
                  <MDBIcon icon="phone" className="me-2" />+ 01 234 567 88
                </li>
                <li
                  style={{
                    color: "rgb(255,255,255)",
                    display: "block", // Đảm bảo rằng thẻ a chiếm toàn bộ chiều rộng của phần tử li
                    marginBottom: "5px",
                  }}
                >
                  <MDBIcon icon="print" className="me-2" />+ 01 234 567 89
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </section>

        {/* Social Media Section */}
        <section
          className="text-center text-lg-start p-3"
          style={{
            backgroundColor: "rgb(28,41,48)",
            color: "rgb(255,255,255)",
          }}
        >
          <div>
            <div className="mb-2">
              <span style={{ color: "rgb(255,255,255)", marginLeft: "30px" }}>
                Connect with us on social media:
              </span>
            </div>
            <div className="d-flex justify-content-center justify-content-lg-start">
              <a
                href="#"
                className="me-3"
                style={{ color: "#4267B2", marginLeft: "30px" }}
              >
                <FacebookIcon fontSize="medium" />
              </a>
              <a href="#" className="me-3" style={{ color: "#1DA1F2" }}>
                <TwitterIcon fontSize="medium" />
              </a>
              <a href="#" className="me-3" style={{ color: "#DB4437" }}>
                <GoogleIcon fontSize="medium" />
              </a>
              <a href="#" className="me-3" style={{ color: "#E1306C" }}>
                <InstagramIcon fontSize="medium" />
              </a>
              <a href="#" className="me-3" style={{ color: "#0077B5" }}>
                <LinkedInIcon fontSize="medium" />
              </a>
              <a href="#" className="me-3" style={{ color: "#171515" }}>
                <GitHubIcon fontSize="medium" />
              </a>
            </div>
          </div>
        </section>

        {/* Footer Bottom */}
        <div
          className="text-center p-2"
          style={{
            backgroundColor: "rgb(20,28,34)",
            color: "rgb(255,255,255)",
          }}
        >
          <hr
            style={{
              fontWeight: "bold",
              borderColor: "rgb(255,255,255)",
              marginTop: "5px",
            }}
          />
          <p>
            {" "}
            Công ty TNHH VVBA Việt Nam. Mã số DN: 0413584779. Tòa nhà 7 tầng,
            448 Lê Văn Việt, P. Tăng Nhơn Phú A, Q. 9, TPHCM{" "}
          </p>

          <strong>Copyright © 2024 Traveloka. All rights reserved</strong>
        </div>
      </MDBFooter>
    </div>
  );
}
