<template>
  <div class="skeleton">
    <div class="skeleton-image"></div>
    <div class="skeleton-text"></div>
    <div class="skeleton-text"></div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonLoader',
};
</script>

<style scoped>
.skeleton {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.skeleton-image {
  width: 100%;
  height: 200px;
  background-color: #e0e0e0;
  border-radius: 8px;
}
.skeleton-text {
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 4px;
}
</style>
