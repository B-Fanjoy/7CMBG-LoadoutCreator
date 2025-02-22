<template>
  <main class="p-4">
    <h1 class="text-4xl font-bold mb-6">Preset Loadouts</h1>

    <div class="grid grid-cols-2 gap-6">
      <div v-for="preset in presets" :key="preset.name" class="border-2 p-4 rounded-lg bg-gray-800 text-white">
        <h2 class="text-2xl font-semibold">{{ preset.name }}</h2>

        <p class="text-sm text-gray-400">Primary: {{ preset.loadout[0][0][0] }}</p>
        <p class="text-sm text-gray-400">Secondary: {{ preset.loadout[0][1][0] }}</p>
        <p class="text-sm text-gray-400">Tertiary: {{ preset.loadout[0][2][0] }}</p>
        <p class="text-sm text-gray-400">Uniform: {{ preset.loadout[0][3][0] }}</p>
        <p class="text-sm text-gray-400">Uniform Items: {{ preset.loadout[0][3][1] }}</p>
        <p class="text-sm text-gray-400">Vest: {{ preset.loadout[0][4][0] }}</p>
        <p class="text-sm text-gray-400">Vest Items: {{ preset.loadout[0][4][1] }}</p>
        <p class="text-sm text-gray-400">Backpack: {{ preset.loadout[0][5][0] }}</p>
        <p class="text-sm text-gray-400">Backpack Items: {{ preset.loadout[0][5][1] }}</p>
        <p class="text-sm text-gray-400">Headgear: {{ preset.loadout[0][6] }}</p>
        <p class="text-sm text-gray-400">Facewear: {{ preset.loadout[0][7] }}</p>
        <p class="text-sm text-gray-400">Binoculars: {{ preset.loadout[0][8][0] }}</p>
        <p class="text-sm text-gray-400">Map: {{ preset.loadout[0][9][0] }}</p>
        <p class="text-sm text-gray-400">Terminal: {{ preset.loadout[0][9][1] }}</p>
        <p class="text-sm text-gray-400">Communication: {{ preset.loadout[0][9][2] }}</p>
        <p class="text-sm text-gray-400">Navigation: {{ preset.loadout[0][9][3] }}</p>
        <p class="text-sm text-gray-400">Watch: {{ preset.loadout[0][9][4] }}</p>
        <p class="text-sm text-gray-400">NVGs: {{ preset.loadout[0][9][5] }}</p>
        <p class="text-sm text-gray-400">Insignia: {{ preset.loadout[1][0][0] }}</p>
        <p class="text-sm text-gray-400">Earplugs: {{ preset.loadout[1][1][1] }}</p>

        <div class="flex gap-2 mt-3">
          <!-- Edit Preset Button -->
          <button
            @click="editPreset(preset)"
            class="flex-1 p-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg"
          >
            Edit Preset in Loadout Creator
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
                  d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7
                  64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112
                  192l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
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
          name: "Rifleman",
          loadout: [
            [
              ["tfc_w_c7a2","","TFC_WA_peq15_blk","TFC_WA_C79_Elcan",["rhs_mag_30Rnd_556x45_Mk262_Stanag",1000],["",1000],"TFC_WA_Virtgrip"], // Primary weapon
              ["","","","",["",1000],["",1000],""], // Secondary weapon
              ["rhs_weap_m72a7","","rhsusf_acc_anpeq15side","",["",1000],["",1000],""], // Tertiary weapon
              ["TFC_CU_CombatUniform_otw_cadpat_MT",
                [
                  ["ACE_packingBandage", 6],
                  ["ACE_tourniquet", 4],
                  ["ACE_elasticBandage", 6],
                  ["kat_chestSeal", 2],
                  ["ACE_splint", 4],
                  ["kat_mask_M50", 1],
                  ["kat_gasmaskFilter", 2],
                  ["ACE_CableTie", 2],
                  ["ACE_EarPlugs", 1],
                  ["ACE_painkillers", 1, 10]
                ]
              ], // Uniform
              ["TFC_CV_SORD_Ballistic_MT",
                [
                  ["ACE_Flashlight_XL50", 1],
                  ["ACE_MapTools", 1],
                  ["ACRE_PRC343", 1],
                  ["SmokeShell", 2, 1],
                  ["rhs_mag_m67", 2, 1],
                  ["SmokeShellGreen", 1, 1],
                  ["rhs_mag_30Rnd_556x45_Mk262_Stanag", 4, 30]
                ]
              ], // Vest
              ["TFC_CB_Smallpack_MT",
                [
                ["ACE_EntrenchingTool", 1],
                ["TFC_CH_Booniehat_CADPAT_MT", 1],
                ["ACE_IR_Strobe_Item", 1],
                ["rhsusf_200rnd_556x45_mixed_box", 1, 200],
                ["rhs_mag_30Rnd_556x45_Mk262_Stanag", 5, 30]
                ]
              ], // Backpack
              "TFC_CH_Caiman_CADPAT_MT", // Headgear
              "rhsusf_shemagh2_gogg_tan", // Facewear
              ["rhsusf_bino_m24","","","",["",1000],[],""], // Binoculars
              ["ItemMap","ItemGPS","","ItemCompass","ItemWatch","TFC_NVG_PVS14"] // Misc gear
            ],
            [
              ["ace_arsenal_insignia","tfc_insignia_7cmbg"], // Insignia
              ["earplugs","true"] // Earplugs
            ]
          ]
        },
        {
          name: "Grenadier",
          loadout: [
            [
              ["tfc_w_c7a2_m203","","TFC_WA_peq15_blk","TFC_WA_C79_Elcan",["rhs_mag_30Rnd_556x45_Mk262_Stanag",1000],["rhs_mag_M433_HEDP",1000],""], // Primary weapon
              ["","","","",["",1000],["",1000],""], // Secondary weapon
              ["rhs_weap_m72a7","","rhsusf_acc_anpeq15side","",["",1000],["",1000],""], // Tertiary weapon
              ["TFC_CU_CombatUniform_otw_cadpat_MT",
                [
                  ["ACE_packingBandage", 6],
                  ["ACE_tourniquet", 4],
                  ["ACE_elasticBandage", 6],
                  ["kat_chestSeal", 2],
                  ["ACE_splint", 4],
                  ["kat_mask_M50", 1],
                  ["kat_gasmaskFilter", 2],
                  ["ACE_CableTie", 2],
                  ["ACE_EarPlugs", 1],
                  ["ACE_painkillers", 1, 10]
                ]
              ], // Uniform
              ["TFC_CV_SORD_Ballistic_MT",
                [
                  ["ACE_Flashlight_XL50", 1],
                  ["ACE_MapTools", 1],
                  ["ACRE_PRC343", 1],
                  ["SmokeShell", 2, 1],
                  ["rhs_mag_30Rnd_556x45_Mk262_Stanag", 4, 30],
                  ["rhs_mag_M433_HEDP", 5, 1],
                  ["rhs_mag_m67", 2, 1]
                ]
              ], // Vest
              ["TFC_CB_Smallpack_MT",
                [
                  ["ACE_EntrenchingTool", 1],
                  ["TFC_CH_Booniehat_CADPAT_MT", 1],
                  ["ACE_IR_Strobe_Item", 1],
                  ["rhsusf_200rnd_556x45_mixed_box", 1, 200],
                  ["rhs_mag_30Rnd_556x45_Mk262_Stanag", 5, 30],
                  ["rhs_mag_M433_HEDP", 5, 1],
                  ["rhs_mag_m714_White", 2, 1],
                  ["rhs_mag_m715_Green", 1, 1],
                  ["rhs_mag_m713_Red", 1, 1]
                ]
              ], // Backpack
              "TFC_CH_Caiman_CADPAT_MT", // Headgear
              "rhsusf_shemagh2_gogg_tan", // Facewear
              ["rhsusf_bino_m24","","","",["",1000],[],""], // Binoculars
              ["ItemMap","ItemGPS","","ItemCompass","ItemWatch","TFC_NVG_PVS14"] // Misc gear
            ],
            [
              ["ace_arsenal_insignia","tfc_insignia_7cmbg"], // Insignia
              ["earplugs","true"] // Earplugs
            ]
          ]
        },
      ]
    };
  },
  methods: {
    editPreset(preset) {
      this.$emit('edit-preset', preset.loadout);
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
