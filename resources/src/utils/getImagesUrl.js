import 'core-js/features/promise';

export const getImagesUrl = async (text) => {
  const images = text.match(/https?:\/\/[^"' ]+\.(?:png|jpg|jpeg|gif).*?(?=( |$))/g);
  if (images && images.length > 0) {
    const results = await Promise.allSettled(images.map(isImage));
    return results
      .filter(result => result.state !== 'rejected')
      .map(result => result.value);
  }
  return null;
};

function isImage(url) {
  return new Promise((resolve, reject) => {
    let timeout = 2000;
    let timer;
    let img = new Image();

    img.onerror = img.onabort = function () {
      clearTimeout(timer);
      reject();
    };
    img.onload = function () {
      clearTimeout(timer);
      resolve(url);
    };
    timer = setTimeout(function () {
      reject();
    }, timeout);

    img.src = url;
  });

}

