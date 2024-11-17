import React, { createContext, useState, useEffect, useContext } from 'react';
import { collection, query, where, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import db from '../firebase'; // Ensure this points to your Firebase configuration
import { AuthContext } from './AuthContext'; // Ensure this points to your AuthContext

export const VocabContext = createContext();

export const VocabProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Get the logged-in user's address from AuthContext
  const [vocab, setVocab] = useState([]); // State to store the vocabulary list

  // Fetch vocabulary data for the current user
  const fetchUserVocab = async () => {
    if (!user) return;
  
    try {
      console.log('Fetching vocab for user:', user); // Debug log
      const q = query(collection(db, 'vocabulary'), where('user', '==', user));
      const querySnapshot = await getDocs(q);
      const userVocab = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Fetched vocab:', userVocab); // Debug log
      setVocab(userVocab);
    } catch (error) {
      console.error('Error fetching user vocabulary:', error);
    }
  };

  // Add a new word to the database and update state
  const addWord = async (word, definition, tag) => {
    if (!user) {
      alert('Please sign in to add words.');
      return;
    }

    const duplicate = vocab.some((item) => item.word.toLowerCase() === word.toLowerCase());
    if (duplicate) {
      alert(`The word "${word}" already exists.`);
      return;
    }

    try {
      const initialValue = tag === 'New' ? 3 : tag === 'Struggling' ? 5 : 0;
      const newWord = { word, definition, user, tag, value: initialValue };

      const docRef = await addDoc(collection(db, 'vocabulary'), newWord);
      setVocab((prev) => [...prev, { id: docRef.id, ...newWord }]);
    } catch (error) {
      console.error('Error adding word:', error);
    }
  };

  // Update a word's tag and value in the database and state
  const updateTag = async (id, newTag) => {
    try {
      const newValue = newTag === 'New' ? 3 : newTag === 'Struggling' ? 5 : 0;
      const wordRef = doc(db, 'vocabulary', id);
      await updateDoc(wordRef, { tag: newTag, value: newValue });
  
      setVocab((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, tag: newTag, value: newValue } : item
        )
      );
    } catch (error) {
      console.error('Error updating tag:', error);
    }
  };
  

  // Update the value (score) of a word
  const updateValue = async (id, newValue) => {
    try {
      const wordRef = doc(db, 'vocabulary', id);
      await updateDoc(wordRef, { value: newValue });

      setVocab((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, value: newValue } : item
        )
      );
    } catch (error) {
      console.error('Error updating value:', error);
    }
  };

  // Delete a word from the database and update state
  const deleteWord = async (id) => {
    try {
      const wordRef = doc(db, 'vocabulary', id);
      await deleteDoc(wordRef);
  
      setVocab((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting word:', error);
    }
  };
  

  // Fetch vocabulary data when the user changes
  useEffect(() => {
    if (user) {
      fetchUserVocab(); // Only fetch when `user` changes
    }
  }, [user]);
  

  return (
    <VocabContext.Provider
      value={{
        vocab,
        setVocab,
        fetchUserVocab,
        addWord,
        updateTag,
        updateValue,
        deleteWord,
      }}
    >
      {children}
    </VocabContext.Provider>
  );
};
