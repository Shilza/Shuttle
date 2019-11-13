
export const convertImageToBlob = async (image) => await fetch(image).then(res => res.blob());
