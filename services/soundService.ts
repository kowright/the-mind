import { Audio } from "expo-av";
import { createLogger } from "../shared/types/logger";
import { SOUND_FILES } from "../constants/sounds";

const log = createLogger('SOUND SERVICE')

export type GameSound =
    | "click" 
    | "play_card"
    | "error"
    | "success"
    | "countdown" 
    | "shuriken"
    | "mistake"
    | "toggle_tick"
    | "win"
    | "lose"
    | "everyone_here"
    ;

class SoundService {
    public sounds: Partial<Record<GameSound, Audio.Sound>> = {};
    private muted = false;

    setMuted(value: boolean) {
        this.muted = value;
    }

    async load() {
        for (const [key, file] of Object.entries(SOUND_FILES)) {
            const { sound } = await Audio.Sound.createAsync(file, { shouldPlay: false, volume:1 })
            this.sounds[key as GameSound] = sound;
        }
    }

    async play(name: GameSound) {
        if (this.muted) return; 

        const sound = this.sounds[name];
        if (!sound) {
            return;
        }
        await sound.getStatusAsync().then(status => {
            if (!status.isLoaded) {
                log.warn('Sound is not loaded yet');
                return;
            }
        });

        await sound.replayAsync();
    }
}

export const soundService = new SoundService();