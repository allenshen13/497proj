// Function to send request to GPT API
function sendRequestToGPT(prompt) {
  fetch('https://api.openai.com/v1/engines/davinci/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY' // Replace with your actual API key
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 150 // Adjust as needed
    })
  })
  .then(response => response.json())
  .then(data => {
    displayItinerary(data.choices[0].text); // Function to display the itinerary
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Function to display itinerary on the webpage
function displayItinerary(itineraryText) {
  var itineraryDiv = document.getElementById('itinerary'); // Assuming you have this element in your HTML
  itineraryDiv.textContent = itineraryText;
}



document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.submit-btn').addEventListener('click', function (e) {
      e.preventDefault(); // Prevents the default form submission action
  
      // Capturing the form inputs
      var destination = document.getElementById('destination').value;
      var fromDate = document.getElementById('from-date').value;
      var toDate = document.getElementById('to-date').value;
      var budget = document.getElementById('budget').value;
      var ageRange = document.getElementById('age-range').value;
      var tags = document.getElementById('tags').value;
      var travelers = document.getElementById('travelers').value;
  
      // Storing the captured values in an object
      var formData = {
        destination: destination,
        fromDate: fromDate,
        toDate: toDate,
        budget: budget,
        ageRange: ageRange,
        tags: tags,
        travelers: travelers
      };
  
      console.log(formData); // Output the captured data to the console for verification
      var gptPrompt = `A person is going on a trip to ${formData.destination} with a budget of ${formData.budget}. The trip is planned from ${formData.fromDate} to ${formData.toDate}. The age range of the travelers is ${formData.ageRange}. There are ${formData.travelers} travelers in total. The trip should focus on themes or activities like ${formData.tags}. Please suggest an itinerary.`;
      // Here you can add any further processing you need with formData
    });
  });
  