<template>
  <div>
    <div class="meta-title">
      <b>字体详情</b>
    </div>
    <div class="font-list">
      <div class="font-family" v-for="(family,fonts) in dataset" >
        <div class="family-name" @click="fontFamilyClick">
          <i class="material-icons">folder</i>
          <span>{{family}}<b style="color:#1f78ba;">({{fonts.length}})</b></span>
        </div>
        
        <div class="font-item"  v-for="font in fonts" title="{{font.name}}" style="display:none;">
          <i class="material-icons">title</i>
          <img :src="font.previewUrl" title="{{font.name}}" style="width:calc(100% - 25px);">
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
export default {
  props:['dataset'],
  methods: {
    fontFamilyClick:function(e){
      var font_item = $(e.target).closest(".font-family").children(".font-item");
      if(font_item.is(":visible")){
        font_item.css("display","none");
      }else{
        font_item.css("display","block");
      }
    },
  }
}
</script>

<style scoped>
.meta-title{
  padding: 5px 10px;
  color: #717070;
  background-color: #f3f3f3;
  border-radius: 10px 10px 0 0;
}

.font-list{
  display: block;
  overflow: auto;
  margin: 10px;
  padding: 5px;
  max-height: 340px;
  background-color: #f5f5f5;
  scrollbar-track-color:#f5f5f5;
  scrollbar-face-color:#dcdcdc;
}

.font-list .font-family{
  width: 100%;
}

.font-list .font-item{
  width: calc(100% - 5px);
  margin-left:5px;
}

.font-list .font-item:hover,.font-list .family-name:hover{
  background-color: #ababab;
  cursor:pointer;
} 

.font-list::-webkit-scrollbar {
  width: 6px;
}

.font-list::-webkit-scrollbar:horizontal {
  height: 6px;
}

/* 滚动条的滑轨背景颜色 */
.font-list::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}

/* 滑块颜色 */
.font-list::-webkit-scrollbar-thumb {
  background-color: #dcdcdc;
}

.font-family i{
  font-size: 18px;
  vertical-align: middle;
}
</style>
