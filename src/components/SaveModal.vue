<template>
  <teleport to="body">
    <div class="fixed top-0 left-0 w-full h-full bg-[#00000085] flex justify-center items-center" v-if="isOpen">

      <!-- Modal Container -->
      <div class="flex flex-col bg-[#4d4d4d] border-2 border-[#F4C356] rounded-2xl w-auto h-auto">

        <!-- Modal Header -->
        <div class="justify-center items-center rounded-t-2xl border-b-2 text-[#F4C356] bg-[#2e2e2e]">
          <h2 class="text-4xl font-semibold py-2 text-center">
            Save Your Loadout
          </h2>
        </div>

        <!-- Save as New -->
        <div class="flex flex-row items-center justify-center p-2 gap-4 border-b-2 border-[#F4C356]">
          <input v-model="newLoadoutName" class="border-2 border-[#F4C356] rounded-2xl p-2 text-center bg-[#585858] text-[#F4C356]" placeholder="Loadout Name">
          <button class="border-2 text-[#000000] rounded-2xl p-2 cursor-pointer bg-[#F4C356] hover:bg-[#f49556]" @click="saveLoadout">
            Save as New
          </button>
        </div>

        <!-- Overwrite Existing -->
        <div class="flex flex-row items-center justify-center p-2 gap-4 border-[#F4C356]">
          <select v-model="toOverwrite" class="border-2 border-[#F4C356] rounded-2xl p-2 bg-[#585858] text-[#F4C356]">
            <option value="" disabled selected>Select Loadout</option>
            <option v-for="loadout in loadouts" :key="loadout.name" :value="loadout.name">
              {{ loadout.name }}
            </option>
          </select>
          <button class="border-2 text-[#000000] rounded-2xl p-2 cursor-pointer bg-[#F4C356] hover:bg-[#f49556]" @click="overwriteLoadout">
            Overwrite Existing
          </button>
        </div>

        <!-- Close Button -->
        <button class="border-t-2 border-[#F4C356] rounded-b-2xl bg-[#634545] hover:bg-[#673b3b] p-2 mt-auto" @click="close">
          Close
        </button>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    currentLoadout: String,
  },
  watch: {
    isOpen(newValue) {
      if (newValue) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    },
  },
  methods: {
    close() {
      this.$emit('update:isOpen', false);
      this.toOverwrite = "";
    },
    loadAllLoadouts() {
      const savedLoadouts = JSON.parse(localStorage.getItem('loadouts')) || [];
      this.loadouts = savedLoadouts;
    },
    saveLoadout() {
      if (!this.newLoadoutName.trim()) {
        alert("Please enter a loadout name.");
        return;
      }
      if (this.loadouts.some(loadout => loadout.name === this.newLoadoutName)) {
        alert("Loadout name already exists. Please choose a different name.");
        return;
      }

      const newLoadout = {
        name: this.newLoadoutName,
        loadout: JSON.parse(this.currentLoadout)
      };

      this.loadouts.push(newLoadout);
      localStorage.setItem("loadouts", JSON.stringify(this.loadouts));
      this.newLoadoutName = "";
      alert("Loadout saved successfully!");
      this.close();
    },
    overwriteLoadout() {
      if (!this.toOverwrite) {
        alert("Please select a loadout to overwrite.");
        return;
      }

      const index = this.loadouts.findIndex(loadout => loadout.name === this.toOverwrite);
      if (index !== -1) {
        this.loadouts[index].loadout = JSON.parse(this.currentLoadout);
        localStorage.setItem("loadouts", JSON.stringify(this.loadouts));
        alert("Loadout overwritten successfully!");
      } else {
        alert("Selected loadout not found.");
      }
      this.toOverwrite = "";
      this.close();
    },
  },
  created() {
    this.loadAllLoadouts();
  },
  data() {
    return {
      toOverwrite: "",
      newLoadoutName: "",
      loadouts: [],
    }
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #2e2e2e;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #F4C356;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #f49556;
}
</style>
