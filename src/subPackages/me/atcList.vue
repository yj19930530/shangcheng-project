<template>
  <div class="atc-container">
    <Atc v-for="(item,index) in 4" :key="item" :numIndex="index" />
  </div>
</template>
<style>
page {
  background-color: #f8f8f8;
}
</style>
<style scoped>
.atc-container {
  padding-top: 16rpx;
  margin: auto;
  width: 710rpx;
  column-count: 2;
  column-gap: 1;
}
</style>