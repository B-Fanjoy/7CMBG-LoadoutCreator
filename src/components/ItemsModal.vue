<template>
  <teleport to="body">
    <div class="fixed top-0 left-0 w-full h-full bg-[#00000085] flex flex-col justify-center items-center" v-if="isOpen">
      <div class="flex flex-col min-w-[800px] min-h-[600px] bg-[#4d4d4d] rounded-2xl">
        <h2 class="text-4xl font-semibold py-2 text-center rounded-t-2xl text-[#F4C356] bg-[#2e2e2e]">Add an Item</h2>
        <div class="flex flex-row h-full justify-center">
          <ul class="flex flex-col">
            <li
              v-for="section in sections"
              :key="section.id"
              @click="selectSection(section.id)"
              :class="{ active: selectedSectionId === section.id }"
            >
              {{ section.name }}
            </li>
          </ul>
          <div class="border h-auto mx-10"></div>
          <ul v-if="selectedSection">
            <ul v-for="group in filteredItems" :key="group.id">
              {{ group.name }}
              <li v-for="option in filteredGroups(group.id)" :key="option.id">
                {{ option.name }}
              </li>
            </ul>
          </ul>
        </div>
        <button class="flex-1" @click="close">Close</button>
      </div>
    </div>
  </teleport>
</template>

<script>
import itemsData from "/src/data/items.json";

export default {
  props: {
    isOpen: Boolean
  },
  methods: {
    close() {
      this.$emit('update:isOpen', false);
    },
    selectSection(sectionId) {
      this.selectedSectionId = sectionId;
    }
  },
  computed: {
    selectedSection() {
      return this.sections.find(sec => sec.id === this.selectedSectionId) || null;
    },
    filteredItems() {
      return this.selectedSection ? (this.selectedSection.groupings || []) : [];
    },
    filteredGroups(groupId) {
      return this.selectedSection.groupings[groupId] ? (this.selectedSection.groupings[groupId].options || []) : [];
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
