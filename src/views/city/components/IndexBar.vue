<template>
  <div ref="container" class="container">
    <div class="scroll-container">
      <div class="city-wrapper">
        <div class="city-wrapper__title border-top-bottom">当前城市</div>
        <div class="city-wrapper__city-grid">
          <div class="city-wrapper__city-grid__grid-item-wrapper">
            <div class="city-wrapper__city-grid__grid-item-wrapper__grid-item">{{ city.currentCity }}</div>
          </div>
        </div>
      </div>
      <div class="city-wrapper">
        <div class="city-wrapper__title border-top-bottom">热门城市</div>
        <div class="city-wrapper__city-grid">
          <div class="city-wrapper__city-grid__grid-item-wrapper">
            <div
              v-for="hotCity in hotCities"
              :key="hotCity.id"
              class="city-wrapper__city-grid__grid-item-wrapper__grid-item"
              @click="onChangeCity(hotCity.name)"
            >
              {{ hotCity.name }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-for="(list, key) of cities"
        :key="key"
        :ref="(alphaRef) => (alphaRefs[key] = alphaRef)"
        class="city-wrapper"
      >
        <div class="city-wrapper__title border-top-bottom">{{ key }}</div>
        <div class="city-wrapper_city-list">
          <div
            v-for="item in list"
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

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import BetterScroll from 'better-scroll';
import { ref, nextTick, watch } from 'vue';

const props = defineProps({
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
});

const container = ref(null);
const scroll = ref(null);
const alphaRefs = ref([]);
const store = useStore();
const router = useRouter();
const { city } = store.state;

const initBetterScroll = () => {
  // nextTick 是一个异步函数，为了确保 DOM 已经渲染完毕
  nextTick(() => {
    // TODO BetterScroll封装：https://zhuanlan.zhihu.com/p/27407024
    scroll.value = new BetterScroll(container.value, {
      click: true,
    });
  });
};

const onChangeCity = (city) => {
  store.commit('city/change', { city });
  router.push({
    path: '/',
  });
};

watch(
  () => props.alpha,
  (newAlpha) => {
    if (newAlpha) {
      const element = alphaRefs.value[newAlpha];
      scroll.value.scrollToElement(element);
    }
  },
);

defineExpose({
  initBetterScroll,
});
</script>

<style lang="less" scoped>
.border-top-bottom {
  &::before {
    border-color: #ccc;
  }

  &::after {
    border-color: #ccc;
  }
}

.border-bottom {
  &::before {
    border-color: #ccc;
  }

  &::after {
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
      line-height: 30px;
      color: #666;
      text-indent: 10px;
      background-color: #eee;
    }

    &__city-grid {
      &__grid-item-wrapper {
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        padding: 0 22px 0 12px;
        margin-top: 10px;

        &__grid-item {
          width: 30%;
          padding: 6px 0;
          margin-bottom: 10px;
          font-size: 14px;
          text-align: center;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
      }

      /* 解决左对齐问题 */
      &::after {
        width: 30%;
        content: '';
      }
    }

    &__city-list {
      &__list-item {
        font-size: 14px;
        line-height: 40px;
        text-indent: 10px;
      }
    }
  }
}
</style>
