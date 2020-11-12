<template>
  <div class="buy-contianer">
    <div style="height: 30rpx"></div>
    <div class="buy-row-show">
      <div class="buy-row-show-center">
        <Buy v-for="(item, index) in showList" :key="index" :showObj="item" />
      </div>
    </div>
    <div class="fl-cen mr-b-30" v-if="!more">
      <text class="fz-12 fc-999">没有更多了</text>
    </div>
  </div>
</template>
<script>
const { toast } = require("../../utils/index");
export default {
  data() {
    return {
      gid: "",
      pageNo: 1,
      pageSize: 10,
      authState: 2,
      showList: [],
      more: true,
    };
  },
  onLoad(obj) {
    this.gid = obj.id;
    this.getCommentPage();
  },
  onShareAppMessage() {
    return {
      path: `/pages/page/home`,
    };
  },
  // 下拉刷新
  async onPullDownRefresh() {
    await this.resetData();
    await this.getCommentPage();
    uni.stopPullDownRefresh();
  },
  // 上拉加载更多
  onReachBottom() {
    if (!this.more) return;
    this.pageNo++;
    this.getCommentPage();
  },
  methods: {
    resetData() {
      this.showList = [];
      this.pageNo = 1;
      this.more = true;
      this.pageSize = 10;
    },
    // 获取买家秀
    async getCommentPage() {
      toast.showLoading("加载中");
      const { data } = await this.$api.findGoodCommentPage({
        pageNo: 1,
        pageSize: 3,
        oiId: this.gid,
      });
      this.showList = this.showList.concat(data.list);
      if (
        data.list.length === 0 ||
        this.pageNo * this.pageSize > this.showList.length
      ) {
        this.more = false;
      }
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
.buy-row-show {
  padding: 0rpx 0 30rpx;
  width: 100%;
  background-color: #fff;
}
.buy-row-show-center {
  margin: auto;
  width: 710rpx;
}
</style>