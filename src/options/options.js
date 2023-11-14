// Saves options to chrome.storage
const saveOptions = () => {
  const openaiApiKey = document.getElementById('openai_api_key').value;

  chrome.storage.local.set(
    {"openaiApiKey": openaiApiKey},
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status');
      status.textContent = 'Options saved.';
      status.style.color = 'green';
      setTimeout(() => {
        status.textContent = '';
      }, 750);
    }
  );
};

// Restores state using the preferences stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.local.get(
    ["openaiApiKey"],
    (items) => {
      document.getElementById('openai_api_key').value = items.openaiApiKey;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
