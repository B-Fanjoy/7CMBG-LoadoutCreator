<template>
  <teleport to="body">
    <div class="fixed top-0 left-0 w-full h-full bg-[#00000085] flex justify-center items-center" v-if="isOpen">

      <!-- Modal Container -->
      <div class="flex flex-col bg-[#4d4d4d] border-2 border-[#F4C356] rounded-2xl w-auto h-auto">

        <!-- Modal Header -->
        <h2 class="text-4xl font-semibold py-2 text-center border-b-2 rounded-t-2xl text-[#F4C356] bg-[#2e2e2e]">
          Add an Item
        </h2>

        <!-- Section Selector -->
        <div class="flex flex-row items-center justify-center p-2 gap-4 border-b-2 border-[#F4C356]">
          <div v-for="section in sections" :key="section.id"
              @click="selectSection(section.id)"
              :class="['border-2 text-[#000000] rounded-2xl p-2 cursor-pointer',
                        section.id === selectedSectionId ? 'bg-[#f49556]' : 'bg-[#F4C356] hover:bg-[#f49556]']">
            {{ section.name }}
          </div>
        </div>

        <!-- Item Selection (Auto-fill Groups in Row) -->
        <div v-if="selectedSection" class="flex flex-grow overflow-hidden w-full">

          <div v-for="group in filteredItems" :key="group.id"
            class="flex flex-col flex-1 border-1 border-[#F4C356] min-w-fit w-auto max-w-full">

            <!-- Group Header -->
            <h2 class="text-2xl font-semibold text-center text-[#F4C356] bg-[#2e2e2e] p-2">
              {{ group.name }}
            </h2>

            <!-- Scrollable Group List -->
            <div class="flex-1 overflow-y-auto max-h-[40vh] text-center custom-scrollbar">
              <div v-for="item in group.options" :key="item.id"
                  @click="selectItem(item.id)"
                  class="grid grid-cols-1 gap-2 hover:bg-[#3b3b3b] cursor-pointer p-2 items-center text-center">
                <!-- Item Name -->
                <div class="w-full">
                  {{ item.name }}
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- Close Button -->
        <button class="border-t-2 border-[#F4C356] rounded-b-2xl hover:bg-[#634545] p-2 mt-auto" @click="close">
          Close
        </button>

      </div>
    </div>
  </teleport>
</template>

<script>
import itemsData from "/src/data/items.json";

export default {
  props: {
    isOpen: Boolean,
    currentContainer: String
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
      this.selectedSectionId = null;
    },
    selectSection(sectionId) {
      this.selectedSectionId = sectionId;
    },
    selectItem(selectedItem) {
      this.$emit('add-item', { container: this.currentContainer, item: selectedItem });
      this.$emit('update:isOpen', false);
    }
  },
  computed: {
    selectedSection() {
      return this.sections.find(sec => sec.id === this.selectedSectionId) || null;
    },
    filteredItems() {
      return this.selectedSection ? (this.selectedSection.groupings || []) : [];
    }
  },
  data() {
    return {
      sections: itemsData.sections,
      selectedSectionId: null
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
