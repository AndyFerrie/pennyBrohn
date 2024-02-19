// Get all circle divs
const circles = document.querySelectorAll(
  ".circle.zero, .circle.one, .circle.two, .circle.three, .circle.four, .circle.five, .circle.six",
);

// Loop through each circle div
circles.forEach((circle) => {
  // Add click event listener
  circle.addEventListener("click", function (event) {
    // Get the specific segment that was clicked
    const clickedSegment = event.target.closest(".segment");

    // Check if a segment was clicked
    if (clickedSegment) {
      // Get the class of the clicked segment
      const segmentClass = clickedSegment.classList[1];

      // Loop through all circles to remove "selected" class from segments with the same class
      circles.forEach((otherCircle) => {
        otherCircle
          .querySelectorAll(`.segment.${segmentClass}`)
          .forEach((segment) => {
            segment.classList.remove("selected");
          });
      });

      // Toggle "selected" class on the clicked segment
      clickedSegment.classList.toggle("selected");
    }
  });
});

const wheelSectionMindAndEmotions = document.getElementById(
  "wheel-section--mind-and-emotions",
);
const nameMindAndEmotions = document.getElementById("name--mind-and-emotions");

wheelSectionMindAndEmotions.addEventListener("mouseover", (event) => {
  nameMindAndEmotions.classList.add("glow");
});

wheelSectionMindAndEmotions.addEventListener("mouseout", (event) => {
  nameMindAndEmotions.classList.remove("glow");
});
