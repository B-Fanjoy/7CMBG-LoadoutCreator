<template>
  <main class="p-6 m-2 rounded-4xl bg-[#303030] min-h-screen text-white">
    <!-- Page Title -->
    <h1 class="text-7xl font-bold text-center text-[#F4C356] mb-8">Saved Loadouts</h1>

    <!-- Loadouts Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        v-for="(loadout, index) in loadouts"
        :key="loadout.name"
        class="p-6 bg-[#212121] border-2 border-[#000000] shadow-lg rounded-3xl hover:shadow-2xl transition-all"
      >
        <!-- Loadout Name & Toggle -->
        <div class="flex justify-between items-center border-b-2 pb-2 mb-4">
          <h2 class="text-3xl font-bold text-[#F4C356]">{{ loadout.name }}</h2>
          <button @click="toggleLoadout(index)" class="text-[#F4C356] text-2xl">{{ expanded[index] ? '▲' : '▼' }}</button>
        </div>

        <div v-if="expanded[index]">
          <!-- Weapons Section -->
          <div class="mb-4">
            <h3 class="text-lg font-semibold text-gray-300">Weapons:</h3>
            <ul class="text-gray-400 text-sm space-y-2">
              <li>
                <strong>Primary:</strong> {{ findItemName(loadout.loadout[0][0][0]) }}
                <ul class="indent-4">
                  <li v-if="loadout.loadout[0][0][3]">• <strong>Sight</strong> {{ findItemName(loadout.loadout[0][0][3]) }}</li>
                  <li v-if="loadout.loadout[0][0][2]">• <strong>Rail:</strong> {{ findItemName(loadout.loadout[0][0][2]) }}</li>
                  <li v-if="loadout.loadout[0][0][1]">• <strong>Muzzle:</strong> {{ findItemName(loadout.loadout[0][0][1]) }}</li>
                  <li v-if="loadout.loadout[0][0][6]">• <strong>Undermount:</strong> {{ findItemName(loadout.loadout[0][0][6]) }}</li>
                  <li v-if="loadout.loadout[0][0][4][0]">• <strong>Primary Magazine:</strong> {{ findItemName(loadout.loadout[0][0][4][0]) }}</li>
                  <li v-if="loadout.loadout[0][0][5][0]">• <strong>Secondary Magazine:</strong> {{ findItemName(loadout.loadout[0][0][5][0]) }}</li>
                </ul>
              </li>
              <li>
                <strong>Secondary:</strong> {{ findItemName(loadout.loadout[0][1][0]) }}
                <ul class="indent-4">
                  <li v-if="loadout.loadout[0][1][3]">• <strong>Sight</strong> {{ findItemName(loadout.loadout[0][1][3]) }}</li>
                  <li v-if="loadout.loadout[0][1][2]">• <strong>Rail:</strong> {{ findItemName(loadout.loadout[0][1][2]) }}</li>
                  <li v-if="loadout.loadout[0][1][1]">• <strong>Muzzle:</strong> {{ findItemName(loadout.loadout[0][1][1]) }}</li>
                  <li v-if="loadout.loadout[0][1][6]">• <strong>Undermount:</strong> {{ findItemName(loadout.loadout[0][1][6]) }}</li>
                  <li v-if="loadout.loadout[0][1][4][0]">• <strong>Primary Magazine:</strong> {{ findItemName(loadout.loadout[0][1][4][0]) }}</li>
                  <li v-if="loadout.loadout[0][1][5][0]">• <strong>Secondary Magazine:</strong> {{ findItemName(loadout.loadout[0][1][5][0]) }}</li>
                </ul>
              </li>
              <li>
                <strong>Tertiary:</strong> {{ findItemName(loadout.loadout[0][2][0]) }}
                <ul class="indent-4">
                  <li v-if="loadout.loadout[0][2][3]">• <strong>Sight</strong> {{ findItemName(loadout.loadout[0][2][3]) }}</li>
                  <li v-if="loadout.loadout[0][2][2]">• <strong>Rail:</strong> {{ findItemName(loadout.loadout[0][2][2]) }}</li>
                  <li v-if="loadout.loadout[0][2][1]">• <strong>Muzzle:</strong> {{ findItemName(loadout.loadout[0][2][1]) }}</li>
                  <li v-if="loadout.loadout[0][2][6]">• <strong>Undermount:</strong> {{ findItemName(loadout.loadout[0][2][6]) }}</li>
                  <li v-if="loadout.loadout[0][2][4][0]">• <strong>Primary Magazine:</strong> {{ findItemName(loadout.loadout[0][2][4][0]) }}</li>
                  <li v-if="loadout.loadout[0][2][5][0]">• <strong>Secondary Magazine:</strong> {{ findItemName(loadout.loadout[0][2][5][0]) }}</li>
                </ul>
              </li>
            </ul>
          </div>

          <!-- Main Gear Section -->
          <div class="mb-4">
            <h3 class="text-lg font-semibold text-gray-300">Main Gear:</h3>
            <ul class="text-gray-400 text-sm space-y-2">
              <li>
                <strong>Uniform:</strong> {{ findItemName(loadout.loadout[0][3][0]) }}
                <ul>

                </ul>
              </li>
              <li>
                <strong>Vest:</strong> {{ findItemName(loadout.loadout[0][4][0]) }}
              </li>
              <li>
                <strong>Backpack:</strong> {{ findItemName(loadout.loadout[0][5][0]) }}
              </li>
            </ul>
          </div>

        </div>

        <!-- Actions -->
        <div class="flex gap-2 mt-4">
          <button @click="deleteLoadout(loadout.name)" class="px-3 py-1 bg-red-600 text-white rounded-lg">Delete</button>
          <button @click="editLoadout(loadout)" class="px-3 py-1 bg-green-600 text-white rounded-lg">Edit</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import gearData from "/src/data/gear.json";
import weaponsData from "/src/data/weapons.json";
import itemsData from "/src/data/items.json";
import { useLoadoutStore } from '/src/stores/loadoutStore.js';

export default {
  created() {
    this.loadAllLoadouts();
  },
  name: 'SavedLoadoutsView',
  data() {
    return {
      weapons: weaponsData.sections,
      gear: gearData.sections,
      items: itemsData.sections,
      loadouts: [],
      expanded: []
    };
  },
  methods: {
    editLoadout(loadout) {
      const loadoutStore = useLoadoutStore();
      loadoutStore.setLoadout(loadout.loadout);
      this.$router.push({ name: 'creator' });
    },
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
    },
    toggleLoadout(index) {
      this.expanded[index] = !this.expanded[index];
    },
    findItemName(id) {
      if (!id) return "None";

      // Search Weapons
      for (const section of this.weapons) {
        if (section.weapons) {
          for (const weapon of section.weapons) {
            if (weapon.id === id) return weapon.name;
          }
        }
      }

      // Search Gear
      for (const section of this.gear) {
        if (section.options) {
          for (const option of section.options) {
            if (option.id === id) return option.name;
          }
        }
      }

      // Search Items
      for (const section of this.items) {
        if (section.groupings) {
          for (const group of section.groupings) {
            if (group.options) {
              for (const option of group.options) {
                if (option.id === id) return option.name;
              }
            }
          }
        }
      }

      return id;
    },
  }
};
</script>
