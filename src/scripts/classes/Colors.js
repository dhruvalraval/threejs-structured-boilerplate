//SINGLTON CLASS (OOP CONCEPT)

import GSAP from "gsap";

class Colors{
  change({ backgroundColor, color }) {
    GSAP.to(document.documentElement, {
      background: backgroundColor,
      color,
      duration: 1
    })
  }
}
export const ColorManager = new Colors()
