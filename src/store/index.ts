import { defineStore } from 'pinia';
import { SubsetData } from '../utils/interface';

export const useSubsetStore = defineStore('subsets', {
  state: () => {
    return {
      count: 0,
      data: [] as SubsetData[],
    };
  },
  getters: {
    filter: (state) => {},
  },
});
