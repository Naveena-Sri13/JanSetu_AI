# JanSetu AI

## From citizen voices to development intelligence.

[![Digital Public Good](https://img.shields.io/badge/Architecture-Digital%20Public%20Good-indigo.svg)](https://github.com)
[![Google AI](https://img.shields.io/badge/Powered%20by-Google%20Gemini%203.8%20Flash-blue.svg)](https://ai.google.dev)
[![Hackathon](https://img.shields.io/badge/Build%20with%20AI-Code%20for%20Communities-emerald.svg)](https://gdg.community.dev)
[![Zero PII](https://img.shields.io/badge/Privacy-Zero--PII%20by%20Design-teal.svg)](#responsible-ai--ethics)

---

## 1. Problem Statement
Across India’s 700+ districts, millions of citizens communicate critical development needs every day: an unserved hospital bus route, contaminated village groundwater, an impassable monsoon link road, or an understaffed primary health sub-center. However:
- **Linguistic & Literacy Barriers:** Existing grievance portals are predominantly English-centric, requiring written digital literacy that excludes rural populations.
- **Siloed Ticketing Mindset:** Governments treat citizen submissions as isolated individual maintenance tickets rather than systemic, geographic development signals.
- **Data Blindness:** District collectors and state planning boards lack tools to correlate grassroots demand with official infrastructure coverage and existing public investments.

---

## 2. Solution: JanSetu AI
**JanSetu AI** ("Jan" = people / citizens, "Setu" = bridge) is a **Multilingual Civic Development Intelligence Platform** designed as a Digital Public Good. It transforms fragmented citizen voice and text requests across Indian languages into structured, geographically meaningful development signals, identifying unmet-need hotspots and generating evidence-backed candidate interventions for policymakers.

---

## 3. Key Capabilities
- **Multilingual Voice & Text Ingestion:** Real speech and text capture across 6 Indian languages (Tamil, Hindi, Telugu, Kannada, Bengali, and English).
- **Semantic Normalization via Google Gemini:** Understands regional idioms and maps varied phrasing across languages into a unified civic taxonomy.
- **Zero-PII Privacy Protection:** Stores no Aadhaar numbers, phone numbers, or exact residential addresses.
- **Deterministic Development Need Index (DNI):** Objective, multi-factor priority index calculated deterministically (35% Demand, 25% Gap, 20% Population, 10% Criticality, 10% Geographic Concentration).
- **Public & Empirical Data Correlation:** Cross-references citizen requests with Open Government Data indicators (service coverage %, hospital distance, active projects, committed ₹ Crores).
- **Constrained AI Evidence Synthesis:** Server-side Gemini synthesizes displayed empirical facts without hallucinating statistics or budget numbers.
- **Candidate Intervention Formulation:** Generates actionable, non-binding candidate interventions for executive human review.

---

## 4. End-to-End Civic Architecture

```
[ Citizen Channels (Voice/Text) ]
             ↓
[ Speech-to-Text & Dialect Processing ]
             ↓
[ Server-Side Google Gemini 3.8 Flash ]
             ↓
[ Zero-PII Structured Entity Extraction ]
             ↓
[ Spatial Aggregation & Clustering ]
             ↓
[ Open Government Data Correlation (data.gov.in) ]
             ↓
[ Deterministic Development Need Index (DNI) ]
             ↓
[ Gemini Evidence Synthesis & Candidate Interventions ]
             ↓
[ Policymaker Intelligence Dashboard (Human Review) ]
```

---

## 5. Development Need Index (DNI) Formula

The Development Need Index is a deterministic analytical index (0–100) calculated using transparent mathematical weighting:

$$\text{DNI} = (0.35 \times \text{Demand}) + (0.25 \times \text{Gap}) + (0.20 \times \text{Population Impact}) + (0.10 \times \text{Criticality}) + (0.10 \times \text{Geo Concentration})$$

- **Citizen Demand (35%):** Normalized volume and density of verified citizen signals.
- **Infrastructure Gap (25%):** Official deficit in government service coverage (e.g., 84% transit gap).
- **Population Impact (20%):** Concentration of rural residents and vulnerable demographic groups.
- **Service Criticality (10%):** Weighted severity score based on life-critical access (e.g. emergency hospital transit).
- **Geographic Concentration (10%):** Spatial clustering coefficient around key arterial links.

*Important Note: DNI is an analytical prioritization index for human deliberation, not an autonomous government budget allocator.*

---

## 6. Meaningful Google AI Integration

Unlike superficial chatbot wrappers, JanSetu AI utilizes Google Gemini for deep civic infrastructure tasks:
1. **Multilingual Entity Extraction (`POST /api/analyze`):** Converts freeform speech/text into strict typed JSON schemas containing sector, subcategory, location, affected groups, severity, and requested action.
2. **Cross-Lingual Semantic Convergence:** Demonstrates that a Tamil phrase (*"மருத்துவமனைக்கு செல்ல பேருந்து வசதி இல்லை"*), a Hindi phrase (*"अस्पताल जाने के लिए बस की सुविधा बहुत कम है"*), and an English phrase (*"No regular buses to the hospital"*) all resolve to the same underlying development signal: `Public Transport Connectivity: Hospital Feeder Deficit`.
3. **Evidence-Grounded Synthesis (`POST /api/synthesize-insight`):** Gemini is strictly bound to factual parameters (population, coverage %, hospital distance in km, active budget outlays) to explain why the hotspot exists.

---

## 7. Data Strategy: Reference Data vs Synthetic Prototype Data

In strict compliance with hackathon guidelines:
- **Public Reference Data:** District demographic profiles, rural population shares, baseline infrastructure service metrics, and public investment records are grounded in realistic open government datasets (e.g., Tamil Nadu State Transport Corporation, National Health Mission, Jal Jeevan Mission, and data.gov.in).
- **Synthetic Citizen Data:** The initial prototype includes 1,280+ synthetically generated citizen requests distributed across 6 Indian states (Tamil Nadu, Karnataka, Telangana, Maharashtra, Uttar Pradesh, and West Bengal) to realistically simulate volume, seasonal variance, and spatial clustering.
- **Clear UI Labeling:** The application explicitly labels synthetic prototype signals and reference data to maintain public credibility.

---

## 8. Responsible AI & Ethics Constitution

- **Human-in-the-Loop Supremacy:** All candidate interventions are explicitly marked *"For policymaker review — not an autonomous policy decision."*
- **Citizen Review Guarantee:** Before confirmation, citizens are shown *"We understood your request"* with editable fields and a reminder that AI extraction may be imperfect.
- **Zero-PII Storage:** No Aadhaar numbers, biometric identifiers, contact numbers, or home addresses are collected or retained.
- **Linguistic Equity:** Native voice input mitigates digital literacy barriers across non-English speaking communities.

---

## 9. Technology Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Backend:** Node.js, Express, TypeScript (`tsx`)
- **AI Engine:** Google Gemini 3.8 Flash (`@google/genai` TypeScript SDK)
- **Geospatial Visualization:** Custom high-fidelity SVG India Map with coordinate projection
- **Speech Capture:** Web Speech API (with clear fallback for unsupported browsers)

---

## 10. Local Setup & Environment Variables

### Prerequisites
- Node.js 20+
- A Google Gemini API Key from [Google AI Studio](https://aistudio.google.com)

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/jansetu-ai.git
cd jansetu-ai

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
```

### Environment Variables (`.env.local`)
```env
# Required for live Gemini AI calls:
GEMINI_API_KEY="your-gemini-api-key-here"

# Configurable model (defaults to gemini-3.8-flash):
GEMINI_MODEL="gemini-3.8-flash"

# Port (defaults to 3000):
PORT=3000
```

### Running the Application
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Visit `http://localhost:3000` to interact with JanSetu AI.

---

## 11. Deterministic Demonstration Mode

To guarantee uninterrupted evaluation even if external APIs or network connectivity are temporarily constrained, JanSetu AI includes 5 built-in demonstration scenarios:
1. **Scenario 1 (Tamil):** Public Transportation & Hospital Access in Dharmapuri, Tamil Nadu.
2. **Scenario 2 (Hindi):** Public Transportation & Rural Commuting in Mirzapur, Uttar Pradesh.
3. **Scenario 3 (English):** Healthcare Access & Emergency Response in Adilabad, Telangana.
4. **Scenario 4 (Telugu):** Drinking Water Scarcity & Quality in Raichur, Karnataka.
5. **Scenario 5 (Kannada):** Connecting Road Infrastructure in Bidar, Karnataka.

Click the **Demo Scenarios** button in the top navigation bar at any time to inspect these pre-validated scenarios.

---

## 12. Deployment (Vercel & Google Cloud Run)

### Vercel Deployment
The application is structured for instant deployment on Vercel:
1. Push repository to GitHub.
2. Import project into Vercel.
3. Set `GEMINI_API_KEY` in Vercel Environment Variables.
4. Deploy!

### Google Cloud Run Deployment
```bash
gcloud run deploy jansetu-ai \
  --source . \
  --platform managed \
  --region asia-south1 \
  --set-env-vars GEMINI_API_KEY="your-gemini-key"
```

---

## 13. Future Scale & Portability

- **National Scale:** Integration with National Data & Analytics Platform (NDAP), PM Gati Shakti GIS spatial layers, and state CM Helpline APIs.
- **BRICS / Global South Portability:** The underlying multi-lingual extraction and deterministic DNI weighting engine is geographically agnostic. Administrative boundaries and regional indicator datasets can be swapped to support public planning in Brazil, South Africa, or other multilingual federations.

---

## 14. License & Credits

Built for the **Google Cloud / GDG India: Build with AI - Code for Communities** Hackathon.  
Developed under Apache 2.0 License as an open-source Digital Public Good.
