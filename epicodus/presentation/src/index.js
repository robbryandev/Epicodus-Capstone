import "./assets/css/styles.css";
import "reveal.js/dist/reveal.css";
import Reveal from "reveal.js";
import * as $ from "jquery";

import imgHomeMain from "./assets/Images/home.png";
import imgHomeHover from "./assets/Images/home-hover.png";
import imgHomeFilter from "./assets/Images/home-filter.png";

import imgShowsMain from "./assets/Images/shows.png";
import videoShowsCustom from "./assets/Videos/shows-custom.mkv";

import imgThemesMain from "./assets/Images/themes.png";
import imgThemesLight from "./assets/Images/themes-light.png";
import imgThemesMidnight from "./assets/Images/themes-midnight.png";

import imgTechNextauth from "./assets/Images/nextauth.png";
import imgTechSignals from "./assets/Images/signals.png";
import imgTechT3 from "./assets/Images/t3.png";
import imgTechTailwind from "./assets/Images/tailwind.png";
import imgTechTypescript from "./assets/Images/typescript.svg";
import imgTechFirestore from "./assets/Images/firestore.png";

Reveal.initialize();

$(document).ready(() => {
  $("#img-home-main")[0].setAttribute("src", imgHomeMain);
  $("#img-home-hover")[0].setAttribute("src", imgHomeHover);
  $("#img-home-filter")[0].setAttribute("src", imgHomeFilter);

  $("#img-shows-main")[0].setAttribute("src", imgShowsMain);
  $("#video-shows-custom")[0].setAttribute("src", videoShowsCustom);

  $("#img-themes-main")[0].setAttribute("src", imgThemesMain);
  $("#img-themes-light")[0].setAttribute("src", imgThemesLight);
  $("#img-themes-midnight")[0].setAttribute("src", imgThemesMidnight);

  $("#nextauth")[0].setAttribute("src", imgTechNextauth);
  $("#signals")[0].setAttribute("src", imgTechSignals);
  $("#t3")[0].setAttribute("src", imgTechT3);
  $("#tailwind")[0].setAttribute("src", imgTechTailwind);
  $("#typescript")[0].setAttribute("src", imgTechTypescript);
  $("#firestore")[0].setAttribute("src", imgTechFirestore);
});
