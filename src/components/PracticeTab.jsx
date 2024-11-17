import React, { useContext, useState, useEffect } from 'react';
import { VocabContext } from '../context/VocabProvider';

const PracticeTab = () => {
  const { vocab, updateValue, updateTag } = useContext(VocabContext);
  const [currentWord, setCurrentWord] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [currentRound, setCurrentRound] = useState([]); // Words in the current round
  const [progress, setProgress] = useState(0); // Tracks how many words have been completed
  const [totalRoundWords, setTotalRoundWords] = useState(0); // Total words in the current round

  // Shuffle words for random order
  const shuffleWords = (words) => [...words].sort(() => Math.random() - 0.5);

  // Initialize the first round
  useEffect(() => {
    if (currentRound.length === 0 && totalRoundWords === 0) {
      const wordsToPractice = vocab.filter((word) => word.tag !== 'Known');
      if (wordsToPractice.length > 0) {
        const shuffledWords = shuffleWords(wordsToPractice);
        setCurrentRound(shuffledWords);
        setTotalRoundWords(shuffledWords.length); // Set total words for the round
        setCurrentWord(shuffledWords[0]);
        setProgress(0); // Reset progress at the start of each round
      } else {
        setCurrentRound([]);
        setTotalRoundWords(0);
        setCurrentWord(null);
      }
    }
  }, [vocab, currentRound.length, totalRoundWords]);

  // Handle user input and scoring
  const handleCheck = async () => {
    if (!currentWord) return;
    const isCorrect =
      userInput.trim().toLowerCase() ===
      currentWord.definition.trim().toLowerCase();

    if (isCorrect) {
      setFeedback('🎉 Correct!');
      const newValue = Math.max(currentWord.value - 1, 0);
      await updateValue(currentWord.id, newValue);

      if (newValue === 0) {
        await updateTag(currentWord.id, 'Known');
      }
    } else {
      setFeedback(
        `❌ Incorrect. The correct definition is: "${currentWord.definition}".`
      );
      const newValue = Math.min(currentWord.value + 1, 5);
      await updateValue(currentWord.id, newValue);
    }

    setUserInput('');
    const remainingWords = currentRound.filter((word) => word.id !== currentWord.id);

    if (remainingWords.length > 0) {
      setCurrentRound(remainingWords);
      setCurrentWord(remainingWords[0]); // Pick the next word
      setProgress(progress + 1); // Update progress based on words completed
    } else {
      // Start a new round
      const wordsToPractice = vocab.filter((word) => word.tag !== 'Known');
      const shuffledWords = shuffleWords(wordsToPractice);
      setCurrentRound(shuffledWords);
      setTotalRoundWords(shuffledWords.length); // Update total words for the new round
      setCurrentWord(shuffledWords[0] || null);
      setProgress(0); // Reset progress
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-4">
          Practice Vocabulary
        </h2>
        {currentWord ? (
          <>
            <div className="text-center mb-6">
              <p className="text-lg font-medium text-gray-700">
                <strong>Word:</strong> {currentWord.word}
              </p>
            </div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter the definition"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-indigo-600 transition-all outline-none mb-4"
            />
            <button
              onClick={handleCheck}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all"
            >
              Submit
            </button>
            {feedback && (
              <p
                className={`mt-4 text-center text-lg font-semibold ${
                  feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {feedback}
              </p>
            )}
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-indigo-600 h-4 rounded-full transition-all"
                  style={{
                    width: `${(progress / totalRoundWords) * 100}%`, // Updated progress calculation
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                {totalRoundWords - progress} words left in this round
              </p>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-700">No words left to practice!</p>
            <p className="text-sm text-gray-500 mt-2">
              Keep learning and improving your vocabulary.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeTab;
