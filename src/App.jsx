import { useState, useEffect } from "react";
import useProgress from "./hooks/useProgress";
import useBoatProfile from "./hooks/useBoatProfile";
import Summary from "./Summary";
import BoatProfile from "./BoatProfile";
import GeminiSetup from "./GeminiSetup";
import STEP_DETAILS from "./stepDetails";
import BrokerFinder from "./BrokerFinder";
import useBrokerData from "./hooks/useBrokerData";
import { useNotes, useResponses } from "./hooks/useWorkspace";
import Timeline from "./Timeline";
import Welcome from "./Welcome";

const SETUP_KEY = 'gemini-boat-guide-setup-done';
const WELCOME_KEY = 'gemini-boat-guide-welcome-done';
const THEME_KEY = 'gemini-boat-guide-theme';

const STEPS = [
    {
        phase: "Getting Started",
        title: "Setting Up Google Gemini",
        icon: "⚓",
        why: "Before we can research anything, we need to get you set up with Gemini — Google's free AI assistant. Think of it like having a super-knowledgeable friend who can help you research anything instantly.",
        instructions: [
            "Open your web browser (Chrome, Safari, Firefox — any will work)",
            "Go to gemini.google.com",
            "Sign in with your Google account (the same one you use for Gmail or YouTube)",
            "You'll see a text box at the bottom — that's where you type your questions"
        ],
        tip: "Gemini is free to use! You don't need to pay for anything. Just a Google account.",
        example: {
            label: "Try typing this to make sure it works:",
            prompt: "Hi Gemini! I'm learning how to use you to help me sell my boat. Can you confirm you understand?"
        }
    },
    {
        phase: "Getting Started",
        title: "How to Talk to Gemini",
        icon: "💬",
        why: "The better your questions, the better Gemini's answers. This is the #1 skill to learn. Vague questions get vague answers. Specific questions get goldmine answers.",
        instructions: [
            "Be specific — include details like your boat type, size, year, and location",
            "Ask one question at a time for clearer answers",
            "If an answer isn't helpful, rephrase or ask Gemini to \"go deeper\" or \"give more detail\"",
            "You can say \"That's not quite right\" and Gemini will try again"
        ],
        tip: "Think of Gemini like texting a friend — use natural language! You don't need any special commands or codes.",
        example: {
            label: "Instead of asking something vague, try this:",
            prompt: "I have a [YEAR] [MAKE] [MODEL], [LENGTH] feet, with [ENGINE DETAILS] and about [ENGINE HOURS] hours. It's docked in [CITY, STATE]. What should I know before I start the selling process?"
        }
    },
    {
        phase: "Pricing Research",
        title: "Finding Your Boat's Market Value",
        icon: "💰",
        why: "Pricing is the most critical step. Price too high and your boat sits for months. Price too low and you leave thousands on the table. We research this FIRST because it shapes every decision after — where you list, how you write your ad, and how you negotiate.",
        instructions: [
            "Ask Gemini to help you research comparable boat sales (called \"comps\")",
            "Request information from multiple valuation sources",
            "Ask about seasonal pricing trends in your area",
            "Get a realistic price range — not just one number"
        ],
        tip: "Always ask for a RANGE (low, fair, high). The market price depends on condition, location, season, and how fast you want to sell.",
        example: {
            label: "Copy and customize this prompt with your boat's details:",
            prompt: "Help me determine the fair market value of my [YEAR] [MAKE] [MODEL], [LENGTH] feet, located in [CITY, STATE]. It has [ENGINE HOURS] hours on the engines and is in [good/fair/excellent] condition. What price range should I list it at? Please reference sources like NADA Guides, BUCValu, and recent sold listings on sites like Boat Trader and YachtWorld."
        }
    },
    {
        phase: "Pricing Research",
        title: "Understanding Pricing Factors",
        icon: "📊",
        why: "Your boat's value isn't just about the brand and year — dozens of factors affect what buyers will pay. Understanding these helps you price competitively AND justify your price to buyers.",
        instructions: [
            "Ask Gemini about depreciation rates for your specific boat type",
            "Research how your boat's features and upgrades affect value",
            "Learn what buyers in your area are currently looking for",
            "Find out if it's a buyer's or seller's market right now"
        ],
        tip: "Upgrades don't always add dollar-for-dollar value. A $5,000 stereo system might only add $1,500 to your price. Ask Gemini which upgrades actually matter to buyers.",
        example: {
            label: "Ask this follow-up after getting your initial valuation:",
            prompt: "For my [BOAT DETAILS], which of these upgrades actually increase resale value: new canvas, updated electronics, bottom paint, engine service records, generator? How much value does each typically add? Also, is spring or fall a better time to sell in [YOUR STATE]?"
        }
    },
    {
        phase: "Where to Sell",
        title: "Choosing Your Sales Channels",
        icon: "🌐",
        why: "We tackle WHERE to sell second because now that you know your price range, you can pick the right platform. A $15,000 fishing boat and a $500,000 yacht sell in very different places. Choosing the right channels means reaching the right buyers faster.",
        instructions: [
            "Ask Gemini to compare different selling platforms for your boat type and price",
            "Research the pros and cons of using a broker vs. selling privately",
            "Explore both online marketplaces and local options",
            "Ask about listing fees and commissions for each platform"
        ],
        tip: "Most successful sellers list on 2-3 platforms simultaneously to maximize exposure. Don't put all your eggs in one basket.",
        example: {
            label: "Use this prompt to get a tailored recommendation:",
            prompt: "I want to sell my [YEAR] [MAKE] [MODEL] valued around $[PRICE] in [CITY, STATE]. Compare my options: Boat Trader, YachtWorld, Facebook Marketplace, Craigslist, and using a yacht broker. For each, tell me: listing cost, typical time to sell, what type of buyer uses it, and pros/cons. Which combination would you recommend for my situation?"
        }
    },
    {
        phase: "Where to Sell",
        title: "Broker vs. Private Sale",
        icon: "🤝",
        why: "This is one of the biggest decisions you'll make. Brokers handle everything but take 10% commission. Private sales keep that money in your pocket but require more work. Let's use Gemini to figure out which is right for YOUR situation.",
        instructions: [
            "Ask Gemini to calculate broker commission vs. your time investment",
            "Research what brokers in your area charge and what services they include",
            "Learn what paperwork you'll need to handle yourself if selling privately",
            "Ask about hybrid options (like paying a broker just for paperwork)"
        ],
        tip: "A good rule of thumb: if your boat is worth over $100K, a broker often pays for themselves through better negotiation and qualified buyers. Under $50K, private sale usually makes sense.",
        example: {
            label: "Get a personalized cost-benefit analysis:",
            prompt: "My boat is worth approximately $[PRICE]. Help me do a cost-benefit analysis of using a yacht broker versus selling privately. Factor in: broker commission (typically 10%), my time investment, likelihood of getting full asking price, average time to sell, and any risks of selling privately like scams or legal issues. What would you recommend for someone who [has/doesn't have] experience selling boats?"
        }
    },
    {
        phase: "Your Listing",
        title: "Writing a Compelling Listing",
        icon: "✍️",
        why: "Now that you know your price and where to list, it's time to create an ad that stands out. Buyers scroll past hundreds of listings — yours needs to grab attention in seconds. This is where Gemini really shines, because it can help you write like a pro.",
        instructions: [
            "Gather all your boat's details: year, make, model, specs, upgrades, maintenance history",
            "Ask Gemini to write a listing based on your specific details",
            "Request multiple versions — different tones work for different platforms",
            "Ask Gemini to highlight what makes YOUR boat special vs. competitors"
        ],
        tip: "The first 2 sentences of your listing are the most important — that's all buyers see before deciding to click. Lead with your biggest selling point, not the year and make.",
        example: {
            label: "Give Gemini your details and let it craft your listing:",
            prompt: "Write a compelling boat-for-sale listing for my [YEAR] [MAKE] [MODEL]. Here are the details:\n- Length: [XX] feet\n- Engines: [DETAILS] with [XX] hours\n- Key features: [LIST YOUR BEST FEATURES]\n- Recent maintenance: [ANY RECENT WORK]\n- Upgrades: [LIST UPGRADES]\n- Asking price: $[PRICE]\n- Located: [CITY, STATE]\n\nMake it engaging and highlight what makes this boat stand out. Write two versions: one for Boat Trader (professional tone) and one for Facebook Marketplace (casual, friendly tone)."
        }
    },
    {
        phase: "Your Listing",
        title: "Photo & Presentation Tips",
        icon: "📸",
        why: "Great photos sell boats faster and for more money — studies show listings with professional-looking photos get 3-5x more inquiries. You don't need a professional photographer; you just need to know the tricks.",
        instructions: [
            "Ask Gemini for a photo shot list specific to your boat type",
            "Learn the best time of day and conditions for boat photography",
            "Get tips on staging and cleaning before photos",
            "Ask about video walkthroughs and whether they're worth doing"
        ],
        tip: "Golden hour (the hour after sunrise or before sunset) makes ANY boat look stunning. Clean the boat the day of, and remove all personal items and clutter.",
        example: {
            label: "Get a customized photography game plan:",
            prompt: "I'm about to photograph my [YEAR] [MAKE] [MODEL] to sell it. Give me a detailed shot list of every photo I should take, in what order, and any staging tips. Include: exterior angles, interior shots, engine compartment, helm/electronics, and detail shots. What are the biggest photo mistakes that turn off boat buyers? Also, should I make a video walkthrough and if so, what should I cover?"
        }
    },
    {
        phase: "Legal & Paperwork",
        title: "Required Documents & Transfers",
        icon: "📋",
        why: "We save legal paperwork for last because you need everything else in place first — but DON'T skip this step. Missing paperwork can kill a deal or worse, create legal liability for you after the sale. Gemini can help you build a complete checklist for your state.",
        instructions: [
            "Ask Gemini for a document checklist specific to your state",
            "Research your state's title transfer process",
            "Learn about Coast Guard documentation (for documented vessels)",
            "Understand what tax obligations come with selling a boat"
        ],
        tip: "Start gathering documents NOW, even if you're weeks from selling. Finding a lost title can take 4-8 weeks depending on your state.",
        example: {
            label: "Get your state-specific paperwork checklist:",
            prompt: "I'm selling a [LENGTH]-foot boat in [STATE]. It [is/is not] Coast Guard documented. Give me a complete checklist of every document and legal step I need to complete the sale, including: title transfer process, bill of sale requirements, registration cancellation, any required inspections, tax implications for me as the seller, and what the buyer will need from me. Are there any [STATE]-specific rules I should know about?"
        }
    },
    {
        phase: "Legal & Paperwork",
        title: "Protecting Yourself in the Sale",
        icon: "🛡️",
        why: "The final piece: making sure YOU are protected throughout the transaction. From scam-proof payment methods to liability after the sale, this knowledge gives you confidence to close the deal safely.",
        instructions: [
            "Ask Gemini about common boat-selling scams and how to avoid them",
            "Learn which payment methods are safe (and which are NOT)",
            "Research whether you need a marine survey before selling",
            "Understand your liability and when it ends after the sale"
        ],
        tip: "NEVER accept personal checks or wire transfers from unknown buyers. A marine escrow service is the safest way to handle large transactions.",
        example: {
            label: "Protect yourself with this comprehensive prompt:",
            prompt: "I'm about to sell my boat privately for $[PRICE]. Walk me through how to protect myself: What are the most common scams I should watch out for? What's the safest way to accept payment? Do I need a sea trial agreement or liability waiver? Should I require a marine survey? What's the best way to structure the handoff so I'm not liable after the sale? Also, write me a simple bill of sale template I can customize."
        }
    }
];

const PHASES = ["Getting Started", "Pricing Research", "Where to Sell", "Your Listing", "Legal & Paperwork"];
const PHASE_COLORS = {
    "Getting Started": { bg: "#1a3a4a", accent: "#4ecdc4", light: "#e8f8f5" },
    "Pricing Research": { bg: "#2d3a1a", accent: "#a8c256", light: "#f0f5e0" },
    "Where to Sell": { bg: "#3a1a2d", accent: "#d4789c", light: "#fae8f0" },
    "Your Listing": { bg: "#1a2a3a", accent: "#5b9bd5", light: "#e4eef8" },
    "Legal & Paperwork": { bg: "#3a2a1a", accent: "#d4a054", light: "#faf0e0" }
};

function ProgressBar({ total, completedSteps, current }) {
    return (
        <div style={{ display: "flex", gap: 4, padding: "0 20px" }}>
            {Array.from({ length: total }).map((_, i) => (
                <div
                    key={i}
                    style={{
                        flex: 1,
                        height: 4,
                        borderRadius: 2,
                        background: completedSteps.has(i)
                            ? "#4ecdc4"
                            : i === current
                                ? "rgba(78, 205, 196, 0.4)"
                                : "rgba(255,255,255,0.15)",
                        transition: "background 0.4s ease"
                    }}
                />
            ))}
        </div>
    );
}

function CopyButton({ text }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };
    return (
        <button
            onClick={handleCopy}
            style={{
                background: copied ? "#4ecdc4" : "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: copied ? "#0a1628" : "#ccc",
                padding: "6px 14px",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: 6
            }}
        >
            {copied ? "✓ Copied!" : "📋 Copy Prompt"}
        </button>
    );
}

export default function App() {
    const {
        currentStep, completedSteps, visitedSteps, completionPercent,
        goTo, goNext, goPrev, toggleComplete, resetProgress
    } = useProgress(STEPS.length);
    const { profile, hasProfile, updateField, fillPrompt, generateFirstMessage } = useBoatProfile();
    const [expandedInstructions, setExpandedInstructions] = useState(true);
    const [showDetails, setShowDetails] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    const [showBoatProfile, setShowBoatProfile] = useState(false);
    const [showBrokerFinder, setShowBrokerFinder] = useState(false);
    const brokerHook = useBrokerData();
    const { getNote, updateNote, notesCount } = useNotes(STEPS.length);
    const { getResponses, saveResponse, deleteResponse, totalResponses } = useResponses();
    const [responseInput, setResponseInput] = useState('');
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [showTimeline, setShowTimeline] = useState(false);
    const [showWelcome, setShowWelcome] = useState(() => {
        try { return !localStorage.getItem(WELCOME_KEY); } catch { return false; }
    });
    const [theme, setTheme] = useState(() => {
        try { return localStorage.getItem(THEME_KEY) || 'dark'; } catch { return 'dark'; }
    });
    const isDark = theme === 'dark';
    const toggleTheme = () => {
        const next = isDark ? 'light' : 'dark';
        setTheme(next);
        try { localStorage.setItem(THEME_KEY, next); } catch { }
    };
    const dismissWelcome = () => {
        try { localStorage.setItem(WELCOME_KEY, 'true'); } catch { }
        setShowWelcome(false);
    };
    const [showSetup, setShowSetup] = useState(() => {
        try { return !localStorage.getItem(SETUP_KEY); } catch { return true; }
    });
    const step = STEPS[currentStep];
    const phaseColor = PHASE_COLORS[step.phase];
    const currentPhaseIndex = PHASES.indexOf(step.phase);
    const filledPrompt = fillPrompt(step.example.prompt);
    const hasUnfilledBrackets = /\[(?!\d)/.test(filledPrompt);

    const completeSetup = () => {
        try { localStorage.setItem(SETUP_KEY, 'true'); } catch { }
        setShowSetup(false);
        if (!hasProfile) setShowBoatProfile(true);
    };

    // Reset expanded state when step changes
    useEffect(() => {
        setExpandedInstructions(true);
        setShowDetails(false);
    }, [currentStep]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (showSummary && e.key === "Escape") {
                setShowSummary(false);
                return;
            }
            if (showSummary || showBoatProfile || showSetup) return;
            switch (e.key) {
                case "ArrowRight":
                case "ArrowDown":
                    e.preventDefault();
                    goNext();
                    break;
                case "ArrowLeft":
                case "ArrowUp":
                    e.preventDefault();
                    goPrev();
                    break;
                case " ":
                    e.preventDefault();
                    toggleComplete(currentStep);
                    break;
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [currentStep, showSummary, showBoatProfile, showSetup, goNext, goPrev, toggleComplete]);

    // Export all data as printable HTML
    const exportData = () => {
        const stepsHtml = STEPS.map((s, i) => {
            const note = getNote(i);
            const resps = getResponses(i);
            const completed = completedSteps.has(i);
            const prompt = fillPrompt(s.example.prompt);
            return `
                <div style="page-break-inside:avoid; margin-bottom:32px; border:1px solid #ddd; border-radius:8px; padding:20px;">
                    <h2 style="color:#1a5276; margin:0 0 4px;">${completed ? '✅' : '⬜'} Step ${i + 1}: ${s.title}</h2>
                    <p style="color:#666; margin:0 0 12px;">${s.subtitle}</p>
                    <div style="background:#f8f9fa; padding:12px; border-radius:6px; margin-bottom:12px;">
                        <strong>Prompt:</strong><br/><span style="white-space:pre-wrap;">${prompt}</span>
                    </div>
                    ${note ? `<div style="background:#fff3cd; padding:10px; border-radius:6px; margin-bottom:12px;"><strong>📝 My Notes:</strong><br/>${note}</div>` : ''}
                    ${resps.length > 0 ? resps.map((r, ri) => `
                        <div style="background:#e8f4f8; padding:10px; border-radius:6px; margin-bottom:8px;">
                            <strong>💾 Gemini Response ${ri + 1}</strong> <em style="color:#888;">(${new Date(r.savedAt).toLocaleDateString()})</em>
                            <div style="white-space:pre-wrap; margin-top:6px;">${r.text}</div>
                        </div>
                    `).join('') : ''}
                </div>
            `;
        }).join('');

        const boatHtml = hasProfile ? `
            <div style="margin-bottom:32px; border:1px solid #ddd; border-radius:8px; padding:20px;">
                <h2 style="color:#1a5276;">🚤 Boat Profile</h2>
                ${Object.entries(profile).filter(([, v]) => v).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join('')}
            </div>
        ` : '';

        const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/>
            <title>Boat Selling Guide — Full Export</title>
            <style>body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:0 20px;color:#333;line-height:1.6;}
            h1{color:#0a1628;border-bottom:2px solid #4ecdc4;padding-bottom:8px;}
            @media print{body{margin:0;} div{break-inside:avoid;}}</style>
        </head><body>
            <h1>⛵ Sell Your Boat with Gemini — Complete Export</h1>
            <p style="color:#666;">Exported on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            <p><strong>Progress:</strong> ${completedSteps.size}/${STEPS.length} steps completed (${completionPercent}%)</p>
            ${boatHtml}
            ${stepsHtml}
        </body></html>`;

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const win = window.open(url, '_blank');
        if (win) {
            win.onload = () => { URL.revokeObjectURL(url); };
        }
    };

    // Share read-only view (same as export but labeled for sharing)
    const shareData = () => {
        exportData();
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: isDark ? "#0a1628" : "#f0f4f8",
            color: isDark ? "#e8e8e8" : "#1a2a3a",
            fontFamily: "'Inter', sans-serif",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Ambient glow */}
            <div style={{
                position: "absolute",
                top: 0, left: "50%", transform: "translateX(-50%)",
                width: 600, height: 400,
                background: `radial-gradient(ellipse, ${phaseColor.accent}15 0%, transparent 70%)`,
                transition: "background 0.8s ease",
                pointerEvents: "none"
            }} />

            {/* Header */}
            <header style={{
                padding: "28px 24px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.06)"
            }}>
                <div style={{ maxWidth: 800, margin: "0 auto" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                        <span style={{ fontSize: 28 }}>⛵</span>
                        <h1 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 24,
                            fontWeight: 700,
                            margin: 0,
                            flex: 1,
                            background: `linear-gradient(135deg, #fff, ${phaseColor.accent})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>
                            Sell Your Boat with Gemini
                        </h1>
                        <button
                            onClick={() => setShowBoatProfile(true)}
                            style={{
                                background: hasProfile ? "rgba(91,155,213,0.12)" : "rgba(255,255,255,0.06)",
                                border: `1px solid ${hasProfile ? "rgba(91,155,213,0.3)" : "rgba(255,255,255,0.1)"}`,
                                color: hasProfile ? "#5b9bd5" : "#889",
                                padding: "5px 12px",
                                borderRadius: 8,
                                cursor: "pointer",
                                fontSize: 13,
                                fontWeight: 600,
                                transition: "all 0.2s ease",
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                flexShrink: 0
                            }}
                        >
                            🚤 {hasProfile ? "My Boat" : "Add Boat"}
                        </button>
                        <button
                            className="progress-header-btn"
                            onClick={() => setShowSummary(true)}
                            style={{
                                background: completionPercent > 0 ? "rgba(78,205,196,0.12)" : "rgba(255,255,255,0.06)",
                                border: `1px solid ${completionPercent > 0 ? "rgba(78,205,196,0.3)" : "rgba(255,255,255,0.1)"}`,
                                color: completionPercent > 0 ? "#4ecdc4" : "#889",
                                padding: "5px 12px",
                                borderRadius: 8,
                                cursor: "pointer",
                                fontSize: 13,
                                fontWeight: 600,
                                transition: "all 0.2s ease",
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                flexShrink: 0
                            }}
                        >
                            📊 {completionPercent}%
                        </button>
                        <button
                            onClick={exportData}
                            title="Export all steps, notes, and responses as a printable document"
                            style={{
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "#889",
                                padding: "5px 12px",
                                borderRadius: 8,
                                cursor: "pointer",
                                fontSize: 13,
                                fontWeight: 600,
                                transition: "all 0.2s ease",
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                flexShrink: 0
                            }}
                        >
                            📥 Export
                        </button>
                        <button
                            onClick={() => setShowTimeline(true)}
                            title="View your full journey timeline"
                            style={{
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "#889",
                                padding: "5px 12px",
                                borderRadius: 8,
                                cursor: "pointer",
                                fontSize: 13,
                                fontWeight: 600,
                                transition: "all 0.2s ease",
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                flexShrink: 0
                            }}
                        >
                            📊 Timeline
                        </button>
                        <button
                            onClick={toggleTheme}
                            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                            style={{
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "#889",
                                padding: "5px 10px",
                                borderRadius: 8,
                                cursor: "pointer",
                                fontSize: 16,
                                transition: "all 0.2s ease",
                                flexShrink: 0
                            }}
                        >
                            {isDark ? "☀️" : "🌙"}
                        </button>
                    </div>
                    <p style={{ margin: "4px 0 16px", fontSize: 15, color: "#8899aa", letterSpacing: 0.3 }}>
                        A step-by-step guide to using AI for your boat sale
                    </p>
                    <ProgressBar current={currentStep} total={STEPS.length} completedSteps={completedSteps} />
                </div>
            </header>

            {/* Phase Navigation */}
            <nav style={{
                padding: "14px 24px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                overflowX: "auto",
                WebkitOverflowScrolling: "touch"
            }}>
                <div style={{
                    display: "flex",
                    gap: 6,
                    maxWidth: 800,
                    margin: "0 auto"
                }}>
                    {PHASES.map((phase, pi) => {
                        const isActive = pi === currentPhaseIndex;
                        const pc = PHASE_COLORS[phase];
                        return (
                            <button
                                key={phase}
                                onClick={() => {
                                    const firstStepIndex = STEPS.findIndex(s => s.phase === phase);
                                    goTo(firstStepIndex);
                                }}
                                style={{
                                    background: isActive ? `${pc.accent}20` : "transparent",
                                    border: `1px solid ${isActive ? pc.accent + "60" : "rgba(255,255,255,0.08)"}`,
                                    color: isActive ? pc.accent : "#667788",
                                    padding: "6px 14px",
                                    borderRadius: 20,
                                    cursor: "pointer",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    whiteSpace: "nowrap",
                                    transition: "all 0.3s ease"
                                }}
                            >
                                {phase}
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Main Content */}
            <main style={{ maxWidth: 800, margin: "0 auto", padding: "24px 24px 120px" }}>

                {/* Step Header */}
                <div style={{ marginBottom: 28 }}>
                    <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background: `${phaseColor.accent}15`,
                        border: `1px solid ${phaseColor.accent}30`,
                        padding: "4px 12px",
                        borderRadius: 20,
                        marginBottom: 14
                    }}>
                        <span style={{ fontSize: 10, color: phaseColor.accent }}>●</span>
                        <span style={{ fontSize: 13, color: phaseColor.accent, fontWeight: 600 }}>
                            {step.phase} — Step {currentStep + 1} of {STEPS.length}
                        </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                        <span style={{
                            fontSize: 40,
                            lineHeight: 1,
                            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))"
                        }}>
                            {step.icon}
                        </span>
                        <div style={{ flex: 1 }}>
                            <h2 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 28,
                                fontWeight: 700,
                                margin: 0,
                                lineHeight: 1.2
                            }}>
                                {step.title}
                            </h2>
                        </div>
                        <button
                            onClick={() => toggleComplete(currentStep)}
                            title={completedSteps.has(currentStep) ? "Mark as incomplete" : "Mark as complete"}
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: 12,
                                border: `2px solid ${completedSteps.has(currentStep) ? phaseColor.accent : "rgba(255,255,255,0.15)"}`,
                                background: completedSteps.has(currentStep) ? `${phaseColor.accent}20` : "rgba(255,255,255,0.03)",
                                color: completedSteps.has(currentStep) ? phaseColor.accent : "#556",
                                cursor: "pointer",
                                fontSize: 20,
                                fontWeight: 700,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.25s ease",
                                flexShrink: 0
                            }}
                        >
                            {completedSteps.has(currentStep) ? "✓" : ""}
                        </button>
                    </div>
                </div>

                {/* Why Section */}
                <div style={{
                    background: `linear-gradient(135deg, ${phaseColor.accent}08, ${phaseColor.accent}04)`,
                    border: `1px solid ${phaseColor.accent}20`,
                    borderRadius: 14,
                    padding: "18px 20px",
                    marginBottom: 20
                }}>
                    <div style={{
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        color: phaseColor.accent,
                        marginBottom: 8
                    }}>
                        Why this step?
                    </div>
                    <p style={{
                        margin: 0,
                        fontSize: 16,
                        lineHeight: 1.65,
                        color: "#c8d0d8"
                    }}>
                        {step.why}
                    </p>
                </div>

                {/* Learn More Deep Dive */}
                {STEP_DETAILS[currentStep] && (
                    <div style={{
                        border: `1px solid ${showDetails ? phaseColor.accent + '30' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: 14,
                        overflow: "hidden",
                        marginBottom: 20,
                        transition: "border-color 0.3s ease"
                    }}>
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            style={{
                                width: "100%",
                                background: showDetails ? `${phaseColor.accent}08` : "rgba(255,255,255,0.02)",
                                border: "none",
                                color: "#e8e8e8",
                                padding: "14px 20px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                cursor: "pointer",
                                transition: "background 0.3s ease"
                            }}
                        >
                            <span style={{ fontSize: 15, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                                📖 Learn More — Go Deeper
                            </span>
                            <span style={{
                                transform: showDetails ? "rotate(180deg)" : "rotate(0)",
                                transition: "transform 0.3s ease",
                                fontSize: 18, color: phaseColor.accent
                            }}>▾</span>
                        </button>

                        {showDetails && (
                            <div style={{ padding: "0 20px 20px" }}>
                                {/* Deeper Explanation */}
                                {STEP_DETAILS[currentStep].deeper.split('\n\n').map((para, i) => (
                                    <p key={i} style={{
                                        margin: i === 0 ? "8px 0 14px" : "0 0 14px",
                                        fontSize: 15,
                                        lineHeight: 1.75,
                                        color: "#b8c4d0"
                                    }}>
                                        {para}
                                    </p>
                                ))}

                                {/* Impact Examples */}
                                <div style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: 1.5,
                                    color: phaseColor.accent,
                                    margin: "24px 0 12px"
                                }}>
                                    Real-World Impact
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                    {STEP_DETAILS[currentStep].impacts.map((impact, i) => (
                                        <div key={i} style={{
                                            background: i === 0 ? "rgba(255,100,100,0.05)" : "rgba(78,205,196,0.05)",
                                            border: `1px solid ${i === 0 ? "rgba(255,100,100,0.15)" : "rgba(78,205,196,0.15)"}`,
                                            borderRadius: 10,
                                            padding: "14px 16px"
                                        }}>
                                            <div style={{
                                                fontSize: 12,
                                                fontWeight: 700,
                                                color: i === 0 ? "#e8766a" : "#4ecdc4",
                                                marginBottom: 6,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 6
                                            }}>
                                                {i === 0 ? "⚠️" : "✅"} {impact.scenario}
                                            </div>
                                            <p style={{
                                                margin: 0,
                                                fontSize: 14,
                                                lineHeight: 1.65,
                                                color: "#a0aab4"
                                            }}>
                                                {impact.detail}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Instructions */}
                <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 14,
                    overflow: "hidden",
                    marginBottom: 20
                }}>
                    <button
                        onClick={() => setExpandedInstructions(!expandedInstructions)}
                        style={{
                            width: "100%",
                            background: "none",
                            border: "none",
                            color: "#e8e8e8",
                            padding: "16px 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            cursor: "pointer"
                        }}
                    >
                        <span style={{ fontSize: 16, fontWeight: 600 }}>
                            📝 What to do
                        </span>
                        <span style={{
                            transform: expandedInstructions ? "rotate(180deg)" : "rotate(0)",
                            transition: "transform 0.3s ease",
                            fontSize: 18, color: "#667788"
                        }}>▾</span>
                    </button>

                    {expandedInstructions && (
                        <div style={{ padding: "0 20px 18px" }}>
                            {step.instructions.map((inst, i) => (
                                <div key={i} style={{
                                    display: "flex",
                                    gap: 12,
                                    alignItems: "flex-start",
                                    padding: "10px 0",
                                    borderTop: i > 0 ? "1px solid rgba(255,255,255,0.04)" : "none"
                                }}>
                                    <span style={{
                                        background: `${phaseColor.accent}25`,
                                        color: phaseColor.accent,
                                        minWidth: 28,
                                        height: 28,
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 13,
                                        fontWeight: 700
                                    }}>
                                        {i + 1}
                                    </span>
                                    <span style={{ fontSize: 15, lineHeight: 1.55, color: "#bcc4cc", paddingTop: 3 }}>
                                        {inst}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pro Tip */}
                <div style={{
                    background: "rgba(78, 205, 196, 0.06)",
                    border: "1px solid rgba(78, 205, 196, 0.15)",
                    borderRadius: 14,
                    padding: "16px 20px",
                    marginBottom: 20,
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start"
                }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>💡</span>
                    <div>
                        <div style={{
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: 1.2,
                            color: "#4ecdc4",
                            marginBottom: 4
                        }}>
                            Pro Tip
                        </div>
                        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#a0b0b8" }}>
                            {step.tip}
                        </p>
                    </div>
                </div>

                {/* Example Prompt */}
                <div style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 14,
                    overflow: "hidden",
                    marginBottom: 32
                }}>
                    <div style={{
                        padding: "16px 20px",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 10
                    }}>
                        <div>
                            <div style={{
                                fontSize: 11,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: 1.2,
                                color: phaseColor.accent,
                                marginBottom: 2
                            }}>
                                Example Prompt for Gemini
                            </div>
                            <div style={{ fontSize: 14, color: "#8899aa" }}>{step.example.label}</div>
                        </div>
                        <CopyButton text={filledPrompt} />
                    </div>
                    <div style={{
                        padding: "18px 20px",
                        background: "rgba(0,0,0,0.2)",
                        fontSize: 15,
                        lineHeight: 1.7,
                        color: "#d0d8e0",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word"
                    }}>
                        {filledPrompt}
                    </div>
                    {hasUnfilledBrackets && (
                        <div
                            style={{
                                padding: "10px 20px",
                                background: hasProfile ? "rgba(91,155,213,0.06)" : "rgba(255,200,50,0.06)",
                                borderTop: `1px solid ${hasProfile ? "rgba(91,155,213,0.1)" : "rgba(255,200,50,0.1)"}`,
                                fontSize: 13,
                                color: hasProfile ? "#5b9bd5" : "#c8a84e",
                                cursor: hasProfile ? "default" : "pointer"
                            }}
                            onClick={() => !hasProfile && setShowBoatProfile(true)}
                        >
                            {hasProfile
                                ? "ℹ️ Some fields are still empty — fill them in your boat profile for full auto-fill"
                                : "⚠️ Add your boat details to auto-fill these prompts → Click here"}
                        </div>
                    )}
                </div>

                {/* Broker Research Button (Step 6 only = index 5) */}
                {currentStep === 5 && (
                    <button
                        onClick={() => setShowBrokerFinder(true)}
                        style={{
                            width: "100%",
                            padding: "16px 20px",
                            borderRadius: 12,
                            border: "1px solid rgba(245,197,66,0.3)",
                            background: "linear-gradient(135deg, rgba(245,197,66,0.08), rgba(245,197,66,0.03))",
                            color: "#f5c542",
                            fontSize: 15,
                            fontWeight: 700,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            marginBottom: 20,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8
                        }}
                    >
                        🔍 Research & Rank Brokers
                        {brokerHook.activeBrokerCount > 0 && (
                            <span style={{
                                background: "rgba(245,197,66,0.15)",
                                padding: "2px 8px",
                                borderRadius: 6,
                                fontSize: 12
                            }}>
                                {brokerHook.activeBrokerCount} saved
                            </span>
                        )}
                    </button>
                )}

                {/* Notes Section */}
                <div style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 14,
                    overflow: "hidden",
                    marginBottom: 20
                }}>
                    <div style={{
                        padding: "12px 20px",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        display: "flex",
                        alignItems: "center",
                        gap: 8
                    }}>
                        <span style={{ fontSize: 16 }}>📝</span>
                        <span style={{
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: 1.5,
                            color: "#4ecdc4"
                        }}>
                            Your Notes — Step {currentStep + 1}
                        </span>
                    </div>
                    <textarea
                        placeholder="Write your notes for this step... (e.g., questions for your broker, things to remember, decisions made)"
                        value={getNote(currentStep)}
                        onChange={e => updateNote(currentStep, e.target.value)}
                        style={{
                            width: "100%",
                            minHeight: 80,
                            background: "transparent",
                            border: "none",
                            color: "#b8c4d0",
                            padding: "14px 20px",
                            fontSize: 14,
                            lineHeight: 1.6,
                            fontFamily: "inherit",
                            resize: "vertical",
                            outline: "none"
                        }}
                    />
                </div>

                {/* Gemini Response Saver */}
                <div style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 14,
                    overflow: "hidden",
                    marginBottom: 20
                }}>
                    <div style={{
                        padding: "12px 20px",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 16 }}>💾</span>
                            <span style={{
                                fontSize: 11,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: 1.5,
                                color: "#4ecdc4"
                            }}>
                                Save Gemini's Response
                            </span>
                        </div>
                        {getResponses(currentStep).length > 0 && (
                            <span style={{ fontSize: 12, color: "#889" }}>
                                {getResponses(currentStep).length} saved
                            </span>
                        )}
                    </div>
                    <div style={{ padding: "14px 20px" }}>
                        <textarea
                            placeholder="Paste Gemini's response here to save it..."
                            value={responseInput}
                            onChange={e => setResponseInput(e.target.value)}
                            style={{
                                width: "100%",
                                minHeight: 60,
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 8,
                                color: "#b8c4d0",
                                padding: "10px 12px",
                                fontSize: 13,
                                lineHeight: 1.5,
                                fontFamily: "inherit",
                                resize: "vertical"
                            }}
                        />
                        <button
                            onClick={() => {
                                if (responseInput.trim()) {
                                    saveResponse(currentStep, responseInput.trim());
                                    setResponseInput('');
                                }
                            }}
                            disabled={!responseInput.trim()}
                            style={{
                                marginTop: 8,
                                padding: "8px 16px",
                                borderRadius: 8,
                                border: "none",
                                background: responseInput.trim() ? "rgba(78,205,196,0.15)" : "rgba(255,255,255,0.03)",
                                color: responseInput.trim() ? "#4ecdc4" : "#556",
                                fontSize: 13,
                                fontWeight: 600,
                                cursor: responseInput.trim() ? "pointer" : "default"
                            }}
                        >
                            💾 Save Response
                        </button>
                    </div>
                    {getResponses(currentStep).length > 0 && (
                        <div style={{ padding: "0 20px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
                            {getResponses(currentStep).map((r, i) => (
                                <div key={i} style={{
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                    borderRadius: 8,
                                    padding: "10px 12px"
                                }}>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: 6
                                    }}>
                                        <span style={{ fontSize: 11, color: "#667" }}>
                                            Saved {new Date(r.savedAt).toLocaleDateString()} at {new Date(r.savedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        <button
                                            onClick={() => deleteResponse(currentStep, i)}
                                            style={{
                                                background: "none",
                                                border: "none",
                                                color: "#664444",
                                                cursor: "pointer",
                                                fontSize: 12,
                                                padding: "2px 6px"
                                            }}
                                        >🗑️</button>
                                    </div>
                                    <div style={{
                                        fontSize: 13,
                                        lineHeight: 1.5,
                                        color: "#a0aab4",
                                        whiteSpace: "pre-wrap",
                                        maxHeight: 120,
                                        overflow: "auto"
                                    }}>
                                        {r.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Step Dots Navigation */}
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 8,
                    marginBottom: 20,
                    flexWrap: "wrap"
                }}>
                    {STEPS.map((s, i) => {
                        const sc = PHASE_COLORS[s.phase];
                        const isComplete = completedSteps.has(i);
                        return (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                title={`${s.title}${isComplete ? " ✓" : ""}`}
                                style={{
                                    width: i === currentStep ? 32 : 12,
                                    height: 12,
                                    borderRadius: 6,
                                    border: isComplete && i !== currentStep ? `1px solid ${sc.accent}80` : "none",
                                    background: i === currentStep
                                        ? sc.accent
                                        : isComplete
                                            ? `${sc.accent}70`
                                            : visitedSteps.has(i)
                                                ? `${sc.accent}30`
                                                : "rgba(255,255,255,0.1)",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                    padding: 0
                                }}
                            />
                        );
                    })}
                </div>
            </main>

            {/* Fixed Bottom Nav */}
            <div style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(transparent, #0a1628 30%)",
                padding: "40px 24px 24px",
                pointerEvents: "none"
            }}>
                <div style={{
                    maxWidth: 800,
                    margin: "0 auto",
                    display: "flex",
                    gap: 12,
                    pointerEvents: "auto"
                }}>
                    <button
                        onClick={() => goPrev()}
                        disabled={currentStep === 0}
                        style={{
                            flex: 1,
                            padding: "16px",
                            borderRadius: 12,
                            border: "1px solid rgba(255,255,255,0.12)",
                            background: "rgba(255,255,255,0.05)",
                            color: currentStep === 0 ? "#334" : "#aaa",
                            fontSize: 16,
                            fontWeight: 600,
                            cursor: currentStep === 0 ? "default" : "pointer",
                            opacity: currentStep === 0 ? 0.4 : 1,
                            transition: "all 0.2s ease",
                            backdropFilter: "blur(10px)"
                        }}
                    >
                        ← Back
                    </button>
                    <button
                        onClick={() => {
                            if (currentStep === STEPS.length - 1) {
                                setShowSummary(true);
                            } else {
                                goNext();
                            }
                        }}
                        style={{
                            flex: 2,
                            padding: "16px",
                            borderRadius: 12,
                            border: "none",
                            background: currentStep === STEPS.length - 1
                                ? `linear-gradient(135deg, #4ecdc4, #2db5a8)`
                                : `linear-gradient(135deg, ${phaseColor.accent}, ${phaseColor.accent}cc)`,
                            color: "#0a1628",
                            fontSize: 16,
                            fontWeight: 700,
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: `0 4px 20px ${phaseColor.accent}30`
                        }}
                    >
                        {currentStep === STEPS.length - 1
                            ? "🎉 View Your Progress"
                            : `Next: ${STEPS[currentStep + 1]?.title} →`}
                    </button>
                </div>
            </div>

            {/* Summary Modal */}
            {showSummary && (
                <Summary
                    steps={STEPS}
                    completedSteps={completedSteps}
                    onClose={() => setShowSummary(false)}
                    onReset={resetProgress}
                />
            )}

            {/* Boat Profile Modal */}
            {showBoatProfile && (
                <BoatProfile
                    profile={profile}
                    updateField={updateField}
                    onClose={() => setShowBoatProfile(false)}
                    onDone={() => setShowBoatProfile(false)}
                />
            )}

            {/* Gemini Setup (Step 0) */}
            {showSetup && (
                <GeminiSetup
                    onComplete={completeSetup}
                    onSkip={() => {
                        try { localStorage.setItem(SETUP_KEY, 'true'); } catch { }
                        setShowSetup(false);
                    }}
                />
            )}

            {/* Broker Finder */}
            {showBrokerFinder && (
                <BrokerFinder
                    onClose={() => setShowBrokerFinder(false)}
                    fillPrompt={fillPrompt}
                    brokerHook={brokerHook}
                />
            )}

            {/* Timeline */}
            {showTimeline && (
                <Timeline
                    steps={STEPS}
                    completedSteps={completedSteps}
                    currentStep={currentStep}
                    onGoTo={goTo}
                    onClose={() => setShowTimeline(false)}
                />
            )}

            {/* Welcome Onboarding */}
            {showWelcome && (
                <Welcome
                    onStart={dismissWelcome}
                    onSkip={dismissWelcome}
                    steps={STEPS}
                />
            )}
        </div>
    );
}
