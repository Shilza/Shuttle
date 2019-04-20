
export function resizeableImage(image_target) {

    let cropComponent
        , container
        , crop_img
        , event_state = {}
        , ratio = 1.0
        , MINWIDTH = 50
        , CROPWIDTH = 200
        , CROPHEIGHT = 200
        , cropLeft = 0
        , cropTop = 0
        , cropWidth = 0
        , cropHeight = 0
        , resize_canvas = null;

    if (image_target.complete) {
        init();
    } else {
        image_target.onload = function () {
            init();
        };
    }

    function addHandlers() {
        container.addEventListener('mousedown', startMoving, false);
        container.addEventListener('touchstart', startMoving, false);
        container.addEventListener('wheel', resizing, false);
    }

    function init() {
        let wraper, left, top;

        image_target.dataset.isCrop = 'true';
        image_target.classList.add('crop-blur');
        image_target.draggable = false;

        crop_img = new Image();
        crop_img.crossOrigin = image_target.crossOrigin;
        crop_img.src = image_target.src;
        crop_img.draggable = false;

        resize_canvas = document.createElement('canvas');

        cropComponent = document.createElement('div');
        cropComponent.classList.add('crop-component');

        container = document.createElement('div');
        container.classList.add('overlay');

        cropComponent.appendChild(container);
        wraper = image_target.parentNode;
        wraper.appendChild(cropComponent);
        cropComponent.appendChild(crop_img);
        cropComponent.appendChild(image_target);
        container.appendChild(crop_img);

        left = image_target.offsetWidth / 2 - CROPWIDTH / 2;
        top = image_target.offsetHeight / 2 - CROPHEIGHT / 2;

        updateCropImage(left, top);
        addHandlers();
    }

    function updateCropSize(width, height) {
        container.style.width = width + 'px';
        container.style.height = height + 'px';
    }

    function updateCropImage(left, top) {
        cropLeft = -left * ratio;
        cropTop = -top * ratio;
        left = -left + 'px';
        top = -top + 'px';

        crop_img.style.top = top;
        crop_img.style.left = left;
    }

    function updateContainer(left, top) {
        top = top + (CROPWIDTH / 2) + 'px';
        left = left + (CROPHEIGHT / 2) + 'px';

        container.style.top = top;
        container.style.left = left;
    }

    // Save the initial event details and container state
    function saveEventState(e) {
        event_state.container_width = container.offsetWidth;
        event_state.container_height = container.offsetHeight;

        event_state.container_left = container.offsetLeft;
        event_state.container_top = container.offsetTop;

        event_state.mouse_x = (e.clientX || e.pageX || (e.touches && e.touches[0].clientX)) + window.scrollX;
        event_state.mouse_y = (e.clientY || e.pageY || (e.touches && e.touches[0].clientY)) + window.scrollY;
    }

    function imgZoom(zoom) {
        zoom = zoom * Math.PI * 2;
        let newWidth = Math.floor(container.clientWidth + zoom)
            , newHeight = Math.floor(container.clientHeight + zoom)
            , w = crop_img.clientWidth
            , h = crop_img.clientHeight
            , left
            , top
            , right
            , bottom;

        if (newWidth < MINWIDTH) {
            return;
        } else if (newWidth > w) {
            return;
        }

        left = container.offsetLeft - (zoom / 2);
        top = container.offsetTop - (zoom / 2);
        right = left + newWidth;
        bottom = top + newHeight;

        if (left < 0) {
            left = 0;
        }
        if (top < 0) {
            top = 0;
        }
        if (right > w) {
            return;
        }
        if (bottom > h) {
            return;
        }

        ratio = CROPWIDTH / newWidth;

        updateCropSize(newWidth, newHeight);
        updateCropImage(left, top);
        updateContainer(left, top);
        crop();
    }

    function resizing(e) {
        e.preventDefault();
        imgZoom(e.deltaY > 0 ? 1 : -1);
    }

    function startMoving(e) {
        e.preventDefault();
        e.stopPropagation();

        saveEventState(e);

        document.addEventListener('mousemove', moving);
        document.addEventListener('touchmove', moving);
        document.addEventListener('mouseup', endMoving);
        document.addEventListener('touchend', endMoving);
    }

    function endMoving(e) {
        e.preventDefault();

        document.removeEventListener('mouseup', endMoving);
        document.removeEventListener('touchend', endMoving);
        document.removeEventListener('mousemove', moving);
        document.removeEventListener('touchmove', moving);
    }

    function moving(e) {
        let currentTouch = {}
            , left
            , top
            , w
            , h;

        e.preventDefault();
        e.stopPropagation();

        currentTouch.x = e.pageX || (e.touches && e.touches[0].pageX);
        currentTouch.y = e.pageY || (e.touches && e.touches[0].pageY);

        left = currentTouch.x - (event_state.mouse_x - event_state.container_left);
        top = currentTouch.y - (event_state.mouse_y - event_state.container_top);
        w = container.offsetWidth;
        h = container.offsetHeight;

        if (left < 0) {
            left = 0;
        } else if (left > crop_img.offsetWidth - w) {
            left = crop_img.offsetWidth - w;
        }
        if (top < 0) {
            top = 0;
        } else if (top > crop_img.offsetHeight - h) {
            top = crop_img.offsetHeight - h;
        }

        updateCropImage(left, top);
        updateContainer(left, top);
    }

    function crop() {
        cropWidth = crop_img.width * ratio;
        cropHeight = crop_img.height * ratio;

        resize_canvas.width = CROPWIDTH;
        resize_canvas.height = CROPHEIGHT;

        let ctx = resize_canvas.getContext('2d');
        ctx.drawImage(crop_img,
            cropLeft, cropTop,
            cropWidth, cropHeight
        );
    }

    function removeHandlers() {
        container.removeEventListener('mousedown', startMoving);
        container.removeEventListener('touchstart', startMoving);
        container.removeEventListener('wheel', resizing);

        document.removeEventListener('mouseup', endMoving);
        document.removeEventListener('touchend', endMoving);
        document.removeEventListener('mousemove', moving);
        document.removeEventListener('touchmove', moving);
    }

    function getCroppedImage() {
        crop();

        try {
            return resize_canvas.toDataURL('image/png', 1.0);
        } catch (e) {
            console.error(e);
        } finally {
            removeHandlers();
        }
    }

    return getCroppedImage;
}