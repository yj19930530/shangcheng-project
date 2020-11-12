<template>
  <div>
    <div class="atc-container">
      <Atc
        v-for="(item, index) in atcList"
        :numIndex="index"
        :key="index"
        :objDetail="item"
      />
    </div>
    <div class="fl-cen mr-t-30 mr-b-30">
      <text class="fz-12 fc-999">没有更多了</text>
    </div>
  </div>
</template>
<script>
const { toast } = require("../../utils/index");
export default {
  data() {
    return {
      brand: "",
      atcList: [],
      pageNo: 1,
      pageSize: 10,
      more: true,
    };
  },
  onLoad(obj) {
    this.brand = obj.brand;
    this.aboutAtc();
  },
  onShareAppMessage() {
    return {
      path: `/pages/page/home`,
    };
  },
  // 下拉刷新
  async onPullDownRefresh() {
    await this.resetData();
    await this.aboutAtc();
    uni.stopPullDownRefresh();
  },
  // 上拉加载更多
  onReachBottom() {
    if (!this.more) return;
    this.pageNo++;
    this.aboutAtc();
  },
  methods: {
    resetData() {
      this.atcList = [];
      this.pageNo = 1;
      this.more = true;
      this.pageSize = 10;
    },
    // 获取相关文章
    async aboutAtc(text) {
      toast.showLoading("加载中");
      const { data } = await this.$api.getAboutAtc({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        brand: this.brand,
      });
      this.atcList = this.atcList.concat(data.list);
      if (
        data.list.length === 0 ||
        this.pageNo * this.pageSize > this.atcList.length
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
.atc-container {
  padding-top: 16rpx;
  margin: auto;
  width: 710rpx;
  column-count: 2;
  column-gap: 1;
}
</style>