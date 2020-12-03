<template>
  <div class="consult-container fl-co">
    <span class="fz-15 fw-bold">我们针对不同的问题肌肤</span>
    <span class="fz-15 fw-bold mr-t-10">提供一对一护肤方案</span>
    <span class="fz-11 mr-t-20">WE FOCUS ON DIFFERENT SKIN PROBLEMS</span>
    <span class="fz-11 mr-t-4">PROVIDE ONE-ON-ONE SKINCARE SOLUTIONS</span>
    <div class="consult-service-box fl-bt mr-t-80">
      <div class="consult-service-row fl-cen">
        <span class="fz-15">肤质</span>
      </div>
      <div class="consult-service-row fl-cen">
        <span class="fz-15">肤色</span>
      </div>
      <div class="consult-service-row fl-cen">
        <span class="fz-15">肤感</span>
      </div>
      <div class="consult-service-row fl-cen">
        <span class="fz-15">服龄</span>
      </div>
    </div>
    <div class="four-and-one fl-cen mr-t-20">
      <span class="fz-14">四位一体改善系统</span>
    </div>
    <span class="fz-14 mr-t-80">初印象护肤顾问，为您保驾护航</span>
    <button class="fl-cen ask-next-btn mr-t-30" open-type="contact">
      <image class="ask-icon" src="../../static/class/ask-icon.png" />
      <text class="mr-l-4 fz-13 fc-fff mr-l-8">立即咨询</text>
    </button>
  </div>
</template>
<style>
page {
  height: 100%;
}
</style>
<style scoped>
.consult-container {
  height: 100%;
}
.consult-service-box {
  width: 522rpx;
}
.consult-service-row {
  width: 92rpx;
  height: 92rpx;
  border-radius: 50%;
  border: 1px solid #313131;
}
.four-and-one {
  width: 240rpx;
  height: 40rpx;
  border-radius: 40rpx;
  border: 1px solid #313131;
}
.ask-next-btn {
  width: 188rpx;
  height: 42rpx;
  background: linear-gradient(to right, #666666, #333333);
  border-radius: 21rpx 21rpx;
  animation: mymove 2s infinite;
}
.ask-icon {
  width: 20rpx;
  height: 26rpx;
}
@keyframes mymove {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0.9);
  }
}
</style>