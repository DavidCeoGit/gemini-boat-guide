import { useState, useCallback } from 'react';

const NOTES_KEY = 'gemini-boat-guide-notes';
const RESPONSES_KEY = 'gemini-boat-guide-responses';

function load(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
}

function save(key, data) {
    try { localStorage.setItem(key, JSON.stringify(data)); } catch { }
}

export function useNotes(totalSteps) {
    const [notes, setNotes] = useState(() => load(NOTES_KEY, {}));

    const updateNote = useCallback((stepIndex, text) => {
        setNotes(prev => {
            const next = { ...prev, [stepIndex]: text };
            save(NOTES_KEY, next);
            return next;
        });
    }, []);

    const getNote = useCallback((stepIndex) => notes[stepIndex] || '', [notes]);

    const notesCount = Object.values(notes).filter(n => n.trim()).length;

    return { notes, getNote, updateNote, notesCount };
}

export function useResponses() {
    const [responses, setResponses] = useState(() => load(RESPONSES_KEY, {}));

    const saveResponse = useCallback((stepIndex, text) => {
        setResponses(prev => {
            const entries = prev[stepIndex] || [];
            const next = {
                ...prev,
                [stepIndex]: [...entries, { text, savedAt: new Date().toISOString() }]
            };
            save(RESPONSES_KEY, next);
            return next;
        });
    }, []);

    const getResponses = useCallback((stepIndex) => responses[stepIndex] || [], [responses]);

    const deleteResponse = useCallback((stepIndex, idx) => {
        setResponses(prev => {
            const entries = [...(prev[stepIndex] || [])];
            entries.splice(idx, 1);
            const next = { ...prev, [stepIndex]: entries };
            save(RESPONSES_KEY, next);
            return next;
        });
    }, []);

    const totalResponses = Object.values(responses).reduce((sum, arr) => sum + arr.length, 0);

    return { responses, getResponses, saveResponse, deleteResponse, totalResponses };
}
