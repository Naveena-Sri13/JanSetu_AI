# JanSetu AI — Hackathon Pitch Deck

**Competition:** Build with AI: Code for Communities (India)  
**Theme:** Solving for India  
**Tagline:** From citizen voices to development intelligence.  

---

## Slide 1: Cover
### JanSetu AI
**From citizen voices to development intelligence.**
* A Digital Public Good transforming unstructured, multilingual citizen voices into geospatial development signals for evidence-based planning.
* Designed for India’s linguistic diversity, administrative scale, and public infrastructure challenges.

---

## Slide 2: The Problem
### Citizen Development Requests are Fragmented & Lost
* Millions of citizens across 700+ districts struggle with public transport deficits, unpaved rural roads, water contamination, and clinic outages.
* Existing grievance portals are siloed, text-heavy, English-dominant, and treat every issue as an isolated individual ticket rather than a systemic infrastructure signal.
* Non-literate citizens and rural dialect speakers are digitally disenfranchised from local development planning.

---

## Slide 3: The Insight
### Individual Grievances Become Meaningful Signals When Aggregated Geographically
* An isolated complaint is noise. 147 independent citizen requests from 8 villages demanding buses to the district hospital is a critical spatial development signal.
* When correlated with census demographics, existing transport schedules, and public investment data, citizen voices surface actionable infrastructure gaps that spreadsheets miss.

---

## Slide 4: The Solution
### Multilingual Civic Development Intelligence Platform
* **Voice-First Indic Capture:** Speaks and understands Tamil, Hindi, Telugu, Kannada, Bengali, and English.
* **Semantic Normalization:** Converts varied colloquial phrasing into standardized civic taxonomy.
* **Deterministic Hotspot Engine:** Calculates a transparent Development Need Index (DNI).
* **Evidence-Grounded AI Synthesis:** Summarizes empirical conditions and generates candidate interventions for policymaker review.

---

## Slide 5: How It Works
### End-to-End Pipeline
1. **Citizen Voice / Text** in mother tongue.
2. **Gemini 3.8 Multilingual Understanding** extracts structured entities (Zero-PII).
3. **Geospatial & Sector Aggregation** by district and cluster.
4. **Public Data Correlation** with Open Government Data (demographics, hospital distances, coverage %).
5. **Development Need Index (DNI)** calculation (Demand 35%, Gap 25%, Pop 20%, Criticality 10%, Geo 10%).
6. **Gemini Evidence Synthesis** & candidate intervention proposal.
7. **Policymaker Review** before budget and routing decisions.

---

## Slide 6: Google AI Integration
### Meaningful Server-Side Gemini Architecture
* **Not a Chatbot:** Gemini serves as the core linguistic parser and evidence synthesis engine.
* **Multilingual Entity Extraction:** Strict JSON schema extraction of sector, subcategory, severity, and requested action.
* **Cross-Lingual Semantic Normalization:** Tamil, Hindi, and English expressions map into the identical civic development signal.
* **Hallucination-Proof Synthesis:** Grounded strictly on empirical dashboard metrics (population, km to hospital, budget outlays).

---

## Slide 7: Live Example
### Tamil Citizen Request → Structured Signal
* **Raw Voice Input:**  
  *"எங்கள் ஊரில் அரசு மருத்துவமனைக்கு செல்ல பேருந்து வசதி சரியாக இல்லை. வயதானவர்களும் கர்ப்பிணிப் பெண்களும் அவதிப்படுகிறார்கள்."*
* **Gemini Extraction:**  
  * Sector: `Public Transportation`  
  * Subcategory: `Hospital Feeder Bus Connectivity`  
  * Location: `Pennagaram Taluk, Dharmapuri District, Tamil Nadu`  
  * Affected Groups: `Pregnant women, Elderly patients, Daily wage earners`  
  * Severity: `High`  
  * Requested Action: `Schedule morning and evening feeder buses to District Government Hospital`

---

## Slide 8: Hotspot Intelligence
### Dharmapuri Transportation Dossier
* **Development Need Index (DNI):** **84.8 / 100**
* **Citizen Demand Factor (35%):** 91 (147 verified requests)
* **Infrastructure Gap Factor (25%):** 84 (only 21% service coverage)
* **Population Impact Factor (20%):** 79 (82.7% rural population)
* **Service Criticality (10%):** 90 (hospital access dependency)
* **Geographic Concentration (10%):** 72
* **Evidence:** Nearest tertiary hospital is 14.8 km away; current public bus frequency is only 1.2 trips/day per 5,000 residents.

---

## Slide 9: Built for India
### True Scale Across States, Languages & Sectors
* Tested across 6 major states: Tamil Nadu, Karnataka, Telangana, Maharashtra, Uttar Pradesh, and West Bengal.
* 6 official Indic languages represented in initial seed and synthetic prototype datasets.
* Covers 8 civic development sectors: Transportation (Flagship), Healthcare, Water, Roads, Electricity, Sanitation, Education, Agriculture.

---

## Slide 10: Deployability & Responsible AI
### Serious Civic Architecture & Ethics
* **Decision-Support, Not Autonomous Policymaker:** Non-binding candidate interventions preserve human-in-the-loop governance.
* **Zero-PII Principle:** Collects no Aadhaar numbers, phone numbers, or residential addresses.
* **Production Path:** Google Cloud Run, Firestore, BigQuery GIS, and Gemini 3.8.
* **Vercel Deployable:** Next.js / Express full-stack architecture with deterministic offline fallback mode.

---

## Slide 11: Impact Potential
### From Fragmented Voices to Measurable Public Good
* **Democratizes Civic Input:** Gives non-English speaking and non-literate citizens a direct voice in capital planning.
* **Optimizes Public Capital:** Surfaces where ₹10–15 Cr investments produce the highest reduction in unmet human need.
* **Replicable Blueprint:** Easily portable across Indian states and other multilingual Global South / BRICS public environments.
