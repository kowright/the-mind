/* eslint-disable @typescript-eslint/no-require-imports */

import { GameSound } from "../services/soundService";

export const SOUND_FILES: Record<GameSound, any> = {
    click: require("../assets/sounds/glass_006.wav"),
    play_card: require("../assets/sounds/glitch_004.wav"),
    error: require("../assets/sounds/error_003.wav"),
    shuriken: require("../assets/sounds/question_004.wav"),
    mistake: require("../assets/sounds/scratch_004.wav"),
    toggle_tick: require("../assets/sounds/switch_002.wav"),
    countdown: require("../assets/sounds/tick_004.wav"),
    success: require("../assets/sounds/bong_001.wav"),
};
