document.addEventListener("DOMContentLoaded", () => {
  const languageSelect = document.getElementById("language");
  const voiceSelect = document.getElementById("voice");
  const textInput = document.getElementById("text");
  const speakBtn = document.getElementById("speakBtn");

  fetch("voice.json")
    .then(response => response.json())
    .then(data => {
      for (const [langCode, langData] of Object.entries(data)) {
        const option = document.createElement("option");
        option.value = langCode;
        option.textContent = langData.name;
        languageSelect.appendChild(option);
      }

      languageSelect.addEventListener("change", () => {
        const selectedLang = languageSelect.value;
        voiceSelect.innerHTML = "";
        data[selectedLang].voices.forEach(voice => {
          const option = document.createElement("option");
          option.value = voice;
          option.textContent = voice;
          voiceSelect.appendChild(option);
        });
      });

      // Trigger change event to populate voices on load
      languageSelect.dispatchEvent(new Event("change"));
    });

  speakBtn.addEventListener("click", () => {
    const selectedVoice = voiceSelect.value;
    const text = textInput.value;

    // Replace with actual API call to Acapela
    fetch("https://www.acapela-group.com/demos/demo.cgi", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        voice: selectedVoice,
        text: text,
        // Add other necessary parameters as required by Acapela's API
      })
    })
      .then(response => response.blob())
      .then(blob => {
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audio.play();
      })
      .catch(error => {
        console.error("Error:", error);
      });
  });
});