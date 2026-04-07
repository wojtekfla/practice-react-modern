import React, { useState, useEffect, useRef } from 'react';
import useRandomItem from './hook';

const WORDS_PER_ROUND = 5; // podaj liczbe słów na rundę

const wordsArray = [
  'bicycle',
  'library',
  'journey',
  'picture',
  'weather',
  'frequent',
  'capture',
  'pattern',
  'silence',
  'whisper',
  'balance',
  'comfort',
  'diamond',
  'eastern',
  'fascinate',
];

const SpeedTest = () => {
  const [word, regenerateWord] = useRandomItem(wordsArray);
  const [text, setText] = useState('');
  const [time, setTime] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  // rozbudowana wersja
  const [wordsLeft, setWordsLeft] = useState(WORDS_PER_ROUND);
  const [finished, setFinished] = useState(false);

  const intervalRef = useRef(null);

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  // reset całości
  const handleReset = () => {
    stopTimer();
    setTime(0);
    setTotalChars(0);
    setWordsLeft(WORDS_PER_ROUND);
    setFinished(false);
    setText('');
    regenerateWord();
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleFocus = () => {
    if (finished) return;
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  const handleBlur = () => {
    stopTimer();
  };

  useEffect(() => {
    regenerateWord();
  }, []);

  useEffect(() => {
    if (text === word && word !== null) {
      const newWordsLeft = wordsLeft - 1;

      setTotalChars((prev) => prev + word.length);
      setText('');

      if (newWordsLeft === 0) {
        stopTimer();
        setWordsLeft(0);
        setFinished(true);
      } else {
        setWordsLeft(newWordsLeft);
        regenerateWord();
      }
    }
  }, [text]);

  // Obliczanie Characters per minute CPM
  const cpm = time > 0 ? Math.round((totalChars / time) * 60) : 0;

  // ekran wyników
  if (finished) {
    return (
      <div>
        <h2>Wyniki</h2>
        <p>{`Czas: ${time}s`}</p>
        <p>{`Wpisane znaki: ${totalChars}`}</p>
        <p>{`CPM: ${cpm}`}</p>
        <button type="button" onClick={handleReset}>
          Restart
        </button>
      </div>
    );
  }

  return (
    <div>
      <p>{` ${WORDS_PER_ROUND - wordsLeft + 1} / ${WORDS_PER_ROUND} word in round `}</p>
      <h1>{word}</h1>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ borderColor: text && !word.startsWith(text) ? 'red' : 'initial' }}
      />
      <p>{`Time: ${time}s`}</p>
    </div>
  );
};

export default SpeedTest;
