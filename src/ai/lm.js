// Code to run instructions using a language model
let functions = null;
let prompts = null;

// load functions as a web_accessible_resource json
async function getJson(path) {
  let json = await fetch(chrome.runtime.getURL(path));
  json = await json.json();
  return json;
}

export async function runInstruction(instruction) {
  if (functions === null) functions = await getJson("ai/functions.json");
  if (prompts === null) prompts = await getJson("ai/prompts.json");
  console.log(`Running instruction: ${instruction}`);
  console.log(`using functions: ${JSON.stringify(functions)}`);
  const tabs = await chrome.tabs.query({"currentWindow": true});
  console.log(tabs);
  const idx2id = {};
  const tabStrs = [];
  tabs.forEach(tab => {
    let idx = tab.index+1;
    idx2id[idx] = tab.id;
    const s = `- TAB ${idx}: {ID: ${idx}, URL: ${tab.url.slice(0, 150)}, title: "${tab.title.slice(0, 150)}", groupId: ${tab.groupId}, active: ${tab.active}}, audible: ${tab.audible}, status: ${tab.status}, muted: ${tab.mutedInfo.muted}}`;
    tabStrs.push(s);
  });
  const tabStr = tabStrs.join('\n');
  const systemPrompt = prompts.system_prompt;
  const userPrompt = templateStr(prompts.user_prompt_templ, {instruction, tabStr});
  console.log(systemPrompt);
  console.log(userPrompt);
  const data = await call_lm(userPrompt, systemPrompt, functions);
  console.log(data)
  callFn(data, idx2id);
}

async function call_lm(userPrompt, systemPrompt, functions) {
  const {openaiApiKey} = await chrome.storage.local.get(["openaiApiKey"]);
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`
    },
    body: JSON.stringify({
      "model": "gpt-3.5-turbo-1106",
      "messages": [
        {
          "role": "system",
          "content": systemPrompt
        },
        {
          "role": "user",
          "content": userPrompt
        }
      ],
      "functions": functions,
      "temperature": 0.0,
    })
  });
  const data = await response.json();
  return data;
}

function templateStr(s, kv) {
  let res = s;
  for (const [k, v] of Object.entries(kv)) {
    res = res.replace(`{${k}}`, v);
  }
  return res;
}

const name2fn = {
  "close": closeTabs
}

async function closeTabs(args, idx2id) {
  const actual_ids = args.tabIds.map((idx) => idx2id[idx]);
  chrome.tabs.remove(actual_ids);
}

async function callFn(openaiRes, idx2id) {
  if (openaiRes.choices[0].finish_reason !== "function_call") {
    console.error('NO FN CALL DONE!!!')
    throw new Error('NO FN CALL DONE!!!');
  }
  const fn_obj = await openaiRes.choices[0].message.function_call;
  console.log(fn_obj)
  const fn_args = JSON.parse(fn_obj.arguments);
  console.log(fn_args);
  const fn = name2fn[fn_obj.name];
  fn(fn_args, idx2id);
}
