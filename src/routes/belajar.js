module.exports = [
    {
        route: 'belajars',
        name: 'belajars',
        moduleId: './modules/belajar/belajar/index',
        nav: true,
        title: 'Belajar',
        auth: true,
        settings: {
            group: "belajar",
            permission: { "C9": 1, "A2": 1 },
            iconClass: 'fa fa-kaaba'
        }
    }
]

