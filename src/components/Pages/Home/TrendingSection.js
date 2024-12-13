import SimpleBottomNavigation from "./NavBarTrending";
import React from "react";
export default function TrendingSection() {
  return (
    <div id="top-trending" >
      <h1 style={{ textAlign: "center", marginTop: "30px", fontWeight: "900" }}>
        Top trending
      </h1>
      <SimpleBottomNavigation />
    </div>
  );
}
