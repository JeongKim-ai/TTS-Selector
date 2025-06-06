document.addEventListener("DOMContentLoaded", () => {
  const languageSelect = document.getElementById("language");
  const voiceSelect = document.getElementById("voice");
  const textInput = document.getElementById("text");
  const speakButton = document.getElementById("speak");
  const audioPlayer = document.getElementById("audio");

  // Load voices from voice.json
  fetch("voice.json")
    .then(response => response.json())
    .then(data => {
      for (const language in data) {
        const option = document.createElement("option");
        option.value = language;
        option.textContent = language;
        languageSelect.appendChild(option);
      }

      languageSelect.addEventListener("change", () => {
        const selectedLanguage = languageSelect.value;
        voiceSelect.innerHTML = "";
        data[selectedLanguage].forEach(voice => {
          const option = document.createElement("option");
          option.value = voice;
          option.textContent = voice;
          voiceSelect.appendChild(option);
        });
      });

      // Trigger change event to populate voices for the first language
      languageSelect.dispatchEvent(new Event("change"));
    });

  speakButton.addEventListener("click", () => {
    const language = languageSelect.value;
    const voice = voiceSelect.value;
    const text = textInput.value;

    // Construct the request to Acapela TTS service
    // Note: Replace the URL and parameters with actual Acapela API endpoints and parameters
    const apiUrl = "https://api.acapela-group.com/tts"; // Placeholder URL
    const params = new URLSearchParams({
      voice: voice,
      text: text,
      // Include additional required parameters such as authentication tokens
    });

    fetch(`${apiUrl}?${params.toString()}`)
      .then(response => response.blob())
      .then(blob => {
        const audioUrl = URL.createObjectURL(blob);
        audioPlayer.src = audioUrl;
        audioPlayer.play();
      })
      .catch(error => {
        console.error("Error fetching audio:", error);
      });
  });
});
