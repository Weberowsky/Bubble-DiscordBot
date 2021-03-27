module.exports = [
    {
        name: "prefix",
        viewName: "Prefix",
        type: "prefix",
        description: "Prefix bota na serwerze.",
        category: "bot",
    },

    {
        name: "levelmsg",
        viewName: "Powiadomienia o zdobyciu poziomu",
        type: "bool",
        description: "Ustala, czy bot ma powiadamiać użytkowników o zdobyciu nasępnego poziomu.",
        category: "other",
    },

    {
        name: "welcomechannel",
        viewName: "Kanał powitań",
        type: "channel",
        description: "Kanał, na który będą wysyłane powitania nowych członków serwera.",
        category: "welcome",
    },

    {
        name: "welcometext",
        viewName: "Tekst powitań",
        type: "text",
        description: "Tekst wysyłany po dołączeniu nowego użytkownika. Pamiętaj, że nazwę użytkownika możesz uzyskać polem `{user}`.",
        category: "welcome",
    },

    {
        name: "goodbyechannel",
        viewName: "Kanał pożegnań",
        type: "channel",
        description: "Kanał, na który będą wysyłane pożegnania użytkowników opuszczających serwer.",
        category: "welcome",
    },

    {
        name: "goodbyetext",
        viewName: "Tekst pożegnań",
        type: "text",
        description: "Tekst wysyłany po wyjściu użytkownika z serwera. Pamiętaj, że nazwę użytkownika możesz uzyskać polem `{user}`.",
        category: "welcome",
    },

    {
        name: "currency",
        viewName: "Waluta serwera",
        type: "text",
        description: "Nazwa lub emoji, która będzie przedstawiana jako waluta serwera.",
        category: "other",
    },

    {
        name: "antyinvite",
        viewName: "Anty-invite",
        type: "bool",
        description: "Blokuje wysyłanie zaproszeń do innych serwerów discord (nie dotyczy administratorów)",
        category: "def",
    },

    {
        name: "invitecard",
        viewName: "Karta powitalna",
        type: "bool",
        description: "Dołącza kartę powitalną do wiadomości witającej nowych członków serwera.",
        category: "welcome",
    },

    {
        name: "autorole",
        viewName: "Autorole",
        type: "role",
        description: "Autorole.",
        category: "welcome",
    },

    {
        name: "invitewarntext",
        viewName: "Ostrzeżenie anty-invite",
        type: "text",
        description: ".",
    },
    
]
