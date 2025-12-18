import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function generateManimCodeREST(userPrompt) {
  try {
    const apiKey = process.env.GOOGLE_API_KEY ;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

    const systemPrompt = `You are a Manim (Mathematical Animation Engine) expert. Generate Python code using the Manim library based on the user's description.

IMPORTANT REQUIREMENTS:
1. The class name MUST be exactly "video" (lowercase)
2. Use "from manim import *" for imports
3. The class must inherit from Scene
4. Include the construct method with the animation logic
5. Only output valid Python code, no explanations or markdown
6. Do not include any text before or after the code
7. Do not wrap code in markdown code blocks

User's request: ${userPrompt}

Generate only the Python code:`;

    console.log('Generating Manim code...');

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: systemPrompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    let code = data.candidates[0].content.parts[0].text;

    code = code.replace(/```python\n?/g, '').replace(/```\n?/g, '').trim();
    code = code.replace(/class\s+\w+\s*\(/g, 'class video(');

    const videoDir = path.join(__dirname, '..', 'video');
    if (!fs.existsSync(videoDir)) {
      fs.mkdirSync(videoDir, { recursive: true });
    }

    const filePath = path.join(videoDir, 'video.py');
    fs.writeFileSync(filePath, code, 'utf8');

    console.log(`✓ Manim code generated successfully!`);
    console.log(`✓ File saved to: ${filePath}`);

    return filePath;

  } catch (error) {
    console.error('Error generating Manim code:', error);
    throw error;
  }
}
export {  generateManimCodeREST };