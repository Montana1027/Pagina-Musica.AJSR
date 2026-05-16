// script.js

const playlistScreen =
document.getElementById("playlistScreen");

const playerScreen =
document.getElementById("playerScreen");

const audio =
document.getElementById("audio");

const playerCover =
document.getElementById("playerCover");

const playerTitle =
document.getElementById("playerTitle");

const playerArtist =
document.getElementById("playerArtist");

const currentLine =
document.querySelector(".current");

const nextLine =
document.querySelector(".next");

const restartBtn =
document.getElementById("restartBtn");

const backBtn =
document.getElementById("backBtn");

const quickBackBtn =
document.getElementById("quickBackBtn");

const finalMessage =
document.getElementById("finalMessage");

const floatingReactions =
document.getElementById("floatingReactions");

const reactionButtons =
document.querySelectorAll(".reaction-btn");

const reactions =
document.getElementById("reactions");

const buttons =
document.querySelector(".buttons");

if(reactionButtons[0]){

  reactionButtons[0].dataset.emoji = "❤️";

  reactionButtons[0].textContent = "❤️";

  reactionButtons[0].setAttribute(
    "aria-label",
    "Reaccionar con corazon rojo"
  );

}

const reactionEmojis = [
  "\u2764\uFE0F",
  "\uD83E\uDD79",
  "\u2728",
  "\uD83D\uDE0D"
];

reactionButtons.forEach((button, index) => {

  const emoji =
    reactionEmojis[index] || button.dataset.emoji;

  button.dataset.emoji =
    emoji;

  button.textContent =
    emoji;

});

/* CANCIONES */

const songs = {

  annie: {

    title: "Annie",

    artist: "Wave to Earth",

    cover: "covers/annie.jpg",

    audio: "music/annie.mp3",

    lyricsFile: "lyrics/annie.txt",

    lyricsDelay: 0,

    autoLyricsStart: 0,

    autoLyricsEndPadding: 12,

    finalMessage: "Ejemplo Annie: esta cancion queda perfecta para un momento tranquilo contigo."

  },

  beso: {

    title: "Beso",

    artist: "Jósean Log",

    cover: "covers/beso.jpg",

    audio: "music/beso.mp3",

    lyricsFile: "lyrics/beso.txt",

    lyricsDelay: 0,

    timedLyricsScale: 1.25,

    timedLyricsStart: 20,

    finalMessage: "Creo que esta canción suena como verte sonreír. Qué bonito sería escuchar esta canción contigo. ✨"

  },

  eres: {

    title: "Eres",

    artist: "CD9",

    cover: "covers/eres-cd9.jpg",

    audio: "music/eres.mp3",

    lyricsFile: "lyrics/eres.txt",

    lyricsDelay: 0,

    autoLyricsStart: 0,

    autoLyricsEndPadding: 10,

    finalMessage: "Cada que escucho esta canción me acuerdo de ti. Eres una persona súper especial y me alegra mucho haberte conocido.💫"

  },

  ojitos: {

    title: "Ojitos cafés",

    artist: "Jos Canela",

    cover: "covers/ojitoscafes.jpg",

    audio: "music/ojitoscafes.mp3",

    lyricsFile: "lyrics/ojitos.txt",

    audioStartTime: 0,

    lyricsDelay: 0,

    autoLyricsStart: 25,

    autoLyricsEndPadding: 35,

    finalMessage: "Sabes que tus ojitos me gustan demasiado, y me gustaria verlos siempre,nunca me cansaria de verlos."

  },

  eresTacvba: {

    title: "Eres",

    artist: "Cafe Tacvba",

    cover: "covers/eres.jpg",

    audio: "music/eres-tacvba.mp3",

    lyricsFile: "lyrics/eres-tacvba.txt",

    lyricsDelay: 0,

    autoLyricsStart: 0,

    autoLyricsEndPadding: 12,

    finalMessage: "Ejemplo Eres Cafe Tacvba: esta tambien tiene algo muy bonito para ti."

  },

  gluesong: {

    title: "Glue Song",

    artist: "Beabadoobee",

    cover: "covers/gluesong.jpg",

    audio: "music/gluesong.mp3",

    lyricsFile: "lyrics/gluesong.txt",

    lyricsDelay: 0,

    autoLyricsStart: 0,

    autoLyricsEndPadding: 10,

    finalMessage: "Ejemplo Glue Song: una cancion suave para una persona muy especial."

  },

  lover: {

    title: "Lover",

    artist: "Taylor Swift",

    cover: "covers/lover.jpg",

    audio: "music/lover.mp3",

    lyricsFile: "lyrics/lover.txt",

    lyricsDelay: 0,

    autoLyricsStart: 0,

    autoLyricsEndPadding: 12,

    finalMessage: "Ejemplo Lover: esta cancion merecia estar aqui por lo bonita que se siente."

  },

  misuerte: {

    title: "Mi suerte",

    artist: "Morat",

    cover: "covers/misuerte.jpg",

    audio: "music/misuerte.mp3",

    lyricsFile: "lyrics/misuerte.txt",

    lyricsDelay: 0,

    autoLyricsStart: 0,

    autoLyricsEndPadding: 12,

    finalMessage: "Ejemplo Mi suerte: que suerte tan bonita coincidir contigo."

  },

  mykindofwoman: {

    title: "My Kind of Woman",

    artist: "Lukas Graham",

    cover: "covers/mykindofwoman.jpg",

    audio: "music/mykindofwoman.mp3",

    lyricsFile: "lyrics/mykindofwoman.txt",

    lyricsDelay: 0,

    autoLyricsStart: 0,

    autoLyricsEndPadding: 12,

    finalMessage: "Ejemplo My Kind of Woman: esta va con todo el carino del mundo."

  },

  theonlyexception: {

    title: "The Only Exception",

    artist: "Paramore",

    cover: "covers/theonlyexception.jpg",

    audio: "music/theonlyexception.mp3",

    lyricsFile: "lyrics/theonlyexception.txt",

    lyricsDelay: 0,

    autoLyricsStart: 0,

    autoLyricsEndPadding: 12,

    finalMessage: "Ejemplo The Only Exception: una cancion bonita para cerrar con algo especial."

  }

};

/* VARIABLES */

let currentSong = null;

let lyrics = [];

let lyricsIndex = 0;

let lyricsInterval;

let parsedLyrics = [];

/* ABRIR CANCION */

document
.querySelectorAll(".playable")
.forEach(item => {

  item.addEventListener("click", () => {

    const songId =
      item.dataset.song;

    openSong(songId);

  });

});

/* FUNCION PRINCIPAL */

async function openSong(songId){

  currentSong = songs[songId];

  if(!currentSong) return;

  /* INFO */

  playerCover.src =
    currentSong.cover;

  playerTitle.textContent =
    currentSong.title;

  playerArtist.textContent =
    currentSong.artist;

  hideFinalMessage();

  showPlayingControls();

  /* AUDIO */

  audio.src =
    currentSong.audio;

  /* CARGAR LETRAS */

  let response;

  try{

    response =
      await fetch(currentSong.lyricsFile);

    if(!response.ok){

      throw new Error("lyrics-not-found");

    }

  }catch(error){

    lyrics = [
      "Agrega la letra en " + currentSong.lyricsFile,
      "Si usas formato segundo|linea se sincroniza mejor",
      "Si pones solo texto, la pagina la reparte automaticamente"
    ];

    openPlayerWithoutLyricsFile();

    return;

  }

  const text =
    await response.text();

  lyrics =
    text.split("\n");

  /* PANTALLAS */

  playlistScreen.classList.add("hidden");

  playerScreen.classList.remove("hidden");

  /* PLAY */

  audio.currentTime =
    currentSong.audioStartTime || 0;

  audio.play();

  /* INICIAR LETRAS */

  startLyrics();

}

function openPlayerWithoutLyricsFile(){

  playlistScreen.classList.add("hidden");

  playerScreen.classList.remove("hidden");

  currentLine.textContent =
    "Falta agregar esta cancion";

  nextLine.textContent =
    currentSong.audio + " y " + currentSong.lyricsFile;

  parsedLyrics = [];

  clearInterval(lyricsInterval);

  showFinishedControls();

  audio.src =
    currentSong.audio;

  audio.currentTime = 0;

}

function showPlayingControls(){

  reactions.classList.remove("hidden");

  buttons.classList.add("hidden");

  floatingReactions.innerHTML = "";

}

function showFinishedControls(){

  reactions.classList.add("hidden");

  buttons.classList.remove("hidden");

  floatingReactions.innerHTML = "";

}

/* REACCIONES */

reactionButtons.forEach(button => {

  button.addEventListener("click", () => {

    createFloatingReaction(button.dataset.emoji);

  });

});

function createFloatingReaction(emoji){

  const reaction =
    document.createElement("span");

  reaction.className =
    "floating-reaction";

  reaction.textContent =
    emoji;

  reaction.style.left =
    `${20 + Math.random() * 60}%`;

  reaction.style.setProperty(
    "--drift",
    `${Math.random() * 80 - 40}px`
  );

  floatingReactions.appendChild(reaction);

  setTimeout(() => {

    reaction.remove();

  }, 1800);

}

function showFinalMessage(){

  finalMessage.textContent =
    currentSong.finalMessage || "";

  finalMessage.classList.remove("hidden");

}

function hideFinalMessage(){

  finalMessage.textContent = "";

  finalMessage.classList.add("hidden");

}

/* LETRAS */

function startLyrics(){

  clearInterval(lyricsInterval);

  lyricsIndex = -2;

  currentLine.textContent = "";

  nextLine.textContent = "";

  if(
    !hasTimedLyrics(lyrics) &&
    !Number.isFinite(audio.duration)
  ){

    audio.addEventListener("loadedmetadata", startLyrics, { once: true });

    return;

  }

  parsedLyrics = buildLyricsTimeline();

  updateLyricsLine(-1);

  lyricsInterval = setInterval(syncLyrics, 100);

}

function hasTimedLyrics(lines){

  return lines.some(line => {

    const parts = line.split("|");

    return Number.isFinite(parseFloat(parts[0])) && parts[1];

  });

}

function buildLyricsTimeline(){

  const cleanLyrics = lyrics
    .map(line => line.trim())
    .filter(Boolean);

  if(hasTimedLyrics(cleanLyrics)){

    return cleanLyrics
      .map(line => {

        const parts = line.split("|");

        return {

          time: getTimedLyricsTime(parseFloat(parts[0])),

          text: parts.slice(1).join("|").trim()

        };

      })
      .filter(line => Number.isFinite(line.time) && line.text);

  }

  const duration =
    Number.isFinite(audio.duration)
    ? audio.duration
    : cleanLyrics.length * 4;

  const startAt =
    currentSong.autoLyricsStart || 0;

  const endPadding =
    currentSong.autoLyricsEndPadding || 0;

  const usableDuration =
    Math.max(duration - startAt - endPadding, cleanLyrics.length * 2);

  const lineDuration =
    usableDuration / cleanLyrics.length;

  return cleanLyrics.map((line, index) => {

    return {

      time: startAt + (index * lineDuration),

      text: line

    };

  });

}

function getTimedLyricsTime(time){

  const scale =
    currentSong.timedLyricsScale || 1;

  const start =
    currentSong.timedLyricsStart || 0;

  return start + (time * scale);

}

function syncLyrics(){

  if(!parsedLyrics.length) return;

  const delay =
    currentSong.lyricsDelay || 0;

  const currentTime =
    Math.max(audio.currentTime - delay, 0);

  const newIndex =
    findCurrentLyricsIndex(currentTime);

  if(newIndex !== lyricsIndex){

    updateLyricsLine(newIndex);

  }

}

function findCurrentLyricsIndex(currentTime){

  let newIndex = -1;

  for(let i = 0; i < parsedLyrics.length; i++){

    if(currentTime >= parsedLyrics[i].time){

      newIndex = i;

    }else{

      break;

    }

  }

  return newIndex;

}

function updateLyricsLine(index){

  lyricsIndex = index;

  currentLine.classList.add("fade-switch");

  setTimeout(() => {

    currentLine.textContent =
      parsedLyrics[index]
      ? parsedLyrics[index].text
      : "";

    nextLine.textContent =
      index < 0
      ? ""
      : parsedLyrics[index + 1]
      ? parsedLyrics[index + 1].text
      : "";

    currentLine.classList.remove("fade-switch");

  }, 60);

}

/* REINICIAR */

restartBtn.addEventListener("click", () => {

  if(!currentSong) return;

  audio.currentTime =
    currentSong.audioStartTime || 0;

  audio.play();

  hideFinalMessage();

  showPlayingControls();

  startLyrics();

});

audio.addEventListener("ended", () => {

  clearInterval(lyricsInterval);

  showFinishedControls();

  showFinalMessage();

});

audio.addEventListener("error", () => {

  clearInterval(lyricsInterval);

  showFinishedControls();

  currentLine.textContent =
    "No encontre el audio";

  nextLine.textContent =
    currentSong
    ? currentSong.audio
    : "";

});

/* VOLVER */

function goBackHome(){

  audio.pause();

  audio.currentTime = 0;

  clearInterval(lyricsInterval);

  hideFinalMessage();

  playerScreen.classList.add("hidden");

  playlistScreen.classList.remove("hidden");

}

backBtn.addEventListener("click", goBackHome);

quickBackBtn.addEventListener("click", goBackHome);
