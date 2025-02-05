<template>
  <div>
    <h1>Loadout Creator</h1>
    <div class="maincontainer scale-90 bg-black rounded-2xl">
      <h2>Weapons</h2>
      <div id="weaponSections" class="grid grid-cols-3 gap-4 p-2">
        <div v-for="section in weaponSections" :key="section.id" class="section basis-full">
          <h3>{{ section.name }}</h3>
          <select v-model="selectedWeapon[section.id]" class="text-center">
            <option value="">-- None --</option>
            <option v-for="weapon in section.weapons" :key="weapon.id" :value="weapon.id">
              {{ weapon.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <!-- <br>
    <div class="maincontainer">
      <h2>Main Gear</h2>
      <div id="fillableGearSections">
        <div v-for="section in fillableGearSections" :key="section.id" class="section">
          <h3>{{ section.name }}</h3>
          <select v-model="selectedGear[section.id]">
            <option value="">-- Select {{ section.name }} --</option>
            <option v-for="option in section.options" :key="option.id" :value="option.id">{{ option.name }}</option>
          </select>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'CreatorView',

  data() {
    return {
      selectedWeapon: '',
      weaponSections: [],
      fillableGearSections: [],
      selectedGear: {},
    }
  },

  mounted() {
    this.getWeapons()
  },

  methods: {
    getWeapons() {
      fetch('old/weapons.json')
        .then((response) => response.json())
        .then((data) => {
          this.weaponSections = data.sections
        })
        .catch((error) => {
          console.error('Error loading data:', error)
        })
    },
  },
}
</script>

<style scoped>
.section {
  background: #4a4a4a;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
}
h1 {
  text-align: center;
  color: #ffcc00;
  font-size: 5rem;
  background-color: black;
  margin-bottom: 30px;
  border-radius: 15px;
}
h2 {
  text-align: center;
  color: #ffcc00;
  font-size: 2rem;
}
h3 {
  text-align: center;
  color: #ffcc00;
}
select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  background-color: #3c3c3c;
}
</style>
