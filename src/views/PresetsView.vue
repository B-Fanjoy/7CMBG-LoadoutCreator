<template>
  <main class="p-6 bg-[#303030] min-h-screen text-white">
    <!-- Page Title -->
    <h1 class="text-7xl font-bold text-center text-[#F4C356] mb-8">Preset Loadouts</h1>

    <!-- Loadout Presets Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        v-for="preset in presets"
        :key="preset.name"
        class="p-6 bg-[#212121] border border-[#000000] shadow-lg rounded-3xl hover:shadow-2xl transition-all"
      >
        <!-- Loadout Name -->
        <h2 class="text-3xl font-bold text-[#F4C356] border-b-2 pb-2 mb-4">{{ preset.name }}</h2>

        <!-- Weapons Section -->
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-300">Weapons:</h3>
          <ul class="text-gray-400 text-sm space-y-2">
            <li>
              <strong>Primary:</strong> {{ preset.loadout[0][0][0] }}
              <button @click="toggleSection('primary', preset.name)" class="text-blue-400 ml-2">▼</button>
              <ul v-if="expandedSections[preset.name]?.primary" class="ml-4 mt-2 text-gray-500">
                <li v-for="(attachment, index) in formatAttachments(preset.loadout[0][0])" :key="index">
                  • {{ attachment || "None" }}
                </li>
              </ul>
            </li>
            <li>
              <strong>Secondary:</strong> {{ preset.loadout[0][1][0] }}
              <button @click="toggleSection('secondary', preset.name)" class="text-blue-400 ml-2">▼</button>
              <ul v-if="expandedSections[preset.name]?.secondary" class="ml-4 mt-2 text-gray-500">
                <li v-for="(attachment, index) in formatAttachments(preset.loadout[0][1])" :key="index">
                  • {{ attachment || "None" }}
                </li>
              </ul>
            </li>
            <li>
              <strong>Tertiary:</strong> {{ preset.loadout[0][2][0] }}
              <button @click="toggleSection('tertiary', preset.name)" class="text-blue-400 ml-2">▼</button>
              <ul v-if="expandedSections[preset.name]?.tertiary" class="ml-4 mt-2 text-gray-500">
                <li v-for="(attachment, index) in formatAttachments(preset.loadout[0][2])" :key="index">
                  • {{ attachment || "None" }}
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <!-- Gear Section with Items Display -->
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-300">Gear:</h3>
          <ul class="text-gray-400 text-sm space-y-1">
            <li>
              <strong>Uniform:</strong> {{ preset.loadout[0][3][0] }}
              <button @click="toggleSection('uniform', preset.name)" class="text-blue-400 ml-2">▼</button>
              <ul v-if="expandedSections[preset.name]?.uniform" class="ml-4 mt-2 text-gray-500">
                <li v-for="(item, index) in preset.loadout[0][3][1]" :key="index">
                  • {{ item[0] }} x{{ item[1] }}
                </li>
              </ul>
            </li>
            <li>
              <strong>Vest:</strong> {{ preset.loadout[0][4][0] }}
              <button @click="toggleSection('vest', preset.name)" class="text-blue-400 ml-2">▼</button>
              <ul v-if="expandedSections[preset.name]?.vest" class="ml-4 mt-2 text-gray-500">
                <li v-for="(item, index) in preset.loadout[0][4][1]" :key="index">
                  • {{ item[0] }} x{{ item[1] }}
                </li>
              </ul>
            </li>
            <li>
              <strong>Backpack:</strong> {{ preset.loadout[0][5][0] }}
              <button @click="toggleSection('backpack', preset.name)" class="text-blue-400 ml-2">▼</button>
              <ul v-if="expandedSections[preset.name]?.backpack" class="ml-4 mt-2 text-gray-500">
                <li v-for="(item, index) in preset.loadout[0][5][1]" :key="index">
                  • {{ item[0] }} x{{ item[1] }}
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col space-y-3">
          <!-- Edit Preset Button -->
          <button
            @click="editPreset(preset)"
            class="w-full py-3 bg-[#F4C356] text-black font-bold rounded-2xl hover:bg-amber-500 transition-all"
          >
            Edit in Loadout Creator
          </button>

          <!-- Copy to Clipboard Button -->
          <button
            @click="copyToClipboard(preset.loadout)"
            class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl flex items-center justify-center space-x-2 transition-all"
          >
            <svg
              class="w-5 h-5 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7
                64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112
                192l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
              />
            </svg>
            <span>Copy to Clipboard</span>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useLoadoutStore } from '/src/stores/loadoutStore.js';

export default {
  name: 'PresetsView',
  data() {
    return {
      expandedSections: {},
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
    toggleSection(section, presetName) {
      if (!this.expandedSections[presetName]) {
        this.expandedSections[presetName] = {};
      }
      this.expandedSections[presetName][section] = !this.expandedSections[presetName][section];
    },
    formatAttachments(weaponData) {
      return weaponData.slice(1).map((attachment) => {
        if (Array.isArray(attachment)) {
          return attachment[0];
        }
        return attachment;
      });
    },
    editPreset(preset) {
      const loadoutStore = useLoadoutStore();
      loadoutStore.setLoadout(preset.loadout);
      this.$router.push({ name: 'creator' });
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
