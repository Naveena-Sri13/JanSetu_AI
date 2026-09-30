# JanSetu AI — Hackathon Demonstration Video Script

**Duration:** 4 minutes 30 seconds  
**Target Audience:** Hackathon Judges (Google Cloud / GDG India)  
**Presenter:** Engineering & Product Lead  

---

### [0:00 – 0:20] Introduction & The Problem
**Visual:** Open on the JanSetu AI landing screen with the tagline *"From citizen voices to development intelligence"*. Switch briefly to a map showing hundreds of points across India.  
**Speaker:**  
> "Across India, citizens communicate critical infrastructure needs every single day—a missing bus to a government hospital, a contaminated borewell, an impassable monsoon road. But these voices are fragmented across languages, lost in grievance portals, or trapped in physical petitions. Today, we present **JanSetu AI**—a Multilingual Civic Development Intelligence Platform designed as a Digital Public Good."

---

### [0:20 – 1:00] Citizen Voice Experience (Tamil Input)
**Visual:** Click into the **Citizen Portal**. Select 'தமிழ் (Tamil)'. Click the prominent microphone button or load Demo Scenario 1.  
**Speaker:**  
> "Let's look at the citizen experience. An elderly resident or village health worker in Dharmapuri, Tamil Nadu speaks in their native tongue:  
> *'எங்கள் ஊரில் அரசு மருத்துவமனைக்கு செல்ல பேருந்து வசதி சரியாக இல்லை. வயதானவர்களும் கர்ப்பிணிப் பெண்களும் ஆட்டோவுக்கு அதிக பணம் கொடுத்து தவிக்கின்றனர்...'*  
> Notice that the citizen doesn't need to know English, doesn't need to know government department codes, and provides zero sensitive personal data—no Aadhaar, no phone number. JanSetu AI captures the raw audio or text with complete privacy."

---

### [1:00 – 1:40] Gemini Multilingual Extraction & Citizen Review
**Visual:** Click 'Understand Request'. Watch the step-by-step processing state resolve to the **We Understood Your Request** card. Highlight the extracted fields and the 'Review before submitting' banner.  
**Speaker:**  
> "Server-side Google Gemini 3.8 parses the colloquial Tamil and extracts structured civic entities:  
> Sector: Public Transportation. Subcategory: Hospital Feeder Bus Connectivity. Location: Dharmapuri. Affected Groups: Pregnant women and elderly patients. Severity: High.  
> Crucially, we enforce responsible AI: the citizen is presented with an editable review card to verify the AI's interpretation before confirming. Once confirmed, this signal immediately enters the live regional intelligence pipeline."

---

### [1:40 – 2:30] Policymaker Dashboard & Demand Map
**Visual:** Switch to the **Policymaker Dashboard**. Tour the Executive Metric Strip (1,284+ verified signals, 6 states, 6 languages, 18 hotspots). Click into the **Demand Map** tab showing the interactive SVG map of India.  
**Speaker:**  
> "Now let's switch to the policymaker's view. This is a completely different interface designed for District Collectors and State Planning Boards.  
> In the Executive Strip, all metrics are computed dynamically from actual aggregated data. On our India Demand Map, we can immediately observe spatial clusters of unmet demand. Filtering by sector reveals that rural transportation deficits are clustered heavily across northern Tamil Nadu and eastern Karnataka."

---

### [2:30 – 3:15] Hotspot Dossier & Development Need Index (DNI)
**Visual:** Click on the Dharmapuri marker or select it from the **Hotspots** table. The full Hotspot Dossier modal opens. Point to the DNI score (84.8) and factor breakdown bars.  
**Speaker:**  
> "Clicking on Dharmapuri opens the detailed analytical dossier. Notice the **Development Need Index: 84.8 out of 100**.  
> This score is NOT an AI hallucination. It is calculated through a deterministic mathematical formula: 35% Citizen Demand, 25% Infrastructure Gap, 20% Population Impact, 10% Service Criticality, and 10% Geographic Concentration.  
> Right below, the Evidence Panel correlates 147 citizen requests with official Open Government Data: service coverage is only 21%, while the nearest tertiary hospital is 14.8 km away."

---

### [3:15 – 4:00] AI Evidence Synthesis & Candidate Intervention
**Visual:** Scroll to the **AI-generated evidence synthesis** card and the **Candidate intervention** card. Highlight the 'Decision-Support Notice'.  
**Speaker:**  
> "Now observe Gemini's second critical role: evidence synthesis. Gemini receives *only* the verified empirical facts displayed on screen and synthesizes a non-hallucinatory summary.  
> It then formulates an actionable candidate intervention: 'Evaluate increased public transport route coverage and feeder frequency to government hospitals during morning/evening shifts.'  
> The system explicitly states: this is for policymaker review—not an autonomous government decision. We also surface existing investment outlays—₹14.5 Crore currently committed—reminding planners to audit current fleet allocation before issuing new tenders."

---

### [4:00 – 4:30] India-Scale Architecture & Conclusion
**Visual:** Navigate to the **Methodology & Ethics** tab. Highlight the 'Different voices. One development signal' graphic showing Tamil, Hindi, and English expressions converging into a single civic signal, followed by the Cloud Run / BigQuery production architecture diagram.  
**Speaker:**  
> "Notice here our semantic convergence engine: whether a request is in Tamil, Hindi, or English, it maps to the exact same development signal.  
> Architected for national scale with Google Cloud Run, Firestore, BigQuery GIS, and Gemini, JanSetu AI is deployable today as a Digital Public Good.  
> **JanSetu AI turns citizen voices into structured evidence for better development planning.** Thank you."
