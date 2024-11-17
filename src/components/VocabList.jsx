import React, { useContext } from 'react';
import { VocabContext } from '../context/VocabProvider';

const VocabList = () => {
  const { vocab, updateTag, deleteWord } = useContext(VocabContext);

  // Group words by tags
  const groupedVocab = vocab.reduce(
    (acc, word) => {
      acc[word.tag] = [...(acc[word.tag] || []), word];
      return acc;
    },
    { New: [], Struggling: [], Known: [] }
  );

  const getTagStyles = (tag) => {
    switch (tag) {
      case 'New':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Struggling':
        return 'border-red-500 bg-red-50 dark:bg-red-900 dark:text-red-200';
      case 'Known':
        return 'border-green-500 bg-green-50 dark:bg-green-900 dark:text-green-200';
      default:
        return 'border-gray-500 bg-gray-50 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto p-4">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          Vocabulary List
        </h2>
        {['New', 'Struggling', 'Known'].map((tag) => (
          <div key={tag} className="mb-6">
            <h3 className={`text-lg font-bold mb-2 text-${tag.toLowerCase()}-600 dark:text-${tag.toLowerCase()}-300`}>
              {tag} Words ({groupedVocab[tag].length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedVocab[tag].length > 0 ? (
                groupedVocab[tag].map((item) => (
                  <div
                    key={item.id}
                    className={`shadow-md rounded-lg p-6 border-l-4 ${getTagStyles(item.tag)} 
                            hover:shadow-lg transition-all text-center flex flex-col items-center`}
                  >
                    {/* Word */}
                    <div className="flex justify-between w-full mb-2">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Term:</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item.word}</span>
                    </div>

                    {/* Definition */}
                    <div className="flex justify-between w-full mb-2">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Def:</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item.definition}</span>
                    </div>

                    {/* Score */}
                    <div className="flex justify-between w-full mb-4">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Score:</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item.value}</span>
                    </div>

                    {/* Dropdown */}
                    <select
                      value={item.tag}
                      onChange={(e) => updateTag(item.id, e.target.value)}
                      className="block w-full max-w-xs px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-300
                              border border-gray-300 rounded-md shadow-sm truncate focus:outline-none 
                              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-white mb-6"
                    >
                      <option value="New">New</option>
                      <option value="Struggling">Struggling</option>
                      <option value="Known">Known</option>
                    </select>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteWord(item.id)}
                      className="text-red-600 dark:text-red-400 text-sm hover:underline focus:outline-none focus:ring-2 
                              focus:ring-red-500 focus:border-red-500"
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center col-span-full dark:text-gray-400">
                  No words in this category.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VocabList;
