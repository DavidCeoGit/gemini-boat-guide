import { useState, useCallback, useMemo } from 'react';

const STORAGE_KEY = 'gemini-boat-guide-brokers';

const CRITERIA = [
    { key: 'vesselExperience', label: 'Large-Vessel Experience', description: 'Have they sold boats like yours (40ft+ cruisers/trawlers)?' },
    { key: 'marketKnowledge', label: 'Great Lakes Market Knowledge', description: 'Do they understand seasonal timing, regional buyer pools, and Lake Superior logistics?' },
    { key: 'marketingReach', label: 'Marketing Reach', description: 'YachtWorld, Boat Trader, national exposure, professional photography, virtual tours?' },
    { key: 'commission', label: 'Commission & Fees', description: 'What\'s the total cost? Any hidden fees for marketing, haul-out, or closing?' },
    { key: 'communication', label: 'Communication Style', description: 'Are they responsive? Do they explain things clearly without jargon?' },
    { key: 'reputation', label: 'References & Reputation', description: 'What do past clients say? How long have they been in business?' }
];

function createEmptyBroker(id) {
    return {
        id,
        name: '',
        company: '',
        phone: '',
        researched: false,
        scores: {
            vesselExperience: 0,
            marketKnowledge: 0,
            marketingReach: 0,
            commission: 0,
            communication: 0,
            reputation: 0
        },
        notes: '',
        explanationOverride: ''
    };
}

function loadData() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch { }
    return {
        brokers: [createEmptyBroker(1), createEmptyBroker(2), createEmptyBroker(3), createEmptyBroker(4), createEmptyBroker(5)],
        findPromptEdits: '',
        researchPromptEdits: ''
    };
}

function saveData(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { }
}

function generateExplanation(broker, rank, allBrokers) {
    if (broker.explanationOverride) return broker.explanationOverride;

    const scores = broker.scores;
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

    if (totalScore === 0) return 'Not yet rated. Complete the scorecard to see a recommendation.';

    // Find top 2 strengths
    const sorted = Object.entries(scores)
        .filter(([, v]) => v > 0)
        .sort(([, a], [, b]) => b - a);

    const criteriaMap = {};
    CRITERIA.forEach(c => { criteriaMap[c.key] = c.label; });

    const strengths = sorted.slice(0, 2).map(([k]) => criteriaMap[k]);
    const weaknesses = sorted.filter(([, v]) => v <= 2).map(([k]) => criteriaMap[k]);

    let explanation = `Ranked #${rank} with a score of ${totalScore}/30. `;

    if (strengths.length > 0) {
        explanation += `Strongest in ${strengths.join(' and ')}. `;
    }

    if (rank === 1) {
        explanation += 'This broker is your best overall match based on your ratings.';
    } else if (weaknesses.length > 0 && rank > 1) {
        explanation += `Lower scores in ${weaknesses.slice(0, 2).join(' and ')} kept this broker from ranking higher.`;
    } else {
        explanation += 'A solid option worth considering.';
    }

    return explanation;
}

export { CRITERIA };

export default function useBrokerData() {
    const [data, setData] = useState(loadData);

    const update = useCallback((updater) => {
        setData(prev => {
            const next = typeof updater === 'function' ? updater(prev) : updater;
            saveData(next);
            return next;
        });
    }, []);

    const updateBroker = useCallback((id, field, value) => {
        update(prev => ({
            ...prev,
            brokers: prev.brokers.map(b =>
                b.id === id ? { ...b, [field]: value } : b
            )
        }));
    }, [update]);

    const updateScore = useCallback((id, criterion, value) => {
        update(prev => ({
            ...prev,
            brokers: prev.brokers.map(b =>
                b.id === id ? { ...b, scores: { ...b.scores, [criterion]: value } } : b
            )
        }));
    }, [update]);

    const setFindPromptEdits = useCallback((text) => {
        update(prev => ({ ...prev, findPromptEdits: text }));
    }, [update]);

    const setResearchPromptEdits = useCallback((text) => {
        update(prev => ({ ...prev, researchPromptEdits: text }));
    }, [update]);

    const rankedBrokers = useMemo(() => {
        const named = data.brokers.filter(b => b.name.trim());
        const scored = named.map(b => ({
            ...b,
            totalScore: Object.values(b.scores).reduce((a, c) => a + c, 0)
        }));
        scored.sort((a, b) => b.totalScore - a.totalScore);
        return scored.map((b, i) => ({
            ...b,
            rank: i + 1,
            explanation: generateExplanation(b, i + 1, scored)
        }));
    }, [data.brokers]);

    const activeBrokerCount = data.brokers.filter(b => b.name.trim()).length;

    return {
        brokers: data.brokers,
        rankedBrokers,
        activeBrokerCount,
        findPromptEdits: data.findPromptEdits,
        researchPromptEdits: data.researchPromptEdits,
        updateBroker,
        updateScore,
        setFindPromptEdits,
        setResearchPromptEdits,
        CRITERIA
    };
}
