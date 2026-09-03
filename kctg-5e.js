export const MODULE_ID = 'kctg-5e';
Hooks.once('init', () => {
    game.settings.register(MODULE_ID, 'show-warning', {
        name: 'Show "Thank you" note on startup',
        scope: 'world',
        config: true,
        default: true,
        type: Boolean
    });

    game.modules.get(MODULE_ID).api = { showWelcome: postWelcome };
});
function setting(key) {
    return game.settings.get(MODULE_ID, key);
}
async function postWelcome() {
    const content = await foundry.applications.handlebars.renderTemplate(`modules/${MODULE_ID}/templates/notes.html`);
    return ChatMessage.create({
        user: game.user.id,
        speaker: ChatMessage.getSpeaker(),
        content,
        whisper: [game.user.id]
    });
}
Hooks.once('ready', async () => {
    if (!game.user?.isGM || !setting("show-warning")) return;
    await game.settings.set(MODULE_ID, "show-warning", false);
    await postWelcome();
});
Hooks.on("renderChatMessageHTML", (message, html) => {
    for (const el of html.querySelectorAll(`[data-kctg-handler^="${MODULE_ID}|"]`)) {
        el.addEventListener("click", onKctgClick);
    }
});
function onKctgClick(event) {
    event.preventDefault();
    const [, action, ...args] = event.currentTarget.dataset.kctgHandler.split("|");
    if (action === "openWindow") window.open(args.join("|"), "_blank", "noopener");
}
