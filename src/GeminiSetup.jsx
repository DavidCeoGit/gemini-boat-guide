import { useState } from "react";

const GLOBAL_RULE_5_PART = `Save this to your persistent instructions:

Who I Am
I'm a retired hospitality professional in my late 50s, living in Madeline Island on Lake Superior. I'm learning to use AI tools to help with practical projects. I'm not a tech expert, but I'm willing to invest time to learn things that are genuinely useful.

How to Communicate with Me
- Use clear, plain language — avoid technical jargon unless you explain it
- Break complex topics into numbered steps
- Give me specific, actionable advice — not vague generalities
- If I ask something unclear, ask me to clarify before guessing
- Be direct and confident in your recommendations

My Structured Prompt Framework
Whenever I start a new conversation, your first response should ask me to define these 5 parameters:

1. **Persona** — The specific role or expert you should act as
2. **Context** — The background information or situation
3. **Task** — The exact goal or action I need help with
4. **Examples** — Any formatting preferences or reference material
5. **Constraints** — Specific rules, output formats, or things to avoid

Provide me a brief template to fill out, then wait for my response before proceeding with any task.`;

const GLOBAL_RULE_3_PART = `Save this to your persistent instructions:

Who I Am
I'm a retired hospitality professional in my late 50s, living in Madeline Island on Lake Superior. I'm learning to use AI tools to help with practical projects. I'm not a tech expert, but I'm willing to invest time to learn things that are genuinely useful.

How to Communicate with Me
- Use clear, plain language — avoid technical jargon unless you explain it
- Break complex topics into numbered steps
- Give me specific, actionable advice — not vague generalities
- If I ask something unclear, ask me to clarify before guessing
- Be direct and confident in your recommendations

My Structured Prompt Framework
Whenever I start a new conversation, your first response should ask me to define these 3 things:

1. **Role** — What kind of expert should you be for this conversation?
2. **Task** — What exactly do I need help with?
3. **Rules** — Any specific requirements or things to avoid?

Provide a brief template to fill out, then wait for my response before proceeding.`;

function CopyBlockButton({ text, label }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        });
    };
    return (
        <button onClick={handleCopy} style={{
            padding: "10px 18px",
            borderRadius: 10,
            border: copied ? "1px solid #4ecdc4" : "1px solid rgba(255,255,255,0.15)",
            background: copied ? "rgba(78,205,196,0.12)" : "rgba(255,255,255,0.06)",
            color: copied ? "#4ecdc4" : "#ccc",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: 8
        }}>
            {copied ? "✓ Copied!" : `📋 ${label || "Copy"}`}
        </button>
    );
}

export default function GeminiSetup({ onComplete, onSkip }) {
    const [frameworkChoice, setFrameworkChoice] = useState("5-part");
    const [currentSection, setCurrentSection] = useState(0);

    const activeRule = frameworkChoice === "5-part" ? GLOBAL_RULE_5_PART : GLOBAL_RULE_3_PART;

    const sections = [
        {
            title: "Why Set Up Gemini Globally?",
            icon: "🎯",
            content: (
                <div>
                    <p style={{ fontSize: 16, lineHeight: 1.7, color: "#c8d0d8", margin: "0 0 16px" }}>
                        Right now, every time you start a new Gemini conversation, it doesn't know anything about you.
                        Setting up <strong style={{ color: "#e8e8e8" }}>persistent instructions</strong> means Gemini will
                        always know who you are and how you like to communicate — not just for selling your boat, but for
                        <em> any</em> future project.
                    </p>
                    <div style={{
                        background: "rgba(78,205,196,0.08)",
                        border: "1px solid rgba(78,205,196,0.15)",
                        borderRadius: 12,
                        padding: "14px 18px",
                        fontSize: 14,
                        color: "#a0b8b8"
                    }}>
                        💡 Think of it like setting up your office — you do it once, and it makes every workday better.
                    </div>
                </div>
            )
        },
        {
            title: "Open Gemini Settings",
            icon: "⚙️",
            content: (
                <div>
                    <div style={{ fontSize: 16, lineHeight: 1.8, color: "#c8d0d8" }}>
                        <ol style={{ paddingLeft: 24, margin: "0 0 20px" }}>
                            <li style={{ marginBottom: 12 }}>
                                Go to <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer"
                                    style={{ color: "#5b9bd5", textDecoration: "underline" }}>
                                    gemini.google.com
                                </a>
                            </li>
                            <li style={{ marginBottom: 12 }}>
                                Click on <strong style={{ color: "#e8e8e8" }}>Settings</strong> (the gear icon ⚙️ in the bottom-left corner)
                            </li>
                            <li style={{ marginBottom: 12 }}>
                                Look for <strong style={{ color: "#e8e8e8" }}>"Extensions"</strong> or
                                <strong style={{ color: "#e8e8e8" }}> "Saved Info"</strong> — this is where
                                your persistent instructions go
                            </li>
                            <li>
                                You'll see a text area where you can add instructions that Gemini will remember
                            </li>
                        </ol>
                    </div>
                    <div style={{
                        background: "rgba(255,200,50,0.06)",
                        border: "1px solid rgba(255,200,50,0.12)",
                        borderRadius: 12,
                        padding: "14px 18px",
                        fontSize: 14,
                        color: "#c8a84e",
                        marginTop: 8
                    }}>
                        ⚠️ The exact location may vary slightly — Google updates Gemini's interface regularly.
                        Look for anything labeled "Instructions", "Saved Info", or "About You".
                    </div>
                </div>
            )
        },
        {
            title: "Choose Your Framework",
            icon: "📋",
            content: (
                <div>
                    <p style={{ fontSize: 16, lineHeight: 1.7, color: "#c8d0d8", margin: "0 0 20px" }}>
                        This framework teaches Gemini to organize your requests before acting on them.
                        Choose the version that feels right for you:
                    </p>
                    <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                        {[
                            { id: "5-part", label: "5-Part (Detailed)", desc: "Persona, Context, Task, Examples, Constraints" },
                            { id: "3-part", label: "3-Part (Simple)", desc: "Role, Task, Rules" }
                        ].map(opt => (
                            <button
                                key={opt.id}
                                onClick={() => setFrameworkChoice(opt.id)}
                                style={{
                                    flex: 1,
                                    padding: "16px",
                                    borderRadius: 12,
                                    border: `2px solid ${frameworkChoice === opt.id ? "#5b9bd5" : "rgba(255,255,255,0.1)"}`,
                                    background: frameworkChoice === opt.id ? "rgba(91,155,213,0.1)" : "rgba(255,255,255,0.03)",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                <div style={{ fontSize: 15, fontWeight: 700, color: frameworkChoice === opt.id ? "#5b9bd5" : "#ccc", marginBottom: 4 }}>
                                    {frameworkChoice === opt.id ? "✓ " : ""}{opt.label}
                                </div>
                                <div style={{ fontSize: 12, color: "#889" }}>{opt.desc}</div>
                            </button>
                        ))}
                    </div>

                    {/* Rule Preview */}
                    <div style={{
                        background: "rgba(0,0,0,0.25)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 12,
                        padding: "18px 20px",
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: "#c8d0d8",
                        whiteSpace: "pre-wrap",
                        maxHeight: 300,
                        overflowY: "auto",
                        marginBottom: 16
                    }}>
                        {activeRule}
                    </div>

                    <div style={{ display: "flex", gap: 10 }}>
                        <CopyBlockButton text={activeRule} label="Copy Instructions" />
                    </div>

                    <p style={{ fontSize: 13, color: "#889", marginTop: 16, lineHeight: 1.6 }}>
                        📝 <strong style={{ color: "#aab" }}>Edit this to match you</strong> — change "Madeline Island on Lake Superior" to your actual
                        location, adjust the communication preferences to your style, and add anything else you want Gemini to
                        always know about you.
                    </p>
                </div>
            )
        },
        {
            title: "Paste & Save",
            icon: "✅",
            content: (
                <div>
                    <div style={{ fontSize: 16, lineHeight: 1.8, color: "#c8d0d8" }}>
                        <ol style={{ paddingLeft: 24, margin: 0 }}>
                            <li style={{ marginBottom: 12 }}>
                                Go back to your Gemini settings page
                            </li>
                            <li style={{ marginBottom: 12 }}>
                                <strong style={{ color: "#e8e8e8" }}>Paste</strong> the instructions you just copied into the text area
                            </li>
                            <li style={{ marginBottom: 12 }}>
                                <strong style={{ color: "#e8e8e8" }}>Edit</strong> it to match your actual details — change the location,
                                tweak the communication style, add anything personal
                            </li>
                            <li style={{ marginBottom: 12 }}>
                                Click <strong style={{ color: "#e8e8e8" }}>Save</strong>
                            </li>
                            <li>
                                <strong style={{ color: "#4ecdc4" }}>Test it!</strong> Start a new Gemini conversation and see if it
                                asks you for the framework template before diving in
                            </li>
                        </ol>
                    </div>
                    <div style={{
                        background: "rgba(78,205,196,0.08)",
                        border: "1px solid rgba(78,205,196,0.15)",
                        borderRadius: 12,
                        padding: "14px 18px",
                        fontSize: 14,
                        color: "#a0b8b8",
                        marginTop: 20
                    }}>
                        🎉 <strong>You're done!</strong> This is a one-time setup. Every new Gemini conversation
                        will now use your instructions automatically. Next, we'll set up your boat details.
                    </div>
                </div>
            )
        }
    ];

    return (
        <div style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(10, 22, 40, 0.97)",
            backdropFilter: "blur(20px)",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch"
        }}>
            <div style={{
                maxWidth: 700,
                margin: "0 auto",
                padding: "32px 24px 80px"
            }}>
                {/* Header */}
                <div style={{
                    marginBottom: 28
                }}>
                    <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background: "rgba(91,155,213,0.12)",
                        border: "1px solid rgba(91,155,213,0.25)",
                        padding: "4px 14px",
                        borderRadius: 20,
                        marginBottom: 14
                    }}>
                        <span style={{ fontSize: 10, color: "#5b9bd5" }}>●</span>
                        <span style={{ fontSize: 12, color: "#5b9bd5", fontWeight: 600 }}>
                            Step 0 — One-Time Setup
                        </span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <h2 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 28,
                                fontWeight: 700,
                                margin: "0 0 8px",
                                background: "linear-gradient(135deg, #fff, #5b9bd5)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}>
                                Set Up Your Gemini
                            </h2>
                            <p style={{ margin: 0, fontSize: 14, color: "#8899aa" }}>
                                Configure Gemini to work the way you want — for this project and all future ones
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section Tabs */}
                <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
                    {sections.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSection(i)}
                            style={{
                                flex: 1,
                                padding: "10px 8px",
                                borderRadius: 10,
                                border: `1px solid ${i === currentSection ? "#5b9bd5" + "50" : "rgba(255,255,255,0.08)"}`,
                                background: i === currentSection ? "rgba(91,155,213,0.12)" : "transparent",
                                color: i === currentSection ? "#5b9bd5" : i < currentSection ? "#4ecdc4" : "#667",
                                cursor: "pointer",
                                fontSize: 12,
                                fontWeight: 600,
                                transition: "all 0.2s ease",
                                textAlign: "center"
                            }}
                        >
                            <span style={{ fontSize: 18, display: "block", marginBottom: 4 }}>
                                {i < currentSection ? "✓" : s.icon}
                            </span>
                            {s.title.split(" ").slice(0, 2).join(" ")}
                        </button>
                    ))}
                </div>

                {/* Active Section */}
                <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 14,
                    padding: "24px",
                    marginBottom: 24
                }}>
                    <h3 style={{
                        fontSize: 20,
                        fontWeight: 700,
                        margin: "0 0 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: 10
                    }}>
                        <span>{sections[currentSection].icon}</span>
                        {sections[currentSection].title}
                    </h3>
                    {sections[currentSection].content}
                </div>

                {/* Navigation */}
                <div style={{ display: "flex", gap: 12 }}>
                    {currentSection > 0 && (
                        <button
                            onClick={() => setCurrentSection(prev => prev - 1)}
                            style={{
                                flex: 1,
                                padding: "14px",
                                borderRadius: 12,
                                border: "1px solid rgba(255,255,255,0.12)",
                                background: "rgba(255,255,255,0.05)",
                                color: "#aaa",
                                fontSize: 15,
                                fontWeight: 600,
                                cursor: "pointer"
                            }}
                        >
                            ← Back
                        </button>
                    )}
                    {currentSection < sections.length - 1 ? (
                        <button
                            onClick={() => setCurrentSection(prev => prev + 1)}
                            style={{
                                flex: 2,
                                padding: "14px",
                                borderRadius: 12,
                                border: "none",
                                background: "linear-gradient(135deg, #5b9bd5, #4a8ac4)",
                                color: "#fff",
                                fontSize: 15,
                                fontWeight: 700,
                                cursor: "pointer",
                                boxShadow: "0 4px 20px rgba(91,155,213,0.3)"
                            }}
                        >
                            Next →
                        </button>
                    ) : (
                        <button
                            onClick={onComplete}
                            style={{
                                flex: 2,
                                padding: "14px",
                                borderRadius: 12,
                                border: "none",
                                background: "linear-gradient(135deg, #4ecdc4, #2db5a8)",
                                color: "#0a1628",
                                fontSize: 15,
                                fontWeight: 700,
                                cursor: "pointer",
                                boxShadow: "0 4px 20px rgba(78,205,196,0.3)"
                            }}
                        >
                            ✓ Done — Set Up My Boat →
                        </button>
                    )}
                </div>

                {/* Skip */}
                <button
                    onClick={onSkip}
                    style={{
                        display: "block",
                        margin: "20px auto 0",
                        background: "none",
                        border: "none",
                        color: "#667",
                        fontSize: 13,
                        cursor: "pointer",
                        textDecoration: "underline",
                        textUnderlineOffset: 3
                    }}
                >
                    I already have Gemini set up — skip this step
                </button>
            </div>
        </div>
    );
}
