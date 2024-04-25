// Get all radio buttons
const radioButtons = document.querySelectorAll('input[type="radio"]');

// Reset radio buttons on page load
document.addEventListener("DOMContentLoaded", function () {
  radioButtons.forEach(function (radioButton) {
    radioButton.checked = false;
  });
});

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
  };
  return wordMap[word];
}

// Function to convert numbers to words
function numberToWord(number) {
  const numberMap = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
  };
  return numberMap[number];
}

const circles = document.querySelectorAll(
  ".circle.zero, .circle.one, .circle.two, .circle.three, .circle.four, .circle.five, .circle.six",
);

circles.forEach((circle) => {
  circle.addEventListener("click", function (event) {
    const clickedSegment = event.target.closest(".segment");

    if (clickedSegment) {
      const segmentClass = clickedSegment.classList[1];

      // // Get the circle number
      const circleNumberWord = circle.classList[1];
      const circleNumber = wordToInt(circleNumberWord);

      // Constructing the selector for the radio button based on segmentClass
      const selector = `#input--${segmentClass} input[type="radio"][value="${parseInt(circleNumber)}"]`;

      // Selecting the radio button and setting its checked property to true
      const radioButton = document.querySelector(selector);
      if (radioButton) {
        radioButton.checked = true;
      } else {
        console.error(
          `Radio button with value "${circleNumber}" not found in segment "${segmentClass}".`,
        );
      }

      // Loop through all circles to remove "selected" class from segments with the same class
      circles.forEach((otherCircle) => {
        otherCircle
          .querySelectorAll(`.segment.${segmentClass}`)
          .forEach((segment) => {
            segment.classList.remove("selected");
          });
      });

      clickedSegment.classList.toggle("selected");
    }
  });
});

// Selects segment on wheel when radio button clicked

// Add event listener to each radio button
radioButtons.forEach((radioButton) => {
  radioButton.addEventListener("change", function () {
    // Get the circle number from the radio button value
    const circleNumber = numberToWord(this.value);

    // Get the ID of the parent element
    const parentId = this.parentElement.parentElement.id;

    // Remove the "input--" prefix from the ID
    const segmentClass = parentId.substring("input--".length);

    // Select the corresponding segment based on the circle number
    const segment = document.querySelector(
      `.circle.${circleNumber} .segment.${segmentClass}`,
    );

    // Click the segment
    if (segment) {
      segment.click();
    }
  });
});

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

// Function to change the submit button text to indicate form submission
function setSubmissionStatus(text) {
  document.getElementById("submission-status").innerHTML = text;
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  // Change the submit button text to indicate form submission
  setSubmissionStatus("Submitting...");

  // Check if at least one segment from each category has been selected
  if (validateSelection()) {
    // If all categories have been selected, submit the form
    event.target.submit();
    // Change the submit button text to indicate form submission
    setSubmissionStatus("Form Submitted");
  } else {
    // If any category is missing a selected segment, display an error message
    setSubmissionStatus(
      "Unable to submit! Please make sure you choose a number between 0 - 6 for each section before submitting.",
    );
  }
}

// Add event listener to the form for submission
document.querySelector("form").addEventListener("submit", handleSubmit);
