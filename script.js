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

// querySelectorAll selects all elements whose ID starts with "wheel-section--"
const wheelSections = document.querySelectorAll("[id^='wheel-section--']");

wheelSections.forEach((section) => {
  const sectionId = section.id.replace("wheel-section--", ""); // Extract the section's name from its ID
  const name = document.getElementById(`name--${sectionId}`); // Dynamically get the corresponding name element

  section.addEventListener("mouseover", (event) => {
    name.classList.add("glow");
  });
  section.addEventListener("mouseout", (event) => {
    name.classList.remove("glow");
  });
});
