export function addSmoothScrolling(anchorId) {

    let anchor = document.getElementById(anchorId);

    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const blockId = anchor.getAttribute('href');
        document.querySelector(blockId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    });
}

// const anchors = document.querySelectorAll('a[href*="#"]');
//
// for (let anchor of anchors) {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//
//         const blockID = anchor.getAttribute('href');
//
//         document.querySelector('' + blockID).scrollIntoView({
//             behavior: 'smooth',
//             block: 'start'
//         })
//     })
// }