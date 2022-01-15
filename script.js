const button = document.querySelector("#button");

const audioElement = document.querySelector("#audio");
// VoiceRSS Javascript SDK
// prettier-ignore

//Disable/Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}
//normally the api key would and this telljoke function would be on the
//server side. but this is just a demo.
async function tellJoke(joke) {
  console.log(joke);
  VoiceRSS.speech({
    key: "2b8e5afb1502446382081bb82ea4146a",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

//get jokes from jokes API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellJoke(joke);
    toggleButton();
  } catch (error) {
    console.log("whoops", error);
  }
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
// function test() {
//   VoiceRSS.speech({
//     key: "2b8e5afb1502446382081bb82ea4146a",
//     src: "Hello, world!",
//     hl: "en-us",
//     v: "Linda",
//     r: 0,
//     c: "mp3",
//     f: "44khz_16bit_stereo",
//     ssml: false,
//   });
// }

// test();
