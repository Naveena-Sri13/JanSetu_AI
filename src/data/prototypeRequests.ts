import { CitizenRequest, DevelopmentSectorId, LanguageCode, SeverityLevel } from '../types';

interface SeedPattern {
  state: string;
  district: string;
  lat: number;
  lng: number;
  sector: DevelopmentSectorId;
  language: LanguageCode;
  subcategory: string;
  issues: {
    original: string;
    normalized: string;
    action: string;
    affected: string[];
    severity: SeverityLevel;
  }[];
}

const SEED_PATTERNS: SeedPattern[] = [
  // 1. Dharmapuri, Tamil Nadu - High Transportation Hotspot (Tamil & English)
  {
    state: 'Tamil Nadu',
    district: 'Dharmapuri',
    lat: 12.1211,
    lng: 78.1582,
    sector: 'transportation',
    language: 'ta',
    subcategory: 'Rural Bus Feeder & Hospital Access',
    issues: [
      {
        original: 'எங்கள் ஊரிலிருந்து பென்னாகரம் அரசு மருத்துவமனைக்கு செல்ல காலை 7 மணிக்கு பிறகு பேருந்தே இல்லை. கர்ப்பிணிப் பெண்களும் முதியோர்களும் பெரும் அவதிப்படுகிறார்கள்.',
        normalized: 'Lack of morning and afternoon bus service connecting village habitations to Pennagaram Government Hospital.',
        action: 'Operate two dedicated round-trip feeder bus services connecting to the taluk hospital daily.',
        affected: ['Pregnant women', 'Elderly patients', 'Agricultural daily wage earners'],
        severity: 'high',
      },
      {
        original: 'பள்ளி மற்றும் கல்லூரி மாணவர்கள் தருமபுரி நகரத்திற்கு செல்ல பேருந்து கூட்ட நெரிசலில் படிக்கட்டுகளில் தொங்கிச் செல்கின்றனர். காலை 8 மணி மற்றும் மாலை 5 மணிக்கு கூடுதல் பேருந்துகள் இயக்க வேண்டும்.',
        normalized: 'Extreme overcrowding and dangerous footboard travel on student commuter route to Dharmapuri town.',
        action: 'Deploy additional student special buses during morning 8:00 AM and evening 5:00 PM peak hours.',
        affected: ['College students', 'School children', 'Office commuters'],
        severity: 'high',
      },
      {
        original: 'இரவு 7 மணிக்கு மேல் எங்கள் கிராமத்திற்கு எந்த ஒரு பேருந்தும் வருவதில்லை. அவசர மருத்துவ உதவிக்கு 15 கிமீ தருமபுரிக்கு செல்ல ஆட்டோ ஓட்டுநர்கள் ₹500 கேட்கிறார்கள்.',
        normalized: 'Complete absence of evening and night transit connectivity isolating rural cluster after 7 PM.',
        action: 'Introduce night-halt mini-bus route with fixed fare schedule.',
        affected: ['Night-shift workers', 'Emergency outpatients', 'Small village traders'],
        severity: 'critical',
      },
      {
        original: 'பேருந்து நிறுத்தம் அமைத்து கூரை போட்டு தர வேண்டும். வெயிலிலும் மழையிலும் 2 மணி நேரம் மக்கள் காத்திருக்க வேண்டியுள்ளது.',
        normalized: 'Lack of sheltered bus stop shelters causing hardship during weather extremes.',
        action: 'Erect standard passenger waiting shelter with route timetable display.',
        affected: ['Senior citizens', 'Women commuters'],
        severity: 'medium',
      },
    ],
  },
  // 2. Krishnagiri, Tamil Nadu - Transportation & Healthcare
  {
    state: 'Tamil Nadu',
    district: 'Krishnagiri',
    lat: 12.5266,
    lng: 78.2146,
    sector: 'transportation',
    language: 'ta',
    subcategory: 'Industrial Corridor & Rural Transit',
    issues: [
      {
        original: 'ஹோசூர் தொழிற்பேட்டைக்கு செல்லும் கிராமப்புற தொழிலாளர்களுக்கு நேரடி அரசு பேருந்து வசதி இல்லாததால் அதிக செலவு ஏற்படுகிறது.',
        normalized: 'Inadequate direct rural-to-industrial transit connecting manufacturing belt workers.',
        action: 'Introduce direct point-to-point worker commuter shuttle routes.',
        affected: ['Factory workers', 'Daily contract laborers'],
        severity: 'medium',
      },
      {
        original: 'கிருஷ்ணகிரி அரசு தலைமை மருத்துவமனைக்கு கிராமப்புற பேருந்துகள் குறிப்பிட்ட நேரத்திற்கு வராததால் நோயாளிகள் அவதிப்படுகிறார்கள்.',
        normalized: 'Unreliable transit timing for rural patients visiting District Headquarters Hospital.',
        action: 'Publish fixed frequency schedule and synchronize hospital feeder timings.',
        affected: ['Outpatients', 'Caregivers'],
        severity: 'high',
      },
    ],
  },
  // 3. Kalaburagi, Karnataka - Transportation & Water
  {
    state: 'Karnataka',
    district: 'Kalaburagi',
    lat: 17.3297,
    lng: 76.8343,
    sector: 'transportation',
    language: 'kn',
    subcategory: 'Rural Bus Fleet & Connectivity',
    issues: [
      {
        original: 'ಕಲಬುರಗಿ ಜಿಲ್ಲೆಯ ಆಳಂದ ತಾಲೂಕಿನ ಗ್ರಾಮೀಣ ಪ್ರದೇಶಗಳಿಗೆ ದಿನಕ್ಕೆ ಒಂದೇ ಒಂದು ಬಸ್ ಬರುತ್ತದೆ. ಆಸ್ಪತ್ರೆಗೆ ಹೋಗಲು ತೀವ್ರ ತೊಂದರೆಯಾಗುತ್ತಿದೆ.',
        normalized: 'Single daily bus service serving Aland taluk villages creating critical barrier to healthcare access.',
        action: 'Increase KKRTC rural scheduled departures to at least 4 trips per day.',
        affected: ['Elderly villagers', 'Patients', 'School children'],
        severity: 'critical',
      },
      {
        original: 'ಸಮೀಪದ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರಕ್ಕೆ ಹೋಗಲು ಯಾವುದೇ ಬಸ್ ಸೌಲಭ್ಯವಿಲ್ಲ. ಖಾಸಗಿ ವಾಹನಗಳಿಗೆ ಹೆಚ್ಚಿನ ಹಣ ನೀಡಬೇಕಾಗಿದೆ.',
        normalized: 'Zero public transit connectivity to Nearest Primary Health Centre necessitating costly private transport.',
        action: 'Establish circular mini-bus feeder route touching all 8 gram panchayats.',
        affected: ['Rural households', 'Daily wage earners'],
        severity: 'high',
      },
      {
        original: 'ರೈತರು ಕೃಷಿ ಮಾರುಕಟ್ಟೆಗೆ ಧಾನ್ಯಗಳನ್ನು ಕೊಂಡೊಯ್ಯಲು ಸರಕು ವಾಹನಗಳು ಅಥವಾ ಸೂಕ್ತ ಸಾರಿಗೆ ವ್ಯವಸ್ಥೆ ಸಿಗುತ್ತಿಲ್ಲ.',
        normalized: 'Lack of rural transit accommodating agricultural produce transport to APMC yard.',
        action: 'Provide scheduled multi-utility rural transit with cargo luggage support.',
        affected: ['Smallholder farmers', 'Vegetable growers'],
        severity: 'medium',
      },
    ],
  },
  // 4. Raichur, Karnataka - Drinking Water & Health
  {
    state: 'Karnataka',
    district: 'Raichur',
    lat: 16.2076,
    lng: 77.3463,
    sector: 'water',
    language: 'kn',
    subcategory: 'Fluoride Contamination & Pipeline Supply',
    issues: [
      {
        original: 'ನಮ್ಮ ಹಳ್ಳಿಯ ಬೋರ್‌ವೆಲ್‌ಗಳಲ್ಲಿ ಫ್ಲೋರೈಡ್ ಅಂಶ ಹೆಚ್ಚಾಗಿದೆ. ಜಲಜೀವನ್ ಮಿಷನ್ ಅಡಿಯಲ್ಲಿ ಶುದ್ಧ ಕುಡಿಯುವ ನೀರು ಪೂರೈಕೆ ತಕ್ಷಣ ಆರಂಭವಾಗಬೇಕು.',
        normalized: 'Severe groundwater fluoride contamination causing dental and skeletal fluorosis across village.',
        action: 'Fast-track piped surface water connection from Tungabhadra river scheme.',
        affected: ['Children', 'Elderly residents', 'General population'],
        severity: 'critical',
      },
      {
        original: 'ಬೇಸಿಗೆ ಕಾಲದಲ್ಲಿ ನೀರಿನ ಟ್ಯಾಂಕರ್‌ಗಳು ವಾರಕ್ಕೆ ಒಮ್ಮೆ ಮಾತ್ರ ಬರುತ್ತವೆ. ಕುಡಿಯುವ ನೀರಿಗೆ ಮಹಿಳೆಯರು ಕಿಲೋಮೀಟರುಗಟ್ಟಲೆ ಅಲೆಯುತ್ತಿದ್ದಾರೆ.',
        normalized: 'Acute summer drinking water shortage and irregular water tanker distribution frequency.',
        action: 'Schedule daily emergency water tanker deliveries and install community RO filter plants.',
        affected: ['Rural women', 'Domestic caregivers'],
        severity: 'high',
      },
    ],
  },
  // 5. Mirzapur, Uttar Pradesh - Transportation & Rural Roads
  {
    state: 'Uttar Pradesh',
    district: 'Mirzapur',
    lat: 25.1337,
    lng: 82.5644,
    sector: 'transportation',
    language: 'hi',
    subcategory: 'Inter-Tehsil Bus Frequency & Health Feeder',
    issues: [
      {
        original: 'हमारे गांव से जिला अस्पताल मिर्जापुर जाने के लिए कोई सीधी सरकारी बस सेवा नहीं है। मरीजों को ऑटो बदल-बदल कर 2 घंटे लगते हैं।',
        normalized: 'Absence of direct public bus transit to Mirzapur District Hospital causing 2-hour transit delays.',
        action: 'Launch direct UPSRTC rural transit service between block centers and district hospital.',
        affected: ['Critical patients', 'Elderly villagers', 'Pregnant women'],
        severity: 'high',
      },
      {
        original: 'राजगढ़ ब्लॉक के सुदूर गांवों में शाम 5 बजे के बाद परिवहन पूरी तरह ठप हो जाता है। छात्राओं को कॉलेज से लौटने में भारी असुविधा होती है।',
        normalized: 'Complete cessation of public transit after 5 PM hindering female education and evening commuting.',
        action: 'Introduce evening bus service and designated security-monitored student feeder runs.',
        affected: ['Female students', 'Rural teachers', 'Daily commuters'],
        severity: 'critical',
      },
      {
        original: 'सड़कें इतनी टूटी हुई हैं कि निजी बस वाले भी आने से मना कर देते हैं। पहले सड़क मरम्मत और फिर नियमित बस शुरू की जाए।',
        normalized: 'Damaged link road deterring transport operators from serving interior village clusters.',
        action: 'Coordinate PWD road surfacing with UPSRTC route extension.',
        affected: ['Local traders', 'Villagers needing emergency transit'],
        severity: 'high',
      },
    ],
  },
  // 6. Sonbhadra, Uttar Pradesh - Drinking Water & Environment
  {
    state: 'Uttar Pradesh',
    district: 'Sonbhadra',
    lat: 24.6853,
    lng: 83.0684,
    sector: 'water',
    language: 'hi',
    subcategory: 'Industrial Runoff & Drinking Water Quality',
    issues: [
      {
        original: 'खनन और बिजली संयंत्रों के कारण भूजल दूषित हो चुका है। नलों से गंदा पानी आता है जिसे पीने से लोग बीमार पड़ रहे हैं।',
        normalized: 'Heavy metal and coal residue contamination in local drinking water sources.',
        action: 'Deploy multi-stage filtration water treatment units and continuous water quality monitoring.',
        affected: ['Tribal families', 'Young children', 'Community health workers'],
        severity: 'critical',
      },
    ],
  },
  // 7. Adilabad, Telangana - Healthcare & Emergency Access
  {
    state: 'Telangana',
    district: 'Adilabad',
    lat: 19.6641,
    lng: 78.5320,
    sector: 'healthcare',
    language: 'te',
    subcategory: 'Tribal Emergency Transit & PHC Doctors',
    issues: [
      {
        original: 'మా ఏజెన్సీ ప్రాంతంలో 108 అంబులెన్స్ రావడానికి గంటన్నర పడుతుంది. రాత్రి వేళల్లో వైద్యులు లేక అత్యవసర రోగులు చనిపోతున్నారు.',
        normalized: 'Excessive 90-minute emergency ambulance response time in interior tribal agency pockets.',
        action: 'Station dedicated four-wheel-drive emergency ambulances at tribal cluster sub-centers.',
        affected: ['Tribal mothers', 'Trauma cases', 'Infants'],
        severity: 'critical',
      },
      {
        original: 'ప్రాథమిక ఆరోగ్య కేంద్రంలో మందుల కొరత తీవ్రంగా ఉంది. విష జ్వరాలు వచ్చినప్పుడు ప్రైవేట్ ఆసుపత్రులకు వెళ్లాల్సి వస్తోంది.',
        normalized: 'Stock-out of essential medicines and diagnostic kits during seasonal fever outbreaks.',
        action: 'Restock essential pediatric and anti-malarial medicines at all block PHCs.',
        affected: ['Low-income families', 'Children'],
        severity: 'high',
      },
      {
        original: 'ఉట్నూరు ప్రభుత్వ ఆసుపత్రికి వెళ్లేందుకు బస్సు సౌకర్యం లేకపోవడంతో గర్భిణీ స్త్రీలు తీవ్ర ఇబ్బందులు పడుతున్నారు.',
        normalized: 'Lack of synchronized bus transport to Utnoor referral hospital for antenatal checkups.',
        action: 'Introduce subsidized transit vouchers and scheduled hospital shuttle service.',
        affected: ['Pregnant women', 'Health volunteers (ASHAs)'],
        severity: 'high',
      },
    ],
  },
  // 8. Mahabubnagar, Telangana - Transportation & Feeder Connectivity
  {
    state: 'Telangana',
    district: 'Mahabubnagar',
    lat: 16.7488,
    lng: 78.0035,
    sector: 'transportation',
    language: 'te',
    subcategory: 'Rural Bus Service & Route Coverage',
    issues: [
      {
        original: 'మహబూబ్‌నగర్ రూరల్ ప్రాంతాల్లో పల్లె వెలుగు బస్సులు సమయానికి రావడం లేదు. మహిళా ప్రయాణికుల సంఖ్య పెరిగినందున బస్సుల సంఖ్య పెంచాలి.',
        normalized: 'Severe shortage of Palle Velugu rural buses leading to missed work and overcrowded travel.',
        action: 'Augment TSRTC fleet deployment on rural trunk routes during morning and evening rush.',
        affected: ['Women workers', 'Rural artisans', 'Students'],
        severity: 'high',
      },
      {
        original: 'గ్రామాలకు వెళ్లే రోడ్లు గుంతలమయంగా ఉండటంతో ఆర్టీసీ బస్సు సర్వీసులు రద్దు చేస్తున్నారు. రోడ్ల మరమ్మతులు వెంటనే చేపట్టాలి.',
        normalized: 'Pothole-ridden link roads prompting cancellation of public bus services to interior habitations.',
        action: 'Fast-track BT patch work on key bus routes and reinstate suspended rural trips.',
        affected: ['Daily commuters', 'School students'],
        severity: 'medium',
      },
    ],
  },
  // 9. Gadchiroli, Maharashtra - Transportation in Remote Forest Belt
  {
    state: 'Maharashtra',
    district: 'Gadchiroli',
    lat: 20.1849,
    lng: 80.0034,
    sector: 'transportation',
    language: 'hi', // Cross-linguistic border belt
    subcategory: 'Tribal Habitation Transit & Emergency Links',
    issues: [
      {
        original: 'गडचिरोली के घने जंगल वाले गांवों में हफ्तों तक बस नहीं आती। बीमार लोगों को खाट पर उठाकर मुख्य सड़क तक लाना पड़ता है।',
        normalized: 'Complete lack of motorized transit forcing families to carry sick patients on cots over 10+ km.',
        action: 'Deploy rugged all-weather feeder transit vehicles connecting interior hamlets.',
        affected: ['Tribal forest dwellers', 'Senior citizens', 'Emergency patients'],
        severity: 'critical',
      },
      {
        original: 'तहसील मुख्यालय से जोड़ने वाली एसटी बस सेवा बंद कर दी गई है। इसे तुरंत दोबारा शुरू किया जाए।',
        normalized: 'Arbitrary suspension of state transport bus connecting tehsil headquarters.',
        action: 'Restore daily MSRTC morning and evening bus trips with assured schedules.',
        affected: ['Agrarian workers', 'Weekly market visitors'],
        severity: 'high',
      },
    ],
  },
  // 10. Nandurbar, Maharashtra - Healthcare & Tribal Maternal Health
  {
    state: 'Maharashtra',
    district: 'Nandurbar',
    lat: 21.3683,
    lng: 74.2389,
    sector: 'healthcare',
    language: 'hi',
    subcategory: 'Maternal Nutrition & Mobile Clinic Transit',
    issues: [
      {
        original: 'कुपोषण निवारण और प्रसव के लिए उप-केंद्रों पर डॉक्टर और नर्स उपलब्ध नहीं रहते। मोबाइल मेडिकल वैन महीने में एक बार ही आती है।',
        normalized: 'Inadequate staff at maternal sub-centres and low frequency of mobile healthcare clinics.',
        action: 'Deploy weekly mobile health units and staff 24x7 auxiliary nurse midwives in tribal hamlets.',
        affected: ['Malnourished children', 'Nursing mothers'],
        severity: 'critical',
      },
    ],
  },
  // 11. Purulia, West Bengal - Transportation & Road Quality
  {
    state: 'West Bengal',
    district: 'Purulia',
    lat: 23.3321,
    lng: 86.3652,
    sector: 'transportation',
    language: 'bn',
    subcategory: 'Rural Bus Routes & Hospital Connectivity',
    issues: [
      {
        original: 'আমাদের গ্রাম থেকে পুরুলিয়া সদর হাসপাতালে যাওয়ার জন্য পর্যাপ্ত সরকারি বাস নেই। জরুরি অবস্থায় ট্যাক্সি চালকরা অতিরিক্ত ভাড়া দাবি করে।',
        normalized: 'Scarcity of government buses connecting rural blocks to Purulia Sadar Hospital.',
        action: 'Introduce direct SBSTC rural bus service connecting block centers to Sadar Hospital.',
        affected: ['Rural patients', 'Day laborers', 'Elderly residents'],
        severity: 'high',
      },
      {
        original: 'স্কুল-কলেজের সময় বাস না থাকায় ছাত্রছাত্রীদের পড়াশোনা ব্যাহত হচ্ছে। সকাল ৯টায় নির্দিষ্ট বাস চালুর আবেদন জানাচ্ছি।',
        normalized: 'Absence of morning transit synchronized with high school and college class timings.',
        action: 'Deploy dedicated student morning commuter trips on rural collector routes.',
        affected: ['High school students', 'Youth apprentices'],
        severity: 'high',
      },
    ],
  },
  // 12. Bankura, West Bengal - Water & Health Access
  {
    state: 'West Bengal',
    district: 'Bankura',
    lat: 23.2324,
    lng: 87.0715,
    sector: 'water',
    language: 'bn',
    subcategory: 'Fluoride Mitigation & Deep Tube Wells',
    issues: [
      {
        original: 'নলকূপের জলে তীব্র গন্ধ ও অতিরিক্ত আয়রন ও ফ্লোরাইড পাওয়া যাচ্ছে। বিশুদ্ধ পানীয় জলের গভীর নলকূপ বসানো অত্যন্ত জরুরি।',
        normalized: 'High iron and fluoride concentration in shallow tube-wells leading to waterborne illness.',
        action: 'Commission community deep tube-well water treatment plants with active carbon filters.',
        affected: ['Entire village community', 'School mid-day meal centers'],
        severity: 'critical',
      },
    ],
  },
  // 13. General English & Multi-Sector Requests across Districts
  {
    state: 'Tamil Nadu',
    district: 'Dharmapuri',
    lat: 12.1350,
    lng: 78.1690,
    sector: 'transportation',
    language: 'en',
    subcategory: 'Feeder Bus Routing & Timing Reliability',
    issues: [
      {
        original: 'There are no feeder buses connecting our remote panchayat to the main highway junction where interstate and district buses stop. Walking 5 km daily is dangerous for women and senior citizens.',
        normalized: 'Absence of last-mile feeder transit connecting rural panchayats to arterial highway junctions.',
        action: 'Establish circular electric mini-bus feeder connecting 6 panchayats to the National Highway stop.',
        affected: ['Women workers', 'Elderly citizens', 'Daily wage commuters'],
        severity: 'high',
      },
      {
        original: 'The bus frequency between Dharmapuri town and Harur road is highly erratic. Buses skip stops without notice during peak morning school hours.',
        normalized: 'Unpredictable transit schedules and unannounced stop bypasses on Harur corridor.',
        action: 'Implement GPS bus tracking and enforce mandatory boarding stop compliance.',
        affected: ['School students', 'Local shopkeepers'],
        severity: 'medium',
      },
    ],
  },
  {
    state: 'Karnataka',
    district: 'Bidar',
    lat: 17.9104,
    lng: 77.5199,
    sector: 'roads',
    language: 'kn',
    subcategory: 'All-Weather Village Road Connectivity',
    issues: [
      {
        original: 'ಮುಖ್ಯ ರಸ್ತೆಗೆ ಸಂಪರ್ಕಿಸುವ ೬ ಕಿಮೀ ರಸ್ತೆ ತೀವ್ರವಾಗಿ ಹಾಳಾಗಿದೆ. ಆಂಬುಲೆನ್ಸ್ ಬರಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ.',
        normalized: '6 km arterial village link completely unmotorable; blocking emergency vehicles.',
        action: 'Rebuild with concrete pavement and drainage under PMGSY.',
        affected: ['Rural patients', 'Farmers'],
        severity: 'high',
      },
    ],
  },
];

/**
 * Generates an expanded, realistic set of 1,280+ synthetic citizen requests.
 * Uses deterministic seed-based expansion so values are reproducible, realistic,
 * and provide rich geographic and sector diversity across India.
 */
export function generatePrototypeRequests(): CitizenRequest[] {
  const requests: CitizenRequest[] = [];
  const baseDate = new Date('2026-03-25T14:00:00Z').getTime();

  let reqIndex = 1;

  // We loop through patterns and expand them with realistic jitter and variations
  SEED_PATTERNS.forEach((pattern) => {
    // Generate between 40 to 140 requests per pattern to form realistic clusters
    let countForPattern = 65;
    if (pattern.district === 'Dharmapuri' && pattern.sector === 'transportation') {
      countForPattern = 147; // Flagship hotspot matching exact spec example!
    } else if (pattern.district === 'Mirzapur' && pattern.sector === 'transportation') {
      countForPattern = 118;
    } else if (pattern.district === 'Kalaburagi' && pattern.sector === 'transportation') {
      countForPattern = 112;
    } else if (pattern.district === 'Adilabad' && pattern.sector === 'healthcare') {
      countForPattern = 98;
    } else if (pattern.district === 'Raichur' && pattern.sector === 'water') {
      countForPattern = 92;
    } else if (pattern.district === 'Gadchiroli' && pattern.sector === 'transportation') {
      countForPattern = 86;
    } else if (pattern.district === 'Sonbhadra' && pattern.sector === 'water') {
      countForPattern = 84;
    } else if (pattern.district === 'Purulia' && pattern.sector === 'transportation') {
      countForPattern = 78;
    } else if (pattern.district === 'Bankura' && pattern.sector === 'water') {
      countForPattern = 74;
    } else if (pattern.district === 'Bidar' && pattern.sector === 'roads') {
      countForPattern = 68;
    } else if (pattern.district === 'Krishnagiri') {
      countForPattern = 72;
    } else if (pattern.district === 'Mahabubnagar') {
      countForPattern = 80;
    }

    for (let i = 0; i < countForPattern; i++) {
      const issueTemplate = pattern.issues[i % pattern.issues.length];
      // Slight GPS jitter around district center
      const latOffset = (Math.sin(reqIndex * 13.7) * 0.08);
      const lngOffset = (Math.cos(reqIndex * 19.3) * 0.08);

      // Deterministic timestamp spread over past 30 days
      const daysAgo = (reqIndex % 28);
      const hoursAgo = (reqIndex * 7) % 24;
      const minutesAgo = (reqIndex * 11) % 60;
      const createdAt = new Date(baseDate - (daysAgo * 86400000 + hoursAgo * 3600000 + minutesAgo * 60000)).toISOString();

      const id = `req-${pattern.state.substring(0, 2).toLowerCase()}-${reqIndex.toString().padStart(5, '0')}`;

      // Alternate voice vs text
      const source: 'voice' | 'text' = reqIndex % 3 === 0 ? 'voice' : 'text';

      requests.push({
        id,
        createdAt,
        language: pattern.language,
        originalText: issueTemplate.original,
        normalizedText: issueTemplate.normalized,
        state: pattern.state,
        district: pattern.district,
        latitude: Number((pattern.lat + latOffset).toFixed(4)),
        longitude: Number((pattern.lng + lngOffset).toFixed(4)),
        sector: pattern.sector,
        subcategory: pattern.subcategory,
        issue: issueTemplate.normalized,
        affectedGroups: issueTemplate.affected,
        severity: issueTemplate.severity,
        requestedAction: issueTemplate.action,
        source: 'synthetic_prototype',
        status: 'verified',
      });

      reqIndex++;
    }
  });

  return requests;
}

export const INITIAL_PROTOTYPE_REQUESTS = generatePrototypeRequests();
