import { useEffect, useState } from "react";

export type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    progress: number;
};

export type CountdownState = {
    day?: TimeLeft;
    week?: TimeLeft;
    month?: TimeLeft;
    year?: TimeLeft;
};

// === End Time Helpers ===
function getEndOfDay() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
}

function getEndOfWeek() {
    const now = new Date();
    const diff = 6 - now.getDay();
    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + diff,
        23,
        59,
        59
    );
}

function getEndOfMonth() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
}

function getEndOfYear() {
    const now = new Date();
    return new Date(now.getFullYear(), 11, 31, 23, 59, 59);
}

// === PROGRESS HELPERS ===
function getStartOfDay() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
}

function getStartOfWeek() {
    const now = new Date();
    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay(),
        0,
        0,
        0
    );
}

function getStartOfMonth() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
}

function getStartOfYear() {
    const now = new Date();
    return new Date(now.getFullYear(), 0, 1, 0, 0, 0);
}

// === MAIN CALCULATOR ===
function computeCountdown(start: Date, end: Date): TimeLeft {
    const now = new Date();

    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    const diff = end.getTime() - now.getTime();

    const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
    const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
    const minutes = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
    const seconds = Math.max(0, Math.floor((diff / 1000) % 60));

    const progress = Math.min(100, (elapsed / total) * 100);

    return { days, hours, minutes, seconds, progress };
}

export default function useCountdowns() {
    const [state, setState] = useState<CountdownState>({});

    useEffect(() => {
        const tick = () => {
            setState({
                day: computeCountdown(getStartOfDay(), getEndOfDay()),
                week: computeCountdown(getStartOfWeek(), getEndOfWeek()),
                month: computeCountdown(getStartOfMonth(), getEndOfMonth()),
                year: computeCountdown(getStartOfYear(), getEndOfYear()),
            });
        };

        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, []);

    return state;
}
