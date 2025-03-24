<template>
  <teleport to="body">
    <div class="fixed top-0 left-0 w-full h-full bg-[#00000085] flex justify-center items-center" v-if="isOpen">
      <!-- Modal Container -->
      <div class="flex flex-col bg-[#4d4d4d] border-2 border-[#F4C356] rounded-2xl w-auto h-auto">
        <!-- Modal Header -->
        <div class="relative flex justify-center items-center border-b-2 pb-1 rounded-t-2xl text-[#F4C356] bg-[#2e2e2e]">
          <h2 class="text-4xl font-semibold py-2 text-center">
            Add an Item
          </h2>
          <input
            type="text"
            v-model="searchQuery"
            @focus="clearSection"
            class="absolute right-2 top-2 p-2 text-center rounded-2xl bg-[#585858] border-2 border-[#F4C356] text-[#F4C356]"
            placeholder="Search"
          />
        </div>

        <!-- Section Selector -->
        <div class="flex flex-row items-center justify-center p-2 gap-4 border-b-2 border-[#F4C356]">
          <div v-for="section in sections" :key="section.id"
              @click="selectSection(section.id)"
              :class="['border-2 text-[#000000] rounded-2xl p-2 cursor-pointer',
                        section.id === selectedSectionId ? 'bg-[#f49556]' : 'bg-[#F4C356] hover:bg-[#f49556]']">
            {{ section.name }}
          </div>
        </div>

        <!-- Item Selection -->
        <div class="flex flex-grow overflow-hidden w-full">
          <div class="flex flex-col flex-1 border-1 border-[#F4C356] min-w-fit w-auto max-w-full">
            <!-- Scrollable List -->
            <div class="flex-1 overflow-y-auto max-h-[40vh] text-center custom-scrollbar">
              <div v-for="item in filteredItems" :key="item.id"
                  @click="selectItem(item.id)"
                  class="grid grid-cols-1 gap-2 bg-[#585858] hover:bg-[#3b3b3b] cursor-pointer p-2 items-center text-center not-last:border-b-2 border-[#F4C356] border-dashed">
                <!-- Item Name -->
                <div class="w-full">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
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
    clearSection() {
      this.selectedSectionId = null;
    },
    close() {
      this.$emit('update:isOpen', false);
      this.searchQuery = "";
      this.selectedSectionId = null;
    },
    selectSection(sectionId) {
      this.selectedSectionId = sectionId;
      this.searchQuery = "";
    },
    selectItem(selectedItem) {
      this.$emit('add-item', { container: this.currentContainer, item: selectedItem });
      this.$emit('update:isOpen', false);
    }
  },
  computed: {
    filteredItems() {
      let items = this.sections.flatMap(section =>
        section.groupings.flatMap(group =>
          group.options.map(option => ({ ...option, sectionId: section.id }))
        )
      );

      if (this.selectedSectionId) {
        items = items.filter(item => item.sectionId === this.selectedSectionId);
      }

      return items.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  data() {
    return {
      sections: itemsData.sections,
      searchQuery: "",
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
