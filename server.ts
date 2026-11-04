import express from 'express';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

function getPort(): number {
  const portArgIndex = process.argv.indexOf('--port');
  if (portArgIndex !== -1 && process.argv[portArgIndex + 1]) {
    const parsed = Number(process.argv[portArgIndex + 1]);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return Number(process.env.PORT) || 3000;
}

const PORT = getPort();
const app = express();

app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Real AI Image Generation endpoint using Google GenAI
app.post('/api/generate-design-image', async (req, res) => {
  const { prompt, config } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(400).json({
      success: false,
      error: 'GEMINI_API_KEY belum terkonfigurasi pada server (Secrets).'
    });
  }

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Parameter prompt tidak valid.'
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    // Attempt generation with Google image generation model
    // Using gemini-3.1-flash-lite-image as designated in Gemini SDK guidelines
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: prompt
    });

    // Inspect candidates for inline image data
    let base64Data: string | null = null;
    let mimeType = 'image/png';

    const parts = response.candidates?.[0]?.content?.parts;
    if (parts && Array.isArray(parts)) {
      for (const part of parts) {
        if (part.inlineData?.data) {
          base64Data = part.inlineData.data;
          mimeType = part.inlineData.mimeType || 'image/png';
          break;
        }
      }
    }

    if (base64Data) {
      return res.json({
        success: true,
        imageUrl: `data:${mimeType};base64,${base64Data}`,
        mimeType
      });
    }

    // If text was returned instead of image data
    return res.status(422).json({
      success: false,
      error: 'Model AI memberikan respons dalam bentuk teks analitis dan tidak mengembalikan berkas gambar biner. Silakan coba kembali atau gunakan prompt pada ChatGPT.',
      rawText: response.text
    });
  } catch (err: any) {
    console.error('Error generating image via Gemini API:', err);
    let errorMessage = err?.message || 'Terjadi kesalahan saat memproses generasi gambar dengan model AI.';
    if (
      errorMessage.includes('quota') ||
      errorMessage.includes('RESOURCE_EXHAUSTED') ||
      errorMessage.includes('limit: 0')
    ) {
      errorMessage =
        'Kuota model pembuat gambar AI (gemini-3.1-flash-lite-image) pada Free Tier telah mencapai batas (limit 0). Model pembuat gambar Google AI Studio memerlukan proyek billing/kunci API berbayar.';
    }
    return res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
