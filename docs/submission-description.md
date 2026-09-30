# JanSetu AI — Hackathon Submission Description

**Track:** Build with AI: Code for Communities (India)  
**Theme:** Solving for India  
**Tagline:** From citizen voices to development intelligence.  

---

## Executive Summary
JanSetu AI is a multilingual civic intelligence platform that transforms citizen voice and text requests into structured development signals. By combining Gemini-powered understanding with demographic, infrastructure and investment data, it identifies unmet-need hotspots and generates evidence-backed candidate interventions for policymaker review.

---

## The Challenge
Across India’s 700+ districts, citizen infrastructure requests remain fragmented across languages, siloed in grievance ticketing systems, or lost in verbal community petitions. Existing portals predominantly reward English-literate urban users and treat every complaint as an isolated maintenance ticket rather than a spatial development signal. Consequently, state planning boards and district collectors struggle to detect systemic geographic deficits in rural bus connectivity, primary healthcare transit, and drinking water availability.

---

## The Solution
JanSetu AI bridges citizen reality and public policy through an end-to-end Digital Public Good pipeline:
1. **Multilingual Voice/Text Capture:** Accepts inputs in Tamil, Hindi, Telugu, Kannada, Bengali, and English, allowing non-literate citizens to speak naturally without digital intimidation.
2. **Semantic Normalization via Google Gemini 3.8:** Converts diverse vernacular expressions into standardized civic development taxonomy (e.g. Tamil, Hindi, and English requests regarding hospital access map into one unified `Public Transport Connectivity: Hospital Feeder Deficit` signal).
3. **Zero-PII Privacy Architecture:** Captures no Aadhaar numbers, phone numbers, or residential addresses, aggregating signals to coarse administrative and geographic centroids.
4. **Deterministic Development Need Index (DNI):** Computes objective priority scores (0–100) using a transparent weighted formula: 35% Citizen Demand + 25% Infrastructure Gap + 20% Population Exposure + 10% Service Criticality + 10% Geographic Concentration.
5. **Empirical Evidence Correlation:** Cross-references citizen demand with Open Government Data (data.gov.in) indicators including official service coverage %, nearest hospital distance (km), and existing budgetary commitments (₹ Crores).
6. **Constrained AI Synthesis & Candidate Interventions:** Gemini synthesizes strictly displayed empirical metrics into executive briefs and candidate interventions for human-in-the-loop review.

---

## Judging Criteria Alignment

| Criteria | Weight | How JanSetu AI Delivers |
|---|---|---|
| **Problem-Solution Fit** | 20% | Directly addresses the disconnect between grassroots citizen needs and state development budgets through spatial aggregation. |
| **AI / Technical Execution** | 25% | Deep, meaningful server-side integration of Google Gemini 3.8 Flash for multilingual extraction, semantic convergence, and evidence-grounded synthesis; zero hallucinations on metrics. |
| **Depth & Reach Across India** | 20% | Implemented across 6 Indian states, 6 official Indic languages, and 8 development sectors with flagship demonstration in rural public transportation. |
| **Impact Potential** | 15% | Empowers rural, elderly, and vulnerable populations; assists district collectors in targeted capital expenditure and route rationalization. |
| **Deployability & Scalability** | 20% | Full-stack production-ready web application deployable on Vercel and Google Cloud Run with deterministic offline demo scenarios. |

---

## What We Built
- **Citizen Voice Portal:** Real-time browser speech-to-text with audio visualizer, Indic language selectors, and editable AI review screen.
- **Policymaker Intelligence Dashboard:** Executive metric strip, interactive SVG India Demand Map, sortable Emerging Hotspots table, and comprehensive district dossiers.
- **Analytical Engine:** Deterministic DNI scoring engine and geographic cluster aggregator.
- **Prototype Dataset:** 1,280+ realistic synthetic citizen requests across 6 states, paired with realistic district demographics, infrastructure indicators, and active public investments.
- **Demonstration Suite:** 5 preloaded Indic scenarios for instant evaluation.
