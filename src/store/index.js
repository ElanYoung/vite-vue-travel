import { createStore } from 'vuex';

const files = import.meta.glob('./modules/*.js', {
  eager: true,
});

const modules = [];
Object.keys(files).forEach((key) => {
  const moduleName = key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.js'));
  modules[moduleName] = files[key].default;
});

const store = createStore({
  // 严格模式
  strict: import.meta.env.MODE !== 'production',
  modules,
});

export default store;
