<template>
  <div class="about">
    <WorkSpace />
  </div>
</template>

<script>
// @ is an alias to /src
import WorkSpace from "@/components/WorkSpace.vue";

export default {
  name: "HomeView",
  components: {
    WorkSpace,
  },
};
</script>
