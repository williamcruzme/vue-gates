<template>
  <div>
    <slot v-if="condition" />
  </div>
</template>

<script>
import { getCondition } from '../utils/validator';

export default {
  data() {
    return {
      condition: false,
    };
  },
  created() {
    // Watch all attrs
    this.$watch((vm) => Object.keys(this.$attrs).map((attr) => vm[attr]), () => {
      console.log('Update!');
    });

    Object.keys(this.$attrs).forEach((attr) => this.processCondition(attr, this.$attrs[attr]));
  },
  methods: {
    processCondition(attr, value) {
      console.log(attr, value);

      const condition = attr.split(':');
      const binding = {
        name: condition[0],
        arg: condition?.[1],
      };

      console.log(getCondition(binding));
    },
  },
};
</script>
