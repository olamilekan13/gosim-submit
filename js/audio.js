document.addEventListener("DOMContentLoaded", () => {
  const audio = new Audio("../gosim_pics/gosim-audio.mp3");

  const playAudio = () => {
      audio.play().catch(error => console.log("Autoplay blocked:", error));
  };

  // Attempt to play automatically
  playAudio();

  // Fallback: Play on user interaction
  document.addEventListener("click", playAudio, { once: true });
});
