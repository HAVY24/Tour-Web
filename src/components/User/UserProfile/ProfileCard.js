import React, { useState } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import {
  cardProfileStyle,
  cardProfileImageStyle,
  imgStyle,
  imgStyle2,
  cardBodyStyle,
  cardStatsStyle,
  nameStyle,
  lightFontStyle,
  locationStyle,
  jobStyle,
  descriptionStyle,
  showMoreLinkStyle,
} from "./ProfileStyle.js";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

export default function ProfileCard({ userProfile, user }) {
  const [showFullAboutMe, setShowFullAboutMe] = useState(false);
  const toggleShowMore = () => setShowFullAboutMe(!showFullAboutMe);

  return (
    <Card className="card-profile shadow" style={cardProfileStyle}>
      <Row className="justify-content-center">
        <Col className="order-lg-2" lg="3">
          <div className="card-profile-image" style={cardProfileImageStyle}>
            <a href="#pablo" onClick={(e) => e.preventDefault()}>
              <img
                alt="..."
                className="rounded-circle"
                src={`${distributionUrl}/Avatars/${userProfile.profile.Avatar}`}
                style={
                  user.userId == userProfile.profile?.UserId
                    ? imgStyle
                    : imgStyle2
                }
              />
            </a>
          </div>
        </Col>
      </Row>

      <CardBody className="pt-0 pt-md-4" style={cardBodyStyle}>
        <Row>
          <div className="col">
            <div
              className="card-profile-stats d-flex justify-content-center mt-md-5"
              style={cardStatsStyle}
            >
              <div>
                <span className="heading">22 </span>
                <span className="description">Friends</span>
              </div>
              <div>
                <span className="heading">10 </span>
                <span className="description">Posts</span>
              </div>
              <div>
                <span className="heading">89 </span>
                <span className="description">Comments</span>
              </div>
            </div>
          </div>
        </Row>
        <div className="text-center">
          <h3 style={nameStyle}>
            {userProfile.profile?.FirstName || ""}{" "}
            {userProfile.profile?.LastName || ""}
            <span className="font-weight-light" style={lightFontStyle}>
              , {userProfile.age}
            </span>
          </h3>
          <div className="h5 font-weight-300" style={locationStyle}>
            <i className="ni location_pin mr-2" />
            {userProfile.profile?.Country || ""},{" "}
            {userProfile.profile?.City || ""}
          </div>
          <div className="h5 mt-4" style={jobStyle}>
            <i className="ni business_briefcase-24 mr-2" />
            {userProfile.profile?.QuickIntroduction || ""}
          </div>
          <hr className="my-4" />
          <p style={descriptionStyle}>
            {showFullAboutMe
              ? userProfile.profile?.AboutMe
              : userProfile.profile?.AboutMe?.split("\n")[0]}{" "}
          </p>
          <a
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();
              toggleShowMore();
            }}
            style={showMoreLinkStyle}
          >
            {showFullAboutMe ? "Show less" : "Show more"}
          </a>
        </div>
      </CardBody>
    </Card>
  );
}
