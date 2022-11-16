<template>
  <div class="container">
    <div v-if="showSwiper" class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="banner in banners" :key="banner.id" class="swiper-slide">
          <img class="swiper-image" :src="banner.url" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper, { Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.less';

Swiper.use([Pagination, Autoplay]);

export default {
  name: 'HomeSwiper',
  components: {},
  props: {
    banners: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {
    showSwiper() {
      return this.banners && this.banners.length > 0;
    },
  },
  mounted() {},
  methods: {
    initSwiper() {
      this.swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        loop: true,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 0;
  padding-bottom: 31.25%;
  overflow: hidden;
  background-color: #eee;

  .swiper-container {
    /* 设置分页 */
    --swiper-pagination-color: #fff;

    .swiper-image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
