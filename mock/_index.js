import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

const files = import.meta.glob('./**/*.js', {
  eager: true,
});

const modules = [];
Object.keys(files).forEach((key) => {
  modules.push(...files[key].default);
});

/**
 * Used in a production environment. Need to manually import all modules
 */
export const setupProdMockServer = () => {
  createProdMockServer(modules);
};
