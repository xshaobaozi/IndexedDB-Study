<script lang="ts">
export default {
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="app">
    <div>
      <button>
        <router-link to="/dexie">dexie</router-link>
      </button>
      <button>
        <router-link to="/indexDB">indexDB</router-link>
      </button>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
@import './scss/index.scss';
</style>
