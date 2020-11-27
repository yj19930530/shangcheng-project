<template>
  <div id="water-container" class="fl-btw">
    <Water v-for="item in allList" :key="item.id" :objData="item" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      allList: [],
      waterId: "",
    };
  },
  onLoad(obj) {
    this.waterId = obj.id;
    this.getTableList();
  },
  onShareAppMessage() {
    return {
      path: `/pages/page/home`,
    };
  },
  methods: {
    // 获取商品列表
    async getTableList() {
      const { data } = await this.$api.getClassList();
      data.all.forEach((item) => {
        if (item.columns == this.waterId) {
          this.allList.push(item);
        }
      });
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
#water-container {
  padding-top: 20rpx;
  margin: auto;
  width: 710rpx;
}
</style>