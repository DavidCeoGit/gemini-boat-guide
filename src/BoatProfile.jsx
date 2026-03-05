import { useState } from "react";

const FIELDS = [
    { key: "year", label: "Year", placeholder: "e.g. 2018", type: "text", width: "half" },
    { key: "make", label: "Make", placeholder: "e.g. Sea Ray", type: "text", width: "half" },
    { key: "model", label: "Model", placeholder: "e.g. 350 Sundancer", type: "text", width: "half" },
    { key: "length", label: "Length (feet)", placeholder: "e.g. 35", type: "text", width: "half" },
    { key: "engineType", label: "Engine Type", placeholder: "e.g. Twin Mercruiser diesel", type: "text", width: "full" },
    { key: "engineHours", label: "Engine Hours", placeholder: "e.g. 400", type: "text", width: "half" },
    { key: "condition", label: "Condition", type: "select", width: "half", options: ["", "Excellent", "Good", "Fair"] },
    { key: "city", label: "City", placeholder: "e.g. Fort Lauderdale", type: "text", width: "half" },
    { key: "state", label: "State", placeholder: "e.g. FL", type: "text", width: "half" },
    { key: "features", label: "Key Features & Upgrades", placeholder: "e.g. New canvas, updated GPS, generator, air conditioning...", type: "textarea", width: "full" },
    { key: "maintenance", label: "Recent Maintenance", placeholder: "e.g. Bottom paint 2024, engine service Jan 2025...", type: "textarea", width: "full" },
    { key: "askingPrice", label: "Asking Price ($)", placeholder: "e.g. 185000", type: "text", width: "half" },
    { key: "documented", label: "Coast Guard Documented?", type: "select", width: "half", options: ["", "yes", "no"] }
];

const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.05)",
    color: "#e8e8e8",
    fontSize: 15,
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box"
};

const labelStyle = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#8899aa",
    marginBottom: 6,
    letterSpacing: 0.3
};

export default function BoatProfile({ profile, updateField, onClose, onDone }) {
    const [activeField, setActiveField] = useState(null);

    const filledCount = Object.entries(profile).filter(([k, v]) => v && v.trim()).length;
    const totalFields = FIELDS.length;

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
                maxWidth: 680,
                margin: "0 auto",
                padding: "32px 24px 80px"
            }}>
                {/* Header */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 8
                }}>
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
                            🚤 Your Boat Details
                        </h2>
                        <p style={{ margin: 0, fontSize: 14, color: "#8899aa" }}>
                            Fill this in once — all prompts will auto-customize with your info
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "#aaa",
                            width: 40, height: 40,
                            borderRadius: 10,
                            cursor: "pointer",
                            fontSize: 18,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Progress */}
                <div style={{
                    fontSize: 12,
                    color: "#667",
                    marginBottom: 24
                }}>
                    {filledCount} of {totalFields} fields filled
                    <div style={{
                        marginTop: 6,
                        height: 3,
                        borderRadius: 2,
                        background: "rgba(255,255,255,0.08)",
                        overflow: "hidden"
                    }}>
                        <div style={{
                            height: "100%",
                            width: `${(filledCount / totalFields) * 100}%`,
                            background: "#5b9bd5",
                            borderRadius: 2,
                            transition: "width 0.4s ease"
                        }} />
                    </div>
                </div>

                {/* Form Fields */}
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 16
                }}>
                    {FIELDS.map(field => (
                        <div key={field.key} style={{
                            width: field.width === "full" ? "100%" : "calc(50% - 8px)",
                            minWidth: 200
                        }}>
                            <label style={labelStyle}>{field.label}</label>

                            {field.type === "select" ? (
                                <select
                                    value={profile[field.key] || ""}
                                    onChange={e => updateField(field.key, e.target.value)}
                                    style={{
                                        ...inputStyle,
                                        cursor: "pointer",
                                        appearance: "none",
                                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M2 4l4 4 4-4'/%3E%3C/svg%3E\")",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "right 12px center"
                                    }}
                                >
                                    <option value="" style={{ background: "#1a2640" }}>Select...</option>
                                    {field.options.filter(Boolean).map(opt => (
                                        <option key={opt} value={opt} style={{ background: "#1a2640" }}>
                                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            ) : field.type === "textarea" ? (
                                <textarea
                                    value={profile[field.key] || ""}
                                    onChange={e => updateField(field.key, e.target.value)}
                                    onFocus={() => setActiveField(field.key)}
                                    onBlur={() => setActiveField(null)}
                                    placeholder={field.placeholder}
                                    rows={3}
                                    style={{
                                        ...inputStyle,
                                        resize: "vertical",
                                        minHeight: 72,
                                        borderColor: activeField === field.key ? "#5b9bd5" : "rgba(255,255,255,0.12)"
                                    }}
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={profile[field.key] || ""}
                                    onChange={e => updateField(field.key, e.target.value)}
                                    onFocus={() => setActiveField(field.key)}
                                    onBlur={() => setActiveField(null)}
                                    placeholder={field.placeholder}
                                    style={{
                                        ...inputStyle,
                                        borderColor: activeField === field.key ? "#5b9bd5" : "rgba(255,255,255,0.12)"
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Done Button */}
                <button
                    onClick={onDone || onClose}
                    style={{
                        width: "100%",
                        marginTop: 28,
                        padding: "16px",
                        borderRadius: 12,
                        border: "none",
                        background: "linear-gradient(135deg, #5b9bd5, #4a8ac4)",
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        boxShadow: "0 4px 20px rgba(91,155,213,0.3)"
                    }}
                >
                    {filledCount > 0 ? "✓ Save & Continue" : "Skip for Now →"}
                </button>

                <p style={{
                    textAlign: "center",
                    fontSize: 12,
                    color: "#556",
                    marginTop: 12
                }}>
                    You can edit these details anytime using the 🚤 button in the header
                </p>
            </div>
        </div>
    );
}
