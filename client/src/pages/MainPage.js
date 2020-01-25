import React from "react";

import Computer from "../components/computer/computer";
import Mobile from "../components/mobile/mobile";

export default function MainPage() {
  if (window.innerWidth < 1024) return <Mobile />;
  return <Computer />;
}
