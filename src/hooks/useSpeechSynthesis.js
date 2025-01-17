import { useState, useEffect } from 'react';

export function useSpeechSynthesis() {
  const [speaking, setSpeaking] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [utterance, setUtterance] = useState(null);

  const speak = (text) => {
    if (!speaking) {
      const synth = window.speechSynthesis;
      if (synth) {
        const newUtterance = new SpeechSynthesisUtterance(text);
        newUtterance.rate = 0.85; // 0.1 - 10

        // Obtener la voz por defecto "Microsoft Sabina - Spanish (Mexico)"
        const voices = window.speechSynthesis.getVoices();
        const defaultVoice = voices.find(voice => (
          voice.name === "Microsoft Sabina - Spanish (Mexico)"
          //voice.name === "Microsoft Raul - Spanish (Mexico)"
          //voice.name === "Microsoft Helena - Spanish (Spain)"
          //voice.name === "Microsoft Laura - Spanish (Spain)"
          //voice.name === "Microsoft Pablo - Spanish (Spain)"
          //voice.name === "Google español"
          //voice.name === "Google español de Estados Unidos"
        ));

        if (defaultVoice) {
          newUtterance.voice = defaultVoice;
        } else {
          console.error('La voz por defecto no está disponible.');
        }

        synth.speak(newUtterance);
        setSpeaking(true);
        setCurrentText(text);
        setUtterance(newUtterance);
      } else {
        console.error('La síntesis de voz no está soportada en este navegador.');
      }
    } else {
      stopSpeaking();
    }
  };

  const stopSpeaking = () => {
    if (speaking) {
      const synth = window.speechSynthesis;
      if (synth) {
        synth.cancel();
        setSpeaking(false);
      }
    }
  };

  useEffect(() => {
    if (utterance) {
      utterance.onend = () => {
        setSpeaking(false);
      };
    }
  }, [utterance]);

  return { 
    speak, 
    speaking, 
    setSpeaking,
    stopSpeaking, 
    currentText 
  };
}
