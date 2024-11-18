import React, { useState, useContext } from 'react';
import { VocabContext } from '../context/VocabProvider'; // Import your context

const VocabForm = () => {
  const { addWord } = useContext(VocabContext); // Access the addWord function from context
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted'); // Debug log
    console.log('Word:', word); // Debug log
    console.log('Definition:', definition); // Debug log

    if (!word || !definition) {
      alert('Please fill in both fields.');
      return;
    }

    addWord(word, definition, 'New'); // Default tag for new words
    setWord(''); // Reset the input fields
    setDefinition('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Add New Word
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="word" className="text-gray-700 dark:text-gray-300">
            Word
          </label>
          <input
            id="word"
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="w-full p-3 mt-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border rounded-md"
            placeholder="Enter word"
          />
        </div>
        <div>
          <label htmlFor="definition" className="text-gray-700 dark:text-gray-300">
            Definition
          </label>
          <textarea
            id="definition"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            className="w-full p-3 mt-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border rounded-md"
            placeholder="Enter definition"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          Add Word
        </button>
      </form>
    </div>
  );
};

export default VocabForm;
