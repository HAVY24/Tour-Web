const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

export default function Front() {
  return (
    <div id="front">
      <h1 style={{ textAlign: "center" }}>Welcome To VVBA Travel Company</h1>
      <img
        src={`${distributionUrl}/Static/logo_vvba.jpg`}
        alt="font"
        style={{
          height: "400px",
          width: "400px",
          marginTop: "30px",
          borderRadius: "50%",
        }}
      />
      <p style={{ marginTop: "50px" }}>
        " VVBA is a leading travel agency dedicated to crafting unforgettable
        journeys for travelers worldwide. With a team of experienced
        professionals, we offer personalized travel packages, including exotic
        destinations, cultural experiences. Our commitment to customer
        satisfaction, seamless booking, and top-notch accommodations ensures
        that every trip is a once-in-a-lifetime experience. Whether you're
        seeking a relaxing getaway or an action-packed adventure, VVBA turns
        your travel dreams into reality. "
      </p>
    </div>
  );
}
