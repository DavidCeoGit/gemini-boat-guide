export default function Welcome({ onStart, onSkip, steps }) {

    const downloadChecklist = () => {
        const stepsData = steps || [
            { phase: "Getting Started", title: "Setting Up Google Gemini", icon: "⚓", why: "Get set up with Gemini — Google's free AI assistant." },
            { phase: "Getting Started", title: "How to Talk to Gemini", icon: "💬", why: "Learn how to ask great questions to get great answers." },
            { phase: "Pricing Research", title: "Finding Your Boat's Market Value", icon: "💰", why: "Research comparable sales and get a realistic price range." },
            { phase: "Pricing Research", title: "Understanding Pricing Factors", icon: "📊", why: "Learn what factors affect your boat's value." },
            { phase: "Where to Sell", title: "Choosing Your Sales Channels", icon: "🌐", why: "Pick the right platforms to reach the right buyers." },
            { phase: "Where to Sell", title: "Broker vs. Private Sale", icon: "🤝", why: "Decide whether a broker or private sale is best for you." },
            { phase: "Your Listing", title: "Writing a Compelling Listing", icon: "✍️", why: "Create an ad that grabs attention and sells." },
            { phase: "Your Listing", title: "Photo & Presentation Tips", icon: "📸", why: "Take photos that make your boat look its best." },
            { phase: "Legal & Paperwork", title: "Required Documents & Transfers", icon: "📋", why: "Get all your paperwork in order before closing." },
            { phase: "Legal & Paperwork", title: "Protecting Yourself in the Sale", icon: "🛡️", why: "Stay safe from scams and protect yourself legally." }
        ];

        const phases = [...new Set(stepsData.map(s => s.phase))];
        const phaseColors = {
            "Getting Started": "#0d8a7f",
            "Pricing Research": "#7a9b2e",
            "Where to Sell": "#b84d7a",
            "Your Listing": "#3d7ab8",
            "Legal & Paperwork": "#b8862e"
        };

        const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/>
<title>Boat Selling Checklist — Print & Check Off</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', Arial, sans-serif; max-width: 700px; margin: 40px auto; padding: 0 24px; color: #1a2a3a; }
h1 { font-size: 26px; margin-bottom: 4px; }
.subtitle { color: #667; font-size: 14px; margin-bottom: 24px; }
.phase { margin-bottom: 24px; }
.phase-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px; padding-bottom: 4px; border-bottom: 2px solid currentColor; }
.step { display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; border-bottom: 1px solid #e0e4e8; }
.checkbox { width: 22px; height: 22px; border: 2px solid #aab; border-radius: 4px; flex-shrink: 0; margin-top: 2px; }
.step-num { font-size: 12px; font-weight: 700; color: #889; width: 20px; flex-shrink: 0; margin-top: 3px; }
.step-info { flex: 1; }
.step-title { font-size: 15px; font-weight: 600; margin-bottom: 2px; }
.step-desc { font-size: 12px; color: #667; line-height: 1.4; }
.notes-line { border-bottom: 1px dotted #ccc; height: 20px; margin-top: 4px; }
.warning { background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 12px 16px; margin-bottom: 24px; font-size: 13px; color: #664d03; }
.warning strong { display: block; margin-bottom: 4px; }
.footer { margin-top: 32px; padding-top: 16px; border-top: 2px solid #e0e4e8; font-size: 12px; color: #889; text-align: center; }
@media print { body { margin: 20px; } .warning { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
</style>
</head><body>
<h1>⛵ My Boat Selling Checklist</h1>
<p class="subtitle">Powered by Gemini AI — Print this out and check off each step as you complete it</p>

<div class="warning">
    <strong>⚠️ Important: Bookmark & Browser Reminder</strong>
    Your saved data (boat profile, notes, responses) is stored in YOUR browser on THIS computer. 
    If you open this guide in a different browser or a different computer, you'll start fresh. 
    <strong style="margin-top:6px;">Stick with the same browser on the same computer to keep all your work.</strong>
</div>

${phases.map(phase => {
            const color = phaseColors[phase] || "#333";
            const phaseSteps = stepsData.filter(s => s.phase === phase);
            const startIdx = stepsData.indexOf(phaseSteps[0]);
            return `<div class="phase">
        <div class="phase-title" style="color:${color}">${phase}</div>
        ${phaseSteps.map((s, i) => `<div class="step">
            <div class="checkbox"></div>
            <div class="step-num">${startIdx + i + 1}</div>
            <div class="step-info">
                <div class="step-title">${s.icon} ${s.title}</div>
                <div class="step-desc">${s.why.length > 120 ? s.why.slice(0, 120) + '...' : s.why}</div>
                <div class="notes-line"></div>
            </div>
        </div>`).join('')}
    </div>`;
        }).join('')}

<div class="footer">
    Generated on ${new Date().toLocaleDateString()} • gemini-boat-guide • 10 Steps to Selling Your Boat
</div>
</body></html>`;

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    };

    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 10000,
            background: "linear-gradient(135deg, #0a1628 0%, #0d2240 50%, #0a1628 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Inter', sans-serif",
            overflow: "auto"
        }}>
            {/* Ambient glow */}
            <div style={{
                position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)",
                width: 500, height: 400,
                background: "radial-gradient(ellipse, rgba(78,205,196,0.12) 0%, transparent 70%)",
                pointerEvents: "none"
            }} />

            <div style={{
                textAlign: "center", maxWidth: 520, padding: "32px 28px",
                position: "relative", zIndex: 1
            }}>
                <div style={{ fontSize: 56, marginBottom: 12 }}>⛵</div>
                <h1 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 30, fontWeight: 700, margin: "0 0 8px",
                    background: "linear-gradient(135deg, #fff, #4ecdc4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}>
                    Sell Your Boat with Gemini
                </h1>
                <p style={{ color: "#8899aa", fontSize: 15, lineHeight: 1.6, margin: "0 0 24px" }}>
                    A step-by-step guide that uses Google's AI to help you price, list, and sell your boat for maximum value.
                </p>

                <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10,
                    marginBottom: 20, textAlign: "left"
                }}>
                    {[
                        { icon: "🎯", text: "10 guided steps from setup to closing" },
                        { icon: "🤖", text: "AI prompts auto-filled with your boat" },
                        { icon: "📝", text: "Save notes & Gemini responses" },
                        { icon: "🔍", text: "Research & rank brokers" }
                    ].map((item, i) => (
                        <div key={i} style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: 10, padding: "10px 12px",
                            display: "flex", alignItems: "center", gap: 9
                        }}>
                            <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                            <span style={{ fontSize: 12, color: "#a0b0b8", lineHeight: 1.4 }}>{item.text}</span>
                        </div>
                    ))}
                </div>

                {/* ⚠️ Browser Warning */}
                <div style={{
                    background: "rgba(255,193,7,0.08)",
                    border: "1px solid rgba(255,193,7,0.3)",
                    borderRadius: 10, padding: "12px 16px",
                    marginBottom: 20, textAlign: "left"
                }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#ffc107", marginBottom: 4 }}>
                        ⚠️ Important — Read This First
                    </div>
                    <div style={{ fontSize: 12, color: "#b0a060", lineHeight: 1.5 }}>
                        Your data (boat profile, notes, saved responses) is stored in <strong style={{ color: "#d4b040" }}>this browser on this computer</strong>.
                        If you switch to a different browser or computer, you'll need to start over.
                        <strong style={{ color: "#d4b040" }}>Always use the same browser.</strong>
                    </div>
                </div>

                <button onClick={onStart} style={{
                    width: "100%", padding: "14px",
                    borderRadius: 12, border: "none",
                    background: "linear-gradient(135deg, #4ecdc4, #2db5a8)",
                    color: "#0a1628", fontSize: 16, fontWeight: 700,
                    cursor: "pointer", marginBottom: 10,
                    boxShadow: "0 4px 24px rgba(78,205,196,0.25)",
                    transition: "all 0.2s ease"
                }}>
                    Get Started — It's Free →
                </button>

                <button onClick={downloadChecklist} style={{
                    width: "100%", padding: "12px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.04)",
                    color: "#a0b0b8", fontSize: 14, fontWeight: 600,
                    cursor: "pointer", marginBottom: 10,
                    transition: "all 0.2s ease"
                }}>
                    📋 Download Printable Checklist (PDF-ready)
                </button>

                <button onClick={onSkip} style={{
                    background: "none", border: "none",
                    color: "#556677", fontSize: 12,
                    cursor: "pointer", padding: "6px"
                }}>
                    I've used this before — skip intro
                </button>
            </div>
        </div>
    );
}
