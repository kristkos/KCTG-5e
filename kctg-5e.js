import { Notes } from "./apps/notes.js";

// Register the 'show-warning' setting
Hooks.once('init', () => {
    game.settings.register('kctg-5e', 'show-warning', {
        name: 'Thank you!',
        hint: 'Thank you for downloading',
        scope: 'world',
        config: false,
        default: true,
        type: Boolean
    });
});

// Define the 'setting' function
function setting(key) {
    return game.settings.get('kctg-5e', key);
}

// Ensure the 'setting' function is defined and available in scope
Hooks.once('ready', () => {
    if (setting("show-warning") && game.user?.isGM) {
        new Notes().render(true);
    }
});

Hooks.on("renderSettingsConfig", (app, html, data) => {
    // Create the paragraph element and add class and content
    const warningParagraph = $('<p>')
        .addClass('mld-warning')
        .append('<i class="fas fa-circle-question"></i> Thank you for downloading!')
        .append(
            $('<a>')
                .html("Click here")
                .on("click", () => { new Notes().render(true); })
        );

    // Insert the paragraph before the specified element
    warningParagraph.insertBefore($('[name="kctg-5e.show-warning"]').parents('div.form-group:first'));
});
