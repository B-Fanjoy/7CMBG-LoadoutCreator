<template>
  <teleport to="body">
    <div class="fixed top-0 left-0 w-full h-full bg-[#00000085] flex flex-col justify-center items-center" v-if="isOpen">
      <div class="flex flex-col bg-[#4d4d4d] rounded-2xl">
        <h2 class="text-4xl font-semibold py-2 text-center border-b-2 rounded-t-2xl text-[#F4C356] bg-[#2e2e2e]">Add an Item</h2>
          <div class="flex flex-row items-center h-full justify-center p-2 gap-4 border-b-2">
            <div v-for="section in sections" :key="section.id" @click="selectSection(section.id)" :class="{ active: selectedSectionId === section.id }" class="hover:bg-[#222222] border-dashed border-2 p-2">
              {{ section.name }}
            </div>
          </div>
          <div v-if="selectedSection" class="flex flex-row grow-1 gap-4 text-center justify-center">
            <div v-for="group in filteredItems" :key="group.id">
              <h2 class="text-2xl font-semibold text-center text-[#F4C356] bg-[#2e2e2e]">
                {{ group.name }}
              </h2>
              <div v-for="item in group.options" :key="item.id" @click="selectItem()" class="pr-4 hover:bg-[#3b3b3b] text-center">
                {{ item.name }}
              </div>
            </div>
          </div>
        <button class="flex-1 border-2 rounded-b-2xl hover:bg-[#3b3b3b]" @click="close">Close</button>
      </div>
    </div>
  </teleport>
</template>

<script>
import itemsData from "/src/data/items.json";

export default {
  props: {
    isOpen: Boolean,
    currentCategory: String
  },
  methods: {
    close() {
      this.$emit('update:isOpen', false);
      this.selectedSectionId = null;
    },
    selectSection(sectionId) {
      this.selectedSectionId = sectionId;
    },
    selectItem() {
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
