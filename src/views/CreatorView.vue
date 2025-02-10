<template>
  <div class="p-4 mb-10 bg-[#303030] text-white rounded-4xl">
    <h1 class="text-5xl font-bold mb-6 py-8 text-center border-6 border-[#F4C356] rounded-3xl">Loadout Creator</h1>

    <!-- Weapons Section -->
    <div class="mb-8 border-4 border-[#F4C356] rounded-3xl">
      <h2 class="text-4xl font-semibold mb-2 mt-2 text-center text-[#F4C356]">Weapons</h2>
      <hr>
      <br>
      <div class="grid grid-cols-3 gap-6">
        <div v-for="section in weaponSections" :key="section.id" class="mb-4 flex flex-col items-center">
          <label class="block text-lg font-medium mb-1 text-center w-full">{{ section.name }}</label>
          <div class="w-full flex justify-center">
            <select
              v-model="selectedWeapons[section.id]"
              class="w-full p-2 ms-4 me-4 bg-[#494949] border border-[#F4C356] rounded focus:outline-none text-center text-[#ffffff]"
            >
              <option v-for="weapon in section.weapons" :key="weapon.id" :value="weapon.id">
                {{ weapon.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Gear Section -->
    <div class="mb-8 border-4 border-[#F4C356] rounded-3xl">
      <h2 class="text-4xl font-semibold mb-2 mt-2 text-center text-[#F4C356]">Main Gear</h2>
      <hr>
      <br>
      <div class="grid grid-cols-3 gap-4">
        <div v-for="section in maingearSections" :key="section.id" class="mb-4 flex flex-col items-center">
          <label class="block text-lg font-medium mb-1 text-center w-full">{{ section.name }}</label>
          <div class="w-full flex flex-col justify-center">
            <select
              v-model="selectedGear[section.id]"
              class=" w-auto p-2 mx-5 bg-[#494949] border border-[#F4C356] rounded focus:outline-none text-center text-[#ffffff]"
            >
              <option v-for="option in section.options" :key="option.id" :value="option.id">
                {{ option.name }}
              </option>
            </select>
            <ul :id="itemList[section.id]" class="w-auto flex flex-col mx-5 mt-3 p-2 list-none border-1 rounded-2xl"></ul>
            <button @click="addItem()" class="mt-2 mx-4 p-2 border-2 border-[#000000] rounded-2xl bg-[#F4C356] hover:bg-amber-500">+ Add Item</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Equipment Section -->
    <div class="mb-8 border-4 border-[#F4C356] rounded-3xl">
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
    <nav class="sticky bottom-0 bg-[#3c3c3c] border-4 border-[#F4C356] shadow-2xl rounded-2xl">
      <div class="flex items-center h-25">
        <svg
          class="w-12 h-20 ml-6 m-3 fill-white transition-all duration-300 hover:fill-[#F4C356]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path
            d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7
            64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112
            192l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
          />
        </svg>
        <textarea
          disabled
          class="flex-grow m-2.5 h-20 rounded-[4px] border-2 resize-none"
          :value="generateImportString"
        ></textarea>
      </div>
    </nav>
  </div>
</template>

<script>
import gearData from "/src/data/gear.json";
import weaponsData from "/src/data/weapons.json";
import itemsData from "/src/data/items.json";

export default {
  data() {
    return {
      weapons: weaponsData.sections,
      gear: gearData.sections,
      items: itemsData.sections,
      selectedWeapons: {},
      selectedGear: {},
      itemList: {},
    };
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
      const secondaryWeapon = this.selectedWeapons.secondary || "";
      const tertiaryWeapon = this.selectedWeapons.tertiary || "";

      // Extract selected main gear
      const uniform = [this.selectedGear.uniform || "", []];
      const vest = [this.selectedGear.vest || "", []];
      const backpack = [this.selectedGear.backpack || "", []];

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
      const insignia = [this.selectedGear.insignia || "", ""];
      const earplugs = ["earplugs", this.selectedGear.earplugs || false];

      // Construct the loadout array
      const loadout = [
        [
          [primaryWeapon, "", "", "", ["", 1000], ["", 1000], ""], // Primary weapon
          [secondaryWeapon, "", "", "", ["", 1000], ["", 1000], ""], // Secondary weapon
          [tertiaryWeapon, "", "", "", ["", 1000], ["", 1000], ""], // Tertiary weapon
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
    }
  },
  created() {
    this.selectedWeapons = this.weaponSections.reduce((acc, section) => {
      acc[section.id] = section.weapons.length > 0 ? section.weapons[0].id : "";
      return acc;
    }, {});

    this.selectedGear = this.gear.reduce((acc, section) => {
      acc[section.id] = section.options.length > 0 ? section.options[0].id : "";
      return acc;
    }, {});
  },
};
</script>
