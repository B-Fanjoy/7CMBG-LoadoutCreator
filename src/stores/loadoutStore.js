import { defineStore } from 'pinia';

export const useLoadoutStore = defineStore('loadoutStore', {
  state: () => ({
    selectedLoadout: null
  }),
  actions: {
    setLoadout(loadout) {
      this.selectedLoadout = loadout;
    },
    clearLoadout() {
      this.selectedLoadout = null;
    }
  }
});
