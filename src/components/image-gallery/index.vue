<template>
  <div class="container" @click="onClickGallery">
    <div class="image-gallery-wrapper">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div v-for="image in images" :key="image" class="swiper-slide">
            <img class="swiper-image" :src="image" />
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper, { Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.less';

Swiper.use([Pagination]);

export default {
  name: 'ImageGallery',
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.initSwiper();
  },
  methods: {
    initSwiper() {
      this.swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'fraction',
        },
        autoplay: false,
        loop: false,
        // 开启动态检查器
        observer: true,
        // 监测Swiper祖/父元素
        observeParents: true,
      });
    },
    onClickGallery() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep .swiper-container {
  overflow: inherit;
}

.container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  background-color: #000;
  flex-direction: column;

  .image-gallery-wrapper {
    padding-bottom: 100%;
    width: 100%;
    height: 0;

    .swiper-container {
      .swiper-image {
        width: 100%;
        height: 100%;
      }

      .swiper-pagination {
        bottom: -40px !important;
        color: #fff !important;
      }
    }
  }
}
</style>
