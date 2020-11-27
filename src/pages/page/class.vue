<template>
  <div class="class-contianer">
    <!-- 头部搜索 -->
    <div class="class-top-search fl-bt">
      <div class="search-next-box fl-al mr-l-20" @tap="navToPathSearch">
        <image class="search-img" src="../../static/home/ss.png" />
        <text class="fz-12 fc-999 mr-l-10">输入搜索内容</text>
      </div>
      <div
        class="fl-co mr-r-20"
        v-if="checkType === 'all'"
        @tap="checkTypeChange('class')"
      >
        <text class="iconfont iconstack fz-19"></text>
        <text class="fz-12 fc-999">全部</text>
      </div>
      <div
        class="fl-co mr-r-20"
        v-if="checkType === 'class'"
        @tap="checkTypeChange('all')"
      >
        <text class="iconfont iconfenlei fz-19"></text>
        <text class="fz-12 fc-999">分类</text>
      </div>
    </div>
    <!-- 分类商品 -->
    <div
      class="class-letf-shops"
      v-if="checkType === 'all'"
      :style="[{ height: winnerHiehgt + 'px', marginTop: '10px' }]"
    >
      <!-- 左边分类选项 -->
      <div class="left-shop-box">
        <div
          class="fl-cen"
          v-for="(item, index) in classList"
          :key="index"
          @tap="checkInfo(item)"
          :class="[
            item.viewId === viewInfo ? 'item-left-title' : 'item-left-title2',
          ]"
        >
          <div
            class="fl-cen"
            :class="[
              item.viewId === viewInfo
                ? 'left-class-center'
                : 'left-class-center2',
            ]"
          >
            <text class="fz-14">{{ item.stringType }}</text>
          </div>
        </div>
      </div>
      <!-- 右边商品选项 -->
      <div class="right-scroll-box">
        <image class="right-top-img" :src="showClassImg"></image>
        <scroll-view
          style="margin-top: 30rpx"
          :style="[{ height: classGoodsHeight + 'px' }]"
          scroll-y
          :scroll-into-view="viewInfo"
          scroll-with-animation="true"
          @scroll="onScroll"
        >
          <div
            class="mr-t-50 commodity-height-box"
            v-for="(item, index) in classList"
            :key="index"
            :id="item.viewId"
          >
            <div class="commodity-top-title fl-al">
              <text class="fz-12 fw-bold">{{ item.stringType }}</text>
              <image class="shu-style mr-l-6" src="../../static/me/shu.png" />
            </div>
            <div class="commodity-bottom-box">
              <div
                class="commodity-item-style"
                v-for="(i, n) in item.lg"
                :key="n"
                @tap="navToDetail(i.gid)"
              >
                <image class="commodity-shop-img" :src="httpImg + i.gimg" />
                <div class="commodity-shop-name fz-12">{{ i.gtitle }}</div>
              </div>
            </div>
          </div>
          <!-- <div style="height:700rpx"></div> -->
        </scroll-view>
      </div>
    </div>
    <div v-if="checkType === 'class'">
      <div class="fl-bt top-check-box">
        <text
          class="fz-14 mr-l-74"
          :class="[allCheckType === 0 ? 'fc-333 fw-bold' : 'fc-999']"
          @tap="allCheckTypeHandle(0)"
          >全部</text
        >
        <text
          class="fz-14"
          :class="[allCheckType === 1 ? 'fc-333 fw-bold' : 'fc-999']"
          @tap="allCheckTypeHandle(1)"
          >销量</text
        >
        <div class="fl-al mr-r-74" @tap="allCheckTypeHandle(2)">
          <text
            class="fz-14"
            :class="[allCheckType === 2 ? 'fc-333 fw-bold' : 'fc-999']"
            >价格</text
          >
          <div
            class="fl-co mr-l-6"
            v-if="priceicon === 1 && allCheckType === 2"
          >
            <image class="jiantou-style" src="../../static/class/top.png" />
            <image
              class="jiantou-style mr-t-2"
              src="../../static/class/bottom.png"
            />
          </div>
          <div
            class="fl-co mr-l-6 sort-style-inline"
            v-else-if="priceicon === 2 && allCheckType === 2"
          >
            <image class="jiantou-style" src="../../static/class/top.png" />
            <image
              class="jiantou-style mr-t-2"
              src="../../static/class/bottom.png"
            />
          </div>
          <div class="fl-co mr-l-6 sort-style-inline" v-else>
            <image class="jiantou-style" src="../../static/class/top.png" />
            <image
              class="jiantou-style mr-t-2 sort-style-inline"
              src="../../static/class/top.png"
            />
          </div>
        </div>
      </div>
      <scroll-view
        class="right-scroll-shop"
        :style="[{ height: rightScrollHeight + 'px' }]"
        scroll-y
      >
        <div class="scroll-shop-list fl-btw">
          <ClassItem v-for="item in allList" :key="item" :objItem="item" />
        </div>
      </scroll-view>
    </div>
  </div>
</template>
<script>
import { toast } from "../../utils/index";
import { httpImg, uploadImgUrl } from "../../config/develop";
export default {
  data() {
    return {
      allList: [], // 全部商品
      classList: [], // 分类商品
      winnerHiehgt: 0, // 节点高度
      rightScrollHeight: 0,
      viewInfo: "A", // 当前节点显示
      heightArr: [], // 高度列表
      checkType: "all",
      allCheckType: 0,
      httpImg: httpImg, // 图片路径
      uploadImgUrl: uploadImgUrl, // 图片路径
      priceicon: 1,
      showClassImg: "",
      classGoodsHeight: 0,
    };
  },
  async onLoad() {
    await this.getTableList();
    await this.getDomHeight();
  },
  onShareAppMessage() {
    return {
      path: `/pages/page/home`,
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
  methods: {
    // 获取商品列表
    async getTableList() {
      toast.showLoading("加载中");
      const { data } = await this.$api.getClassList();
      this.allList = data.all;
      data.category.forEach((item) => {
        item.viewId = "ta" + item.id;
      });
      this.viewInfo = data.category[0].viewId;
      this.classList = data.category;
      uni.hideLoading();
    },
    // 获取all list
    async getTableAll() {
      toast.showLoading("加载中");
      const { data } = await this.$api.getClassAllList({
        idx: this.allCheckType,
        priceicon: this.priceicon,
      });
      this.allList = data;
      uni.hideLoading();
    },
    navToDetail(gId) {
      uni.navigateTo({
        url: `/subPackages/home/shopDetail?gId=${gId}`,
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
          this.viewInfo = this.classList[i].viewId;
        } else if (scrollTop >= 0 && scrollTop < scrollArr[0]) {
          this.viewInfo = this.classList[0].viewId;
        }
      }
      this.classImgHandle();
    },
    // 切换
    checkInfo(row) {
      this.viewInfo = "ta" + row.id;
      this.classImgHandle();
    },
    getRightDom() {
      this.rightScrollHeight = this.windowHeight - 4;
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
            parseInt(this.navHeight) -
            4 -
            10;
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
      uni
        .createSelectorQuery()
        .selectAll(".right-top-img")
        .boundingClientRect((react) => {
          this.classGoodsHeight = this.winnerHiehgt - react[0].height - 20;
        })
        .exec();
      this.classImgHandle();
    },
    classImgHandle() {
      this.classList.forEach((item) => {
        if (item.viewId === this.viewInfo) {
          this.showClassImg = this.uploadImgUrl + item.typePic;
        }
      });
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
      if (type === 2) {
        if (this.allCheckType === type) {
          if (this.priceicon === 1) {
            this.priceicon = 2;
          } else {
            this.priceicon = 1;
          }
        }
        this.allCheckType = type;
        this.getTableAll();
      } else {
        if (this.allCheckType === type) return;
        this.allCheckType = type;
        this.getTableAll();
      }
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
  /* padding-top: 26rpx; */
  width: 200rpx;
  background-color: #f6f7f8;
}
.item-left-title {
  width: 100%;
  height: 92rpx;
  background-color: #fff;
}
.item-left-title2 {
  width: 100%;
  height: 92rpx;
  background-color: #f6f7f8;
}
.left-class-center {
  width: 100%;
  height: 46rpx;
  border-left: 6rpx solid #a4423f;
}
.left-class-center2 {
  width: 100%;
  height: 46rpx;
  border-left: 6rpx solid #f6f7f8;
}
.right-scroll-box {
  padding-bottom: 30rpx;
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
  display: flex;
  flex-wrap: wrap;
}
.commodity-item-style {
  margin-top: 20rpx;
  margin-right: 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
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
.sort-style-inline {
  transform: rotate(180deg);
}
.right-top-img {
  width: 498rpx;
  height: 240rpx;
  border-radius: 10rpx;
}
</style>