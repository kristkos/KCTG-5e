import {MODULE_ID} from "../kctg-5e.js";

export class Notes extends Application {
    constructor(object, options = {}) {
        super(object, options);
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "notes",
            title: "Thank you for downloading `Kris' Compendium of Trade Goods`",
            template: "modules/kctg-5e/templates/notes.html",
            width: 710,
            height: 740,
            classes:[ "kctg"]
        });
    }

    activateListeners(html) {
        super.activateListeners(html);
        $('.clear', html).bind("click", () => {
            game.settings.set(MODULE_ID, "show-warning", false);
            this.close();
        });

        $('.just-close', html).bind("click", () => {
            this.close();
        });
    }
}