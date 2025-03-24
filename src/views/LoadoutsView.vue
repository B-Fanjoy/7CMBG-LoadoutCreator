<template>
  <main class="p-6 m-2 rounded-4xl bg-[#303030] text-white flex">
    <!-- Sidebar with Loadout Names -->
    <aside class="w-1/4 p-4 bg-[#212121] rounded-3xl mr-4">
      <h2 class="text-3xl font-bold text-[#F4C356] mb-4">Loadouts</h2>
      <ul class="space-y-2">
        <li
          v-for="loadout in loadouts"
          :key="loadout.name"
          @click="selectLoadout(loadout)"
          class="cursor-pointer p-2 rounded-lg hover:bg-[#303030] transition-all"
          :class="{'bg-[#303030]': selectedLoadout && selectedLoadout.name === loadout.name}"
        >
          {{ loadout.name }}
        </li>
      </ul>
    </aside>

    <!-- Loadout Details -->
    <section class="w-3/4">
      <div v-if="selectedLoadout" class="p-6 bg-[#212121] border-2 border-[#000000] shadow-lg rounded-3xl">
        <!-- Loadout Name -->
        <h2 class="text-3xl font-bold text-[#F4C356] border-b-2 pb-2 mb-4">{{ selectedLoadout.name }}</h2>

        <!-- Weapons Section -->
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-300">Weapons:</h3>
          <ul class="text-gray-400 text-sm space-y-2">
            <li>
              <strong>Primary:</strong> {{ findItemName(selectedLoadout.loadout[0][0][0]) }}
              <ul class="indent-4">
                <li v-if="selectedLoadout.loadout[0][0][3]">• <strong>Sight:</strong> {{ findItemName(selectedLoadout.loadout[0][0][3]) }}</li>
                <li v-if="selectedLoadout.loadout[0][0][2]">• <strong>Rail:</strong> {{ findItemName(selectedLoadout.loadout[0][0][2]) }}</li>
                <li v-if="selectedLoadout.loadout[0][0][1]">• <strong>Muzzle:</strong> {{ findItemName(selectedLoadout.loadout[0][0][1]) }}</li>
                <li v-if="selectedLoadout.loadout[0][0][6]">• <strong>Undermount:</strong> {{ findItemName(selectedLoadout.loadout[0][0][6]) }}</li>
                <li v-if="selectedLoadout.loadout[0][0][4][0]">• <strong>Primary Magazine:</strong> {{ findItemName(selectedLoadout.loadout[0][0][4][0]) }}</li>
                <li v-if="selectedLoadout.loadout[0][0][5][0]">• <strong>Secondary Magazine:</strong> {{ findItemName(selectedLoadout.loadout[0][0][5][0]) }}</li>
              </ul>
            </li>
            <li>
              <strong>Secondary:</strong> {{ findItemName(selectedLoadout.loadout[0][1][0]) }}
              <ul class="indent-4">
                <li v-if="selectedLoadout.loadout[0][1][3]">• <strong>Sight:</strong> {{ findItemName(selectedLoadout.loadout[0][1][3]) }}</li>
                <li v-if="selectedLoadout.loadout[0][1][2]">• <strong>Rail:</strong> {{ findItemName(selectedLoadout.loadout[0][1][2]) }}</li>
                <li v-if="selectedLoadout.loadout[0][1][1]">• <strong>Muzzle:</strong> {{ findItemName(selectedLoadout.loadout[0][1][1]) }}</li>
                <li v-if="selectedLoadout.loadout[0][1][6]">• <strong>Undermount:</strong> {{ findItemName(selectedLoadout.loadout[0][1][6]) }}</li>
                <li v-if="selectedLoadout.loadout[0][1][4][0]">• <strong>Primary Magazine:</strong> {{ findItemName(selectedLoadout.loadout[0][1][4][0]) }}</li>
                <li v-if="selectedLoadout.loadout[0][1][5][0]">• <strong>Secondary Magazine:</strong> {{ findItemName(selectedLoadout.loadout[0][1][5][0]) }}</li>
              </ul>
            </li>
            <li>
              <strong>Tertiary:</strong> {{ findItemName(selectedLoadout.loadout[0][2][0]) }}
              <ul class="indent-4">
                <li v-if="selectedLoadout.loadout[0][2][3]">• <strong>Sight:</strong> {{ findItemName(selectedLoadout.loadout[0][2][3]) }}</li>
                <li v-if="selectedLoadout.loadout[0][2][2]">• <strong>Rail:</strong> {{ findItemName(selectedLoadout.loadout[0][2][2]) }}</li>
                <li v-if="selectedLoadout.loadout[0][2][1]">• <strong>Muzzle:</strong> {{ findItemName(selectedLoadout.loadout[0][2][1]) }}</li>
                <li v-if="selectedLoadout.loadout[0][2][6]">• <strong>Undermount:</strong> {{ findItemName(selectedLoadout.loadout[0][2][6]) }}</li>
                <li v-if="selectedLoadout.loadout[0][2][4][0]">• <strong>Primary Magazine:</strong> {{ findItemName(selectedLoadout.loadout[0][2][4][0]) }}</li>
                <li v-if="selectedLoadout.loadout[0][2][5][0]">• <strong>Secondary Magazine:</strong> {{ findItemName(selectedLoadout.loadout[0][2][5][0]) }}</li>
              </ul>
            </li>
          </ul>
        </div>

        <!-- Main Gear Section -->
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-300">Main Gear:</h3>
          <ul class="text-gray-400 text-sm space-y-2">
            <li>
              <strong>Uniform:</strong> {{ findItemName(selectedLoadout.loadout[0][3][0]) }}
              <ul class="indent-4">
                <li v-if="selectedLoadout.loadout[0][3][0]"> <strong>Items:</strong></li>
                <ul class="indent-6">
                  <li v-for="item in selectedLoadout.loadout[0][3][1]" :key="item">
                    • {{ item[1] }}x {{ findItemName(item[0]) }}
                  </li>
                </ul>
              </ul>
            </li>
            <li>
              <strong>Vest:</strong> {{ findItemName(selectedLoadout.loadout[0][4][0]) }}
              <ul class="indent-4">
                <li v-if="selectedLoadout.loadout[0][4][0]"> <strong>Items:</strong></li>
                <ul class="indent-6">
                  <li v-for="item in selectedLoadout.loadout[0][4][1]" :key="item">
                    • {{ item[1] }}x {{ findItemName(item[0]) }}
                  </li>
                </ul>
              </ul>
            </li>
            <li>
              <strong>Backpack:</strong> {{ findItemName(selectedLoadout.loadout[0][5][0]) }}
              <ul class="indent-4">
                <li v-if="selectedLoadout.loadout[0][5][0]"> <strong>Items:</strong></li>
                <ul class="indent-6">
                  <li v-for="item in selectedLoadout.loadout[0][5][1]" :key="item">
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
            <li><strong>Headgear:</strong> {{ findItemName(selectedLoadout.loadout[0][6]) }}</li>
            <li><strong>Facewear:</strong> {{ findItemName(selectedLoadout.loadout[0][7]) }}</li>
            <li><strong>Binoculars:</strong> {{ findItemName(selectedLoadout.loadout[0][8][0]) }}</li>
            <li><strong>Map:</strong> {{ findItemName(selectedLoadout.loadout[0][9][0]) }}</li>
            <li><strong>Terminal:</strong> {{ findItemName(selectedLoadout.loadout[0][9][1]) }}</li>
            <li><strong>Communication:</strong> {{ findItemName(selectedLoadout.loadout[0][9][2]) }}</li>
            <li><strong>Navigation:</strong> {{ findItemName(selectedLoadout.loadout[0][9][3]) }}</li>
            <li><strong>Watch:</strong> {{ findItemName(selectedLoadout.loadout[0][9][4]) }}</li>
            <li><strong>NVGs:</strong> {{ findItemName(selectedLoadout.loadout[0][9][5]) }}</li>
            <li><strong>Insignia:</strong> {{ findItemName(selectedLoadout.loadout[1][0][1]) }}</li>
            <li><strong>Earplugs:</strong> {{ selectedLoadout.loadout[1][1][1] === "true" ? "Yes" : "No" }}</li>
          </ul>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col space-y-3">
          <button @click="editLoadout(selectedLoadout)" class="w-full py-3 bg-[#F4C356] text-black font-bold rounded-2xl hover:bg-amber-500 transition-all">Edit in Loadout Creator</button>
          <button @click="copyToClipboard(selectedLoadout.loadout)" class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl flex items-center justify-center space-x-2 transition-all">
            <svg class="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 192l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
            </svg>
            <span>Copy to Clipboard</span>
          </button>
          <button @click="deleteLoadout(selectedLoadout.name)" class="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition-all">Delete Loadout</button>
        </div>
      </div>
      <div v-else class="text-center text-gray-400">
        <p>Select a loadout to view details</p>
      </div>
    </section>
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
  name: 'LoadoutsView',
  data() {
    return {
      weapons: weaponsData.sections,
      gear: gearData.sections,
      items: itemsData.sections,
      loadouts: [],
      selectedLoadout: null
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
      if (this.selectedLoadout && this.selectedLoadout.name === loadoutName) {
        this.selectedLoadout = null;
      }
    },
    async copyToClipboard(loadout) {
      try {
        const loadoutString = JSON.stringify(loadout);
        await navigator.clipboard.writeText(loadoutString);
        alert("Loadout copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy: ", err);
        alert("Failed to copy!");
      }
    },
    selectLoadout(loadout) {
      this.selectedLoadout = loadout;
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
    }
  }
};
</script>
