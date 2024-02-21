// Function to convert number words to integers
function wordToInt(word) {
  const wordMap = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    // Add more mappings as needed
  };
  return wordMap[word];
}

// Get all circle divs with classes one to six
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

      // Get the circle number
      const circleNumberWord = circle.classList[1];
      const circleNumber = wordToInt(circleNumberWord);

      // Update the value of the input element
      document.querySelector(`#input--${segmentClass}`).value =
        parseInt(circleNumber);

      document.querySelector(
        `#wheel-section--${segmentClass} .number-container`,
      ).innerHTML = `= ${circleNumber}`;

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

// Function to check if at least one segment from each category has been selected
function validateSelection() {
  const categories = [
    "rest-and-relax",
    "eat-well",
    "move-more",
    "lift-your-spirits",
    "connect",
    "practical-matters",
    "mind-and-emotions",
    "physical-comfort",
  ];

  // Check if at least one segment from each category has been selected
  for (const category of categories) {
    const selectedSegment = document.querySelector(
      `.segment.${category}.selected`,
    );
    if (!selectedSegment) {
      return false;
    }
  }
  return true;
}

// Function to handle form submission
function handleSubmit(event) {
  // Prevent the default form submission
  event.preventDefault();
  // Check if at least one segment from each category has been selected
  if (validateSelection()) {
    // If all categories have been selected, submit the form
    event.target.submit();
  } else {
    // If any category is missing a selected segment, display an error message
    alert(
      "Please select at least one segment from each category before submitting the form.",
    );
  }
}

// Add event listener to the form for submission
document.querySelector("form").addEventListener("submit", handleSubmit);
