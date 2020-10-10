<template>
  <div id="person-edit-container">
    <div class="zhanwei"></div>
    <div class="person-edit-item fl-bt" @tap="uploadImgFunc">
      <text class="fz-15 mr-l-30">修改头像</text>
      <div class="fl-al mr-r-30">
        <image
          class="edit-item-img"
          mode="aspectFill"
          :src="userImgUrl + form.avatarUrl"
        />
        <text class="iconfont iconyoujiantou fz-14 fc-999 mr-l-4"></text>
      </div>
    </div>
    <div class="person-edit-item fl-bt">
      <text class="fz-15 mr-l-30">昵称</text>
      <div class="fl-al mr-r-30">
        <input
          class="uni-input input-style fl-al fz-15"
          maxlength="12"
          @blur="inputChange"
          v-model="form.nickName"
          placeholder="请输入昵称"
        />
        <text class="iconfont iconyoujiantou fz-14 fc-999 mr-l-4"></text>
      </div>
    </div>
    <picker
      @change="bindPickerChange"
      :value="sexIndex"
      :range="sexList"
      range-key="name"
    >
      <div class="person-edit-item fl-bt">
        <text class="fz-15 mr-l-30">性别</text>
        <div class="fl-al mr-r-30">
          <text class="fz-15">{{ sexList[sexIndex].name }}</text>
          <text class="iconfont iconyoujiantou fz-14 fc-999 mr-l-4"></text>
        </div>
      </div>
    </picker>
    <!-- <div class="person-edit-item fl-bt">
      <text class="fz-15 mr-l-30">手机号</text>
      <div class="fl-al mr-r-30">
        <input
         @blur="inputChange"
          class="uni-input input-style fl-al fz-15"
          maxlength="11"
          v-model="form.telNumber"
          placeholder="请输入手机号"
        />
        <text class="iconfont iconyoujiantou fz-14 fc-999 mr-l-4"></text>
      </div>
    </div> -->
    <div class="save-user-info fl-cen" @tap="submitHandle">
      <text class="fz-20 fc-fff fw-bold">退出</text>
    </div>
  </div>
</template>
<script>
const { toast, common } = require("../../utils/index");
const { userImgUrl } = require("../../config/develop");
export default {
  data() {
    return {
      sexList: [
        {
          name: "男",
          value: 1,
        },
        {
          name: "女",
          value: 2,
        },
      ],
      sexIndex: 0,
      form: {
        gender: 1,
        nickName: "",
        avatarUrl: "",
        // telNumber: "",
      },
      userno: "",
      userImgUrl: userImgUrl,
    };
  },
  onLoad() {
    this.userno = uni.getStorageSync("userno");
    this.getUserinfo();
  },
  // onUnload() {
  //   this.$api.editUserInfo(this.form);
  // },
  methods: {
    inputChange(){
      this.$api.editUserInfo(this.form);
    },
    // 获取详情
    async getUserinfo() {
      const { data } = await this.$api.getAllUserInfo({
        userNo: this.userno,
      });
      this.sexIndex = data.gender - 1;
      this.form.gender = data.gender;
      this.form.avatarUrl = data.avatarUrl;
      this.form.nickName = data.nickName;
      // this.form.telNumber = data.telNumber;
      this.form.id = data.id;
    },
    bindPickerChange(val) {
      this.sexIndex = val.detail.value;
      this.form.gender = this.sexList[val.detail.value].value;
      this.$api.editUserInfo(this.form);
    },
    // 上传图片
    async uploadImgFunc() {
      const data = await common.updataImg(1, "用户初始化");
      this.form.avatarUrl = data[0].imgObj;
      this.$api.editUserInfo(this.form);
    },
    // 提交
    submitHandle() {
      const _this = this;
      uni.showModal({
        title: "提示",
        content: "是否退出账号",
        success: function (res) {
          if (res.confirm) {
            uni.clearStorageSync();
            uni.reLaunch({
              url: "/pages/page/login",
            });
          } else if (res.cancel) {
            return;
          }
        },
      });
      // toast.showLoading("修改中");
      // this.$api
      //   .editUserInfo(this.form)
      //   .then((res) => {
      //     toast.showToast("修改成功");
      //     uni.hideLoading();
      //     uni.navigateBack({
      //       delta: 1,
      //     });
      //   })
      //   .catch(() => {
      //     uni.hideLoading();
      //   });
    },
  },
};
</script>
<style scoped>
#person-edit-container {
  height: 100%;
  background-color: #f8f8f8;
}
.person-edit-item {
  width: 100%;
  height: 108rpx;
  background-color: #ffffff;
  border-bottom: 1px solid #f8f8f8;
}
.edit-item-img {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}
.input-style {
  text-align: right;
}
.zhanwei {
  width: 100%;
  height: 20rpx;
}
.save-user-info {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 108rpx;
  background: linear-gradient(to right, #333333, #666666);
}
</style>