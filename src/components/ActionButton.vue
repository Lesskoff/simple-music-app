<template>
  <button
    :id="id"
    @click="onClick()"
    class="flex items-center mx-3 rounded-full focus:outline-none transition-all duration-200 ease-in-out"
  >
    <v-icon :size="size">
      {{ svg }}
    </v-icon>
  </button>
</template>

<script>
export default {
  name: "ActionButton",
  props: {
    id: String,
    size: Number,
    svg: String,
    onClick: Function,
  },
};
</script>
