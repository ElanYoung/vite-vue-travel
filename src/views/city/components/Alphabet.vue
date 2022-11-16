<template>
  <div class="container">
    <ul class="alpha-list">
      <li
        v-for="letter in letters"
        :ref="letter"
        :key="letter"
        class="alpha-list__item"
        @click="onAlphaClick"
        @touchstart.prevent="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        {{ letter }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CityAlphabet',
  props: {
    cities: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      touchStatus: false,
      startY: 0,
      timer: null,
    };
  },
  computed: {
    letters() {
      return Object.keys(this.cities);
    },
  },
  updated() {
    // 提升性能
    this.startY = this.$refs.A[0].offsetTop;
  },
  methods: {
    onAlphaClick(event) {
      this.$emit('change', event.target.innerText);
    },
    onTouchStart() {
      this.touchStatus = true;
    },
    onTouchMove(event) {
      if (this.touchStatus) {
        // TODO 使用 lodash 进行优化
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          const touchY = event.touches[0].clientY - 82;
          const index = Math.floor((touchY - this.startY) / 20);
          if (index >= 0 && index < this.letters.length) {
            this.$emit('change', this.letters[index]);
          }
        }, 8);
      }
    },
    onTouchEnd() {
      this.touchStatus = false;
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  .alpha-list {
    position: absolute;
    top: 164px;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40px;

    &__item {
      line-height: 40px;
      color: @background-color;
      text-align: center;
    }
  }
}
</style>
