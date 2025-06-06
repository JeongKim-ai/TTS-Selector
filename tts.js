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
      for (const lang in data) {
        const option = document.createElement("option");
        option.value = lang;
        option.textContent = data[lang].name;
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

      languageSelect.dispatchEvent(new Event("change"));
    });

  speakButton.addEventListener("click", () => {
    const voice = voiceSelect.value;
    const text = textInput.value.trim();

    if (!voice || !text) {
      alert("Please select a voice and enter text.");
      return;
    }

    // TEMPORARY: play a placeholder sound file
    // In real usage, you would request audio from your server-side Acapela API handler
    console.log(`Simulating TTS for voice: ${voice} and text: "${text}"`);
    audioPlayer.src = "assets/sample.mp3"; // Placeholder test audio
    audioPlayer.play();
  });
});
