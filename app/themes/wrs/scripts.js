// // DEFER
// function add_scripts() {
//     window.removeEventListener('scroll', add_scripts);
//     window.removeEventListener('click', add_scripts);
//     window.removeEventListener('mousemove', add_scripts);
//     window.removeEventListener('touchstart', add_scripts);

//     add_deferred_tidio();
// };

// function add_deferred_tidio() {
//     console.log('add_deferred_tidio');
//     if (window.location.pathname.indexOf('/start-your-claim/') === -1) {
//         const tidio = document.createElement('script');
//         tidio.type = 'text/javascript';
//         tidio.src = "https://code.tidio.co/womtx9hqb0c3emdhn7ww4rqeh34ril69.js";
//         document.body.appendChild(tidio);
//     }
// }

// document.addEventListener('DOMContentLoaded', function () {
//     window.addEventListener('scroll', add_scripts);
//     window.addEventListener('click', add_scripts);
//     window.addEventListener('mousemove', add_scripts);
//     window.addEventListener('touchstart', add_scripts);
// });

// // GTM
// (function (w, d, s, l, i) {
//     w[l] = w[l] || []; w[l].push({
//         'gtm.start':
//             new Date().getTime(), event: 'gtm.js'
//     }); var f = d.getElementsByTagName(s)[0],
//         j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
//             'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
// })(window, document, 'script', 'dataLayer', 'GTM-T4HLXTMS');