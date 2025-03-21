<template>
  <div class="m-2 p-4 bg-[#303030] text-white rounded-4xl">
    <div class="relative flex justify-evenly mb-4">
      <button @click="openSaveModal" class="bg-green-500 text-white font-bold text-3xl rounded-lg px-4">Save Loadout</button>
      <h1 class="text-7xl font-bold text-center text-[#F4C356]">Loadout Creator</h1>
      <button @click="clearSelections" class="bg-red-500 text-white font-bold text-3xl rounded-lg px-4">Clear Selections</button>
    </div>

    <!-- Weapons Section -->
    <div class="mb-8 border-4 border-[#F4C356] rounded-3xl bg-[#212121]">
      <h2 class="text-4xl font-semibold mb-2 mt-2 text-center text-[#F4C356]">Weapons</h2>
      <hr>
      <br>
      <div class="grid grid-cols-3 gap-6">
        <div v-for="section in weaponSections" :key="section.id" class="mb-4 flex flex-col items-center w-full">
          <label class="block text-lg font-medium mb-1 text-center w-full">{{ section.name }}</label>
          <div class="w-full flex flex-col items-center px-2">
            <select
              v-model="selectedWeapons[section.id]"
              @change="updateAttachments(section.id)"
              class="w-full p-2 bg-[#494949] border border-[#F4C356] rounded focus:outline-none text-center text-[#ffffff]"
            >
              <option v-for="weapon in section.weapons" :key="weapon.id" :value="weapon.id">
                {{ weapon.name }}
              </option>
            </select>
            <div v-if="selectedWeapons[section.id]" class="flex flex-col w-full mt-2 transition-opacity duration-500 ease-in-out opacity-100 transform translate-y-0" :class="{'opacity-0 translate-y-[-10px]': !selectedWeapons[section.id]}">
              <template v-for="(attachments, type) in getAttachments(section.id)" :key="type">
                <label v-if="attachments.length" class="w-full capitalize"> {{ type }}:
                  <select v-model="selectedAttachments[section.id][type]" class="w-full p-2 text-center bg-[#494949] border border-[#F4C356] rounded">
                    <option v-for="attachment in attachments" :key="attachment.id" :value="attachment.id">
                      {{ attachment.name }}
                    </option>
                  </select>
                </label>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Gear Section -->
    <div class="mb-8 border-4 border-[#F4C356] rounded-3xl bg-[#212121]">
      <h2 class="text-4xl font-semibold mb-2 mt-2 text-center text-[#F4C356]">Main Gear</h2>
      <hr>
      <br>
      <div class="grid grid-cols-3 gap-4">
        <div v-for="section in maingearSections" :key="section.id" class="mb-4 flex flex-col items-center">
          <label class="block text-lg font-medium mb-1 text-center w-full">{{ section.name }}</label>

          <div class="w-full flex flex-col justify-center">
            <select
              v-model="selectedGear[section.id]"
              class="w-auto p-2 mx-5 bg-[#494949] border border-[#F4C356] rounded focus:outline-none text-center text-[#ffffff]"
            >
              <option v-for="option in section.options" :key="option.id" :value="option.id">
                {{ option.name }}
              </option>
            </select>

            <!-- Weight Progress Bar -->
            <div class="w-full px-5">
              <div class="relative w-full bg-gray-700 rounded-full h-4">
                <div
                  class="h-4 rounded-full ease-in-out transition-all duration-500"
                  :class="getProgressBarColor(section.id)"
                  :style="{ width: getLoadPercentage(section.id) + '%' }"
                ></div>
                <span class="absolute inset-0 flex items-center justify-center text-xs text-center">
                  {{ getTotalLoad(section.id) }} / {{ getMaxLoad(section.id) }} lb
                </span>
              </div>
            </div>

            <!-- Item List -->
            <ul :id="section.id + 'GearList'" class="w-auto flex flex-col mx-5 mt-3 p-2 list-none border-1 rounded-2xl">
              <li v-for="(item, index) in selectedItems[section.id]" :key="index"
                  class="p-2 border-b-2 border-dashed grid grid-cols-[minmax(0,1fr)_auto_auto_auto_auto] items-center gap-2">

                <div class="truncate text-[1rem]">{{ getItemName(item.id) }}</div>

                <button @click="updateQuantity(section.id, item.id, -1)" class="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-700">
                  -
                </button>

                <span class="text-lg font-semibold px-2">{{ item.quantity }}</span>

                <button @click="updateQuantity(section.id, item.id, 1)" class="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-700">
                  +
                </button>

                <button @click="removeItem(section.id, index)" class="p-1 ml-2 text-red-500 hover:text-red-700 border-2 rounded-2xl">
                  Remove
                </button>
              </li>
            </ul>

            <button
              @click="openItemsModal(section.id)"
              class="mt-2 mx-4 p-2 border-2 border-[#000000] rounded-2xl bg-[#F4C356] hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="!selectedGear[section.id]"
            >
              + Add Item
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Items Modal -->
    <div>
      <ItemsModal :isOpen="showModal" :currentContainer="selectedContainer"  @update:isOpen="showModal = $event" @add-item="addItemToList"></ItemsModal>
    </div>

    <!-- Save Modal -->
    <div>
      <SaveModal :isOpen="showSaveModal" :currentLoadout="generateImportString" @update:isOpen="showSaveModal = $event"></SaveModal>
    </div>

    <!-- Equipment Section -->
    <div class="mb-8 border-4 border-[#F4C356] rounded-3xl bg-[#212121]">
      <h2 class="text-4xl font-semibold mb-2 mt-2 text-center text-[#F4C356]">Equipment</h2>
      <hr>
      <br>

      <!-- Main Grid -->
      <div class="grid grid-cols-3 gap-6">
        <template v-for="(section, index) in equipmentSections" :key="section.id">
          <div
            v-if="index < lastFullRowStart"
            class="mb-4 flex flex-col items-center"
          >
            <label class="block text-lg font-medium mb-1 text-center w-full">{{ section.name }}</label>
            <div class="w-full flex justify-center">
              <select
                v-model="selectedGear[section.id]"
                class="w-full p-2 ms-4 me-4 bg-[#494949] border border-[#F4C356] rounded focus:outline-none text-center text-[#ffffff]"
              >
                <option v-for="option in section.options" :key="option.id" :value="option.id">
                  {{ option.name }}
                </option>
              </select>
            </div>
          </div>
        </template>
      </div>

      <!-- Last Row - Centered When Not Full -->
      <div v-if="isLastRowCentered" class="flex justify-center gap-6 mt-4">
        <div v-for="(section) in lastRowItems" :key="section.id" class="mb-4 flex flex-grow flex-col items-center">
          <label class="block text-lg font-medium mb-1 text-center w-full">{{ section.name }}</label>
          <div class="w-full flex justify-center">
            <select
              v-model="selectedGear[section.id]"
              class="w-full p-2 ms-4 me-4 bg-[#494949] border border-[#F4C356] rounded focus:outline-none text-center text-[#ffffff]"
            >
              <option v-for="option in section.options" :key="option.id" :value="option.id">
                {{ option.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Import String Nav Bar -->
    <nav class="sticky bottom-0 border-4 border-[#F4C356] shadow-2xl rounded-3xl bg-[#212121]">
      <div class="p-4 border-4 border-[#F4C356] rounded-t-2xl text-center">
        <h2 class="text-3xl font-bold text-[#F4C356]">Total Loadout Weight</h2>
        <p class="text-2xl font-semibold mt-2" :class="getTotalWeightColor()">
          {{ getTotalWeight() }} lb
        </p>
      </div>
      <div class="flex items-center h-25">
        <!-- Copy Icon with Tooltip -->
        <div class="relative group">
          <svg
            @click="copyToClipboard"
            class="w-12 h-20 ml-6 m-3 fill-white transition-all duration-300 hover:fill-[#F4C356] cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path
              d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7
              64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112
              192l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
            />
          </svg>
          <!-- Tooltip -->
          <div
            class="absolute bottom-[80%] left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
          >
            Copy to Clipboard
          </div>
        </div>
        <!-- Import String Textarea -->
        <textarea
          disabled
          class="flex-grow m-2.5 h-20 rounded-[4px] border-2 resize-none app-container"
          :value="generateImportString"
        ></textarea>
      </div>
    </nav>

  </div>
</template>

<style scoped>
.app-container {
  overflow-y: auto;
}

.app-container::-webkit-scrollbar {
  width: 6px;
}

.app-container::-webkit-scrollbar-track {
  background: #2e2e2e;
  border-radius: 10px;
}

.app-container::-webkit-scrollbar-thumb {
  background: #F4C356;
  border-radius: 10px;
}

.app-container::-webkit-scrollbar-thumb:hover {
  background: #f49556;
}
</style>

<script>
import gearData from "/src/data/gear.json";
import weaponsData from "/src/data/weapons.json";
import itemsData from "/src/data/items.json";
import ItemsModal from '/src/components/ItemsModal.vue';
import { useLoadoutStore } from '/src/stores/loadoutStore.js';
import SaveModal from "@/components/SaveModal.vue";

export default {
  setup() {
    const loadoutStore = useLoadoutStore();
    return { loadout: loadoutStore.selectedLoadout };
  },
  mounted() {
    if (this.loadout) {
      this.loadLoadout({ loadout: this.loadout });
      const loadoutStore = useLoadoutStore();
      loadoutStore.clearLoadout();
    } else {
      console.warn('No loadout found in store.');
    }
  },
  created() {
    const savedWeapons = JSON.parse(localStorage.getItem('selectedWeapons')) || {};
    const savedAttachments = JSON.parse(localStorage.getItem('selectedAttachments')) || {};
    const savedGear = JSON.parse(localStorage.getItem('selectedGear')) || {};
    const savedItems = JSON.parse(localStorage.getItem('selectedItems')) || {
      uniform: [],
      vest: [],
      backpack: []
    };
    if (savedWeapons["primary"] || savedWeapons["secondary"] || savedWeapons["tertiary"]
      || savedAttachments["primary"] || savedAttachments["secondary"] || savedAttachments["tertiary"]
      || savedGear["uniform"] || savedGear["vest"] || savedGear["backpack"]
      || savedItems["uniform"].length > 0 || savedItems["vest"].length > 0 || savedItems["backpack"].length > 0
      || savedGear["headgear"] || savedGear["facewear"] || savedGear["binoculars"] || savedGear["map"]
      || savedGear["terminal"] || savedGear["communication"] || savedGear["navigation"] || savedGear["watch"]
      || savedGear["nvgs"] || savedGear["insignia"]
    ) {
      this.selectedWeapons = savedWeapons;
      this.selectedAttachments = savedAttachments;
      this.selectedGear = savedGear;
      this.selectedItems = savedItems;
    } else {
      this.clearSelections();
    }
  },
  components: {
    ItemsModal,
    SaveModal
  },
  data() {
    return {
      weapons: weaponsData.sections,
      gear: gearData.sections,
      items: itemsData.sections,
      selectedWeapons: {},
      selectedAttachments: {},
      selectedGear: {},
      selectedItems: {
        uniform: [],
        vest: [],
        backpack: []
      },
      showModal: false,
      showSaveModal: false,
    };
  },
  watch: {
    selectedWeapons: {
      handler(newVal) {
        localStorage.setItem('selectedWeapons', JSON.stringify(newVal));
      },
      deep: true,
    },
    selectedAttachments: {
      handler(newVal) {
        localStorage.setItem('selectedAttachments', JSON.stringify(newVal));
      },
      deep: true,
    },
    selectedGear: {
      handler(newVal) {
        localStorage.setItem('selectedGear', JSON.stringify(newVal));
      },
      deep: true,
    },
    selectedItems: {
      handler(newVal) {
        localStorage.setItem('selectedItems', JSON.stringify(newVal));
      },
      deep: true,
    }
  },
  methods: {
    saveLoadout() {
      let savedLoadouts = JSON.parse(localStorage.getItem('loadouts')) || [];
      let newName = prompt("Enter a name for the loadout:");
      if (newName === "") {
        alert("Name cannot be blank.");
        return;
      }
      else if (newName === savedLoadouts.find(loadout => loadout.name === newName)?.name) {
        alert("Name already exists. Please choose a different name.");
        return;
      }
      savedLoadouts.push({
        name: newName,
        loadout: JSON.parse(this.generateImportString)
      });
      localStorage.setItem('loadouts', JSON.stringify(savedLoadouts));
      alert('Loadout saved successfully!');
    },
    clearSelections() {
      this.selectedWeapons = this.weaponSections.reduce((acc, section) => {
        acc[section.id] = section.weapons.length > 0 ? section.weapons[0].id : "";
        return acc;
      }, {});
      this.selectedAttachments = {
        primary: {
          muzzles: '',
          rails: '',
          sights: '',
          primaryMagazines: '',
          secondaryMagazines: '',
          undermounts: ''
        },
        secondary: {
          muzzles: '',
          rails: '',
          sights: '',
          primaryMagazines: '',
          secondaryMagazines: '',
          undermounts: ''
        },
        tertiary: {
          muzzles: '',
          rails: '',
          sights: '',
          primaryMagazines: '',
          secondaryMagazines: '',
          undermounts: ''
        }
      };
      this.selectedGear = this.gear.reduce((acc, section) => {
        acc[section.id] = section.options.length > 0 ? section.options[0].id : "";
        return acc;
      }, {});
      this.selectedItems = {
        uniform: [],
        vest: [],
        backpack: []
      };
    },
    openItemsModal(section) {
      this.selectedContainer = section;
      this.showModal = true;
    },
    openSaveModal() {
      this.showSaveModal = true;
    },
    addItemToList({ container, item }) {
      const itemWeight = Number(this.getItemWeight(item));
      const currentLoad = Number(this.getTotalLoad(container));
      const maxLoad = Number(this.getMaxLoad(container));

      if (currentLoad + itemWeight > maxLoad) {
        alert("Cannot add item: Exceeds max weight limit!");
        return;
      }

      const existingItem = this.selectedItems[container].find(i => i.id === item);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.selectedItems[container].push({ id: item, quantity: 1, loaded: 1000 });
      }

      this.sortItems(container);
    },
    loadLoadout({ loadout }) {
      const [weapons, equipment] = loadout;
      const [primary, secondary, tertiary, uniform, vest, backpack, headgear, facewear, binoculars, misc] = weapons;
      const [insignia, earplugs] = equipment;

      this.selectedWeapons = {
        primary: primary[0],
        secondary: secondary[0],
        tertiary: tertiary[0]
      };

      this.selectedAttachments = {
        primary: {
          muzzles: primary[1],
          rails: primary[2],
          sights: primary[3],
          primaryMagazines: primary[4][0],
          secondaryMagazines: primary[5][0],
          undermounts: primary[6]
        },
        secondary: {
          muzzles: secondary[1],
          rails: secondary[2],
          sights: secondary[3],
          primaryMagazines: secondary[4][0],
          secondaryMagazines: secondary[5][0],
          undermounts: secondary[6]
        },
        tertiary: {
          muzzles: tertiary[1],
          rails: tertiary[2],
          sights: tertiary[3],
          primaryMagazines: tertiary[4][0],
          secondaryMagazines: tertiary[5][0],
          undermounts: tertiary[6]
        }
      };

      this.selectedGear = {
        uniform: uniform[0],
        vest: vest[0],
        backpack: backpack[0],
        headgear: headgear,
        facewear: facewear,
        binoculars: binoculars[0],
        map: misc[0],
        terminal: misc[1],
        communication: misc[2],
        navigation: misc[3],
        watch: misc[4],
        nvgs: misc[5],
        insignia: insignia[1],
        earplugs: earplugs[1]
      };

      this.selectedItems = {
        uniform: uniform[1].map(([id, quantity, loaded]) => ({ id, quantity, loaded })),
        vest: vest[1].map(([id, quantity, loaded]) => ({ id, quantity, loaded })),
        backpack: backpack[1].map(([id, quantity, loaded]) => ({ id, quantity, loaded }))
      };

      Object.keys(this.selectedItems).forEach((container) => {
        this.sortItems(container);
      });
    },
    removeItem(section, index) {
      this.selectedItems[section].splice(index, 1);
    },
    updateQuantity(container, itemId, change) {
      const itemWeight = Number(this.getItemWeight(itemId));
      const currentLoad = Number(this.getTotalLoad(container));
      const maxLoad = Number(this.getMaxLoad(container));

      if (change === 1) {
        if (currentLoad + itemWeight > maxLoad) {
          alert("Cannot add item: Exceeds max weight limit!");
          return;
        }
      }

      const item = this.selectedItems[container].find(i => i.id === itemId);
      if (item) {
        item.quantity += change;

        // Remove item if quantity drops to 0
        if (item.quantity <= 0) {
          this.selectedItems[container] = this.selectedItems[container].filter(i => i.id !== itemId);
        }
      }

      this.sortItems(container);
    },
    sortItems(container) {
      this.selectedItems[container].sort((a, b) => {
        const nameA = this.getItemName(a.id).toLowerCase();
        const nameB = this.getItemName(b.id).toLowerCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        // If names are equal, sort by quantity (descending)
        return b.quantity - a.quantity;
      });
    },
    getItemName(itemId) {
      for (let section of this.items) {
        for (let group of section.groupings) {
          let foundItem = group.options.find(item => item.id === itemId);
          if (foundItem) return foundItem.name;
        }
      }
      return itemId;
    },
    getItemWeight(itemId) {
      for (let section of this.items) {
        for (let group of section.groupings) {
          let foundItem = group.options.find(item => item.id === itemId);
          if (foundItem) return foundItem.weight;
        }
      }
      return null;
    },
    isSpecialItem(itemId) {
      for (let section of this.items) {
        if (["magazines", "throwables", "explosives"].includes(section.id)) { // Check category
          for (let group of section.groupings) {
            let foundItem = group.options.find(item => item.id === itemId);
            if (foundItem) {
              return true;
            }
          }
        }
      }
      return false;
    },
    getMaxLoad(container) {
      const selectedItem = this.gear.find(section => section.id === container)
        ?.options.find(option => option.id === this.selectedGear[container]);

      let maxLoad = selectedItem?.load || 0;
      return maxLoad.toFixed(2);
    },
    getTotalLoad(container) {
      return this.selectedItems[container].reduce((total, item) => {
        const itemData = this.items.flatMap(section => section.groupings)
          .flatMap(group => group.options)
          .find(option => option.id === item.id);
        return total + (itemData?.weight || 0) * item.quantity;
      }, 0).toFixed(2);
    },
    getLoadPercentage(container) {
      const maxLoad = this.getMaxLoad(container);
      const totalLoad = this.getTotalLoad(container);
      return maxLoad > 0 ? Math.min((totalLoad / maxLoad) * 100, 100) : 0;
    },
    getProgressBarColor(container) {
      const percentage = this.getLoadPercentage(container);
      return percentage < 75 ? "bg-green-500" : percentage < 100 ? "bg-yellow-500" : "bg-red-500";
    },
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.generateImportString);
        alert("Loadout copied to clipboard!\n\nOpen ACE Arsenal and click 'Import' at the bottom of the screen to load the loadout.\n\nNote: ACE Arsenal just takes whatever value is in your clipboard when you click 'Import'.");
      } catch (err) {
        console.error("Failed to copy: ", err);
        alert("Failed to copy!");
      }
    },
    updateAttachments(sectionId) {
      const weaponId = this.selectedWeapons[sectionId];
      const section = this.weapons.find(sec => sec.id === sectionId);
      if (!section) return;

      const weapon = section.weapons.find(w => w.id === weaponId);
      this.selectedAttachments[sectionId] = weapon ? {
        sights: '',
        rails: '',
        muzzles: '',
        undermounts: '',
        primaryMagazines: '',
        secondaryMagazines: ''
      } : {};
    },
    getAttachments(sectionId) {
      const weaponId = this.selectedWeapons[sectionId];
      const section = this.weapons.find(sec => sec.id === sectionId);
      if (!section) return {};

      const weapon = section.weapons.find(w => w.id === weaponId);
      return weapon ? weapon.attachments : {
        sights: [],
        rails: [],
        muzzles: [],
        undermounts: [],
        primaryMagazines: [],
        secondaryMagazines: []
      };
    },
    getWeaponsWeight() {
      let total = 0;

      Object.entries(this.selectedWeapons).forEach(([weaponSection, weaponId]) => {
        let weapon = this.weapons.flatMap(section => section.weapons).find(w => w.id === weaponId);
        if (weapon) total += weapon.weight || 0;

        let attachments = this.selectedAttachments[weaponSection];
        if (attachments) {
          Object.values(attachments).forEach(attachmentId => {
            let attachment = this.items.flatMap(section => section.groupings)
              .flatMap(group => group.options)
              .find(option => option.id === attachmentId);
            if (attachment) total += attachment.weight || 0;
          });
        }
      });

      return total;
    },
    getGearWeight() {
      let total = 0;

      Object.entries(this.selectedGear).forEach(([, gearId]) => {
        let gearItem = this.gear.flatMap(section => section.options).find(g => g.id === gearId);
        if (gearItem) total += gearItem.weight || 0;
      });

      return total;
    },
    getItemsWeight() {
      let total = 0;

      Object.values(this.selectedItems).forEach(items => {
        items.forEach(item => {
          let itemData = this.items.flatMap(section => section.groupings)
            .flatMap(group => group.options)
            .find(option => option.id === item.id);

          if (itemData) total += (itemData.weight || 0) * item.quantity;
        });
      });

      return total;
    },
    getTotalWeight() {
      return (
        this.getWeaponsWeight() +
        this.getGearWeight() +
        this.getItemsWeight()
      ).toFixed(2);
    },
    getTotalWeightColor() {
      let totalWeight = this.getTotalWeight();
      if (totalWeight <= 60) {
        return "text-green-400"
      }
      else if (totalWeight > 60 && totalWeight <= 80) {
        return "text-yellow-400"
      }
      else {
        return "text-red-500"
      }
    }
  },
  computed: {
    weaponSections() {
      return this.weapons.filter(section => ["primary", "secondary", "tertiary"].includes(section.id));
    },
    maingearSections() {
      return this.gear.filter(section => ["uniform", "vest", "backpack"].includes(section.id));
    },
    equipmentSections() {
      return this.gear.filter(section => ["headgear", "facewear", "insignia", "binoculars", "map", "terminal", "communication", "navigation", "watch", "nvgs", "earplugs"].includes(section.id));
    },
    lastFullRowStart() {
      return Math.floor(this.equipmentSections.length / 3) * 3;
    },
    isLastRowCentered() {
      return this.equipmentSections.length % 3 !== 0;
    },
    lastRowItems() {
      return this.equipmentSections.slice(this.lastFullRowStart);
    },
    generateImportString() {
      // Extract selected weapons
      const primaryWeapon = this.selectedWeapons.primary || "";
      const primaryAttachments = this.selectedAttachments.primary || "";
      const secondaryWeapon = this.selectedWeapons.secondary || "";
      const secondaryAttachments = this.selectedAttachments.secondary || "";
      const tertiaryWeapon = this.selectedWeapons.tertiary || "";
      const tertiaryAttachments = this.selectedAttachments.tertiary || "";

      // Function to format selected items with 'loaded' value if applicable
      const formatItems = (items) => items.map(item => {
        const isSpecialItem = this.isSpecialItem(item.id);
        return isSpecialItem ? [item.id, item.quantity, 1000] : [item.id, item.quantity];
      });

      const uniform = [this.selectedGear.uniform || "", formatItems(this.selectedItems.uniform)];
      const vest = [this.selectedGear.vest || "", formatItems(this.selectedItems.vest)];
      const backpack = [this.selectedGear.backpack || "", formatItems(this.selectedItems.backpack)];

      // Extract selected headwear
      const headgear = this.selectedGear.headgear || "";
      const facewear = this.selectedGear.facewear || "";

      // Extract selected equipment
      const binoculars = [
        this.selectedGear.binoculars || "",
        "",
        "",
        "",
        ["", 1000],
        [],
        ""
      ];
      const map = this.selectedGear.map || "";
      const terminal = this.selectedGear.terminal || "";
      const communication = this.selectedGear.communication || "";
      const navigation = this.selectedGear.navigation || "";
      const watch = this.selectedGear.watch || "";
      const nvgs = this.selectedGear.nvgs || "";

      // Special items
      const insignia = ["ace_arsenal_insignia", this.selectedGear.insignia || ""];
      const earplugs = ["earplugs", this.selectedGear.earplugs || false];

      // Construct the loadout array
      const loadout = [
        [
          [primaryWeapon, primaryAttachments.muzzles || "", primaryAttachments.rails || "", primaryAttachments.sights || "", [primaryAttachments.primaryMagazines || "", 1000], [primaryAttachments.secondaryMagazines || "", 1000], primaryAttachments.undermounts || ""], // Primary weapon
          [secondaryWeapon, secondaryAttachments.muzzles || "", secondaryAttachments.rails || "", secondaryAttachments.sights || "", [secondaryAttachments.primaryMagazines || "", 1000], [secondaryAttachments.secondaryMagazines || "", 1000], secondaryAttachments.undermounts || ""], // Secondary weapon
          [tertiaryWeapon, tertiaryAttachments.muzzles || "", tertiaryAttachments.rails || "", tertiaryAttachments.sights || "", [tertiaryAttachments.primaryMagazines || "", 1000], [tertiaryAttachments.secondaryMagazines || "", 1000], tertiaryAttachments.undermounts || ""], // Tertiary weapon
          uniform,
          vest,
          backpack,
          headgear,
          facewear,
          binoculars,
          [map, terminal, communication, navigation, watch, nvgs]
        ],
        [
          insignia,
          earplugs
        ]
      ];

      return JSON.stringify(loadout);
    },
  },
};
</script>
