import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || '';
const geminiModel = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
let genAI: GoogleGenAI | null = null;

if (apiKey) {
  try {
    genAI = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Warning: Could not initialize GoogleGenAI with key:', err);
  }
} else {
  console.log('Notice: No GEMINI_API_KEY detected in environment. Operating in deterministic demo mode.');
}

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    geminiConfigured: !!genAI,
    model: geminiModel,
    timestamp: new Date().toISOString(),
  });
});

// API: Analyze Citizen Voice/Text Request
app.post('/api/analyze', async (req: Request, res: Response) => {
  const { text, languageHint } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ success: false, error: 'Text prompt is required.' });
  }

  if (!genAI) {
    return res.status(503).json({
      success: false,
      error: 'Gemini API key not configured on server. Falling back to deterministic demo scenarios.',
    });
  }

  try {
    const prompt = `You are JanSetu AI's Multilingual Civic Understanding & Extraction Engine for India.
Analyze the following citizen development request submitted via voice or text.
Citizen Input: "${text}"
${languageHint ? `Language hint: ${languageHint}` : ''}

Strict requirements:
1. Detect original language (e.g. ta for Tamil, hi for Hindi, en for English, te for Telugu, kn for Kannada, bn for Bengali).
2. Map to one of the canonical Development Sectors: "transportation", "healthcare", "water", "roads", "electricity", "sanitation", "education", "agriculture", "climate".
3. Extract specific subcategory, key issue, location, district, Indian state, affected groups, severity ("low", "medium", "high", "critical"), and citizen's requested action.
4. Normalize the issue into clear English development terminology.
5. If the district is not explicitly stated in the text, infer the most likely district or set a plausible district (e.g. Dharmapuri for Tamil, Mirzapur for Hindi, Kalaburagi for Kannada, Adilabad for Telugu, Purulia for Bengali) and note confidence.`;

    const response = await genAI.models.generateContent({
      model: geminiModel,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            language: { type: Type.STRING },
            sector: {
              type: Type.STRING,
              enum: [
                'transportation',
                'healthcare',
                'water',
                'roads',
                'electricity',
                'sanitation',
                'education',
                'agriculture',
                'climate',
              ],
            },
            subcategory: { type: Type.STRING },
            issue: { type: Type.STRING },
            location: { type: Type.STRING },
            district: { type: Type.STRING },
            state: { type: Type.STRING },
            affectedGroups: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            severity: {
              type: Type.STRING,
              enum: ['low', 'medium', 'high', 'critical'],
            },
            requestedAction: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            normalizedSummary: { type: Type.STRING },
          },
          required: [
            'language',
            'sector',
            'subcategory',
            'issue',
            'district',
            'state',
            'affectedGroups',
            'severity',
            'requestedAction',
            'confidence',
            'normalizedSummary',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed });
  } catch (err: any) {
    console.error('Gemini extraction error:', err);
    return res.status(500).json({
      success: false,
      error: 'AI analysis encountered an error. Falling back to heuristic/demo mode.',
      details: err?.message,
    });
  }
});

// API: Synthesize Hotspot Evidence & Candidate Intervention
app.post('/api/synthesize-insight', async (req: Request, res: Response) => {
  const {
    district,
    state,
    sector,
    dni,
    requestCount,
    population,
    serviceCoverage,
    infrastructureGap,
    nearestFacilityKm,
    activeProjects,
    committedCrores,
    sampleQuotes,
  } = req.body;

  if (!genAI) {
    return res.status(503).json({
      success: false,
      error: 'Gemini API not configured on server.',
    });
  }

  try {
    const prompt = `You are JanSetu AI's Evidence Synthesis Engine for Indian public planning.
You are given verified empirical evidence for a development hotspot:
- District: ${district}
- State: ${state}
- Development Sector: ${sector}
- Development Need Index (DNI): ${dni} / 100 (Deterministic multi-factor score)
- Citizen Demand Volume: ${requestCount} verified citizen signals
- Total District Population: ${population}
- Existing Service Coverage: ${serviceCoverage}%
- Infrastructure Gap: ${infrastructureGap}%
- Nearest Critical Facility Distance: ${nearestFacilityKm} km
- Public Investment Context: ${activeProjects} active projects with ₹${committedCrores} Crore committed
- Representative Citizen Statements:
${(sampleQuotes || []).map((q: string) => `  * "${q}"`).join('\n')}

INSTRUCTIONS:
1. "insight": Synthesize ONLY the provided empirical evidence in 2-3 concise, high-credibility sentences. Explain why this development signal exists. DO NOT invent any population figures, budget numbers, or statistics not provided above.
2. "candidateIntervention": Formulate a candidate development intervention for policymaker consideration (actionable, non-binding). State that this is for policymaker review and not an autonomous policy decision.

Output JSON format:
{
  "insight": "...",
  "candidateIntervention": "..."
}`;

    const response = await genAI.models.generateContent({
      model: geminiModel,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insight: { type: Type.STRING },
            candidateIntervention: { type: Type.STRING },
          },
          required: ['insight', 'candidateIntervention'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      success: true,
      insight: parsed.insight,
      candidateIntervention: parsed.candidateIntervention,
    });
  } catch (err: any) {
    console.error('Gemini synthesis error:', err);
    return res.status(500).json({
      success: false,
      error: 'Could not generate live Gemini synthesis.',
      details: err?.message,
    });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`JanSetu AI Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
