<template>
  <main class="p-6 m-2 rounded-4xl bg-[#303030] text-white flex">
    <!-- Sidebar with Loadout Names -->
    <aside class="w-1/4 p-6 bg-[#212121] rounded-3xl mr-4">
      <h2 class="text-3xl font-bold text-[#F4C356] mb-4 pb-2 border-b-2">Presets</h2>
      <ul class="space-y-2">
        <li
          v-for="preset in presets"
          :key="preset.name"
          @click="selectPreset(preset)"
          class="cursor-pointer p-2 rounded-lg hover:bg-[#303030] transition-all"
          :class="{'bg-[#303030]': selectedPreset && selectedPreset.name === preset.name}"
        >
          {{ preset.name }}
        </li>
      </ul>
    </aside>

    <!-- Loadout Details -->
    <section class="w-3/4">
      <div v-if="selectedPreset" class="p-6 bg-[#212121] border-2 border-[#000000] shadow-lg rounded-3xl">
        <!-- Loadout Name -->
        <h2 class="text-3xl font-bold text-[#F4C356] border-b-2 pb-2 mb-4">{{ selectedPreset.name }}</h2>

        <!-- Weapons Section -->
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-300">Weapons:</h3>
          <ul class="text-gray-400 text-sm space-y-2">
            <li>
              <strong>Primary:</strong> {{ findItemName(selectedPreset.loadout[0][0][0]) }}
              <ul class="indent-4">
                <li v-if="selectedPreset.loadout[0][0][3]">• <strong>Sight:</strong> {{ findItemName(selectedPreset.loadout[0][0][3]) }}</li>
                <li v-if="selectedPreset.loadout[0][0][2]">• <strong>Rail:</strong> {{ findItemName(selectedPreset.loadout[0][0][2]) }}</li>
                <li v-if="selectedPreset.loadout[0][0][1]">• <strong>Muzzle:</strong> {{ findItemName(selectedPreset.loadout[0][0][1]) }}</li>
                <li v-if="selectedPreset.loadout[0][0][6]">• <strong>Undermount:</strong> {{ findItemName(selectedPreset.loadout[0][0][6]) }}</li>
                <li v-if="selectedPreset.loadout[0][0][4][0]">• <strong>Primary Magazine:</strong> {{ findItemName(selectedPreset.loadout[0][0][4][0]) }}</li>
                <li v-if="selectedPreset.loadout[0][0][5][0]">• <strong>Secondary Magazine:</strong> {{ findItemName(selectedPreset.loadout[0][0][5][0]) }}</li>
              </ul>
            </li>
            <li>
              <strong>Secondary:</strong> {{ findItemName(selectedPreset.loadout[0][1][0]) }}
              <ul class="indent-4">
                <li v-if="selectedPreset.loadout[0][1][3]">• <strong>Sight:</strong> {{ findItemName(selectedPreset.loadout[0][1][3]) }}</li>
                <li v-if="selectedPreset.loadout[0][1][2]">• <strong>Rail:</strong> {{ findItemName(selectedPreset.loadout[0][1][2]) }}</li>
                <li v-if="selectedPreset.loadout[0][1][1]">• <strong>Muzzle:</strong> {{ findItemName(selectedPreset.loadout[0][1][1]) }}</li>
                <li v-if="selectedPreset.loadout[0][1][6]">• <strong>Undermount:</strong> {{ findItemName(selectedPreset.loadout[0][1][6]) }}</li>
                <li v-if="selectedPreset.loadout[0][1][4][0]">• <strong>Primary Magazine:</strong> {{ findItemName(selectedPreset.loadout[0][1][4][0]) }}</li>
                <li v-if="selectedPreset.loadout[0][1][5][0]">• <strong>Secondary Magazine:</strong> {{ findItemName(selectedPreset.loadout[0][1][5][0]) }}</li>
              </ul>
            </li>
            <li>
              <strong>Tertiary:</strong> {{ findItemName(selectedPreset.loadout[0][2][0]) }}
              <ul class="indent-4">
                <li v-if="selectedPreset.loadout[0][2][3]">• <strong>Sight:</strong> {{ findItemName(selectedPreset.loadout[0][2][3]) }}</li>
                <li v-if="selectedPreset.loadout[0][2][2]">• <strong>Rail:</strong> {{ findItemName(selectedPreset.loadout[0][2][2]) }}</li>
                <li v-if="selectedPreset.loadout[0][2][1]">• <strong>Muzzle:</strong> {{ findItemName(selectedPreset.loadout[0][2][1]) }}</li>
                <li v-if="selectedPreset.loadout[0][2][6]">• <strong>Undermount:</strong> {{ findItemName(selectedPreset.loadout[0][2][6]) }}</li>
                <li v-if="selectedPreset.loadout[0][2][4][0]">• <strong>Primary Magazine:</strong> {{ findItemName(selectedPreset.loadout[0][2][4][0]) }}</li>
                <li v-if="selectedPreset.loadout[0][2][5][0]">• <strong>Secondary Magazine:</strong> {{ findItemName(selectedPreset.loadout[0][2][5][0]) }}</li>
              </ul>
            </li>
          </ul>
        </div>

        <!-- Main Gear Section -->
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-300">Main Gear:</h3>
          <ul class="text-gray-400 text-sm space-y-2">
            <li>
              <strong>Uniform:</strong> {{ findItemName(selectedPreset.loadout[0][3][0]) }}
              <ul class="indent-4">
                <li v-if="selectedPreset.loadout[0][3][0]"> <strong>Items:</strong></li>
                <ul class="indent-6">
                  <li v-for="item in selectedPreset.loadout[0][3][1]" :key="item">
                    • {{ item[1] }}x {{ findItemName(item[0]) }}
                  </li>
                </ul>
              </ul>
            </li>
            <li>
              <strong>Vest:</strong> {{ findItemName(selectedPreset.loadout[0][4][0]) }}
              <ul class="indent-4">
                <li v-if="selectedPreset.loadout[0][4][0]"> <strong>Items:</strong></li>
                <ul class="indent-6">
                  <li v-for="item in selectedPreset.loadout[0][4][1]" :key="item">
                    • {{ item[1] }}x {{ findItemName(item[0]) }}
                  </li>
                </ul>
              </ul>
            </li>
            <li>
              <strong>Backpack:</strong> {{ findItemName(selectedPreset.loadout[0][5][0]) }}
              <ul class="indent-4">
                <li v-if="selectedPreset.loadout[0][5][0]"> <strong>Items:</strong></li>
                <ul class="indent-6">
                  <li v-for="item in selectedPreset.loadout[0][5][1]" :key="item">
                    • {{ item[1] }}x {{ findItemName(item[0]) }}
                  </li>
                </ul>
              </ul>
            </li>
          </ul>
        </div>

        <!-- Equipment Section -->
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-300">Equipment:</h3>
          <ul class="text-gray-400 text-sm">
            <li><strong>Headgear:</strong> {{ findItemName(selectedPreset.loadout[0][6]) }}</li>
            <li><strong>Facewear:</strong> {{ findItemName(selectedPreset.loadout[0][7]) }}</li>
            <li><strong>Binoculars:</strong> {{ findItemName(selectedPreset.loadout[0][8][0]) }}</li>
            <li><strong>Map:</strong> {{ findItemName(selectedPreset.loadout[0][9][0]) }}</li>
            <li><strong>Terminal:</strong> {{ findItemName(selectedPreset.loadout[0][9][1]) }}</li>
            <li><strong>Communication:</strong> {{ findItemName(selectedPreset.loadout[0][9][2]) }}</li>
            <li><strong>Navigation:</strong> {{ findItemName(selectedPreset.loadout[0][9][3]) }}</li>
            <li><strong>Watch:</strong> {{ findItemName(selectedPreset.loadout[0][9][4]) }}</li>
            <li><strong>NVGs:</strong> {{ findItemName(selectedPreset.loadout[0][9][5]) }}</li>
            <li><strong>Insignia:</strong> {{ findItemName(selectedPreset.loadout[1][0][1]) }}</li>
            <li><strong>Earplugs:</strong> {{ selectedPreset.loadout[1][1][1] === "true" ? "Yes" : "No" }}</li>
          </ul>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col space-y-3">
          <!-- Edit Preset Button -->
          <button
            @click="editPreset(selectedPreset)"
            class="w-full py-3 bg-[#F4C356] text-black font-bold rounded-2xl hover:bg-amber-500 transition-all"
          >
            Edit in Loadout Creator
          </button>

          <!-- Copy to Clipboard Button -->
          <button
            @click="copyToClipboard(selectedPreset.loadout)"
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
  name: 'PresetsView',
  data() {
    return {
      weapons: weaponsData.sections,
      gear: gearData.sections,
      items: itemsData.sections,
      expandedSections: {},
      selectedPreset: null,
      presets: [
        {
          name: "Basic Rifleman",
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
          name: "Basic Grenadier",
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
        {
          name: "Basic C9 Gunner",
          loadout: [
            [
              ["TFC_W_c9a2","","TFC_WA_peq15_blk","TFC_WA_C79_Elcan",["rhsusf_200rnd_556x45_mixed_box",1000],["",1000],""], // Primary weapon
              ["","","","",["",1000],["",1000],""], // Secondary weapon
              ["","","","",["",1000],["",1000],""], // Tertiary weapon
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
                  ["rhsusf_200rnd_556x45_mixed_box", 1, 200],
                  ["rhs_mag_m67", 2, 1]
                ]
              ], // Vest
              ["TFC_CB_Smallpack_MT",
                [
                  ["ACE_EntrenchingTool", 1],
                  ["TFC_CH_Booniehat_CADPAT_MT", 1],
                  ["ACE_IR_Strobe_Item", 1],
                  ["rhsusf_200rnd_556x45_mixed_box", 2, 200]
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
          name: "Basic C6 Gunner",
          loadout: [
            [
              ["TFC_W_c6a1","","TFC_WA_peq15_blk","TFC_WA_C79_Elcan",["TFC_220Rnd_762x51_Box",1000],["",1000],""], // Primary weapon
              ["","","","",["",1000],["",1000],""], // Secondary weapon
              ["","","","",["",1000],["",1000],""], // Tertiary weapon
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
                  ["TFC_220Rnd_762x51_Box", 1, 220],
                  ["rhs_mag_m67", 2, 1]
                ]
              ], // Vest
              ["TFC_CB_Smallpack_MT",
                [
                  ["ACE_EntrenchingTool", 1],
                  ["TFC_CH_Booniehat_CADPAT_MT", 1],
                  ["ACE_IR_Strobe_Item", 1],
                  ["TFC_220Rnd_762x51_Box", 2, 220]
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
    getEquipmentLabel(index) {
      const labels = ["Map", "Terminal", "Communication", "Navigation", "Watch", "Night Vision"];
      return labels[index] || `Equipment ${index + 1}`; // Fallback label if more items exist
    },
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
        alert("Loadout copied to clipboard!\n\nOpen ACE Arsenal and click 'Import' at the bottom of the screen to load the loadout.\n\nNote: ACE Arsenal just takes whatever value is in your clipboard when you click 'Import'.");
      } catch (err) {
        console.error("Failed to copy: ", err);
        alert("Failed to copy!");
      }
    },
    selectPreset(preset) {
      this.selectedPreset = preset;
    }
  }
};
</script>
