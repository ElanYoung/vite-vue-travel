<template>
  <div class="container">
    <div class="weekend-title">周末去哪儿</div>
    <ul>
      <li v-for="weekend of weekends" :key="weekend.id" class="weekend-item border-bottom">
        <div class="weekend-item__image-wrapper">
          <img class="weekend-item__image" :src="weekend.url" />
        </div>
        <div class="weekend-item__info">
          <p class="weekend-item__info__title">{{ weekend.title }}</p>
          <p class="weekend-item__info__description">{{ weekend.description }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeWeekend',
  props: {
    weekends: {
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
@import '@/style/mixins.less';

.container {
  .weekend-title {
    text-indent: 20px;
    line-height: 80px;
    background-color: #eee;
  }

  .weekend-item {
    &__image-wrapper {
      overflow: hidden;
      padding-bottom: 37.09%;
      height: 0;

      &__image {
        width: 100%;
      }
    }

    &__info {
      display: flex;
      flex-direction: column;
      padding: 4px 10px;

      &__title {
        line-height: 60px;
        font-size: 30px;
        .ellipsis();
      }

      &__description {
        font-size: 24px;
        color: #ccc;
        line-height: 50px;
        .ellipsis();
      }
    }
  }
}
</style>
