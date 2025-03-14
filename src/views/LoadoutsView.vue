<template>
  <main class="p-6">
    <h1 class="text-6xl font-bold mb-6 py-4 text-center border-6 border-[#F4C356] rounded-3xl">Saved Loadouts</h1>

    <div class="flex justify-center gap-4 mb-6">
      <button @click="loadAllLoadouts" class="px-4 py-2 bg-green-500 text-white rounded-lg">Load Saved Loadouts</button>
      <button @click="clearAllLoadouts" class="px-4 py-2 bg-red-500 text-white rounded-lg">Clear All Loadouts</button>
    </div>

    <div v-if="loadouts.length" class="space-y-4">
      <div v-for="(loadout, index) in loadouts" :key="index" class="bg-[#3b3b3b] p-4 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-2">{{ loadout.name }}</h2>
        <button @click="deleteLoadout(loadout.name)" class="px-3 py-1 bg-red-600 text-white rounded-lg">Delete</button>
      </div>
    </div>
    <p v-else class="text-center text-gray-500">No saved loadouts.</p>
  </main>
</template>

<script>
export default {
  name: 'SavedLoadoutsView',
  data() {
    return {
      loadouts: [] // Array to store multiple loadouts
    };
  },
  methods: {
    loadAllLoadouts() {
      // Retrieve all loadouts stored in localStorage
      const savedLoadouts = JSON.parse(localStorage.getItem('loadouts')) || [];
      this.loadouts = savedLoadouts;
    },
    deleteLoadout(loadoutName) {
      // Remove specific loadout from storage
      let savedLoadouts = JSON.parse(localStorage.getItem('loadouts')) || [];
      savedLoadouts = savedLoadouts.filter(loadout => loadout.name !== loadoutName);
      localStorage.setItem('loadouts', JSON.stringify(savedLoadouts));
      this.loadAllLoadouts();
    },
    clearAllLoadouts() {
      localStorage.removeItem('loadouts');
      this.loadouts = [];
    }
  }
};
</script>
