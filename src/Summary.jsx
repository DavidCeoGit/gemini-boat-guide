import { useState } from "react";

const PHASES = ["Getting Started", "Pricing Research", "Where to Sell", "Your Listing", "Legal & Paperwork"];
const PHASE_COLORS = {
    "Getting Started": { bg: "#1a3a4a", accent: "#4ecdc4", light: "#e8f8f5" },
    "Pricing Research": { bg: "#2d3a1a", accent: "#a8c256", light: "#f0f5e0" },
    "Where to Sell": { bg: "#3a1a2d", accent: "#d4789c", light: "#fae8f0" },
    "Your Listing": { bg: "#1a2a3a", accent: "#5b9bd5", light: "#e4eef8" },
    "Legal & Paperwork": { bg: "#3a2a1a", accent: "#d4a054", light: "#faf0e0" }
};

function CopyAllButton({ steps }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const text = steps.map((s, i) =>
            `--- Step ${i + 1}: ${s.title} (${s.phase}) ---\n\n${s.example.prompt}`
        ).join("\n\n\n");

        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        });
    };

    return (
        <button onClick={handleCopy} style={{
            flex: 1,
            padding: "14px 20px",
            borderRadius: 12,
            border: copied ? "1px solid #4ecdc4" : "1px solid rgba(255,255,255,0.15)",
            background: copied ? "rgba(78, 205, 196, 0.15)" : "rgba(255,255,255,0.05)",
            color: copied ? "#4ecdc4" : "#ccc",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8
        }}>
            {copied ? "✓ All Prompts Copied!" : "📋 Copy All Prompts"}
        </button>
    );
}

export default function Summary({ steps, completedSteps, onClose, onReset }) {
    const completionPercent = Math.round((completedSteps.size / steps.length) * 100);

    // Group steps by phase
    const phaseGroups = PHASES.map(phase => ({
        phase,
        color: PHASE_COLORS[phase],
        steps: steps
            .map((s, i) => ({ ...s, index: i }))
            .filter(s => s.phase === phase)
    }));

    return (
        <div style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(10, 22, 40, 0.95)",
            backdropFilter: "blur(20px)",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch"
        }}>
            <div style={{
                maxWidth: 700,
                margin: "0 auto",
                padding: "32px 24px 120px"
            }}>
                {/* Header */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 32
                }}>
                    <div>
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 28,
                            fontWeight: 700,
                            margin: "0 0 8px",
                            background: "linear-gradient(135deg, #fff, #4ecdc4)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>
                            📊 Your Progress
                        </h2>
                        <p style={{ margin: 0, fontSize: 14, color: "#8899aa" }}>
                            {completedSteps.size} of {steps.length} steps completed
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "#aaa",
                            width: 40,
                            height: 40,
                            borderRadius: 10,
                            cursor: "pointer",
                            fontSize: 18,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s ease"
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Overall Progress Ring */}
                <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16,
                    padding: "24px",
                    marginBottom: 28,
                    display: "flex",
                    alignItems: "center",
                    gap: 24
                }}>
                    <div style={{ position: "relative", width: 80, height: 80, flexShrink: 0 }}>
                        <svg width="80" height="80" viewBox="0 0 80 80">
                            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                            <circle
                                cx="40" cy="40" r="34" fill="none"
                                stroke="#4ecdc4"
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 34}`}
                                strokeDashoffset={`${2 * Math.PI * 34 * (1 - completionPercent / 100)}`}
                                transform="rotate(-90 40 40)"
                                style={{ transition: "stroke-dashoffset 0.6s ease" }}
                            />
                        </svg>
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 18,
                            fontWeight: 700,
                            color: "#4ecdc4"
                        }}>
                            {completionPercent}%
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                            {completionPercent === 100
                                ? "🎉 All done! You're ready to sell!"
                                : completionPercent >= 50
                                    ? "Great progress! Keep going!"
                                    : "Just getting started — you've got this!"}
                        </div>
                        <div style={{ fontSize: 13, color: "#8899aa" }}>
                            Mark steps as complete using the ✓ button on each step
                        </div>
                    </div>
                </div>

                {/* Phase Checklist */}
                {phaseGroups.map(({ phase, color, steps: phaseSteps }) => (
                    <div key={phase} style={{ marginBottom: 20 }}>
                        <div style={{
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: 1.5,
                            color: color.accent,
                            marginBottom: 10,
                            paddingLeft: 4
                        }}>
                            {phase}
                        </div>
                        <div style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: 12,
                            overflow: "hidden"
                        }}>
                            {phaseSteps.map((step, si) => {
                                const isComplete = completedSteps.has(step.index);
                                return (
                                    <div key={step.index} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 12,
                                        padding: "12px 16px",
                                        borderTop: si > 0 ? "1px solid rgba(255,255,255,0.04)" : "none"
                                    }}>
                                        <span style={{
                                            width: 24, height: 24,
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 12,
                                            fontWeight: 700,
                                            background: isComplete ? `${color.accent}30` : "rgba(255,255,255,0.06)",
                                            color: isComplete ? color.accent : "#556",
                                            transition: "all 0.3s ease",
                                            flexShrink: 0
                                        }}>
                                            {isComplete ? "✓" : step.index + 1}
                                        </span>
                                        <span style={{
                                            fontSize: 14,
                                            color: isComplete ? "#e8e8e8" : "#889",
                                            textDecoration: isComplete ? "none" : "none",
                                            transition: "color 0.3s ease",
                                            flex: 1
                                        }}>
                                            {step.icon} {step.title}
                                        </span>
                                        {isComplete && (
                                            <span style={{ fontSize: 11, color: color.accent, fontWeight: 600 }}>
                                                Done
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Action Buttons */}
                <div style={{
                    display: "flex",
                    gap: 12,
                    marginTop: 28,
                    flexWrap: "wrap"
                }}>
                    <CopyAllButton steps={steps} />
                    <button
                        onClick={() => window.print()}
                        style={{
                            flex: 1,
                            padding: "14px 20px",
                            borderRadius: 12,
                            border: "1px solid rgba(255,255,255,0.15)",
                            background: "rgba(255,255,255,0.05)",
                            color: "#ccc",
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8
                        }}
                    >
                        🖨️ Print Guide
                    </button>
                </div>

                {/* Reset */}
                <div style={{
                    marginTop: 40,
                    paddingTop: 20,
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    textAlign: "center"
                }}>
                    <button
                        onClick={() => {
                            if (window.confirm("Reset all progress? This cannot be undone.")) {
                                onReset();
                                onClose();
                            }
                        }}
                        style={{
                            background: "none",
                            border: "1px solid rgba(255,100,100,0.2)",
                            color: "#c66",
                            padding: "8px 20px",
                            borderRadius: 8,
                            cursor: "pointer",
                            fontSize: 13,
                            fontWeight: 500,
                            transition: "all 0.2s ease"
                        }}
                    >
                        🗑️ Reset All Progress
                    </button>
                </div>
            </div>
        </div>
    );
}
