import React, { useState } from 'react';
import { VocabProvider } from './context/VocabProvider';
import VocabForm from './components/VocabForm';
import VocabList from './components/VocabList';
import PracticeTab from './components/PracticeTab';
import AuthButton from './components/AuthButton';

const App = () => {
  const [activeTab, setActiveTab] = useState('vocab'); // Manage active tab

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <h1 className="text-2xl font-extrabold tracking-wide">📘 Vocabulary App</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('vocab')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'vocab'
                  ? 'bg-white text-blue-600 shadow'
                  : 'hover:bg-blue-400'
              }`}
            >
              Manage Vocabulary
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'practice'
                  ? 'bg-white text-blue-600 shadow'
                  : 'hover:bg-blue-400'
              }`}
            >
              Practice
            </button>
          </div>
          <AuthButton />
        </div>
      </header>
      <main className="container mx-auto p-4">
        <VocabProvider>
          {activeTab === 'vocab' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VocabForm /> {/* Add New Word Form */}
              <VocabList /> {/* Vocabulary List */}
            </div>
          ) : (
            <PracticeTab />
          )}
        </VocabProvider>
      </main>
    </div>
  );
};

export default App;
