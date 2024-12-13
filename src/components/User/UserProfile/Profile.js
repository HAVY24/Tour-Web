import React, { useRef, useEffect, useState, useContext } from "react";
import UserContext from "../../../UserContext.js";
import { useLocation, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import UserHeader from "./UserHeader.js";
import Post from "./PostList.js";
import {
  getProfile,
  getuserById,
  updateUserProfile,
} from "../../../api/Services/UserServices.js";
import {
  cardHeaderStyle,
  buttonStyle,
  cardBodyStyle,
  settingsCardStyle,
  headingStyle,
  inputStyle,
  textareaStyle,
  buttonContainerStyle,
  containerStyle,
} from "./ProfileStyle.js";
import Swal from "sweetalert2";
import ProfileCard from "./ProfileCard.js";
import BlockedProfilePage from "../../../view/BlockedProfilePage.js";

const Profile = () => {
  const user = useContext(UserContext);

  const [userr, setUser] = useState({});

  const [userProfile, setProfile] = useState({
    profile: {
      FirstName: "",
      LastName: "",
      Address: "",
      City: "",
      Country: "",
      PostalCode: "",
      AboutMe: "",
      FriendNum: "0",
      PostNum: "0",
      CommentNum: "0",
      Avatar: "",
      CoverAvatar: "",
      Phone: "",
      Birthday: "",
      QuickIntroduction: "",
      UserId: user.userId,
      User: null,
    },
    age: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProfile((prevState) => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        [name]: value,
      },
    }));
  };

  const profile = {
    UserId: user.userId,
    FirstName: userProfile.profile.FirstName,
    LastName: userProfile.profile.LastName,
    Address: userProfile.profile.Address,
    City: userProfile.profile.City,
    Country: userProfile.profile.Country,
    PostalCode: userProfile.profile.PostalCode,
    AboutMe: userProfile.profile.AboutMe,
    Phone: userProfile.profile.Phone,
    Birthday: userProfile.profile.Birthday,
    QuickIntroduction: userProfile.profile.QuickIntroduction,
  };

  const onClickSave = async () => {
    try {
      console.log(profile);

      const res = await updateUserProfile(profile);

      if (res.message === "Profile updated successfully") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.message,
          confirmButtonText: "OK",
        });
      } else if (res.message === "No changes detected") {
        Swal.fire({
          icon: "info",
          title: "No Changes",
          text: res.message,
          confirmButtonText: "OK",
        });
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save profile. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  const postsSectionRef = useRef(null);
  const location = useLocation();
  const { userId } = useParams();

  useEffect(() => {
    if (location.hash === "#posts" && postsSectionRef.current) {
      postsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await getProfile(userId);
        setProfile(result);
        console.log(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [userId]);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const result = await getuserById(userId);
        setUser(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserById();
  }, [userId]);

  return (
    <>
      {userr.IsProfileBlocked ? (
        <BlockedProfilePage />
      ) : (
        <>
          {/* Page content */}
          <UserHeader userProfile={userProfile} />

          <Container className="mt--7" fluid style={containerStyle}>
            <Row
              className="justify-content-center"
              style={{ marginTop: "-3rem" }}
            >
              <Col
                className="order-xl-2 mb-5 mb-xl-0"
                xl={user.userId == userProfile.profile?.UserId ? "4" : "12"}
              >
                <ProfileCard userProfile={userProfile} user={user} />
              </Col>
              {user.userId == userProfile.profile?.UserId && (
                <Col className="order-xl-1" xl="8">
                  <Card
                    className="bg-secondary shadow"
                    style={settingsCardStyle}
                  >
                    <CardHeader
                      className="bg-white border-0"
                      style={cardHeaderStyle}
                    ></CardHeader>
                    <CardBody style={cardBodyStyle}>
                      <Form>
                        <h6
                          className="heading-small text-muted mb-4"
                          style={headingStyle}
                        >
                          User information
                        </h6>
                        <div className="pl-lg-4">
                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Username
                                </label>
                                <Input
                                  disabled
                                  className="form-control-alternative"
                                  defaultValue={`@${user.username}`}
                                  id="input-username"
                                  placeholder="Username"
                                  type="text"
                                  style={inputStyle}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-email"
                                >
                                  Email address
                                </label>
                                <Input
                                  disabled
                                  defaultValue={`${user.email}`}
                                  className="form-control-alternative"
                                  id="input-email"
                                  placeholder="jesse@example.com"
                                  type="email"
                                  style={inputStyle}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                >
                                  First name
                                </label>
                                <Input
                                  name="FirstName"
                                  value={userProfile.profile.FirstName}
                                  onChange={handleInputChange}
                                  className="form-control-alternative"
                                  defaultValue=""
                                  id="input-first-name"
                                  placeholder="First name"
                                  type="text"
                                  style={inputStyle}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-last-name"
                                >
                                  Last name
                                </label>
                                <Input
                                  name="LastName"
                                  value={userProfile.profile.LastName}
                                  onChange={handleInputChange}
                                  className="form-control-alternative"
                                  defaultValue=""
                                  id="input-last-name"
                                  placeholder="Last name"
                                  type="text"
                                  style={inputStyle}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-birthday"
                              >
                                Birthday
                              </label>
                              <Input
                                name="Birthday"
                                value={"2004-12-12"}
                                onChange={handleInputChange}
                                className="form-control-alternative"
                                id="input-birthday"
                                placeholder="Birthday"
                                type="date"
                                style={inputStyle}
                              />
                            </FormGroup>
                          </Row>
                        </div>
                        <hr className="my-4" />
                        {/* Address */}
                        <h6
                          className="heading-small text-muted mb-4"
                          style={headingStyle}
                        >
                          Contact information
                        </h6>
                        <div className="pl-lg-4">
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Address
                                </label>
                                <Input
                                  name="Address"
                                  value={userProfile.profile.Address}
                                  onChange={handleInputChange}
                                  className="form-control-alternative"
                                  defaultValue=""
                                  id="input-address"
                                  placeholder="Home Address"
                                  type="text"
                                  style={inputStyle}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-phone"
                                >
                                  Phone
                                </label>
                                <Input
                                  name="Phone"
                                  value={userProfile.profile.Phone}
                                  onChange={handleInputChange}
                                  className="form-control-alternative"
                                  defaultValue=""
                                  id="input-address"
                                  placeholder="Phone Number"
                                  type="number"
                                  style={inputStyle}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-city"
                                >
                                  City
                                </label>
                                <Input
                                  name="City"
                                  value={userProfile.profile.City}
                                  onChange={handleInputChange}
                                  className="form-control-alternative"
                                  defaultValue=""
                                  id="input-city"
                                  placeholder="City"
                                  type="text"
                                  style={inputStyle}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-country"
                                >
                                  Country
                                </label>
                                <Input
                                  name="Country"
                                  value={userProfile.profile.Country}
                                  onChange={handleInputChange}
                                  className="form-control-alternative"
                                  defaultValue=""
                                  id="input-country"
                                  placeholder="Country"
                                  type="text"
                                  style={inputStyle}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-country"
                                >
                                  Postal code
                                </label>
                                <Input
                                  name="PostalCode"
                                  value={userProfile.profile.PostalCode}
                                  onChange={handleInputChange}
                                  className="form-control-alternative"
                                  id="input-postal-code"
                                  placeholder="Postal code"
                                  type="number"
                                  style={inputStyle}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                        <hr className="my-4" />
                        {/* Description */}

                        <div className="pl-lg-4">
                          <FormGroup>
                            <label>Quick Introduction</label>
                            <Input
                              name="QuickIntroduction"
                              value={userProfile.profile.QuickIntroduction}
                              onChange={handleInputChange}
                              className="form-control-alternative"
                              placeholder="A few words about you ..."
                              rows="4"
                              defaultValue=""
                              type="textarea"
                              style={textareaStyle}
                            />
                          </FormGroup>
                        </div>

                        <div className="pl-lg-4">
                          <FormGroup>
                            <label>About Me</label>
                            <Input
                              name="AboutMe"
                              value={userProfile.profile.AboutMe}
                              onChange={handleInputChange}
                              className="form-control-alternative"
                              placeholder="A few words about you ..."
                              rows="4"
                              defaultValue=""
                              type="textarea"
                              style={textareaStyle}
                            />
                          </FormGroup>
                        </div>
                        <div
                          className="text-center"
                          style={buttonContainerStyle}
                        >
                          <Button
                            color="primary"
                            onClick={onClickSave}
                            style={buttonStyle}
                          >
                            Save
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              )}
            </Row>
            {user.userId == userProfile.profile?.UserId && (
              <div ref={postsSectionRef} id="posts">
                <Row
                  className="justify-content-center"
                  style={{ marginTop: "50px" }}
                >
                  <Post />
                </Row>
              </div>
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default Profile;
