// public/app.js

const STORAGE_KEY = 'emojiTranslatorHistory';

// Functions to handle localStorage
function getHistory() {
  const history = localStorage.getItem(STORAGE_KEY);
  return history ? JSON.parse(history) : [];
}

function saveHistory(history) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

// Function to add a translation to history
function addToHistory(originalText, translatedText) {
  const history = getHistory();
  history.unshift({ originalText, translatedText }); // Add to the beginning
  saveHistory(history);
}

// Function to display the history
function displayHistory() {
  const history = getHistory();
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = ''; // Clear existing items

  if (history.length === 0) {
    const noEntriesItem = document.createElement('li');
    noEntriesItem.textContent = 'No entries';
    historyList.appendChild(noEntriesItem);
    return; // Exit the function if there are no entries
  }

  history.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('mb-2', 'flex', 'justify-between', 'items-center');

    const textSpan = document.createElement('span');
    textSpan.textContent = `${item.originalText} → ${item.translatedText}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add(
      'ml-2',
      'text-red-500',
      'hover:underline',
      'text-sm'
    );
    deleteButton.addEventListener('click', () => {
      deleteHistoryItem(index);
    });

    listItem.appendChild(textSpan);
    listItem.appendChild(deleteButton);
    historyList.appendChild(listItem);
  });
}

// Function to delete a specific history item
function deleteHistoryItem(index) {
  const history = getHistory();
  history.splice(index, 1); // Remove the item at the given index
  saveHistory(history);
  displayHistory();
}

// Handle form submission
document.getElementById('translator-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const textInput = document.getElementById('text-input').value.trim();
  const resultDiv = document.getElementById('result');
  
  if (!textInput) {
    resultDiv.textContent = 'Please enter some text.';
    return;
  }

  resultDiv.textContent = 'Translating...'; // Show loading message

  try {
    const response = await fetch('/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: textInput }),
    });

    const data = await response.json();

    if (data.error) {
      resultDiv.textContent = `Error: ${data.error}`;
    } else {
      resultDiv.textContent = data.translatedText;
      addToHistory(textInput, data.translatedText);
      displayHistory();
      document.getElementById('text-input').value = '';
    }
  } catch (error) {
    resultDiv.textContent = 'An error occurred while translating the text.';
    console.error('Fetch error:', error);
  }
});

// Load history on page load
document.addEventListener('DOMContentLoaded', displayHistory);
