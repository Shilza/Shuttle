export function addSmoothScrolling(anchorId) {

    let anchor = document.getElementById(anchorId);

    console.log(anchor);
    console.log(anchorId);
    if (anchorId)
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const blockId = anchor.getAttribute('href');
            document.querySelector(blockId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        });
}