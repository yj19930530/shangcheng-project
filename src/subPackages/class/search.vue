<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <div class="search-top-box fl-al">
      <text class="iconfont iconsousuo fz-12 mr-l-20"></text>
      <input
        class="uni-input fz-12 mr-l-10 input-widht-style"
        v-model="inputVal"
        confirm-type="search"
        @confirm="searchHandle"
        placeholder="输入搜索内容"
      />
      <text class="fz-12 fc-999 mr-l-20" v-if="inputVal!==''" @tap="clearVal">清除</text>
    </div>
    <!-- 历史搜索列表 -->
    <div class="history-box" v-if="!goodsList.length">
      <div class="fl-bt">
        <text class="fz-15 fw-bold">历史搜索</text>
        <div class="fl-al" @tap="clearHistory">
          <image class="suosuo-icon" src="../../static/class/sousuo.png" />
          <text class="fz-12 fc-999 mr-l-4">清空历史记录</text>
        </div>
      </div>
      <div class="fl-btc mr-t-30">
        <div
          class="search-result fl-cen mr-r-20 mr-b-20"
          v-for="(item,index) in searchList"
          :key="index"
          @tap="hisValSearch(item)"
        >
          <text class="fz-14 fc-999">{{item}}</text>
        </div>
      </div>
    </div>
    <!-- 搜索列表 -->
    <div class="goods-list" v-else>
      <div class="goods-center-box fl-btw">
        <ClassItem v-for="(item,index) in goodsList" :key="index" :objItem="item" />
      </div>
    </div>
  </div>
</template>
<script>
const { toast } = require("../../utils/index");
export default {
  data() {
    return {
      inputVal: "",
      searchList: [],
      goodsList: [],
    };
  },
  onLoad() {
    let val = uni.getStorageSync("search");
    if (val) this.searchList = JSON.parse(val);
  },
  methods: {
    // 清空历史记录
    clearHistory() {
      this.inputVal = "";
      this.goodsList.length = 0;
      this.searchList.length = 0;
      uni.removeStorageSync("search");
    },
    clearVal() {
      this.inputVal = "";
      this.goodsList.length = 0;
    },
    async searchHandle() {
      this.searchList.push(this.inputVal);
      this.searchList = [...new Set(this.searchList)];
      uni.setStorageSync("search", JSON.stringify(this.searchList));
      this.getList();
    },
    async getList() {
      toast.showLoading("加载中");
      const { data } = await this.$api.getClassAllList({
        gName: this.inputVal,
        idx: 1,
      });
      this.goodsList = data;
      uni.hideLoading();
    },
    // 历史搜索
    hisValSearch(val) {
      this.inputVal = val;
      this.getList();
    },
  },
};
</script>
<style scoped>
.search-container {
  padding-top: 10rpx;
}
.search-top-box {
  margin: auto;
  width: 710rpx;
  height: 64rpx;
  background-color: #eeeeee;
  border-radius: 10rpx;
}
.input-widht-style {
  width: 570rpx;
}
.history-box {
  margin: 30rpx auto 0;
  width: 710rpx;
}
.suosuo-icon {
  width: 26rpx;
  height: 26rpx;
}
.search-result {
  width: 132rpx;
  height: 40rpx;
  border-radius: 20rpx;
  background-color: #eeeeee;
}
.goods-list {
  margin-top: 16rpx;
  padding-bottom: 30rpx;
  width: 100%;
  background-color: #f8f8f8;
}
.goods-center-box {
  margin: auto;
  width: 710rpx;
}
</style>