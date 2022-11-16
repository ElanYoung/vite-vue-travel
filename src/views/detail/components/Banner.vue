<template>
  <div class="container">
    <div class="banner-wrapper" @click="onShowGallery">
      <img class="banner-wrapper__image" :src="banner" />
      <div class="banner-wrapper__info">
        <div class="banner-wrapper__info__title">{{ name }}</div>
        <div class="banner-wrapper__info__number-wrapper">
          <span class="iconfont iconpic"></span>
          <span class="banner-wrapper__info__number-wrapper__number">{{ images.length }}</span>
        </div>
      </div>
    </div>
    <fade-animation>
      <image-gallery v-show="showGallery" :images="images" @close="onCloseGallery"></image-gallery>
    </fade-animation>
  </div>
</template>

<script>
import FadeAnimation from '@/components/fade-animation/index.vue';
import ImageGallery from '@/components/image-gallery/index.vue';

export default {
  name: 'DetailBanner',
  components: {
    FadeAnimation,
    ImageGallery,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    banner: {
      type: String,
      default: '',
    },
    images: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showGallery: false,
    };
  },
  methods: {
    onShowGallery() {
      this.showGallery = true;
    },
    onCloseGallery() {
      this.showGallery = false;
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  .banner-wrapper {
    position: relative;
    height: 0;
    padding-bottom: 55%;
    overflow: hidden;

    &__image {
      width: 100%;
    }

    &__info {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      line-height: 30px;
      color: #fff;
      background-image: linear-gradient(to top, rgb(0 0 0 / 0%), rgb(0 0 0 / 80%));

      &__title {
        font-size: 14px;
      }

      &__number-wrapper {
        display: flex;
        align-items: center;
        height: 20px;
        padding: 0 10px;
        line-height: 20px;
        background: rgb(0 0 0 / 80%);
        border-radius: 10px;

        &__number {
          margin-left: 4px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
