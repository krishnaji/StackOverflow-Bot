module.exports = () => {
    bot.dialog('sobot:Pinboard', [
        async (session) => {
            session.sendTyping();
             let userText = session.message.text.toLowerCase();
             pinBoardSearchQuery(session, { query: userText });
         }
    ]).triggerAction({
        matches: 'Pinboard'
    });
}