<template>
  <div id="messageNotice-container">
    <div class="messageNotice-item-content mr-t-20" v-for="item in 4" :key="item">
      <div class="fl-bt">
        <text class="fz-15">会员礼包提醒</text>
        <text class="fz-12 fc-999">2020-08-20 15:57</text>
      </div>
      <text class="fz-12 fc-999 mr-t-6">尊贵的会员，值您生辰之际，奉上专属【生日礼包】请于7日内尽快领取福利吧！</text>
    </div>
  </div>
</template>
<style>
page {
  background-color: #f8f8f8;
}
</style>
<style scoped>
#messageNotice-container {
  margin:auto;
  width: 710rpx;
}
.messageNotice-item-content {
  display: flex;
  flex-direction: column;
  padding: 22rpx 20rpx 30rpx 20rpx;
  border-radius: 20rpx;
  background-color: #ffffff;
}
</style>