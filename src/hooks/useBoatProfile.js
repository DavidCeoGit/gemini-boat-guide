import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'gemini-boat-guide-boat-profile';

const DEFAULT_PROFILE = {
    year: '',
    make: '',
    model: '',
    length: '',
    engineType: '',
    engineHours: '',
    condition: '',
    city: '',
    state: '',
    features: '',
    maintenance: '',
    askingPrice: '',
    documented: ''
};

function loadProfile() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function saveProfile(profile) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch { }
}

export default function useBoatProfile() {
    const [profile, setProfile] = useState(() => loadProfile() || { ...DEFAULT_PROFILE });
    const [hasProfile, setHasProfile] = useState(() => {
        const saved = loadProfile();
        return saved && (saved.year || saved.make || saved.model);
    });

    useEffect(() => {
        saveProfile(profile);
        setHasProfile(!!(profile.year || profile.make || profile.model));
    }, [profile]);

    const updateField = useCallback((field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    }, []);

    const resetProfile = useCallback(() => {
        setProfile({ ...DEFAULT_PROFILE });
        try { localStorage.removeItem(STORAGE_KEY); } catch { }
    }, []);

    // Replace [BRACKETED] placeholders with real boat data
    const fillPrompt = useCallback((template) => {
        let result = template;
        const replacements = [
            [/\[YEAR\]/gi, profile.year],
            [/\[MAKE\]/gi, profile.make],
            [/\[MODEL\]/gi, profile.model],
            [/\[LENGTH\]/gi, profile.length ? `${profile.length}` : ''],
            [/\[XX\] feet/gi, profile.length ? `${profile.length} feet` : '[XX] feet'],
            [/\[ENGINE HOURS\]/gi, profile.engineHours],
            [/\[XX\] hours/gi, profile.engineHours ? `${profile.engineHours} hours` : '[XX] hours'],
            [/\[DETAILS\]/gi, profile.engineType],
            [/\[ENGINE DETAILS\]/gi, profile.engineType],
            [/\[CITY, STATE\]/gi, (profile.city && profile.state) ? `${profile.city}, ${profile.state}` : ''],
            [/\[CITY\]/gi, profile.city],
            [/\[STATE\]/gi, profile.state],
            [/\[YOUR STATE\]/gi, profile.state],
            [/\[good\/fair\/excellent\]/gi, profile.condition ? profile.condition.toLowerCase() : ''],
            [/\[PRICE\]/gi, profile.askingPrice],
            [/\$\[PRICE\]/gi, profile.askingPrice ? `$${profile.askingPrice}` : '$[PRICE]'],
            [/\[BOAT DETAILS\]/gi, [profile.year, profile.make, profile.model].filter(Boolean).join(' ')],
            [/\[LIST YOUR BEST FEATURES\]/gi, profile.features || '[LIST YOUR BEST FEATURES]'],
            [/\[LIST UPGRADES\]/gi, profile.features || '[LIST UPGRADES]'],
            [/\[ANY RECENT WORK\]/gi, profile.maintenance || '[ANY RECENT WORK]'],
            [/\[is\/is not\]/gi, profile.documented === 'yes' ? 'is' : profile.documented === 'no' ? 'is not' : '[is/is not]'],
            [/\[has\/doesn't have\]/gi, '[has/doesn\'t have]'],
        ];

        for (const [pattern, value] of replacements) {
            if (value) {
                result = result.replace(pattern, value);
            }
        }
        return result;
    }, [profile]);

    // Generate Layer 2 first-message template for Gemini conversations
    const generateFirstMessage = useCallback(() => {
        const parts = [];
        parts.push("I'm selling my boat and need your help. Here are my boat's details:\n");
        if (profile.year || profile.make || profile.model) {
            parts.push(`**Boat:** ${[profile.year, profile.make, profile.model].filter(Boolean).join(' ')}`);
        }
        if (profile.length) parts.push(`**Length:** ${profile.length} feet`);
        if (profile.engineType) parts.push(`**Engines:** ${profile.engineType}`);
        if (profile.engineHours) parts.push(`**Engine Hours:** ${profile.engineHours}`);
        if (profile.condition) parts.push(`**Condition:** ${profile.condition}`);
        if (profile.city || profile.state) {
            parts.push(`**Location:** ${[profile.city, profile.state].filter(Boolean).join(', ')}`);
        }
        if (profile.features) parts.push(`**Key Features:** ${profile.features}`);
        if (profile.maintenance) parts.push(`**Recent Maintenance:** ${profile.maintenance}`);
        if (profile.askingPrice) parts.push(`**Asking Price:** $${profile.askingPrice}`);
        if (profile.documented) parts.push(`**Coast Guard Documented:** ${profile.documented === 'yes' ? 'Yes' : 'No'}`);
        parts.push("\nPlease keep this information in mind for all your responses in this conversation.");
        return parts.join('\n');
    }, [profile]);

    return {
        profile,
        hasProfile,
        updateField,
        resetProfile,
        fillPrompt,
        generateFirstMessage
    };
}
