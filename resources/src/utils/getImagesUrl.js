
export const getImagesUrl = (text) =>
  text.match(/https?:\/\/[^"' ]+\.(?:png|jpg|jpeg|gif).*?(?=( |$))/g);
