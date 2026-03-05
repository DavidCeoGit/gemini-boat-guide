import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'gemini-boat-guide-progress';

function loadProgress() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const data = JSON.parse(raw);
        return {
            currentStep: data.currentStep ?? 0,
            completedSteps: new Set(data.completedSteps ?? []),
            visitedSteps: new Set(data.visitedSteps ?? [0])
        };
    } catch {
        return null;
    }
}

function saveProgress(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            currentStep: state.currentStep,
            completedSteps: [...state.completedSteps],
            visitedSteps: [...state.visitedSteps]
        }));
    } catch {
        // localStorage unavailable — silent fail
    }
}

export default function useProgress(totalSteps) {
    const [state, setState] = useState(() => {
        const saved = loadProgress();
        return saved || {
            currentStep: 0,
            completedSteps: new Set(),
            visitedSteps: new Set([0])
        };
    });

    // Persist on every state change
    useEffect(() => {
        saveProgress(state);
    }, [state]);

    const goTo = useCallback((index) => {
        if (index < 0 || index >= totalSteps) return;
        setState(prev => ({
            ...prev,
            currentStep: index,
            visitedSteps: new Set([...prev.visitedSteps, index])
        }));
    }, [totalSteps]);

    const goNext = useCallback(() => {
        setState(prev => {
            if (prev.currentStep >= totalSteps - 1) return prev;
            const next = prev.currentStep + 1;
            return {
                ...prev,
                currentStep: next,
                visitedSteps: new Set([...prev.visitedSteps, next])
            };
        });
    }, [totalSteps]);

    const goPrev = useCallback(() => {
        setState(prev => {
            if (prev.currentStep <= 0) return prev;
            return {
                ...prev,
                currentStep: prev.currentStep - 1
            };
        });
    }, []);

    const toggleComplete = useCallback((index) => {
        setState(prev => {
            const next = new Set(prev.completedSteps);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }
            return { ...prev, completedSteps: next };
        });
    }, []);

    const resetProgress = useCallback(() => {
        const fresh = {
            currentStep: 0,
            completedSteps: new Set(),
            visitedSteps: new Set([0])
        };
        setState(fresh);
        try { localStorage.removeItem(STORAGE_KEY); } catch { }
    }, []);

    return {
        currentStep: state.currentStep,
        completedSteps: state.completedSteps,
        visitedSteps: state.visitedSteps,
        completionPercent: Math.round((state.completedSteps.size / totalSteps) * 100),
        goTo,
        goNext,
        goPrev,
        toggleComplete,
        resetProgress
    };
}
