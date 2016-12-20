<template>
  <div id='map-draw'>
    <mdl-snackbar display-on="mailSent"></mdl-snackbar>
    <div id="tool_panel">
      <div class="boxopt box_label" @click="showLabelPanel">
        <span></span>          
        <i>图标</i>
        <em></em>
      </div>
      <b></b>
      <div class="boxopt box_text" @click="drawTextStart">
        <span></span>          
        <i>文字</i> 
      </div>
      <b></b>
      <div class="boxopt box_line" @click="showLinePanel">
        <span></span>          
        <i>线型</i>
        <em></em>
      </div>
      <b></b>
      <div class="boxopt box_polygon" @click="showPolygonPanel">
        <span></span>          
        <i>形状</i>
        <em></em>
      </div>
      <b></b>
      <div class="boxopt box_tool" @click="showToolPanel">
        <span></span>        
        <i>操作</i>
        <em></em>   
      </div>
    </div>

    <div id="icon-select-toolbar" class="panel">
      <div class="icon-select" >
        <a v-for="icon in spriteObj.icons" class="icon-link" title="{{icon.name}}" @click="drawIconStart($event)">
          <div :style="'background-image:url('+spriteObj.pngUrl+');background-position:-'+icon.positions.x+'px -'+icon.positions.y+'px;width:'+icon.positions.width+'px;height:'+icon.positions.height+'px;'" title="{{icon.name}}">
          </div>
        </a>
      </div>
    </div>

    <!--操作面板-->
    <div id="detail-box" class="panel marker_panel">
      <ul class="boxinfo">
        <li title="删除选中要素" @click="deleteSelected">
          <i>删除</i>
        </li>
        <li title="删除所有要素" @click="deleteAll">
          <i>清除</i>
        </li>
        <li title="移动" @click="setSelectMode">
          <i>编辑要素</i>
        </li>
        <li title="更该样式" @click="setStaticMode">
          <i>更改样式</i>
        </li>
        <li title="显示/隐藏" @click="showShapes">
          <i>显示/隐藏</i>
        </li>
      </ul>
    </div>
    
    <!--以下定义添加标记面板-->
    <div id = "fill_marker_panel" class="panel marker_panel">
      <ul class="boxinfo">
        <li id="triangle-marker" title="添加三角形" @click="drawTriangle">
          <i>三角形</i>
        </li>
        <li id="rect-marker" title="添加矩形" @click="drawRect">
          <i>矩形</i>
        </li>
        <li id="circle-marker" title="添加圆" @click="drawCircle">
          <i>圆</i>
        </li>
        <li id="arrow-marker" title="添加箭头" @click="drawArrow">
          <i>箭头</i>
        </li>
        <li id="polygon-marker" title="添加任意多边形" @click="drawPolygonStart">
          <i>多边形</i>
        </li>
      </ul>
    </div>
    <div id = "line_marker_panel" class="panel marker_panel">
      <ul class="boxinfo">
        <li id="line-marker" title="添加折线" @click="drawLineStart">
          <i>折线</i>
        </li>
        <li id="arcmarker" title="添加弧线" @click="drawArc">
          <i>弧形</i>
        </li>
        <li id="bezier-marker" title="添加曲线" @click="drawBezier">
          <i>Bezier曲线</i>
        </li>
      </ul>
    </div>
    <div id="icon-set" class="set">
      <div class="icon-select" id="icon-select-map">
        <a v-for="icon in spriteObj.icons" class="icon-link" title="{{icon.name}}">
          <div :style="'background-image:url('+spriteObj.pngUrl+');background-position:-'+icon.positions.x+'px -'+icon.positions.y+'px;width:'+icon.positions.width+'px;height:'+icon.positions.height+'px;'" title="{{icon.name}}">
          </div>
        </a>
      </div>
    </div>

    <div id="text-set" class="set">
      <div id="text-input">
        <span>注记内容:</span><input type="text" name="label">
        <span>颜色:</span><input type="color" name="color"></br>
        <span>文字大小:</span><input type="range" min="12" max="60" step="1" name="size">
        <span class="textsize-range-value"></span></br>
      </div>
    </div>

    <div id="line-set" class="set">
      <span>线宽:</span><input type="range" min="1" max="10" step="0.5" name="line-width">
      <span class="linewidth-range-value"></span></br>
      <span>颜色:</span><input type="color" name="line-color"></br>
    </div>

    <div id="polygon-set" class="set">
      <span>边框颜色:</span><input type="color" name="fill-outline-color" style="width:35px;">
      <span>填充颜色:</span><input type="color" name="fill-color" style="width:35px;">
      <span>边框宽度:</span><input type="range" min="1" max="10" step="0.5" name="fill-outline-width">
      <span class="width-range-value">5</span></br>
      <span>不透明度:</span><input type="range" min="0" max="1" step="0.05" name="fill-opacity">
      <span class="opacity-range-value">0.5</span>
    </div>

  </div>
</template>


<script>
//import Draw from 'gl-draw-foxgis'
import Draw from 'gl-draw-foxgis'
import Cookies from 'js-cookie'
import { changeStyle } from '../../vuex/actions'
export default {
  vuex: {
    getters: {
      style: state => state.map.style
    },
    actions: {
      changeStyle
    }
  },
  methods:{
    drawTriangle:function() {
      this.currentMode = "draw_triangle";
      this.draw.changeMode("draw_triangle");
      this.map.on("draw.create",this.drawPolygonEnd);
      $(".panel").css("display","none");
      this.initToolPanel();
    },
    drawRect:function(){
      this.currentMode = "draw_rectangle";
      this.draw.changeMode("draw_rectangle");
      this.map.on("draw.create",this.drawPolygonEnd);
      $(".panel").css("display","none");
      this.initToolPanel();
    },
    drawCircle:function(){
      this.currentMode = "draw_circle";
      this.draw.changeMode("draw_circle");
      this.map.on("draw.create",this.drawPolygonEnd);
      $(".panel").css("display","none");
      this.initToolPanel();
    },
    drawArrow:function(){
      this.currentMode = "draw_arrow";
      this.draw.changeMode("draw_arrow");
      this.map.on("draw.create",this.drawPolygonEnd);
      $(".panel").css("display","none");
      this.initToolPanel();
    },
    drawArc:function(){
      this.currentMode = "draw_arc";
      this.draw.changeMode("draw_arc");
      this.map.on("draw.create",this.drawLineEnd);
      $(".panel").css("display","none");
      this.initToolPanel();
    },
    drawBezier:function(){
      this.currentMode = "draw_bezier";
      this.draw.changeMode("draw_bezier");
      this.map.on("draw.create",this.drawLineEnd);
      $(".panel").css("display","none");
      this.initToolPanel();
    },
    iconChange:function(e){
      var name = e.target.title;
      var id = e.data.id;
      this.map.setLayoutProperty(id+"_hot","icon-image",name)
      this.map.setLayoutProperty(id+"_cold","icon-image",name)
    },
    textChange:function(e){
      var name = e.target.name;
      var id = e.data.id;
      var value = e.target.value;
      if(name==="label"){ 
        this.map.setLayoutProperty(id+"_hot","text-field",value);
        this.map.setLayoutProperty(id+"_cold","text-field",value);
        this.textDrawStyle.name = value;
      }
      if(name==="size"){
        $(".textsize-range-value").text(value);
        this.map.setLayoutProperty(id+"_hot","text-size",Number(value));
        this.map.setLayoutProperty(id+"_cold","text-size",Number(value));
        this.textDrawStyle.size = Number(value);
      }
      if(name==="color"){
        this.map.setPaintProperty(id+"_hot","text-color",value);
        this.map.setPaintProperty(id+"_cold","text-color",value);
        this.textDrawStyle.color = value;
      }
    },
    lineChange:function(e){
      var name = e.target.name;
      var id = e.data.id;
      var value = e.target.value;
      if(name==="line-width"){  
        $(".linewidth-range-value").text(value);
        this.map.setPaintProperty(id+"_hot","line-width",Number(value));
        this.map.setPaintProperty(id+"_cold","line-width",Number(value));
      }
      if(name==="line-color"){
        this.map.setPaintProperty(id+"_hot","line-color",value)
        this.map.setPaintProperty(id+"_cold","line-color",value)
      }
    },
    polygonChange:function(e){
      var name = e.target.name;
      var id = e.data.id;
      var value = e.target.value;
      if(name==="fill-outline-color"){  
        this.map.setPaintProperty(id+"_stroke_hot","line-color",value);
        this.map.setPaintProperty(id+"_stroke_cold","line-color",value);
      }
      if(name==="fill-outline-width"){  
        $(".width-range-value").text(value);
        this.map.setPaintProperty(id+"_stroke_hot","line-width",Number(value));
        this.map.setPaintProperty(id+"_stroke_cold","line-width",Number(value));
      }
      if(name==="fill-color"){
        this.map.setPaintProperty(id+"_fill_hot","fill-color",value)
        this.map.setPaintProperty(id+"_fill_cold","fill-color",value)
      }
      if(name==="fill-opacity"){
        $(".opacity-range-value").text(value);
        this.map.setPaintProperty(id+"_fill_hot","fill-opacity",Number(value));
        this.map.setPaintProperty(id+"_fill_cold","fill-opacity",Number(value));
      }
    },
    showShapes:function(e){
      if(this.visibility){
        this.visibility = false;
      }else{
        this.visibility = true;
      }
      var layers = this.map.style._layers;
      for(var layer in layers){
        if(layers[layer].source==="mapbox-gl-draw-cold"||layers[layer].source==="mapbox-gl-draw-hot"){
          if(this.visibility){
            this.map.setLayoutProperty(layer,"visibility","visible");
          }else{
            this.map.setLayoutProperty(layer,"visibility","none");
          }
        }
      }
      $(".panel").css("display","none");
      this.initToolPanel();
    },
    setSelectMode:function(){
      if(this.popup.remove){
        this.popup.remove();
      }
      this.draw.changeMode("simple_select");
      this.currentMode = "simple_select";
      $(".panel").css("display","none");
      this.initToolPanel();
    },
    setStaticMode:function(){
      this.draw.changeMode("static");
      this.currentMode = "static";
      $(".panel").css("display","none");
      this.initToolPanel();
    },
    showToolPanel:function(){
      if($(".box_tool i").attr("class") === 'active'){
        $("#detail-box").css("display","none");
        this.initToolPanel();
      }else{
        $(".panel").hide();
        this.initToolPanel();
        $("#detail-box").css("display","block");
        $(".box_tool span").addClass("active");
        $(".box_tool i").addClass("active");
        $(".box_tool em").addClass("active");
      }
    },
    showLabelPanel:function(){
      if($(".box_label i").attr("class") === 'active'){
        $("#icon-select-toolbar").css("display","none");
        this.initToolPanel();
      }else{
        $(".panel").hide();
        this.initToolPanel();
        $("#icon-select-toolbar").css("display","flex");
        $(".box_label span").addClass("active");
        $(".box_label i").addClass("active");
        $(".box_label em").addClass("active");
      }
    },
    drawIconStart:function(e){
      this.currentMode = "draw_icon";
      this.drawIconName = e.target.title;
      this.draw.changeMode("draw_point");
      this.map.on("draw.create",this.drawIconEnd);
      $("#icon-select-toolbar").css("display","none");
      this.initToolPanel();
    },
    drawIconEnd:function(e){
      var iconName = this.drawIconName;
      var id = e.features[0].id;
      var f = ["==","id",id];
      var filter = ["all",["==","$type","Point"],f]
      this.draw.setFeatureProperty(id,"id",id);
      this.draw.setFeatureProperty(id,"$type","Point");
      var layer1 = {
        id:id+"_hot",
        type:"symbol",
        filter:filter,
        source:"mapbox-gl-draw-hot",
        layout:{
          "icon-image":iconName,
          "icon-ignore-placement":true,
          "icon-allow-overlap":true
        },
        paint:{}
      }
      var layer2 = {
        id:id+"_cold",
        type:"symbol",
        filter:filter,
        source:"mapbox-gl-draw-cold",
        layout:{
          "icon-image":iconName,
          "icon-ignore-placement":true,
          "icon-allow-overlap":true
        },
        paint:{}
      }
      this.map.addLayer(layer1);
      this.map.addLayer(layer2);
      this.currentMode = "simple_select";
      this.draw.changeMode("simple_select");
      this.map.off("draw.create",this.drawIconEnd);
    },
    drawTextStart:function(){
      this.initToolPanel();
      this.currentMode = "draw_text";
      this.draw.changeMode("draw_point");
      this.map.on("draw.create",this.drawTextEnd);
      $(".panel").css("display","none");
      this.initToolPanel();
    },
    drawTextEnd:function(e){
      var id = e.features[0].id;
      var f = ["==","id",id];
      var filter = ["all",["==","$type","Point"],f]
      this.draw.setFeatureProperty(id,"id",id);
      this.draw.setFeatureProperty(id,"$type","Point");
      var layer1 = {
        id:id+"_hot",
        type:"symbol",
        filter:filter,
        source:"mapbox-gl-draw-hot",
        layout:{
          "text-field":this.textDrawStyle.name,
          "text-size":this.textDrawStyle.size,
          "text-font":["SimHei Regular"],
          "text-ignore-placement":true,
          "text-allow-overlap":true
        },
        paint:{
          "text-color":this.textDrawStyle.color
        }
      }
      var layer2 = {
        id:id+"_cold",
        type:"symbol",
        filter:filter,
        source:"mapbox-gl-draw-cold",
        layout:{
          "text-field":this.textDrawStyle.name,
          "text-size":this.textDrawStyle.size,
          "text-font":["SimHei Regular"],
          "text-ignore-placement":true,
          "text-allow-overlap":true
        },
        paint:{
          "text-color":this.textDrawStyle.color
        }
      }
      this.map.addLayer(layer1);
      this.map.addLayer(layer2);
      this.currentMode = "simple_select";
      this.map.off("draw.create",this.drawTextEnd);
    },
    drawLineStart:function(){
      this.currentMode = "draw_line_string";
      this.draw.changeMode("draw_line_string");
      this.map.on("draw.create",this.drawLineEnd);
      $(".panel").css("display","none");
      this.initToolPanel();
    },
    drawLineEnd:function(e){
      var id = e.features[0].id;
      var f = ["==","id",id];
      var filter = ["all",["==","$type","LineString"],f]
      this.draw.setFeatureProperty(id,"id",id);
      this.draw.setFeatureProperty(id,"$type","LineString");
      var layer1 = {
        id:id+"_hot",
        type:"line",
        filter:filter,
        source:"mapbox-gl-draw-hot",
        "layout":{
          "line-cap":"round",
          "line-join":"round"
        },
        "paint":{
          "line-color":"#ff0000",
          "line-width":2
        },
      }
      var layer2 = {
        id:id+"_cold",
        type:"line",
        filter:filter,
        source:"mapbox-gl-draw-cold",
        "layout":{
          "line-cap":"round",
          "line-join":"round"
        },
        "paint":{
          "line-color":"#ff0000",
          "line-width":2
        },
      }
      this.map.addLayer(layer1);
      this.map.addLayer(layer2);
      this.currentMode = "simple_select";
      this.map.off("draw.create",this.drawLineEnd);
    },
    drawPolygonStart:function(){
      this.currentMode = "draw_polygon";
      this.draw.changeMode("draw_polygon");
      this.map.on("draw.create",this.drawPolygonEnd);
      $(".panel").css("display","none");
      this.initToolPanel();
    },
    drawPolygonEnd:function(e){
      var id = e.features[0].id;
      var f = ["==","id",id];
      var filter = ["all",["==","$type","Polygon"],f]
      this.draw.setFeatureProperty(id,"id",id);
      this.draw.setFeatureProperty(id,"$type","Polygon");
      var layer1 = {
        id:id+"_fill_hot",
        type:"fill",
        filter:filter,
        source:"mapbox-gl-draw-hot",
        layout:{},
        paint:{
          "fill-color":"#0000ff",
          "fill-opacity":0.3
        }
      }
      var layer2 = {
        id:id+"_fill_cold",
        type:"fill",
        filter:filter,
        source:"mapbox-gl-draw-cold",
        layout:{},
        paint:{
          "fill-color":"#0000ff",
          "fill-opacity":0.3
        }
      }
      var layer3 = {
        id:id+"_stroke_hot",
        type:"line",
        filter:filter,
        source:"mapbox-gl-draw-hot",
        "layout":{
          "line-cap":"round",
          "line-join":"round"
        },
        "paint":{
          "line-color":"#ff0000",
          "line-width":2
        },
      }
      var layer4 = {
        id:id+"_stroke_cold",
        type:"line",
        filter:filter,
        source:"mapbox-gl-draw-cold",
        "layout":{
          "line-cap":"round",
          "line-join":"round"
        },
        "paint":{
          "line-color":"#ff0000",
          "line-width":2
        },
      }
      this.map.addLayer(layer1)
      this.map.addLayer(layer2)
      this.map.addLayer(layer3)
      this.map.addLayer(layer4)
      this.currentMode = "simple_select";
      this.map.off("draw.create",this.drawPolygonEnd);
    },
    deleteSelected:function(){
      var ids = this.draw.getSelectedIds();
      if(ids.length===0){
        this.$broadcast("mailSent",{message:"未选择任何要素！",timeout:3000});
        return;
      }
      this.draw.delete(ids);
      $(".panel").css("display","none");
      this.initToolPanel();
    },
    deleteAll:function(){
      this.draw.deleteAll();
      $(".panel").css("display","none");
      this.initToolPanel();
    },
    showLinePanel:function(){
      if($(".box_line i").attr("class") === 'active'){
        $("#linemarker_panel").css("display","none");
        this.initToolPanel();
      }else{
        $(".panel").hide();
        this.initToolPanel();
        $("#line_marker_panel").css("display","block");
        $(".box_line span").addClass("active");
        $(".box_line i").addClass("active");
        $(".box_line em").addClass("active");
      }
    },
    showPolygonPanel:function(){
      if($(".box_polygon i").attr("class") === 'active'){
        $("#fill_marker_panel").css("display","none");
        this.initToolPanel();
      }else{
        $(".panel").hide();
        this.initToolPanel();
        $("#fill_marker_panel").css("display","block");
        $(".box_polygon span").addClass("active");
        $(".box_polygon i").addClass("active");
        $(".box_polygon em").addClass("active");
      }
    },
    initToolPanel:function(){
      $(".boxopt span").removeClass("active");
      $(".boxopt i").removeClass("active");
      $(".boxopt em").removeClass("active");
    },
  },
   events: {
    'init-tool':function(){
      this.initToolPanel();
    },
    'map-click': function(options){
      var e = options.event;
      var feature = options.features[0];
      var featureId = feature.properties.id;
      var dom;
      var featureIds = this.draw.getFeatureIdsAt(e.point);
      if(feature.geometry.type==="Polygon"){
        dom = $("#polygon-set").clone();
        dom.css("display","block");
        dom.children("input").bind("change",{id:featureId},this.polygonChange);
      }else if(feature.geometry.type==="LineString"){
        dom = $("#line-set").clone();
        dom.css("display","block");
        dom.children("input").bind("change",{id:featureId},this.lineChange);
      }else if(feature.geometry.type==="Point"){
        if(feature.layer.layout["text-field"]){//点击的是文本
          dom = $("#text-set").clone();
          dom.css("display","block");
          dom.children("#text-input").children("input").bind("change",{id:featureId},this.textChange);
        }else if(feature.layer.layout["icon-image"]){//点击的是图标
          dom = $("#icon-set").clone();
          dom.css("display","block");
          dom.children(".icon-select").children("a").bind("click",{id:featureId},this.iconChange);
        }
      }
      var popup = new mapboxgl.Popup()
        .setLngLat(this.map.unproject(e.point))
        .setDOMContent(dom[0])
        .addTo(this.map);
      this.popup = popup;
      this.$dispatch("show-popup",popup);
    }
  },
  props: ['map','draw'],
  data(){
    return {
      localStyle:{},
      spriteObj:{
        pngUrl:"",
        icons:[]
      },
      popup:{},
      visibility:true,
      textDrawStyle:{
        name:"文本",//添加文本时的文字内容
        size:16,
        color:"#000000"
      },
      drawIconName:"",//画符号时标注符号的名称
      currentMode:"static"//当前模式
    }
  },
  watch: {
    style: {
      handler:function(style,oldStyle){
        let access_token = Cookies.get('access_token');
        this.localStyle = JSON.parse(JSON.stringify(style));
        if(style.sprite&&style.sprite!==oldStyle.sprite){//sprite发生变化时，重新请求字体列表
          let sprite = {pngUrl:"",icons:[]};//初始化sprite对象
          sprite.pngUrl = style.sprite+".png";
          this.spriteObj.pngUrl = sprite.pngUrl;
          let jsonUrl = style.sprite+".json";
          let msgUrl = jsonUrl.replace("/sprite.json","");
          this.$http({url:jsonUrl,method:"GET",headers:{'x-access-token':access_token}})
          .then(function(res){
            let data = res.data;
            let names = Object.keys(data);
            for(let i=0;i<names.length;i++){
              sprite.icons.push({'name':names[i],'positions':data[names[i]]});
            }
            this.spriteObj.icons = sprite.icons;
          },function(){
            this.$broadcast("mailSent",{message:"sprite json请求错误！",timeout:3000});
          });
        }
      }
    }
  }
}
</script>


<style scoped>
.marker_panel{
  position: absolute;
  display: none;
  top: 45px;
  z-index: 1000;
  background-color: white;
  border-radius: 4px;
}
#fill_marker_panel{
  right: 140px;
  width: 80px;
}
#line_marker_panel{
  right: 225px;
  width: 80px;
}
#detail-box{
  width: 80px;
  right: 56px;
}
#tool_panel{
  z-index: 4;
  position: absolute;
  top: 10px;
  right: 50px;
  float: right;
  margin-right: 6px;
  box-shadow: 1px 2px 1px rgba(0,0,0,.15);
  height: 34px;
  background: #fff;
  border-radius: 2px;
}
#tool_panel b{
  float: left;
  height: 21px;
  display: inline-block;
  border-right: 1px solid #eee;
  top: 7px;
  position: relative;
}
/******工具样式*****/
.boxopt {
  padding-right: 12px;
  line-height: 34px;
  float: left;
  cursor: pointer;
  display: inline-block;
}
.boxopt span{
  float: left;
  height: 34px;
  width: 29px;
  background-repeat: no-repeat;
  padding-right: 7px;
  
}
.boxopt i{
  float: left;
  font-size: 12px;
  font-style: normal;
  height: 34px;
  line-height: 34px;
  display: inline-block;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.boxopt i.active{
  color: #579AFC;
}
.boxopt em{
  width: 7px;
  height: 7px;
  float: left;
  margin-top: 13px;
  margin-left: 5px;
  background-image: url('../../../static/icons/newtools.png');
  background-repeat: no-repeat;
  background-position: -13px -17px;
}
.boxopt em.active {
  background-position: -12px -177px;
}
ul.boxinfo{
  list-style-type: none;
}
ul.boxinfo li{
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
  height: 34px;
  line-height: 34px;
  padding-left: 7px;
}
ul.boxinfo li:hover{
  color: #579AFC;
}
ul.boxinfo li i{
  float: left;
  font-size: 12px;
  font-style: normal;
  height: 34px;
  line-height: 34px;
  display: inline-block;
  margin-left: 2px
}
.box_tool span{
  background-image: url('../../../static/icons/newtools.png');
  background-position: -34px -116px;
}
.box_tool span.active{
  background-color: #fff;
  background-position: -34px -48px;
}
.box_label span{
  background-image: url('../../../static/icons/newtools.png');
  background-position: -80px -168px;
}
.box_label span.active{
  background-color: #fff;
  background-position: -40px -168px;
}
.box_text span{
  background-image: url('../../../static/icons/pencil.svg');
  background-position: center;
}
.box_line span{
  background-image: url('../../../static/icons/line.svg');
  background-position: center;
}
.box_polygon span{
  background-image: url("../../../static/icons/polygon.svg");
  background-position: center;
}
/***********************/
.visibility{
  background-color: white;
}
.set{
  width: 200px;
  background-color: white;
  display: none;
}

.set input[type='range']{
  position: relative;
  top: 5px;
  width:110px;
}
.set input[type='color']{
  width:35px;
}
.set input[type='text']{
  width:60px;
}

#icon-select-map{
  height: 93px;
}

#icon-select-toolbar{
  position: absolute;
  display: none;
  overflow: auto;
  height: 220px;
  z-index: 1;
  width: 205px;
  right: 262px;
  top: 45px;
  background-color: white;
}

.icon-select{
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  background-color: #D8D8D8;
  overflow: auto;
  margin: 5px;
  text-align:center;
}
.icon-select div{
  background-repeat: no-repeat;
  margin:5px;
}

.icon-select a:hover{
  background-color: gray;
}

.icon-select::-webkit-scrollbar {
  width: 6px;
}

.icon-select::-webkit-scrollbar:horizontal {
  height: 6px;
}

/* 滚动条的滑轨背景颜色 */
.icon-select::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}

/* 滑块颜色 */
.icon-select::-webkit-scrollbar-thumb {
  background-color: #579AFC;
}
</style>
