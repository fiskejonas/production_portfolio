import { animate, scroll } from "motion";

document.querySelectorAll(".hero1").forEach((parallaxcontainer) => {
  const elementderskalparallaxes = parallaxcontainer.querySelector("img");
  scroll(animate(elementderskalparallaxes, { y: [-100, 100] }), {
    target: elementderskalparallaxes,
  });
});

document.querySelectorAll("#archive").forEach((parallaxcontainer2) => {
  const elementderskalparallaxes2 = parallaxcontainer2.querySelector(
    ".banners_and_border"
  );
  scroll(animate(elementderskalparallaxes2, { y: [-200, 200] }), {
    target: elementderskalparallaxes2,
  });
});

document.querySelectorAll("#facts").forEach((parallaxcontainer3) => {
  const elementderskalparallaxes3 =
    parallaxcontainer3.querySelector(".checklist-title");
  scroll(animate(elementderskalparallaxes3, { y: [-200, 200] }), {
    target: elementderskalparallaxes3,
  });
});
