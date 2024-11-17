import React, { useState } from 'react';
import { VocabProvider } from './context/VocabProvider';
import VocabForm from './components/VocabForm';
import VocabList from './components/VocabList';
import PracticeTab from './components/PracticeTab';
import AuthButton from './components/AuthButton';

const App = () => {
  const [activeTab, setActiveTab] = useState('vocab'); // Manage active tab
  const [menuOpen, setMenuOpen] = useState(false); // Declare menuOpen state

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
        <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-6">
          <h1 className="text-xl md:text-2xl font-extrabold tracking-wide">
            📘 Vocabulary App
          </h1>
          <button
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen(!menuOpen)} // Toggle menu state
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <nav className={`w-full md:w-auto mt-4 md:mt-0`}>
            <ul className="flex flex-col md:flex-row md:space-x-4">
              <li>
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
              </li>
              <li>
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
              </li>
            </ul>
          </nav>
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
