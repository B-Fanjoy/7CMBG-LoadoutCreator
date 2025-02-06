<template>
  <div class="p-4 bg-[#303030] min-h-screen text-white rounded-4xl">
    <h1 class="text-5xl font-bold mb-6 py-8 text-center border border-[#F4C356] rounded-3xl">Loadout Creator</h1>

    <!-- Weapons Section -->
    <div class="mb-8 border border-[#F4C356] rounded-3xl">
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

    <!-- Apparel Section -->
    <div class="mb-8 border border-[#F4C356] rounded-3xl">
      <h2 class="text-4xl font-semibold mb-2 mt-2 text-center text-[#F4C356]">Apparel</h2>
      <hr>
      <br>
      <div class="grid grid-cols-3 gap-6">
        <div v-for="section in apparelSections" :key="section.id" class="mb-4 flex flex-col items-center">
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

    <!-- Equipment Section -->
    <div class="mb-8 border border-[#F4C356] rounded-3xl">
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

      <!-- Import String Nav Bar -->
      <nav class="sticky bottom-0">
        <textarea>
          Blah
        </textarea>
      </nav>

    </div>
  </div>
</template>

<script>
import gearData from "/old/gear.json";
import weaponsData from "/old/weapons.json";

export default {
  data() {
    return {
      weapons: weaponsData.sections,
      gear: gearData.sections,
      selectedWeapons: {},
      selectedGear: {},
    };
  },
  computed: {
    weaponSections() {
      return this.weapons.filter(section => ["primary", "secondary", "tertiary"].includes(section.id));
    },
    apparelSections() {
      return this.gear.filter(section => ["uniform", "vest", "backpack", "headgear", "facewear", "insignia"].includes(section.id));
    },
    equipmentSections() {
      return this.gear.filter(section => ["binoculars", "map", "terminal", "communication", "navigation", "watch", "nvgs", "earplugs"].includes(section.id));
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
