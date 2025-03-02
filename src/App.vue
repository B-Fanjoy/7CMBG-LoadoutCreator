<template>
  <header v-if="!shouldHideHeader">
    <div class="wrapper">
      <nav class="flex justify-center py-8 uppercase border-b border-zinc-900 bg-[#000000] font-medium">
        <div class="absolute left-8 top-5">
          <RouterLink to="/">
            <svg
              class="w-12 h-12 fill-white transition-all duration-300 hover:fill-orange-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g id="Rounded">
                <circle cx="12" cy="3" r="1" />
                <circle cx="22.5" cy="11.5" r="0.5" />
                <circle cx="1.5" cy="11.5" r="0.5" />
                <path
                  d="M12.71,2.296L12,3.1l-0.71-0.804L1.203,11.098L1.5,12H4v8c0,0.552,0.448,1,1,1h4c0.552,0,1-0.448,1-1v-6h4v6
                    c0,0.552,0.448,1,1,1h4c0.552,0,1-0.448,1-1v-8h2.5l0.297-0.902L12.71,2.296z"
                />
              </g>
            </svg>
          </RouterLink>
        </div>

        <div class="flex gap-4">
          <RouterLink to="/creator" class="hover:text-orange-500 transition-all ease-in-out">
            Loadout Creator
          </RouterLink>
          <div class="vl"></div>
          <RouterLink to="/loadouts" class="hover:text-orange-500 transition-all ease-in-out">
            Saved Loadouts
          </RouterLink>
          <div class="vl"></div>
          <RouterLink to="/presets" class="hover:text-orange-500 transition-all ease-in-out">
            Presets
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <div class="justify-self-center w-full">
    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  components: {
    RouterLink,
    RouterView,
  },
  name: 'App',
  computed: {
    shouldHideHeader() {
      return this.$route.path === '/';
    }
  }
}
</script>
