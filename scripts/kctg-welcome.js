Hooks.on('init', () => {
    game.settings.register('kctg-common','welcome', {scope:'world',type:Boolean,config:false,default:false})
})
Hooks.on('ready', () => {
    if (game.settings.get('kctg-common','welcome') || !game.user.isGM) return // Skip sending message if this has already happened
    ChatMessage.create({content: '<i>Thank you so much for downloading Kriss Compendium of Trade Goods. If you have found the files helpful and would like to gain additional access to PDFs or PNG files, please consider supporting me on <a href="https://patreon.com/KCTG">Patreon</a></i>'})
    game.settings.set('kctg-common','welcome',true)
})