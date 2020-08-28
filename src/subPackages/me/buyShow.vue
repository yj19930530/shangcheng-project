<template>
  <div class="buy-contianer">
    <div class="buy-row-show" v-for="item in 2" :key="item">
      <div class="buy-row-show-center">
        <Buy />
      </div>
    </div>
  </div>
</template>
<style>
page {
  background-color: #f8f8f8;
}
</style>
<style scoped>
.buy-row-show {
  margin-top: 30rpx;
  padding: 0rpx 0 30rpx;
  width: 100%;
  background-color: #fff;
}
.buy-row-show-center {
  margin: auto;
  width: 710rpx;
}
</style>