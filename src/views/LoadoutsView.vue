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
          <div class="mb-4" v-if="filteredWeapons(index).length">
            <h3 class="text-lg font-semibold text-gray-300">Weapons:</h3>
            <ul class="text-gray-400 text-sm space-y-2">
              <li v-for="(weapon, wIndex) in filteredWeapons(index)" :key="wIndex">
                <strong>{{ findItemName(weapon[0]) }}</strong>
                <ul class="ml-4 text-gray-500 text-xs">
                  <li v-if="weapon[2]">Attachment: {{ weapon[2] }}</li>
                  <li v-if="weapon[3]">Scope: {{ weapon[3] }}</li>
                  <li v-if="weapon[4] && Array.isArray(weapon[4])">Ammo: {{ weapon[4][0] }} ({{ weapon[4][1] }})</li>
                </ul>
              </li>
            </ul>
          </div>

          <!-- Gear Section -->
          <div class="mb-4" v-if="filteredGear(index).length">
            <h3 class="text-lg font-semibold text-gray-300">Gear:</h3>
            <ul class="text-gray-400 text-sm space-y-2">
              <li v-if="filteredGear(index)[0]"> <strong>Uniform:</strong> {{ filteredGear(index)[0] }}</li>
              <li v-if="filteredGear(index)[1]"> <strong>Vest:</strong> {{ filteredGear(index)[1] }}</li>
              <li v-if="filteredGear(index)[2]"> <strong>Backpack:</strong> {{ filteredGear(index)[2] }}</li>
              <li v-if="filteredGear(index)[3]"> <strong>Helmet:</strong> {{ filteredGear(index)[3] }}</li>
              <li v-if="filteredGear(index)[4]"> <strong>Goggles:</strong> {{ filteredGear(index)[4] }}</li>
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
  computed: {
    filteredWeapons() {
      return (index) => {
        const loadout = this.loadouts[index];
        return loadout?.loadout?.[0]?.filter(item => Array.isArray(item) && item.length > 0) || [];
      };
    },
    filteredGear() {
      return (index) => {
        const loadout = this.loadouts[index]?.loadout?.[0] || [];
        return [
          loadout[3]?.[0] || '',
          loadout[4]?.[0] || '',
          loadout[5]?.[0] || '',
          typeof loadout[6] === 'string' ? loadout[6] : '',
          typeof loadout[7] === 'string' ? loadout[7] : ''
        ];
      };
    }
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
