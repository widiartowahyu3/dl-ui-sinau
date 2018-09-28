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
    },

    {
        route: 'sinaus',
        name: 'sinaus',
        moduleId: './modules/belajar/sinau/index',
        nav: true,
        title: 'Sinau',
        auth: true,
        settings: {
            group: "belajar",
            permission: { "C9": 1, "A2": 1 },
            iconClass: 'fa fa-kaaba'
        }
    },

    {
        route: 'booking-orders',
        name: 'booking-orders',
        moduleId: './modules/belajar/booking-order/index',
        nav: true,
        title: 'Booking Order',
        auth: true,
        settings: {
            group: "belajar",
            permission: {"C9": 1, "PG": 1, "B9": 1, "B1": 1},
            iconClass: 'fa fa-kaaba'
        }
    },
]

