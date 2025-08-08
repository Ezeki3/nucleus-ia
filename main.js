import './style.css'
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';

const openrouter = createOpenRouter({
  apiKey: import.meta.env.VITE_OPENROUTER_KEY
})

const form = document.querySelector('#form');
const app = document.querySelector('#app');
const submitBtn = document.querySelector('#submit');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const prompt = document.querySelector('#prompt').value;

  if (prompt.trim() === '') {
    alert('La consulta no puede ir vacia');
    return
  }

  submitBtn.disabled = true;

  const result = streamText({
    // model: openrouter('google/gemini-2.0-flash-exp:free'),
    // model: openrouter('deepseek/deepseek-r1-0528-qwen3-8b:free'),
    // model: openrouter('meta-llama/llama-3.3-70b-instruct:free'),
    // model: openrouter('deepseek/deepseek-r1:free'),
    model: openrouter("meta-llama/llama-3-8b-instruct"),
    // model: openrouter("mistral/mistral-7b-instruct"),

    prompt: prompt,
    // system: 'Eres un niño de 4 años',
    // system: 'Eres una persona de 98 años',
    // temperature:0
  });

  while( app.firstChild ){
    app.removeChild(app.firstChild)
  }

  for await ( const text of result.textStream) {
    app.append(text)   
  }

  submitBtn.disabled = false;
  
})