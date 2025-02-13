<template>
  <teleport to="body">
    <div class="fixed top-0 left-0 w-full h-full bg-[#00000085] flex justify-center items-center" v-if="isOpen">

      <!-- Modal Container -->
      <div class="flex flex-col bg-[#4d4d4d] rounded-2xl w-[80vw] h-[80vh] p-4">

        <!-- Modal Header -->
        <h2 class="text-4xl font-semibold py-2 text-center border-b-2 rounded-t-2xl text-[#F4C356] bg-[#2e2e2e]">
          Add an Item
        </h2>

        <!-- Section Selector -->
        <div class="flex flex-row items-center justify-center p-2 gap-4 border-b-2">
          <div v-for="section in sections" :key="section.id"
               @click="selectSection(section.id)"
               class="hover:bg-[#222222] border-dashed border-2 p-2 cursor-pointer">
            {{ section.name }}
          </div>
        </div>

        <!-- Item Selection (Auto-fill Groups in Row) -->
        <div v-if="selectedSection" class="flex gap-4 flex-1 overflow-hidden p-2 w-full">

          <div v-for="group in filteredItems" :key="group.id"
              class="flex flex-col flex-1 min-w-[250px] max-w-[calc(100%/4)] w-full">

            <!-- Group Header -->
            <h2 class="text-2xl font-semibold text-center text-[#F4C356] bg-[#2e2e2e] p-2">
              {{ group.name }}
            </h2>

            <!-- Scrollable Group List -->
            <div class="flex-1 overflow-y-auto max-h-[50vh] p-2">
              <div v-for="item in group.options" :key="item.id"
                  @click="selectItem(item.id)"
                  class="grid grid-cols-[minmax(0,1fr)_auto] gap-2 pr-4 hover:bg-[#3b3b3b] cursor-pointer p-2 items-center">

                <!-- Item Name -->
                <div class="truncate">
                  {{ item.name }}
                </div>

                <!-- Optional Extra Space -->
                <div class="w-6 h-6"></div>

              </div>
            </div>
          </div>

        </div>

        <!-- Close Button -->
        <button class="border-2 rounded-b-2xl hover:bg-[#3b3b3b] p-2 mt-2" @click="close">
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
