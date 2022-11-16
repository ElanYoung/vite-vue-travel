<template>
  <div class="container">
    <div v-if="showSwiper" class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="(page, index) in pages" :key="index" class="swiper-slide">
          <van-grid :column-num="4" :border="false" icon-size="40px" clickable>
            <van-grid-item v-for="category in page" :key="category.id" :icon="category.url" :text="category.title" />
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.less';

export default {
  name: 'CategoryGrid',
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {
    pages() {
      const pages = [];
      this.categories.forEach((category, index) => {
        const page = Math.floor(index / 8);
        if (!pages[page]) {
          pages[page] = [];
        }
        pages[page].push(category);
      });
      return pages;
    },
    showSwiper() {
      return this.categories && this.categories.length > 0;
    },
  },
  mounted() {},
  methods: {
    initSwiper() {
      this.swiper = new Swiper('.swiper-container', {
        loop: false,
        autoplay: false,
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url('@/style/mixins.less');

.container {
  margin-top: 10px;
}

::v-deep .van-grid-item__text {
  font-size: 28px;
  .multi-ellipsis(1);
}
</style>
