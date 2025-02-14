<template>
  <main class="p-4">
    <h1 class="text-4xl font-bold mb-6">Preset Loadouts</h1>

    <div class="grid grid-cols-2 gap-6">
      <div v-for="preset in presets" :key="preset.name" class="border-2 p-4 rounded-lg bg-gray-800 text-white">
        <h2 class="text-2xl font-semibold">{{ preset.name }}</h2>

        <p class="text-sm text-gray-400">Primary: {{ preset.loadout[0][0][0] || "None" }}</p>
        <p class="text-sm text-gray-400">Secondary: {{ preset.loadout[0][1][0] || "None" }}</p>
        <p class="text-sm text-gray-400">Uniform: {{ preset.loadout[0][3][0] || "None" }}</p>

        <div class="flex gap-2 mt-3">
          <!-- Load Preset Button -->
          <button
            @click="loadPreset(preset)"
            class="flex-1 p-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg"
          >
            Load Preset
          </button>

          <!-- Copy to Clipboard Button -->
          <button
            @click="copyToClipboard(preset.loadout)"
            class="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 fill-white hover:fill-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                d="M320 64V0H64C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V128H352c-17.7 0-32-14.3-32-32zm-64-48 80 80h-80zM64 448V64h192v96c0 17.7 14.3 32 32 32h96v256z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'PresetsView',
  data() {
    return {
      presets: [
        {
          name: "Basic Rifleman",
          loadout: [
            [
              ["tfc_w_c7a2","","","",["",1000],["",1000],""],  // Primary weapon
              ["","","","",["",1000],["",1000],""],            // Secondary weapon
              ["rhs_weap_m72a7","","","",["",1000],["",1000],""], // Tertiary weapon
              ["TFC_CU_CombatUniform_otw_cadpat_MT", []],      // Uniform
              ["TFC_CV_SORD_Ballistic_MT", []],                // Vest
              ["TFC_CB_Smallpack_AR", []],                     // Backpack
              "TFC_CH_CG634_CADPAT_MT",                        // Headgear
              "",                                              // Facewear
              ["rhsusf_bino_m24","","","",["",1000],[],""],    // Binoculars
              ["ItemMap","ItemGPS","","ItemCompass","ItemWatch","TFC_NVG_PVS14"] // Misc gear
            ],
            [
              ["tfc_insignia_7cmbg",""], // Insignia
              ["earplugs","true"]        // Earplugs
            ]
          ]
        },
      ]
    };
  },
  methods: {
    loadPreset(preset) {
      this.$emit('preset-selected', preset.loadout);
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
    }
  }
};
</script>
