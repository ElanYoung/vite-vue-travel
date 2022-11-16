export default [
  {
    url: '/api/detail',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'OK',
        data: {
          sight_name: '大连圣亚海洋世界(AAAA景区)',
          banner_image:
            'http://img1.qunarzz.com/sight/p0/201404/23/04b92c99462687fa1ba45c1b5ba4ad77.jpg_600x330_bf9c4904.jpg',
          gallery_images: [
            'http://img1.qunarzz.com/sight/p0/201404/23/04b92c99462687fa1ba45c1b5ba4ad77.jpg_800x800_70debc93.jpg',
            'http://img1.qunarzz.com/sight/p0/1709/76/7691528bc7d7ad3ca3.img.png_800x800_9ef05ee7.png',
          ],
        },
      };
    },
  },
];
