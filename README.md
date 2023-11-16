# Tabbana
Manage your browser tabs using natural language instructions.
<p align="center">
  <img src="./logo.png" style="width:61.8%;">
</p>

## Configuration
1. Install Tabbana from the [Chrome Web Store](https://chromewebstore.google.com/detail/tabbana-manage-tabs-with/odbdiaifppdoahijolcdjdhodndfmjph).
2. Configure your OpenAI API key. \
 a. [Create an OpenAI API key](https://platform.openai.com/docs/quickstart/account-setup) if you don't have one. \
 b. Open Tabbana from the extensions menu, and click on the options button. \
 c. Paste your OpenAI API key into the field, and click save.

## Overview
Tabbana takes a natural language instruction and manages your tabs for you. It does this using a language model to parse your instruction into a function compatible with select [Chromium APIs](https://developer.chrome.com/docs/extensions/reference/).

Tabbana uses OpenAI language models, so a user needs to configure Tabbana with their own OpenAI API key. This is stored locally in your browser, and can only be accessed by Tabbana. For a browser window of 30 tabs, a single Tabbana instruction will cost around $0.002.

The only information Tabbana uses to identify tabs are their title and URL, in addition to other metadata like the tab position and whether it is audible, highlighted, etc. It does not "see" any website content of a tab.

Currently, the supported actions are:
 - [Closing tabs](https://developer.chrome.com/docs/extensions/reference/tabs/#method-remove)
 - [Grouping tabs](https://developer.chrome.com/docs/extensions/reference/tabs/#method-group)
 - [Ungrouping tabs](https://developer.chrome.com/docs/extensions/reference/tabs/#method-ungroup)
 - [Creating a tab](https://developer.chrome.com/docs/extensions/reference/tabs/#method-create)
 - [Reloading tabs](https://developer.chrome.com/docs/extensions/reference/tabs/#method-reload)


## Examples
Some example commands are:
 - `close all wikipedia tabs`
 - `group all shopping tabs together`
 - `ungroup the facebook tabs`
 - `close all audible tabs.`
 - `close the first tab`
 - `create a new github tab`
 - `reload all the grouped tabs`
