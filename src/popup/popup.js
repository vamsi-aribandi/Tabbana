import * as lm from "../ai/lm.js"

// see https://developer.chrome.com/docs/extensions/mv3/options/
document.querySelector('#go-to-options').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});

document.querySelector('#instruction-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  const instruction = document.querySelector('#instruction').value;
  const status = document.getElementById('status');
  try {
    await lm.runInstruction(instruction);
    status.textContent = "Success!";
    status.style.color = 'green';
  } catch (error) {
    if (error instanceof RangeError) status.textContent = `Error: ${error.message}`;
    else {
      status.textContent = `Error: see logs`;
      console.error(error.message)
    }
    status.style.color = 'red';
  }
});
