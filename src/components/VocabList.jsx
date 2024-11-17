import React, { useContext } from 'react';
import { VocabContext } from '../context/VocabProvider';

const VocabList = () => {
  const { vocab, updateTag, deleteWord } = useContext(VocabContext);

  // Group words by tag
  const groupedVocab = vocab.reduce((groups, item) => {
    const { tag } = item;
    if (!groups[tag]) {
      groups[tag] = [];
    }
    groups[tag].push(item);
    return groups;
  }, {});

  // Tag order for display
  const tagOrder = ['Struggling', 'New', 'Known'];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Vocabulary List</h2>
      {tagOrder.map((tag) => (
        <div key={tag} className="mb-6">
          {groupedVocab[tag]?.length > 0 && (
            <>
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                {tag} ({groupedVocab[tag].length})
              </h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="py-2 px-4">Word</th>
                    <th className="py-2 px-4">Definition</th>
                    <th className="py-2 px-4">Tag</th>
                    <th className="py-2 px-4">Score</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedVocab[tag].map(({ id, word, definition, tag, value }) => (
                    <tr key={id} className="border-b">
                      <td className="py-2 px-4">{word}</td>
                      <td className="py-2 px-4">{definition}</td>
                      <td className="py-2 px-4">
                        <select
                          value={tag}
                          onChange={(e) => updateTag(id, e.target.value)}
                          className="border rounded-lg px-2 py-1"
                        >
                          <option value="New">New</option>
                          <option value="Struggling">Struggling</option>
                          <option value="Known">Known</option>
                        </select>
                      </td>
                      <td className="py-2 px-4">{value}</td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => deleteWord(id)}
                          className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      ))}
      {vocab.length === 0 && <p className="text-gray-500">No words found.</p>}
    </div>
  );
};

export default VocabList;
