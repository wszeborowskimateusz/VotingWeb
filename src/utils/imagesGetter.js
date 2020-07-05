export default {
  getImgUrl(src) {
    const images = require.context('@/assets', true);
    return images(`./${src}`);
  },
};
