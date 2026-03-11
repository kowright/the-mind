import { useState, useEffect, useRef } from "react";
import { soundService } from "../services/soundService";


interface UseCountdownProps {
    start: number;
}

export function useCountdown({ start }: UseCountdownProps) {
    const [count, setCount] = useState(start);
    const prevCountRef = useRef<number>(start);

    useEffect(() => {
        const startTime = Date.now();
        const endTime = startTime + start * 1000;

        const tick = () => {
            const now = Date.now();
            const remaining = Math.ceil((endTime - now) / 1000);
            const clamped = Math.max(remaining, 0);

            if (clamped !== prevCountRef.current && clamped > 0) {
                soundService.play('countdown');
                prevCountRef.current = clamped;
            }

            setCount(clamped);

            if (clamped > 0) {
                requestAnimationFrame(tick);
            }
        };

        tick();
    }, [start]);

    return count;
}