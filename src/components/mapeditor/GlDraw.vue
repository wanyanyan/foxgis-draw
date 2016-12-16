<template>
  <div id='map-draw'>
    <mdl-snackbar display-on="mailSent"></mdl-snackbar>
    <div id="tool_panel">
      <button class="tools" title="添加图标" @click="showLabelPanel" style="margin-left:5px;">图标</button>
      <button class="tools" title="添加文字" @click="drawTextStart">文本</button>
      <button class="tools" title="添加线条" @click="showLinePanel">线条</button>
      <button class="tools" title="添加形状" @click="showPolygonPanel">形状</button>
      <button class="tools" title="删除选中要素" @click="deleteSelected">删除</button>
      <button class="tools" title="删除所有要素" @click="deleteAll">清除</button>
      <button class="tools" title="移动" @click="setSelectMode">编辑要素</button>
      <button class="tools" title="更该样式" @click="setStaticMode">更改样式</button>
      <button class="tools" title="显示/隐藏" @click="showShapes" style="margin-right:5px;">显示/隐藏</button>
    </div>
    <div id="icon-select-toolbar" class="panel">
      <div class="icon-select" >
        <a v-for="icon in spriteObj.icons" class="icon-link" title="{{icon.name}}" @click="drawIconStart($event)">
          <div :style="'background-image:url('+spriteObj.pngUrl+');background-position:-'+icon.positions.x+'px -'+icon.positions.y+'px;width:'+icon.positions.width+'px;height:'+icon.positions.height+'px;'" title="{{icon.name}}">
          </div>
        </a>
      </div>
    </div>
    
    <!--以下定义添加标记面板-->
    <div id = "fill_marker_panel" class="panel marker_panel">
      <button class="marker" id="triangle-marker" title="添加三角形" @click="drawTriangle" style="margin-left:5px;">三角形</button>
      <button class="marker" id="rect-marker" title="添加矩形" @click="drawRect">矩形</button>
      <button class="marker" id="circle-marker" title="添加圆" @click="drawCircle">圆</button>
      <button class="marker" id="arrow-marker" title="添加箭头" @click="drawArrow">箭头</button>
      <button class="marker" id="polygon-marker" title="添加任意多边形" @click="drawPolygonStart" style="margin-right:5px;">多边形</button>
    </div>
    <div id = "line_marker_panel" class="panel marker_panel">
      <button class="marker" id="line-marker" title="添加折线" @click="drawLineStart" style="margin-left:5px;">折线</button>
      <button class="marker" id="arcmarker" title="添加弧线" @click="drawArc">弧形</button>
      <button class="marker" id="bezier-marker" title="添加曲线" @click="drawBezier">Bezier曲线</button>
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
    },
    drawRect:function(){
      this.currentMode = "draw_rectangle";
      this.draw.changeMode("draw_rectangle");
      this.map.on("draw.create",this.drawPolygonEnd);
      $(".panel").css("display","none");
    },
    drawCircle:function(){
      this.currentMode = "draw_circle";
      this.draw.changeMode("draw_circle");
      this.map.on("draw.create",this.drawPolygonEnd);
      $(".panel").css("display","none");
    },
    drawArrow:function(){
      this.currentMode = "draw_arrow";
      this.draw.changeMode("draw_arrow");
      this.map.on("draw.create",this.drawPolygonEnd);
      $(".panel").css("display","none");
    },
    drawArc:function(){
      this.currentMode = "draw_arc";
      this.draw.changeMode("draw_arc");
      this.map.on("draw.create",this.drawLineEnd);
      $(".panel").css("display","none");
    },
    drawBezier:function(){
      this.currentMode = "draw_bezier";
      this.draw.changeMode("draw_bezier");
      this.map.on("draw.create",this.drawLineEnd);
      $(".panel").css("display","none");
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
    },
    setSelectMode:function(){
      if(this.popup.remove){
        this.popup.remove();
      }
      this.draw.changeMode("simple_select");
      this.currentMode = "simple_select";
    },
    setStaticMode:function(){
      this.draw.changeMode("static");
      this.currentMode = "static";
    },
    showLabelPanel:function(){
      if($("#icon-select-toolbar").is(":visible")){
        $("#icon-select-toolbar").css("display","none");
      }else{
        $(".panel").hide();
        $("#icon-select-toolbar").css("display","flex");
      }
    },
    drawIconStart:function(e){
      this.currentMode = "draw_icon";
      this.drawIconName = e.target.title;
      this.draw.changeMode("draw_point");
      this.map.on("draw.create",this.drawIconEnd);
      $("#icon-select-toolbar").css("display","none");
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
      this.currentMode = "draw_text";
      this.draw.changeMode("draw_point");
      this.map.on("draw.create",this.drawTextEnd);
      $(".panel").css("display","none");
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
    },
    deleteAll:function(){
      this.draw.deleteAll();
    },
    showLinePanel:function(){
      if($("#line_marker_panel").is(":visible")){
        $("#linemarker_panel").css("display","none");
      }else{
        $(".panel").hide();
        $("#line_marker_panel").css("display","block");
      }
    },
    showPolygonPanel:function(){ 
      if($("#fill_marker_panel").is(":visible")){
        $("#fill_marker_panel").css("display","none");
      }else{
        $(".panel").hide();
        $("#fill_marker_panel").css("display","block");
      }
    }
  },
   events: {
    'map-click': function(options){
      var e = options.event;
      var feature = options.features[0];
      var featureId = feature.properties.id;
      var dom;
      var featureIds = this.draw.getFeatureIdsAt(e.point);
      console.log(featureIds)
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
  top:45px;
  z-index: 1000;
  background-color: white;
  border-radius: 4px;
}
#fill_marker_panel{
  right: 527px;
  width: 257px;
}
#line_marker_panel{
  right: 577px;
  width: 187px;
}
#tool_panel{
  position: absolute;
  top:10px;
  right: calc(50% - 259px);
  z-index: 1000;
  width: 518px;
  background-color: white;
  border-radius: 4px;
}
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
  left: calc(50% - 259px);
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
.tools,.marker{
  margin:5px 2px 5px 0;
}
</style>
