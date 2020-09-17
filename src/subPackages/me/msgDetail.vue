<template>
  <div id="messageNotice-container">
    <div class="messageNotice-item-content mr-b-20" v-for="(item,index) in msgList" :key="index">
      <div class="fl-bt">
        <text class="fz-15">{{item.showInfo?'-':'通知标题'}}</text>
        <text class="fz-12 fc-999">{{timerReturn(item.createTime)}}</text>
      </div>
      <text class="fz-12 fc-999 mr-t-6">{{item.showInfo}}</text>
    </div>
  </div>
</template>
<script>
const { toast, common } = require("../../utils/index");
export default {
  data() {
    return {
      userNo: "",
      pageNo: 1,
      pageSize: 10,
      total: 0,
      more: false,
      msgList: [],
    };
  },
  onLoad() {
    this.userNo = uni.getStorageSync("userno");
    this.getMsgList();
  },
  methods: {
    timerReturn(time) {
      return common.dateTime(time);
    },
    async getMsgList() {
      toast.showLoading("加载中");
      const { data } = await this.$api.findNotifyRemindPage({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        userNo: this.userNo,
      });
      this.msgList = this.msgList.concat(data.list);
      this.total = data.total;
      uni.hideLoading();
    },
  },
};
</script>
<style>
page {
  background-color: #f8f8f8;
}
</style>
<style scoped>
#messageNotice-container {
  padding-top: 20rpx;
  margin: auto;
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