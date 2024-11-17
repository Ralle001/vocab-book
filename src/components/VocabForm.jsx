import React, { useContext, useState } from 'react';
import { VocabContext } from '../context/VocabProvider';

const VocabForm = () => {
  const { addWord } = useContext(VocabContext);
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [tag, setTag] = useState('New');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!word || !definition) {
      setError('Both word and definition are required.');
      return;
    }

    try {
      setError('');
      await addWord(word, definition, tag);
      setWord('');
      setDefinition('');
      setTag('New');
    } catch (err) {
      setError('Failed to add word.');
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Add New Word</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Word</label>
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter word"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Definition</label>
          <input
            type="text"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            placeholder="Enter definition"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Tag</label>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="New">New</option>
            <option value="Struggling">Struggling</option>
            <option value="Known">Known</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Add Word
        </button>
      </form>
    </div>
  );
};

export default VocabForm;
