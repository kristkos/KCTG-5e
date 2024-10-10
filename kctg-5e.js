import {Notes} from "./apps/notes.js";

export const MODULE_ID = 'kctg-5e';

// Register the 'show-warning' setting
Hooks.once('init', () => {
    game.settings.register(MODULE_ID, 'show-warning', {
        name: 'Show "Thank you" note on startup',
        scope: 'world',
        config: true,
        default: true,
        type: Boolean
    });
});

// Define the 'setting' function
function setting(key) {
    return game.settings.get(MODULE_ID, key);
}

// Ensure the 'setting' function is defined and available in scope
Hooks.once('ready', () => {
    if (setting("show-warning") && game.user?.isGM) {
        new Notes().render(true);
    }
});

