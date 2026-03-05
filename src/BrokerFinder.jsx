import { useState } from 'react';
import { CRITERIA } from './hooks/useBrokerData';

const DEFAULT_FIND_PROMPT = `I'm selling my [YEAR] [MAKE] [MODEL], [LENGTH] feet, located in [CITY], [STATE] on Lake Superior. I need help finding yacht brokers who specialize in selling large displacement vessels (40+ feet) in the Great Lakes region.

Please identify 5 brokers who:
1. Have experience selling vessels similar to mine (large cruisers/trawlers)
2. Operate in Wisconsin, Minnesota, or the broader Great Lakes area
3. Have active listings on YachtWorld or Boat Trader
4. Have been in business for at least 5 years

For each broker, please provide:
- Company name and primary contact
- Location and service area
- Types of vessels they typically handle
- Any notable recent sales of similar boats
- Their estimated commission rate if available`;

const DEFAULT_RESEARCH_PROMPT = `I'm considering hiring BROKER_NAME to help sell my [YEAR] [MAKE] [MODEL], [LENGTH] feet, located in [CITY], [STATE].

Please research this broker/brokerage in depth:
1. How long have they been in business?
2. Do they have experience with large displacement vessels (40+ feet)?
3. What marketing platforms do they use (YachtWorld, Boat Trader, social media)?
4. What is their typical commission structure?
5. Do they offer professional photography, virtual tours, or video marketing?
6. Can you find any client reviews or testimonials?
7. Do they understand seasonal selling patterns on the Great Lakes?
8. What is their geographic reach — local only or national/international?

Please be specific and cite sources when possible.`;

function CopyBtn({ text }) {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch { }
    };
    return (
        <button onClick={copy} style={{
            background: copied ? "rgba(78,205,196,0.15)" : "rgba(255,255,255,0.06)",
            border: `1px solid ${copied ? "rgba(78,205,196,0.4)" : "rgba(255,255,255,0.12)"}`,
            color: copied ? "#4ecdc4" : "#b8c4d0",
            padding: "8px 16px", borderRadius: 8, cursor: "pointer",
            fontSize: 13, fontWeight: 600, transition: "all 0.2s ease"
        }}>
            {copied ? "✓ Copied!" : "📋 Copy Prompt"}
        </button>
    );
}

function StarRating({ value, onChange }) {
    return (
        <div style={{ display: "flex", gap: 4 }}>
            {[1, 2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => onChange(n === value ? 0 : n)} style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: 22, padding: 2,
                    color: n <= value ? "#f5c542" : "#334",
                    transition: "color 0.15s ease"
                }}>★</button>
            ))}
        </div>
    );
}

export default function BrokerFinder({ onClose, fillPrompt, brokerHook }) {
    const [stage, setStage] = useState(1);
    const {
        brokers, rankedBrokers, activeBrokerCount,
        findPromptEdits, researchPromptEdits,
        updateBroker, updateScore,
        setFindPromptEdits, setResearchPromptEdits
    } = brokerHook;

    const findPrompt = fillPrompt(findPromptEdits || DEFAULT_FIND_PROMPT);
    const [editingFind, setEditingFind] = useState(false);
    const [editingResearch, setEditingResearch] = useState(false);
    const [selectedBroker, setSelectedBroker] = useState(null);

    const researchPromptFor = (brokerName) => {
        const base = researchPromptEdits || DEFAULT_RESEARCH_PROMPT;
        return fillPrompt(base.replace(/BROKER_NAME/g, brokerName || '[BROKER NAME]'));
    };

    const stageLabels = [
        { n: 1, label: "Find Brokers", icon: "🔍" },
        { n: 2, label: "Research", icon: "📊" },
        { n: 3, label: "Scorecard", icon: "🏆" }
    ];

    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.85)", display: "flex",
            alignItems: "center", justifyContent: "center",
            padding: 16
        }}>
            <div style={{
                background: "#0d1b2a", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16, width: "100%", maxWidth: 700,
                maxHeight: "90vh", overflow: "auto", padding: "28px 24px"
            }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, margin: 0 }}>
                            🔍 Broker Research & Ranking
                        </h2>
                        <p style={{ color: "#889", fontSize: 13, margin: "4px 0 0" }}>
                            Find the right broker to maximize your sale price
                        </p>
                    </div>
                    <button onClick={onClose} style={{
                        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                        color: "#aab", fontSize: 18, width: 36, height: 36, borderRadius: 10,
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
                    }}>✕</button>
                </div>

                {/* Stage nav */}
                <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                    {stageLabels.map(s => (
                        <button key={s.n} onClick={() => setStage(s.n)} style={{
                            flex: 1, padding: "10px 8px", borderRadius: 10, cursor: "pointer",
                            border: `1px solid ${stage === s.n ? "rgba(78,205,196,0.4)" : "rgba(255,255,255,0.08)"}`,
                            background: stage === s.n ? "rgba(78,205,196,0.08)" : "rgba(255,255,255,0.02)",
                            color: stage === s.n ? "#4ecdc4" : "#889",
                            fontSize: 13, fontWeight: 600, transition: "all 0.2s ease"
                        }}>
                            {s.icon} {s.label}
                        </button>
                    ))}
                </div>

                {/* Stage 1: Find Brokers */}
                {stage === 1 && (
                    <div>
                        <div style={{
                            background: "rgba(78,205,196,0.04)", border: "1px solid rgba(78,205,196,0.15)",
                            borderRadius: 12, padding: 16, marginBottom: 20
                        }}>
                            <p style={{ color: "#b8c4d0", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                                <strong style={{ color: "#e8e8e8" }}>Step 1:</strong> Copy this prompt to Gemini to find brokers in your area.
                                Your boat details are auto-filled. You can edit the prompt before copying.
                            </p>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#4ecdc4" }}>
                                Broker Search Prompt
                            </span>
                            <div style={{ display: "flex", gap: 8 }}>
                                <button onClick={() => setEditingFind(!editingFind)} style={{
                                    background: editingFind ? "rgba(245,197,66,0.1)" : "rgba(255,255,255,0.04)",
                                    border: `1px solid ${editingFind ? "rgba(245,197,66,0.3)" : "rgba(255,255,255,0.1)"}`,
                                    color: editingFind ? "#f5c542" : "#889",
                                    padding: "6px 12px", borderRadius: 6, cursor: "pointer",
                                    fontSize: 12, fontWeight: 600
                                }}>
                                    {editingFind ? "Done Editing" : "✏️ Edit"}
                                </button>
                                <CopyBtn text={findPrompt} />
                            </div>
                        </div>

                        {editingFind ? (
                            <textarea
                                value={findPromptEdits || DEFAULT_FIND_PROMPT}
                                onChange={e => setFindPromptEdits(e.target.value)}
                                style={{
                                    width: "100%", minHeight: 220, background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(245,197,66,0.3)", borderRadius: 10,
                                    color: "#e8e8e8", padding: 14, fontSize: 14, lineHeight: 1.6,
                                    fontFamily: "inherit", resize: "vertical"
                                }}
                            />
                        ) : (
                            <div style={{
                                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 10, padding: 14, fontSize: 14, lineHeight: 1.6,
                                color: "#b8c4d0", whiteSpace: "pre-wrap"
                            }}>
                                {findPrompt}
                            </div>
                        )}

                        <div style={{ marginTop: 24 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#4ecdc4", marginBottom: 12 }}>
                                Enter Brokers from Gemini's Results
                            </div>
                            {brokers.map((broker, i) => (
                                <div key={broker.id} style={{
                                    display: "flex", gap: 8, marginBottom: 8, alignItems: "center"
                                }}>
                                    <span style={{ color: "#556", fontSize: 14, fontWeight: 700, width: 20, textAlign: "center" }}>
                                        {i + 1}
                                    </span>
                                    <input
                                        placeholder="Broker / Agent name"
                                        value={broker.name}
                                        onChange={e => updateBroker(broker.id, 'name', e.target.value)}
                                        style={{
                                            flex: 1, background: "rgba(255,255,255,0.04)",
                                            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
                                            color: "#e8e8e8", padding: "10px 12px", fontSize: 14,
                                            fontFamily: "inherit"
                                        }}
                                    />
                                    <input
                                        placeholder="Company"
                                        value={broker.company}
                                        onChange={e => updateBroker(broker.id, 'company', e.target.value)}
                                        style={{
                                            flex: 1, background: "rgba(255,255,255,0.04)",
                                            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
                                            color: "#e8e8e8", padding: "10px 12px", fontSize: 14,
                                            fontFamily: "inherit"
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        <button onClick={() => setStage(2)} disabled={activeBrokerCount === 0} style={{
                            width: "100%", marginTop: 20, padding: "14px 0", borderRadius: 10,
                            background: activeBrokerCount > 0 ? "linear-gradient(135deg, #4ecdc4, #44b8a8)" : "rgba(255,255,255,0.05)",
                            border: "none", color: activeBrokerCount > 0 ? "#0a1628" : "#556",
                            fontSize: 15, fontWeight: 700, cursor: activeBrokerCount > 0 ? "pointer" : "default",
                            transition: "all 0.2s ease"
                        }}>
                            Research {activeBrokerCount || 'Your'} Broker{activeBrokerCount !== 1 ? 's' : ''} →
                        </button>
                    </div>
                )}

                {/* Stage 2: Research Each Broker */}
                {stage === 2 && (
                    <div>
                        <div style={{
                            background: "rgba(78,205,196,0.04)", border: "1px solid rgba(78,205,196,0.15)",
                            borderRadius: 12, padding: 16, marginBottom: 20
                        }}>
                            <p style={{ color: "#b8c4d0", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                                <strong style={{ color: "#e8e8e8" }}>Step 2:</strong> Run a research prompt for each broker.
                                Select a broker below, copy the prompt to Gemini, then mark them as researched.
                            </p>
                        </div>

                        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                            {brokers.filter(b => b.name.trim()).map(broker => (
                                <button key={broker.id} onClick={() => setSelectedBroker(broker.id)} style={{
                                    padding: "8px 14px", borderRadius: 8, cursor: "pointer",
                                    border: `1px solid ${selectedBroker === broker.id ? "rgba(78,205,196,0.4)" : "rgba(255,255,255,0.1)"}`,
                                    background: selectedBroker === broker.id ? "rgba(78,205,196,0.08)" : "rgba(255,255,255,0.03)",
                                    color: selectedBroker === broker.id ? "#4ecdc4" : "#b8c4d0",
                                    fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6
                                }}>
                                    {broker.researched && <span style={{ color: "#4ecdc4" }}>✓</span>}
                                    {broker.name}
                                </button>
                            ))}
                        </div>

                        {selectedBroker && (() => {
                            const broker = brokers.find(b => b.id === selectedBroker);
                            if (!broker) return null;
                            const prompt = researchPromptFor(broker.name);
                            return (
                                <div>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                        <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#4ecdc4" }}>
                                            Research Prompt for {broker.name}
                                        </span>
                                        <div style={{ display: "flex", gap: 8 }}>
                                            <button onClick={() => setEditingResearch(!editingResearch)} style={{
                                                background: editingResearch ? "rgba(245,197,66,0.1)" : "rgba(255,255,255,0.04)",
                                                border: `1px solid ${editingResearch ? "rgba(245,197,66,0.3)" : "rgba(255,255,255,0.1)"}`,
                                                color: editingResearch ? "#f5c542" : "#889",
                                                padding: "6px 12px", borderRadius: 6, cursor: "pointer",
                                                fontSize: 12, fontWeight: 600
                                            }}>
                                                {editingResearch ? "Done" : "✏️ Edit"}
                                            </button>
                                            <CopyBtn text={prompt} />
                                        </div>
                                    </div>

                                    {editingResearch ? (
                                        <textarea
                                            value={researchPromptEdits || DEFAULT_RESEARCH_PROMPT}
                                            onChange={e => setResearchPromptEdits(e.target.value)}
                                            style={{
                                                width: "100%", minHeight: 200, background: "rgba(255,255,255,0.03)",
                                                border: "1px solid rgba(245,197,66,0.3)", borderRadius: 10,
                                                color: "#e8e8e8", padding: 14, fontSize: 14, lineHeight: 1.6,
                                                fontFamily: "inherit", resize: "vertical"
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                                            borderRadius: 10, padding: 14, fontSize: 14, lineHeight: 1.6,
                                            color: "#b8c4d0", whiteSpace: "pre-wrap", maxHeight: 220, overflow: "auto"
                                        }}>
                                            {prompt}
                                        </div>
                                    )}

                                    <button
                                        onClick={() => updateBroker(broker.id, 'researched', !broker.researched)}
                                        style={{
                                            marginTop: 12, padding: "10px 20px", borderRadius: 8,
                                            background: broker.researched ? "rgba(78,205,196,0.1)" : "rgba(255,255,255,0.04)",
                                            border: `1px solid ${broker.researched ? "rgba(78,205,196,0.3)" : "rgba(255,255,255,0.1)"}`,
                                            color: broker.researched ? "#4ecdc4" : "#889",
                                            cursor: "pointer", fontSize: 13, fontWeight: 600
                                        }}
                                    >
                                        {broker.researched ? "✓ Researched" : "Mark as Researched"}
                                    </button>
                                </div>
                            );
                        })()}

                        <button onClick={() => setStage(3)} style={{
                            width: "100%", marginTop: 20, padding: "14px 0", borderRadius: 10,
                            background: "linear-gradient(135deg, #4ecdc4, #44b8a8)",
                            border: "none", color: "#0a1628",
                            fontSize: 15, fontWeight: 700, cursor: "pointer"
                        }}>
                            Rate & Rank Brokers →
                        </button>
                    </div>
                )}

                {/* Stage 3: Scorecard & Rankings */}
                {stage === 3 && (
                    <div>
                        {activeBrokerCount === 0 ? (
                            <div style={{ textAlign: "center", padding: 40, color: "#889" }}>
                                <p style={{ fontSize: 16 }}>No brokers entered yet.</p>
                                <button onClick={() => setStage(1)} style={{
                                    marginTop: 12, padding: "10px 20px", borderRadius: 8,
                                    background: "rgba(78,205,196,0.1)", border: "1px solid rgba(78,205,196,0.3)",
                                    color: "#4ecdc4", cursor: "pointer", fontSize: 14, fontWeight: 600
                                }}>← Go to Step 1</button>
                            </div>
                        ) : (
                            <>
                                {/* Scorecard */}
                                <div style={{
                                    background: "rgba(78,205,196,0.04)", border: "1px solid rgba(78,205,196,0.15)",
                                    borderRadius: 12, padding: 16, marginBottom: 20
                                }}>
                                    <p style={{ color: "#b8c4d0", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                                        <strong style={{ color: "#e8e8e8" }}>Step 3:</strong> Rate each broker on a 1-5 star scale
                                        for each criterion below. Rankings are calculated automatically.
                                    </p>
                                </div>

                                {brokers.filter(b => b.name.trim()).map(broker => (
                                    <div key={broker.id} style={{
                                        background: "rgba(255,255,255,0.02)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        borderRadius: 12, padding: 16, marginBottom: 16
                                    }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                                            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#e8e8e8" }}>
                                                {broker.name}
                                                {broker.company && <span style={{ color: "#889", fontWeight: 400 }}> — {broker.company}</span>}
                                            </h3>
                                            <span style={{ fontSize: 13, fontWeight: 700, color: "#4ecdc4" }}>
                                                {Object.values(broker.scores).reduce((a, b) => a + b, 0)}/30
                                            </span>
                                        </div>

                                        {CRITERIA.map(c => (
                                            <div key={c.key} style={{
                                                display: "flex", justifyContent: "space-between", alignItems: "center",
                                                padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)"
                                            }}>
                                                <div>
                                                    <div style={{ fontSize: 13, fontWeight: 600, color: "#c8d0d8" }}>{c.label}</div>
                                                    <div style={{ fontSize: 11, color: "#667" }}>{c.description}</div>
                                                </div>
                                                <StarRating
                                                    value={broker.scores[c.key]}
                                                    onChange={v => updateScore(broker.id, c.key, v)}
                                                />
                                            </div>
                                        ))}

                                        <textarea
                                            placeholder="Your notes about this broker..."
                                            value={broker.notes}
                                            onChange={e => updateBroker(broker.id, 'notes', e.target.value)}
                                            style={{
                                                width: "100%", marginTop: 12, minHeight: 60,
                                                background: "rgba(255,255,255,0.03)",
                                                border: "1px solid rgba(255,255,255,0.08)",
                                                borderRadius: 8, color: "#b8c4d0", padding: 10,
                                                fontSize: 13, lineHeight: 1.5, fontFamily: "inherit", resize: "vertical"
                                            }}
                                        />
                                    </div>
                                ))}

                                {/* Rankings */}
                                {rankedBrokers.length > 0 && rankedBrokers.some(b => b.totalScore > 0) && (
                                    <div style={{ marginTop: 24 }}>
                                        <div style={{
                                            fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                                            letterSpacing: 1.5, color: "#f5c542", marginBottom: 12
                                        }}>
                                            🏆 Your Rankings
                                        </div>
                                        {rankedBrokers.filter(b => b.totalScore > 0).map(broker => (
                                            <div key={broker.id} style={{
                                                background: broker.rank === 1
                                                    ? "rgba(245,197,66,0.06)"
                                                    : "rgba(255,255,255,0.02)",
                                                border: `1px solid ${broker.rank === 1
                                                    ? "rgba(245,197,66,0.25)"
                                                    : "rgba(255,255,255,0.06)"}`,
                                                borderRadius: 10, padding: 14, marginBottom: 10
                                            }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                        <span style={{
                                                            fontSize: 20, fontWeight: 800,
                                                            color: broker.rank === 1 ? "#f5c542"
                                                                : broker.rank === 2 ? "#c0c0c0"
                                                                    : broker.rank === 3 ? "#cd7f32" : "#889"
                                                        }}>
                                                            #{broker.rank}
                                                        </span>
                                                        <span style={{ fontSize: 15, fontWeight: 700, color: "#e8e8e8" }}>
                                                            {broker.name}
                                                        </span>
                                                    </div>
                                                    <span style={{ fontSize: 14, fontWeight: 700, color: "#4ecdc4" }}>
                                                        {broker.totalScore}/30
                                                    </span>
                                                </div>
                                                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#a0aab4" }}>
                                                    {broker.explanation}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
