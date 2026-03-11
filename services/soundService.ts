import { Audio } from "expo-av";
import { createLogger } from "../shared/types/logger";
import { SOUND_FILES } from "../constants/sounds";

const log = createLogger('SOUND SERVICE')

export type GameSound =
    | "click" //
    | "play_card"//
    | "error"//
    | "success"//
    | "countdown" //
    | "shuriken"//
    | "mistake"//
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

    //async load() {
    //    await this.loadSound("mistake", SOUND_FILES.mistake);
    //    //await this.loadSound("click", require("../assets/sounds/glass_006.ogg"));
    //    //await this.loadSound("play_card", require("../assets/sounds/glitch_004.ogg"));
    //    //await this.loadSound("error", require("../assets/sounds/error_003.ogg"));
    //    //await this.loadSound("success", require("../assets/sounds/success.ogg"));
    //    //await this.loadSound("shuriken", require("../assets/sounds/question_004.ogg"));
    //    //await this.loadSound("mistake", require("../assets/sounds/scratch_004.ogg"));
    //    //await this.loadSound("toggle_tick", require("../assets/sounds/switch_002.ogg"));
    //    await this.loadSound("countdown", SOUND_FILES.countdown);
    //    await this.loadSound("success", SOUND_FILES.success);
    //}
    async load() {
        console.log('soundServiceLOAD!')
        for (const [key, file] of Object.entries(SOUND_FILES)) {
            //const sound = new Audio.Sound();
            //await sound.loadAsync(file, { shouldPlay: false, volume: 1.0 });
            //console.log('loading sound file: ', key)
            //this.sounds[key as GameSound] = sound;
            const { sound } = await Audio.Sound.createAsync(file, { shouldPlay: true })
            this.sounds[key as GameSound] = sound;
        }
    }

    private async loadSound(name: GameSound, file: any) {
        const sound = new Audio.Sound();
        await sound.loadAsync(file);
        this.sounds[name] = sound;
    }

    async play(name: GameSound) {
        if (this.muted) return; 

        const sound = this.sounds[name];
        if (!sound) {
            console.log("IT IS NOT LOADED YET DANG")
            return;
        }
        await sound.getStatusAsync().then(status => {
            if (!status.isLoaded) {
                console.warn(`${name} not loaded yet`);
                return;
            }
        });
        //await sound.stopAsync();
        console.log('sound should play')
        await sound.replayAsync();
    }
}

export const soundService = new SoundService();