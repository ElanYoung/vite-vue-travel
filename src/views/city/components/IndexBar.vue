<template>
  <div ref="container" class="container">
    <div class="scroll-container">
      <div class="city-wrapper">
        <div class="city-wrapper__title border-top-bottom">当前城市</div>
        <div class="city-wrapper__city-grid">
          <div class="city-wrapper__city-grid__grid-item-wrapper">
            <div class="city-wrapper__city-grid__grid-item-wrapper__grid-item">{{ currentCity }}</div>
          </div>
        </div>
      </div>
      <div class="city-wrapper">
        <div class="city-wrapper__title border-top-bottom">热门城市</div>
        <div class="city-wrapper__city-grid">
          <div class="city-wrapper__city-grid__grid-item-wrapper">
            <div
              v-for="city in hotCities"
              :key="city.id"
              class="city-wrapper__city-grid__grid-item-wrapper__grid-item"
              @click="onChangeCity(city.name)"
            >
              {{ city.name }}
            </div>
          </div>
        </div>
      </div>
      <div v-for="(city, key) of cities" :key="key" :ref="key" class="city-wrapper">
        <div class="city-wrapper__title border-top-bottom">{{ key }}</div>
        <div class="city-wrapper_city-list">
          <div
            v-for="item in city"
            :key="item.id"
            class="city-wrapper__city-list__list-item border-bottom"
            @click="onChangeCity(item.name)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import BetterScroll from 'better-scroll';

export default {
  name: 'CityIndexBar',
  components: {},
  props: {
    hotCities: {
      type: Array,
      default: () => [],
    },
    cities: {
      type: Object,
      default: () => {},
    },
    alpha: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      currentCity: (state) => state.city.currentCity,
    }),
  },
  watch: {
    alpha() {
      if (this.alpha) {
        const element = this.$refs[this.alpha];
        this.scroll.scrollToElement(element[0]);
      }
    },
  },
  mounted() {},
  methods: {
    initBetterScroll() {
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染完毕
      this.$nextTick(() => {
        // TODO BetterScroll封装：https://zhuanlan.zhihu.com/p/27407024
        this.scroll = new BetterScroll(this.$refs.container, {
          click: true,
        });
      });
    },
    onChangeCity(city) {
      this.changeCity({ city });
      this.$router.push({
        path: '/',
      });
    },
    ...mapMutations('city', {
      changeCity: 'change',
    }),
  },
};
</script>

<style lang="less" scoped>
.border-top-bottom {
  &:before {
    border-color: #ccc;
  }
  &:after {
    border-color: #ccc;
  }
}

.border-bottom {
  &:before {
    border-color: #ccc;
  }
  &:after {
    border-color: #ccc;
  }
}
.container {
  position: absolute;
  top: 164px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;

  .city-wrapper {
    &__title {
      font-size: 14px;
      text-indent: 10px;
      color: #666;
      background-color: #eee;
      line-height: 30px;
    }

    &__city-grid {
      &__grid-item-wrapper {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        padding: 0 22px 0 12px;
        width: 100%;
        box-sizing: border-box;
        flex-wrap: wrap;

        &__grid-item {
          margin-bottom: 10px;
          padding: 6px 0;
          width: 30%;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 6px;
          text-align: center;
        }
      }

      /* 解决左对齐问题 */
      &:after {
        width: 30%;
        content: '';
      }
    }

    &__city-list {
      &__list-item {
        font-size: 14px;
        text-indent: 10px;
        line-height: 40px;
      }
    }
  }
}
</style>
