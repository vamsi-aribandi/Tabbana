import * as lm from "../ai/lm.js"

// see https://developer.chrome.com/docs/extensions/mv3/options/
document.querySelector('#go-to-options').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});

document.querySelector('#instruction-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const instruction = document.querySelector('#instruction').value;
  lm.runInstruction(instruction);
});
