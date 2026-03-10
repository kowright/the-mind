//import { useEffect, useState } from "react";
//import { soundService } from "../services/soundService";

//interface UseCountdownProps {
//  start: number; // starting number
//  interval?: number; // interval in ms, default 1000
//  onEnd?: () => void; // optional callback when countdown ends
//  tickSound?: string; // name of tick sound
//  endSound?: string; // name of end sound
//}

//export function useCountdown({
//  start,
//  interval = 1000,
//  onEnd,
//  tickSound = "countdown",
//  //endSound = "success",
//}: UseCountdownProps) {
//  const [count, setCount] = useState(start);

//  useEffect(() => {
//    if (start <= 0) return;

//    setCount(start);

//    // play initial tick immediately
//    if (tickSound) {
//      soundService.play(tickSound as any);
//    }

//    const timer = setInterval(() => {
//      setCount(prev => {
//        const next = prev - 1;

//        if (next > 0) {
//          if (tickSound) soundService.play(tickSound as any);
//        } else {
//          //if (endSound) soundService.play(endSound as any);
//          clearInterval(timer);
//          if (onEnd) onEnd();
//        }

//        return Math.max(next, 0); // prevent negative values
//      });
//    }, interval);

//    return () => clearInterval(timer);
//  }, [start, interval, tickSound, onEnd]);

//  return count;
//}

import { useEffect, useState } from "react";
import { soundService } from "../services/soundService";

interface UseCountdownProps {
    start: number; // starting number
    interval?: number; // interval in ms, default 1000
    onEnd?: () => void; // optional callback when countdown ends
    tickSound?: string; // name of tick sound
    endSound?: string; // name of end sound
}

export function useCountdown({
    start,
    interval = 1000,
    onEnd,
    tickSound = "countdown",
    //endSound = "success",
}: UseCountdownProps) {
    const [count, setCount] = useState(start);

    useEffect(() => {
        if (start <= 0) return;

        setCount(start);

        const timer = setInterval(() => {
            setCount(prev => {
                const next = prev - 1;
                return Math.max(next, 0); // prevent negative values
            });
        }, interval);

        return () => clearInterval(timer);
    }, [start, interval]);

    //  Play tick sound whenever `count` changes
    useEffect(() => {
        if (count > 0 && tickSound) {
            soundService.play(tickSound as any);
        } else if (count === 0 && onEnd) {
            onEnd();
            // optionally play endSound here
            // if (endSound) soundService.play(endSound as any);
        }
    }, [count, tickSound, onEnd]);

    return count;
}