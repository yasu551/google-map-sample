import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="voicevox"
export default class extends Controller {
  static targets = ['sourceText'];

  playVoice() {
    const baseUrl = 'https://voicevox.test';
    const speaker = 2; // ずんだもんの声
    const audioQueryUrl = new URL('/audio_query', baseUrl);
    audioQueryUrl.search = new URLSearchParams({
      speaker,
      text: this.sourceTextTarget.innerText,
    });
   const synthesisUrl = new URL('/synthesis', baseUrl);
   synthesisUrl.search = new URLSearchParams({ speaker });
   fetch(audioQueryUrl, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
   })
       .then(response => response.json())
       .then(query => {
         return fetch(synthesisUrl, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(query),
         })
       })
       .then(response => response.arrayBuffer())
       .then(buffer => {
         const context = new AudioContext();
         context.decodeAudioData(buffer, audioBuffer => {
           const source = context.createBufferSource();
           source.buffer = audioBuffer;
           source.connect(context.destination);
           source.start();
         });
       })
       .catch(error => console.log('Error', error));
  }
}
