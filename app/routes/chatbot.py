from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/chatbot", tags=["chatbot"])


class ChatRequest(BaseModel):
    message: str
    location: str | None = None


class ChatResponse(BaseModel):
    reply: str
    source: str  # "knowledge_base" or "web_search"


# ─── FoodBridge Knowledge Base ───────────────────────────────────────────────

KNOWLEDGE_BASE = [
    {
        "keywords": ["what", "foodbridge", "about", "platform", "what is"],
        "answer": (
            "FoodBridge is a smart food redistribution platform that connects "
            "surplus food from restaurants and hotels to NGOs and people in need. "
            "It uses AI-powered logistics, NGO verification, and ETA prediction "
            "to ensure food reaches those who need it quickly and safely."
        ),
    },
    {
        "keywords": ["how", "work", "works", "functioning", "process"],
        "answer": (
            "FoodBridge works in 3 simple steps:\n"
            "1️⃣ **Donate** — Restaurants & hotels list surplus food on the platform.\n"
            "2️⃣ **Match & Pickup** — Nearby verified NGOs receive notifications and accept pickups.\n"
            "3️⃣ **Track & Deliver** — AI predicts delivery ETA and tracks the food in real-time."
        ),
    },
    {
        "keywords": ["donate", "donor", "food", "give", "surplus", "restaurant", "hotel"],
        "answer": (
            "To donate food:\n"
            "1. Register on FoodBridge as a **Donor**.\n"
            "2. Log in and go to the **Donor Dashboard**.\n"
            "3. Fill in the food details (item, quantity, waste type) and submit.\n"
            "4. A nearby NGO will be matched and notified for pickup!"
        ),
    },
    {
        "keywords": ["ngo", "collect", "pickup", "accept", "organization", "collector"],
        "answer": (
            "NGOs can sign up on FoodBridge as a **Collector**. Once verified, "
            "you'll see available donations on your **NGO Dashboard**. Simply "
            "accept a donation, and the platform will provide route and ETA info "
            "for efficient pickup."
        ),
    },
    {
        "keywords": ["register", "sign up", "account", "create", "join"],
        "answer": (
            "To register:\n"
            "1. Click **Register** on the homepage.\n"
            "2. Choose your role — **Donor** (restaurants/hotels) or **NGO** (collectors).\n"
            "3. Enter a username and password.\n"
            "4. You're all set! Log in and start using FoodBridge."
        ),
    },
    {
        "keywords": ["login", "sign in", "log in", "access"],
        "answer": (
            "Click the **Login** button on the homepage, enter your username and "
            "password, and you'll be redirected to your role-specific dashboard "
            "(Donor, NGO, or Admin)."
        ),
    },
    {
        "keywords": ["verify", "verification", "darpan", "trust", "legitimate", "fraud"],
        "answer": (
            "FoodBridge uses AI-powered NGO verification. NGOs submit their "
            "**Darpan ID** (government registration number), and our system "
            "verifies their legitimacy using machine learning models. This "
            "ensures only trustworthy organizations receive food donations."
        ),
    },
    {
        "keywords": ["eta", "time", "delivery", "predict", "long", "arrive", "minutes"],
        "answer": (
            "FoodBridge uses an AI model to predict **Estimated Time of Arrival (ETA)** "
            "based on the distance between the donor and NGO. This helps both "
            "parties plan for the food pickup and ensures freshness."
        ),
    },
    {
        "keywords": ["admin", "analytics", "dashboard", "manage", "monitor"],
        "answer": (
            "The **Admin Dashboard** provides a bird's-eye view of the platform:\n"
            "• Total donations, active users, and NGO stats\n"
            "• Analytics charts and KPIs\n"
            "• User management and platform monitoring"
        ),
    },
    {
        "keywords": ["track", "map", "location", "route", "gps", "live"],
        "answer": (
            "FoodBridge includes a **live map tracking** feature. Once an NGO "
            "accepts a donation, both parties can track the pickup route on an "
            "interactive map powered by Leaflet."
        ),
    },
    {
        "keywords": ["safe", "safety", "quality", "fresh", "expire", "hygiene"],
        "answer": (
            "Food safety is a top priority! FoodBridge ensures:\n"
            "• Donors describe food type and quantity accurately\n"
            "• AI predicts ETA to minimize transit time\n"
            "• Only verified NGOs handle the food\n"
            "• The platform tracks the entire donation lifecycle"
        ),
    },
    {
        "keywords": ["ai", "artificial", "intelligence", "machine", "learning", "model"],
        "answer": (
            "FoodBridge uses AI/ML in several ways:\n"
            "🤖 **NGO Verification** — ML model validates NGO legitimacy\n"
            "⏱️ **ETA Prediction** — Predicts delivery time based on distance\n"
            "🔍 **Smart Matching** — Matches donors with the best nearby NGO"
        ),
    },
    {
        "keywords": ["contact", "support", "help", "reach", "email", "phone"],
        "answer": (
            "For support, you can reach the FoodBridge team through the platform. "
            "If you're facing issues, try logging in and checking your dashboard, "
            "or re-register if you've forgotten your credentials."
        ),
    },
    {
        "keywords": ["type", "food", "waste", "category", "kind", "accept"],
        "answer": (
            "FoodBridge accepts various types of surplus food including:\n"
            "🍱 Cooked meals from restaurants & hotels\n"
            "🥦 Fresh produce & vegetables\n"
            "🍞 Bakery items & packaged food\n"
            "All food must be safe for consumption at the time of donation."
        ),
    },
    {
        "keywords": ["sdg", "sustainability", "goal", "zero", "hunger", "impact"],
        "answer": (
            "FoodBridge directly contributes to **UN SDG 2: Zero Hunger** by "
            "reducing food waste and redistributing surplus food to those in "
            "need. Every donation makes a real impact!"
        ),
    },
    {
        "keywords": ["technology", "tech", "stack", "built", "framework"],
        "answer": (
            "FoodBridge is built with modern technologies:\n"
            "💻 **Frontend** — React + Vite + Material UI\n"
            "⚙️ **Backend** — FastAPI (Python)\n"
            "🗄️ **Database** — SQLite with SQLAlchemy ORM\n"
            "🗺️ **Maps** — Leaflet for live tracking\n"
            "🤖 **AI/ML** — scikit-learn models for verification & ETA"
        ),
    },
]

GREETINGS = {"hi", "hello", "hey", "hola", "greetings", "good morning", "good evening", "good afternoon", "yo", "sup"}
THANKS = {"thanks", "thank you", "thx", "thankyou", "ty"}


# ─── Matching Logic ──────────────────────────────────────────────────────────

def _score(clean_message: str, entry_keywords: list) -> float:
    """Return fraction of entry keywords found as substrings in the user message."""
    matches = 0
    for kw in entry_keywords:
        if kw in clean_message:
            matches += 1
    return matches / len(entry_keywords)

import string

def find_best_answer(message: str) -> tuple[str | None, float]:
    clean_message = message.lower().translate(str.maketrans('', '', string.punctuation))
    # We use the raw clean string now to allow matching multi-word keywords like "what is"
    
    # Check greetings using word boundaries
    words = set(clean_message.split())
    if words & GREETINGS:
        return (
            "Hey there! 👋 I'm the FoodBridge assistant. Ask me anything about "
            "donating food, NGO pickups, how the platform works, or anything else!",
            1.0,
        )

    # Check thanks
    if words & THANKS:
        return "You're welcome! 😊 Let me know if you have any other questions.", 1.0

    best_answer = None
    best_score = 0.0

    for entry in KNOWLEDGE_BASE:
        s = _score(clean_message, entry["keywords"])
        if s > best_score:
            best_score = s
            best_answer = entry["answer"]

    return best_answer, best_score


# ─── Web Search Fallback ─────────────────────────────────────────────────────

import urllib.parse

def search_web(query: str, location: str | None = None) -> str:
    """Return a clickable Google Search link."""
    search_term = f"{query} in {location}" if location else query
    encoded_query = urllib.parse.quote(search_term)
    return f"I couldn't find an exact answer in my knowledge base. You can check Google for more info: [Google Search Results for '{search_term}'](https://www.google.com/search?q={encoded_query})"


# ─── Endpoint ────────────────────────────────────────────────────────────────


MATCH_THRESHOLD = 0.3


@router.post("/ask", response_model=ChatResponse)
async def ask_chatbot(req: ChatRequest):
    message = req.message.strip()
    location = req.location

    if not message:
        return ChatResponse(
            reply="Please type a question and I'll do my best to help! 😊",
            source="knowledge_base",
        )

    # Tier 1: Knowledge base
    answer, score = find_best_answer(message)

    if answer and score >= MATCH_THRESHOLD:
        if location and "ETA" in answer or "route" in answer:
            answer += f"\n\n*(Note: Your current region **{location}** will be used to optimize matching!)*"
        
        return ChatResponse(reply=answer, source="knowledge_base")

    # Tier 2: Web search fallback
    web_result = search_web(message, location)

    if web_result:
        return ChatResponse(reply=web_result, source="web_search")

    # Final fallback
    return ChatResponse(
        reply=(
            "I'm not sure about that one! 🤔 You can try rephrasing your question, "
            "or ask me about FoodBridge features like donating food, NGO pickups, "
            "AI verification, ETA prediction, and more."
        ),
        source="knowledge_base",
    )
