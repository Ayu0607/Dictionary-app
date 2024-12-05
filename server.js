function fetchWordData() {
  const word = document.getElementById("wordInput").value.trim(); // Get the input value
  if (!word) {
    alert("Please enter a word to search.");
    return;
  }

  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  // Fetch data from the API
  fetch(apiUrl)
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      // Check if the response contains valid data
      if (data && data.length > 0) {
        displayWordData(data[0]);
      } else {
        alert("Word not found. Please try another word.");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("There was an error fetching the data. Please try again later.");
    });

  // Function to display the fetched word data
  function displayWordData(wordData) {
    const wordElement = document.getElementById("word");
    const phoneticElement = document.getElementById("phonetic");
    const audioElement = document.getElementById("audio");
    const meaningsElement = document.getElementById("meanings");

    // Display the word and phonetics
    wordElement.textContent = wordData.word;
    phoneticElement.textContent = wordData.phonetic;

    // Set the audio pronunciation link (UK or US version)
    const phonetics = wordData.phonetics;
    if (phonetics.length > 0) {
      audioElement.src = phonetics[0].audio; // Use the first available pronunciation
    }

    // Display meanings
    meaningsElement.innerHTML = ""; // Clear previous meanings
    wordData.meanings.forEach((meaning) => {
      const partOfSpeech = meaning.partOfSpeech;
      const definitions = meaning.definitions;

      const meaningDiv = document.createElement("div");
      meaningDiv.classList.add("meaning");

      const partOfSpeechElem = document.createElement("h3");
      partOfSpeechElem.textContent = partOfSpeech;

      const definitionsList = document.createElement("ul");
      definitions.forEach((def) => {
        const definitionItem = document.createElement("li");
        definitionItem.textContent = def.definition;
        definitionsList.appendChild(definitionItem);
      });

      meaningDiv.appendChild(partOfSpeechElem);
      meaningDiv.appendChild(definitionsList);
      meaningsElement.appendChild(meaningDiv);
    });
  }
}
