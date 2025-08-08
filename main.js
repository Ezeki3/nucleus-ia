import './style.css'
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateText } from 'ai';

const openrouter = createOpenRouter({
  apiKey: import.meta.env.VITE_OPENROUTER_KEY
})

const form = document.querySelector('#form');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const prompt = document.querySelector('#prompt').value;

  if (prompt.trim() === '') {
    alert('La consulta no puede ir vacia');
    return
  }

  const result = await generateText({
    model: openrouter('google/gemini-2.0-flash-exp:free'),
    // model:('deepseek/deepseek-r1-0528-qwen3-8b:free'),
    // model:('meta-llama/llama-3.3-70b-instruct:free'),
    prompt: prompt
  })

  console.log(result)
  
})