<template>
  <div class="class-contianer">
    <!-- 头部搜索 -->
    <div class="class-top-search fl-bt">
      <div class="search-next-box fl-al mr-l-20" @tap="navToPathSearch">
        <image class="search-img" src="../../static/home/ss.png" />
        <text class="fz-12 fc-999 mr-l-10">输入搜索内容</text>
      </div>
      <div class="fl-co mr-r-20" v-if="checkType ==='all'" @tap="checkTypeChange('class')">
        <text class="iconfont iconstack fz-19"></text>
        <text class="fz-12 fc-999">全部</text>
      </div>
      <div class="fl-co mr-r-20" v-if="checkType ==='class'" @tap="checkTypeChange('all')">
        <text class="iconfont iconfenlei fz-19"></text>
        <text class="fz-12 fc-999">分类</text>
      </div>
    </div>
    <!-- 分类商品 -->
    <div class="class-letf-shops" v-if="checkType ==='all'" :style="[{height:winnerHiehgt+'px'}]">
      <!-- 左边分类选项 -->
      <div class="left-shop-box">
        <div
          class="fl-cen"
          v-for="(item,index) in shopList"
          :key="index"
          @tap="checkInfo(item)"
          :class="[item.id===viewInfo?'item-left-title':'item-left-title2']"
        >
          <div
            class="fl-cen"
            :class="[item.id===viewInfo?'left-class-center':'left-class-center2']"
          >
            <text class="fz-14">{{item.title}}</text>
          </div>
        </div>
      </div>
      <!-- 右边商品选项 -->
      <scroll-view
        class="right-scroll-box"
        scroll-y
        :scroll-into-view="viewInfo"
        scroll-with-animation="true"
        @scroll="onScroll"
      >
        <div
          class="mr-t-50 commodity-height-box"
          v-for="(item,index) in shopList"
          :key="index"
          :id="item.id"
        >
          <div class="commodity-top-title fl-al">
            <text class="fz-12">{{item.title}}</text>
            <image class="shu-style mr-l-6" src="../../static/me/shu.png" />
          </div>
          <div class="commodity-bottom-box">
            <div
              @tap="navToDetail"
              class="fl-co commodity-item-style"
              v-for="(i,n) in item.arr"
              :key="n"
            >
              <image class="commodity-shop-img" src="../../static/home/9.png" />
              <div class="commodity-shop-name fz-12">{{i}}</div>
            </div>
          </div>
        </div>
        <!-- <div style="height:700rpx"></div> -->
      </scroll-view>
    </div>
    <div v-if="checkType ==='class'">
      <div class="fl-bt top-check-box">
        <text
          class="fz-14 mr-l-74"
          :class="[allCheckType==='1'?'fc-333 fw-bold':'fc-999']"
          @tap="allCheckTypeHandle('1')"
        >全部</text>
        <text
          class="fz-14"
          :class="[allCheckType==='2'?'fc-333 fw-bold':'fc-999']"
          @tap="allCheckTypeHandle('2')"
        >销量</text>
        <div class="fl-al mr-r-74">
          <text
            class="fz-14"
            :class="[allCheckType==='3'?'fc-333 fw-bold':'fc-999']"
            @tap="allCheckTypeHandle('3')"
          >价格</text>
          <div class="fl-co mr-l-6">
            <image class="jiantou-style" src="../../static/class/top.png" />
            <image class="jiantou-style mr-t-2" src="../../static/class/bottom.png" />
          </div>
        </div>
      </div>
      <scroll-view class="right-scroll-shop" :style="[{height:rightScrollHeight+'px'}]" scroll-y>
        <div class="scroll-shop-list fl-btw">
          <ClassItem v-for="item in 2" :key="item" />
        </div>
      </scroll-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shopList: [
        {
          title: "肌底精华",
          id: "A",
          arr: ["商品", "商品", "商品"],
        },
        {
          title: "洁面水乳",
          id: "B",
          arr: ["商品", "商品", "商品"],
        },
        {
          title: "热销套装",
          id: "C",
          arr: ["商品", "商品", "商品", "商品", "商品", "商品"],
        },
        {
          title: "口碑面膜",
          id: "D",
          arr: ["商品", "商品", "商品"],
        },
        {
          title: "印象精选",
          id: "E",
          arr: ["商品", "商品", "商品"],
        },
        {
          title: "爆款囤货",
          id: "F",
          arr: ["商品", "商品", "商品"],
        },
      ],
      winnerHiehgt: 0, // 节点高度
      rightScrollHeight: 0,
      viewInfo: "A", // 当前节点显示
      heightArr: [], // 高度列表
      checkType: "all",
      allCheckType: "1",
    };
  },
  computed: {
    windowHeight() {
      return getApp().globalData.windowHeight;
    },
    navHeight() {
      return getApp().globalData.navHeight;
    },
  },
  onLoad() {},
  mounted() {
    this.getDomHeight();
  },
  methods: {
    navToDetail() {
      uni.navigateTo({
        url: "/subPackages/home/shopDetail",
      });
    },
    navToPathSearch() {
      uni.navigateTo({
        url: "/subPackages/class/search",
      });
    },
    // 滚动事件
    onScroll(e) {
      let scrollTop = e.detail.scrollTop;
      let scrollArr = this.heightArr;
      for (let i = 0; i < scrollArr.length; i++) {
        if (scrollTop >= scrollArr[i - 1] && scrollTop < scrollArr[i]) {
          this.viewInfo = this.shopList[i].id;
        } else if (scrollTop >= 0 && scrollTop < scrollArr[0]) {
          this.viewInfo = this.shopList[0].id;
        }
      }
    },
    // 切换
    checkInfo(row) {
      this.viewInfo = row.id;
    },
    getRightDom() {
      this.rightScrollHeight = this.windowHeight;
      // 获取滚动区域高度
      uni
        .createSelectorQuery()
        .select(".class-top-search")
        .boundingClientRect((res) => {
          this.rightScrollHeight -= res.height;
        })
        .exec();
      uni
        .createSelectorQuery()
        .select(".top-check-box")
        .boundingClientRect((res) => {
          this.rightScrollHeight -= res.height + parseInt(this.navHeight);
        })
        .exec();
    },
    // 节点高度
    getDomHeight() {
      let hg = 0;
      // 获取滚动区域高度
      uni
        .createSelectorQuery()
        .select(".class-top-search")
        .boundingClientRect((res) => {
          this.winnerHiehgt =
            parseInt(this.windowHeight) -
            parseInt(res.height) -
            parseInt(this.navHeight);
        })
        .exec();
      uni
        .createSelectorQuery()
        .selectAll(".commodity-height-box")
        .boundingClientRect((react) => {
          react.forEach((item) => {
            hg += item.height;
            this.heightArr.push(hg);
          });
        })
        .exec();
    },
    // 切换状态
    checkTypeChange(type) {
      this.checkType = type;
      if (type === "class") {
        const timer = setTimeout(() => {
          this.getRightDom();
          clearTimeout(timer);
        }, 100);
      }
    },
    allCheckTypeHandle(type) {
      this.allCheckType = type;
    },
  },
};
</script>
<style scoped>
.class-top-search {
  padding-top: 30rpx;
}
.search-next-box {
  width: 612rpx;
  height: 64rpx;
  border-radius: 10rpx;
  background-color: #eeeeee;
}
.search-img {
  margin-left: 26rpx;
  width: 26rpx;
  height: 27rpx;
}
.class-letf-shops {
  display: flex;
  justify-content: space-between;
}
.left-shop-box {
  padding-top: 26rpx;
  width: 200rpx;
}
.item-left-title {
  width: 100%;
  height: 106rpx;
}
.item-left-title2 {
  width: 100%;
  height: 106rpx;
  background-color: #f6f7f8;
}
.left-class-center {
  width: 100%;
  height: 62rpx;
  border-left: 6rpx solid #f11b20;
}
.left-class-center2 {
  width: 100%;
  height: 62rpx;
  border-left: 6rpx solid #f6f7f8;
}
.right-scroll-box {
  padding-bottom: 30rpx;
  margin-top: 20rpx;
  width: 532rpx;
}
.shu-style {
  width: 10rpx;
  height: 18rpx;
}
.commodity-shop-img {
  width: 140rpx;
  height: 140rpx;
  border-radius: 10rpx;
}
.commodity-shop-name {
  margin-top: 20rpx;
  width: 96rpx;
  text-align: center;
}
.commodity-bottom-box {
  margin-top: 30rpx;
  display: flex;
  flex-wrap: wrap;
}
.commodity-item-style {
  margin-right: 30rpx;
}
.top-check-box {
  width: 100%;
  height: 104rpx;
}
.jiantou-style {
  width: 16rpx;
  height: 11rpx;
}
.right-scroll-shop {
  width: 100%;
  background-color: #f8f8f8;
}
.scroll-shop-list {
  margin: 0 auto 36rpx;
  width: 710rpx;
}
</style>