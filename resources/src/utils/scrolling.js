export function addSmoothScrolling(anchorId) {

    let anchor = document.getElementById(anchorId);

    const blockId = anchor.getAttribute('href');
    let selector = document.querySelector(blockId);
    if (selector)
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            selector.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        });
}