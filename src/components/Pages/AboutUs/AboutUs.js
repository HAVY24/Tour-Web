import Front from "./Front";
import RevealFirst from "./RevealFirst";
import RevealSecond from "./RevealSecond";
import RevealThird from "./RevealThird";
import RevealFourth from "./RevealFourth";
import RevealFifth from "./RevealFifth";
import "../../../styles/aboutUs.css";

export default function AboutUs() {
  window.onscroll = () => {
    const header = document.getElementById("head");
    if (header) {
      header.style.top = "0px";
      header.style.position = "sticky";
    }
  };

  window.addEventListener("scroll", () => {
    const reveals = document.querySelectorAll(".reavelAboutUs");
    const windowHeight = window.innerHeight;

    reveals.forEach((reveal) => {
      const revealTop = reveal.getBoundingClientRect().top;
      const revealPoint = 100;

      if (revealTop < windowHeight - revealPoint) {
        reveal.classList.add("active");
      } else {
        reveal.classList.remove("active");
      }
    });
  });

  return (
    <div className="App">
      <nav></nav>
      <header id="head"></header>
      <div className="AboutUs">
        <Front />

        <RevealFirst />

        <RevealFourth />

        <RevealSecond />

        <RevealThird />

        <RevealFifth />
      </div>
      <footer></footer>
    </div>
  );
}
