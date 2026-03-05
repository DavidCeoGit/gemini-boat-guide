import { useState } from 'react';

const PHASE_COLORS = {
    "Getting Started": { accent: "#4ecdc4", bg: "rgba(78,205,196,0.08)" },
    "Pricing Research": { accent: "#5b9bd5", bg: "rgba(91,155,213,0.08)" },
    "Where to Sell": { accent: "#e8917a", bg: "rgba(232,145,122,0.08)" },
    "Your Listing": { accent: "#c084fc", bg: "rgba(192,132,252,0.08)" },
    "Legal & Paperwork": { accent: "#4ecdc4", bg: "rgba(78,205,196,0.08)" }
};

export default function Timeline({ steps, completedSteps, currentStep, onGoTo, onClose }) {
    const phases = [...new Set(steps.map(s => s.phase))];

    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(8px)"
        }} onClick={onClose}>
            <div style={{
                background: "#0d1b30",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                width: "90%", maxWidth: 700, maxHeight: "85vh",
                overflow: "auto", padding: "32px 28px"
            }} onClick={e => e.stopPropagation()}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <h2 style={{ margin: 0, fontSize: 22, fontFamily: "'Playfair Display', serif" }}>
                        📋 Your Journey Timeline
                    </h2>
                    <button onClick={onClose} style={{
                        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                        color: "#889", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 18
                    }}>✕</button>
                </div>

                <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    background: "rgba(78,205,196,0.06)", border: "1px solid rgba(78,205,196,0.15)",
                    borderRadius: 12, padding: "12px 16px", marginBottom: 28
                }}>
                    <span style={{ color: "#4ecdc4", fontWeight: 600 }}>
                        {completedSteps.size}/{steps.length} Steps Complete
                    </span>
                    <span style={{ color: "#889", fontSize: 13 }}>
                        {Math.round((completedSteps.size / steps.length) * 100)}% done
                    </span>
                </div>

                {phases.map(phase => {
                    const pc = PHASE_COLORS[phase] || { accent: "#4ecdc4", bg: "rgba(78,205,196,0.08)" };
                    const phaseSteps = steps.map((s, i) => ({ ...s, idx: i })).filter(s => s.phase === phase);
                    const phaseComplete = phaseSteps.every(s => completedSteps.has(s.idx));

                    return (
                        <div key={phase} style={{ marginBottom: 24 }}>
                            <div style={{
                                fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                                letterSpacing: 1.5, color: pc.accent, marginBottom: 10,
                                display: "flex", alignItems: "center", gap: 8
                            }}>
                                {phaseComplete ? "✅" : "🔵"} {phase}
                            </div>
                            {phaseSteps.map(s => {
                                const done = completedSteps.has(s.idx);
                                const isCurrent = s.idx === currentStep;
                                return (
                                    <button key={s.idx} onClick={() => { onGoTo(s.idx); onClose(); }} style={{
                                        width: "100%", textAlign: "left",
                                        display: "flex", alignItems: "center", gap: 14,
                                        background: isCurrent ? `${pc.accent}15` : "rgba(255,255,255,0.02)",
                                        border: `1px solid ${isCurrent ? `${pc.accent}40` : "rgba(255,255,255,0.06)"}`,
                                        borderRadius: 10, padding: "12px 16px", marginBottom: 6,
                                        cursor: "pointer", transition: "all 0.2s ease", color: "#e8e8e8"
                                    }}>
                                        <span style={{
                                            width: 28, height: 28, borderRadius: "50%",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 14, flexShrink: 0,
                                            background: done ? `${pc.accent}25` : "rgba(255,255,255,0.05)",
                                            color: done ? pc.accent : "#556"
                                        }}>
                                            {done ? "✓" : s.idx + 1}
                                        </span>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 14, fontWeight: 600 }}>
                                                {s.icon} {s.title}
                                            </div>
                                            <div style={{ fontSize: 12, color: "#778", marginTop: 2 }}>
                                                {s.subtitle || s.why?.slice(0, 60) + "..."}
                                            </div>
                                        </div>
                                        {isCurrent && (
                                            <span style={{
                                                fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                                                color: pc.accent, background: `${pc.accent}15`,
                                                padding: "3px 8px", borderRadius: 6
                                            }}>Current</span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
