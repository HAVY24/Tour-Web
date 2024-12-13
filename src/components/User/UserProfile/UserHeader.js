import { Container, Row, Col } from "reactstrap";
const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

const UserHeader = ({ userProfile }) => {
  return (
    <>
      <div style={{ maxWidth: "1200px", margin: "0 auto", marginTop: "30px" }}>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage: `url(${distributionUrl}/CoverAvatars/${userProfile.profile.CoverAvatar})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            borderRadius: "20px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Container className="mt--7" fluid style={containerStyle}>
            <Row>
              <Col lg="7" md="10"></Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};
const containerStyle = {
  maxWidth: "1200px", // Limit the container width to center the layout
  margin: "0 auto", // Center the container
  padding: "0 1.5rem", // Add some padding for smaller screens
};

export default UserHeader;
