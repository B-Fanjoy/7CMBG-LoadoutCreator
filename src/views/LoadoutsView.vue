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
        <div class="flex justify-between items-center border-b-2 pb-2 mb-4" @click="toggleLoadout(index)">
          <h2 class="text-3xl font-bold text-[#F4C356]">{{ loadout.name }}</h2>
          <button class="text-[#F4C356] text-2xl">{{ expanded[index] ? '▲' : '▼' }}</button>
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
                <ul class="indent-4">
                  <li v-if="loadout.loadout[0][3][0]"> <strong>Items:</strong></li>
                  <ul class="indent-6">
                    <li v-for="item in loadout.loadout[0][3][1]" :key="item">
                      • {{ item[1] }}x {{ findItemName(item[0]) }}
                    </li>
                  </ul>
                </ul>
              </li>
              <li>
                <strong>Vest:</strong> {{ findItemName(loadout.loadout[0][4][0]) }}
                <ul class="indent-4">
                  <li v-if="loadout.loadout[0][4][0]"> <strong>Items:</strong></li>
                  <ul class="indent-6">
                    <li v-for="item in loadout.loadout[0][4][1]" :key="item">
                      • {{ item[1] }}x {{ findItemName(item[0]) }}
                    </li>
                  </ul>
                </ul>
              </li>
              <li>
                <strong>Backpack:</strong> {{ findItemName(loadout.loadout[0][5][0]) }}
                <ul class="indent-4">
                  <li v-if="loadout.loadout[0][5][0]"> <strong>Items:</strong></li>
                  <ul class="indent-6">
                    <li v-for="item in loadout.loadout[0][5][1]" :key="item">
                      • {{ item[1] }}x {{ findItemName(item[0]) }}
                    </li>
                  </ul>
                </ul>
              </li>
            </ul>
          </div>

          <!-- Additional Gear Section -->
          <div class="mb-4">
            <h3 class="text-lg font-semibold text-gray-300">Other Gear:</h3>
            <ul class="text-gray-400 text-sm">
              <li><strong>Headgear:</strong> {{ findItemName(loadout.loadout[0][6]) }}</li>
              <li><strong>Facewear:</strong> {{ findItemName(loadout.loadout[0][7]) }}</li>
              <li><strong>Binoculars:</strong> {{ findItemName(loadout.loadout[0][8][0]) }}</li>
              <li><strong>Map:</strong> {{ findItemName(loadout.loadout[0][9][0]) }}</li>
              <li><strong>Terminal:</strong> {{ findItemName(loadout.loadout[0][9][1]) }}</li>
              <li><strong>Communication:</strong> {{ findItemName(loadout.loadout[0][9][2]) }}</li>
              <li><strong>Navigation:</strong> {{ findItemName(loadout.loadout[0][9][3]) }}</li>
              <li><strong>Watch:</strong> {{ findItemName(loadout.loadout[0][9][4]) }}</li>
              <li><strong>NVGs:</strong> {{ findItemName(loadout.loadout[0][9][5]) }}</li>
              <li><strong>Inginia:</strong> {{ findItemName(loadout.loadout[1][0][1]) }}</li>
              <li><strong>Earplugs:</strong> {{ findItemName(loadout.loadout[1][1][1]) }}</li>
            </ul>
          </div>

        </div>

        <!-- Actions -->
        <div class="flex gap-2 mt-4">
          <button @click="deleteLoadout(loadout.name)" class="px-3 py-1 bg-red-600 text-white rounded-lg">Delete</button>
          <button @click="editLoadout(loadout)" class="px-3 py-1 bg-green-600 text-white rounded-lg">Edit</button>
          <button @click="copyToClipboard(loadout)" class="px-3 py-1 bg-blue-600 text-white rounded-lg">Copy</button>
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
      const savedLoadouts = JSON.parse(localStorage.getItem('loadouts')) || [];
      this.loadouts = savedLoadouts;
    },
    deleteLoadout(loadoutName) {
      let savedLoadouts = JSON.parse(localStorage.getItem('loadouts')) || [];
      savedLoadouts = savedLoadouts.filter(loadout => loadout.name !== loadoutName);
      localStorage.setItem('loadouts', JSON.stringify(savedLoadouts));
      this.loadAllLoadouts();
    },
    async copyToClipboard(loadout) {
      try {
        const loadoutString = JSON.stringify(loadout.loadout);
        await navigator.clipboard.writeText(loadoutString);
        alert("Loadout copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy: ", err);
        alert("Failed to copy!");
      }
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
