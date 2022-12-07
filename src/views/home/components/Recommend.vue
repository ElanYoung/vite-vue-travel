<template>
  <div class="container">
    <div class="recommend-title">热销推荐</div>
    <ul>
      <router-link
        v-for="recommend of recommends"
        :key="recommend.id"
        tag="li"
        :to="`/detail/${recommend.id}`"
        class="recommend-item border-bottom"
      >
        <img class="recommend-item__image" :src="recommend.url" />
        <div class="recommend-item__info">
          <p class="recommend-item__info__title">{{ recommend.title }}</p>
          <p class="recommend-item__info__description">{{ recommend.description }}</p>
          <van-button class="recommend-item__info__button" color="#ff9300" size="mini">查看详情</van-button>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    recommends: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
@import url('@/style/mixins.less');

.container {
  .recommend-title {
    margin-top: 10px;
    font-size: 32px;
    line-height: 80px;
    text-indent: 20px;
    background-color: #eee;
  }

  .recommend-item {
    display: flex;

    &__image {
      width: 170px;
      height: 170px;
      padding: 10px;
    }

    &__info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      min-width: 0;
      padding: 0 14px;

      &__title {
        font-size: 28px;
        .ellipsis();
      }

      &__description {
        font-size: 26px;
        color: #ccc;
        .ellipsis();
      }

      &__button {
        align-self: baseline;
        width: 120px;
        height: 48px;
        font-size: 24px;
      }
    }
  }
}
</style>
