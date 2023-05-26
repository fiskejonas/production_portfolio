import { animate, scroll } from "motion";

document.querySelectorAll("section").forEach((section) => {
  const header = section.querySelector(".hero_text");
  scroll(animate(header, { y: [-50, 50] }), {
    target: header,
  });
});
