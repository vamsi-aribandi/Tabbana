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
  const img = document.createElement('img');
  img.width = 64;
  img.height = 64;
  img.src = '../icons/loading.gif';
  status.appendChild(img);
  try {
    await lm.runInstruction(instruction);
    img.src = '../icons/success.png';
    setTimeout(() => {
      status.removeChild(img);
    }, 1000);
  } catch (error) {
    console.error(error.message);
    img.src = '../icons/failure.png';
    setTimeout(() => {
      status.removeChild(img);
    }, 1000);
  }
});
