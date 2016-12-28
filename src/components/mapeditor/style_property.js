var styleProperty = {};

styleProperty.translate = {
  'color': '颜色',
  'outline-color': '边框颜色',
  'opacity': '透明度',
  'visibility': '显示',
  'width': '宽度',
  'height': '高度',
  'translate': '偏移',
  'translate-anchor': '偏移相对物',
  'antialias': '反锯齿',
  'icon-image':'图标名称',
  'icon-size':'图标大小',
  'icon-rotate':'图标旋转',
  'icon-offset':'图标偏移',
  'icon-allow-overlap':'允许覆盖',
  'icon-ignore-placement':'允许被覆盖',
  'icon-opacity': '图标透明度',
  'icon-color': '图标颜色',
  'icon-halo-color': '图标光晕颜色',
  'icon-halo-width': '图标光晕宽度',
  'icon-halo-blur':'光晕模糊度',
  'text-field':'注记字段',
  'text-font':'注记字体',
  'text-size': '字体大小',
  'text-max-width': '注记最大宽度',
  'text-line-height':"注记行高",
  'text-letter-spacing':'字体间距',
  'text-anchor':'注记位置',
  'text-rotate':'注记旋转',
  'text-offset':'注记偏移',
  'text-allow-overlap':'允许覆盖',
  'text-ignore-placement':'允许被覆盖',
  'text-opacity': '文字透明度',
  'text-color': '字体颜色',
  'text-halo-color': '字体光晕颜色',
  'text-halo-width': '字体光晕宽度',
  'text-halo-blur': '光晕模糊度',
  'pattern': '图案填充',
  'contrast': '对比度',
  'hue-rotate': '色相旋转',
  'brightness-min': '最小亮度',
  'brightness-max': '最大亮度',
  'saturation': '饱和度',
  'fade-duration': '淡出时效',
  'placement': '符号位置',
  'spacing': '符号间隔',
  'avoid-edges':'避免边缘',
  'gap-width': '间隙宽度',
  'offset': '方向偏移',
  'blur': '模糊距离',
  'dasharray': '虚线',
  'cap': '线尾样式',
  'join': '线交叉形式',
  'miter-limit': '切线交叉限制',
  'round-limit': '圆交叉限制',
  'radius':'半径',
  'base': '高度基准'
};
styleProperty.units = {
	'width': 'px',
	'height': 'm',
	'translate': '(px,px)',
	'icon-size':'0-1',
	'icon-rotate':'deg',
	'icon-offset':'(px,px)',
	'icon-halo-width': 'px',
	'icon-halo-blur':'px',
	'text-size': 'px',
	'text-max-width': 'em',
	'text-line-height':"em",
	'text-letter-spacing':'em',
	'text-rotate':'deg',
	'text-offset':'(em,em)',
	'text-halo-width': 'px',
	'text-halo-blur': 'px',
	'contrast': '0-1',
	'hue-rotate': 'deg',
	'brightness-min': '0-1',
	'brightness-max': '0-1',
	'saturation': '0-1',
	'fade-duration': 'ms',
	'spacing': 'px',
	'gap-width': 'px',
	'offset': 'px',
	'blur': 'px',
	'dasharray': 'width',
	'radius':'px',
	'base': 'm'
},
styleProperty.defaultStyle = {
  'background': {
    'paint': {
      'background-color': '#000000'
    }
  },
  'fill': {
    'paint': {
      'fill-color': '#000000',
      'fill-opacity': 1
    }
  },
  'fill-extrusion': {
    'paint': {
      'fill-extrusion-color': '#000000',
      'fill-extrusion-opacity': 1
    }
  },
  'line': {
    'paint': {
      'line-color': '#000000',
      'line-opacity': 1,
      'line-width': 1
    }
  },
  'raster': {
    'paint': {
      'raster-opacity': 1
    }
  },
  'circle': {
    'paint': {
      'circle-color': '#000000',
      'circle-radius': 5,
      'circle-opacity': 1,
    }
  },
  'symbol': {
    'paint': {
      'text-opacity':1,
      'text-color': '#000000'
    },
    'layout': {
      'text-field':'',
      'text-font':['SimHei Regular'],
      'text-size': 16
    }
  }
};
styleProperty.defaultProperty =  {
  'background': {
    'paint': {
      'background-color': '#000000',
      'background-opacity': 1
    },
    'layout': {
      'visibility': 'visible'
    }
  },
  'fill': {
    'paint': {
      'fill-color': '#000000',
      'fill-opacity': 1,
      'fill-outline-color': '#000000',
      'fill-antialias': true,
      'fill-translate': [0,0],
      'fill-translate-anchor': 'map',
      'fill-pattern': ''
    },
    'layout': {
      'visibility': 'visible'
    }
  },
  'fill-extrusion': {
    'paint': {
      'fill-extrusion-color': '#000000',
      'fill-extrusion-opacity': 1,
      'fill-extrusion-translate': [0,0],
      'fill-extrusion-translate-anchor': 'map',
      'fill-extrusion-pattern': '',
      'fill-extrusion-height': 0,
      'fill-extrusion-base': 0
    },
    'layout': {
      'visibility': 'visible'
    }
  },
  'line': {
    'paint': {
      'line-color': '#000000',
      'line-opacity': 1,
      'line-translate': [0,0],
      'line-translate-anchor': 'map',
      'line-width': 1,
      'line-gap-width': 0,
      'line-offset': 0,
      'line-blur': 0,
      'line-dasharray': [1,0],
      'line-pattern': ''
    },
    'layout': {
      'visibility': 'visible',
      'line-cap': 'butt',
      'line-join': 'miter',
      'line-miter-limit': 2,
      'line-round-limit': 1.05
    }
  },
  'raster': {
    'paint': {
      'raster-opacity': 1,
      'raster-contrast': 0,
      'raster-hue-rotate': 0,
      'raster-brightness-min': 0,
      'raster-brightness-max': 1,
      'raster-saturation': 0,
      'raster-fade-duration': 300

    },
    'layout': {
      'visibility': 'visible'
    }
  },
  'circle': {
    'paint': {
      'circle-color': '#000000',
      'circle-radius': 5,
      'circle-blur': 0,
      'circle-opacity': 1,
      'circle-translate': [0,0],
      'circle-translate-anchor': 'map'
    },
    'layout': {
      'visibility': 'visible'
    }
  },
  'symbol': {
    'paint': {
      'icon-opacity':1,
      'icon-color': '#000000',
      'icon-halo-color': '#ffffff',
      'icon-halo-width': 0,
      'icon-halo-blur':0,
      'text-opacity':1,
      'text-color': '#000000',
      'text-halo-color': '#ffffff',
      'text-halo-width': 0,
      'text-halo-blur':0
    },
    'layout': {
      'symbol-placement': 'point',
      'symbol-spacing': 250,
      'symbol-avoid-edges':false,
      'visibility': 'visible',
      'icon-image':'',
      'icon-size': 1,
      'icon-offset':[0,0],
      'icon-rotate':0,
      'icon-allow-overlap':false,
      'icon-ignore-placement':false,
      'text-field':'',
      'text-font':['SimHei Regular'],
      'text-size': 16,
      'text-max-width': 10,
      'text-line-height':1.2,
      'text-letter-spacing':0,
      'text-anchor':'center',
      'text-rotate':0,
      'text-offset':[0,0],
      'text-allow-overlap':false,
      'text-ignore-placement':false
    }
  }
};

var getValueByName = {};

getValueByName.visibility = function(e){
	var opt = {};
	if(e.target.checked){
		opt.value = "visible";
	}else{
		opt.value = "none";
	}
	return opt;
}

//颜色
getValueByName['color'] = 
getValueByName['outline-color'] = 
getValueByName['halo-color'] = 
getValueByName['stroke-color'] = function(e){
	var opt = {};
	var value = e.target.value;
	if(value.indexOf('#')!==-1&&value.length!==4&&value.length!==7){
		opt.error = "颜色格式错误"
	}else{
		opt.value = value;
	}
	return opt;
}

getValueByName['icon-image'] = 
getValueByName['pattern'] = function(e){
	var opt = {};
	if(e.target.value){
		opt.value = e.target.value;
	}
	return opt;
}
//布尔
getValueByName['antialias'] = 
getValueByName['avoid-edges'] = 
getValueByName['allow-overlap'] = 
getValueByName['ignore-placement'] = 
getValueByName['optional'] = 
getValueByName['keep-upright'] = function(e){
	var opt = {};
	opt.value = e.target.checked;
	return opt;
}

//选择
getValueByName['translate-anchor'] = 
getValueByName['cap'] = 
getValueByName['join'] = 
getValueByName['placement'] = 
getValueByName['rotation-alignment'] = 
getValueByName['text-fit'] = 
getValueByName['pitch-alignment'] = 
getValueByName['justify'] = 
getValueByName['anchor'] = 
getValueByName['transform'] = 
getValueByName['pitch-scale'] = function(e){
	var opt = {};
	opt.value = e.target.options[e.target.selectedIndex].value;
	return opt;
}

//数字数组（长度2）
getValueByName['translate'] =  
getValueByName['icon-offset'] = 
getValueByName['text-offset'] = function(e){
	var opt = {};
	if(!e.target.value){return opt;}
	var value = e.target.value.split(',');
	if(value.length!==2){
		opt.error = "输入有误，数组长度为2";
		return opt;
	}
	for(let i=0,length=value.length;i<length;i++){
	  value[i] = Number(value[i]);
	  if(isNaN(value[i])){
	  	opt.error = "输入有误，属性值为数字";
	  	return opt;
	  }
	}
	opt.value = value;
	return opt;
}

//数字数组（长度4）
getValueByName['icon-text-fit-padding'] = function(e){
	var opt = {};
	if(!e.target.value){return opt;}
	var value = e.target.value.split(',');
	if(value.length!==4){
		opt.error = "输入有误，数组长度为2";
		return opt;
	}
	for(let i=0,length=value.length;i<length;i++){
	  value[i] = Number(value[i]);
	  if(isNaN(value[i])){
	  	opt.error = "输入有误，属性值为数字";
	  	return opt;
	  }
	}
	opt.value = value;
	return opt;
}

//数字数组（长度任意）
getValueByName['dasharray'] = function(e){
	var opt = {};
	if(!e.target.value){return opt;}
	var value = e.target.value.split(',');
	for(let i=0,length=value.length;i<length;i++){
	  value[i] = Number(value[i]);
	  if(isNaN(value[i])){
	  	opt.error = "输入有误，属性值为数字";
	  	return opt;
	  }
	}
	if(value.length===2&&value[1]===0){
		return opt;
	}
	if(value.length>1){
		opt.value = value;
	}
	return opt;
}

//字符串数组（长度任意）
getValueByName['text-font'] = function(e){
	var opt = {};
	if(e.target.value){
		opt.value = e.target.value.split(',');
	}
	return opt;
}

getValueByName['text-field'] = function(e){
	var opt = {};
	if(e.target.options){
		opt.value = e.target.options[e.target.selectedIndex].value;
	}else{
		opt.value = e.target.value;
	}
	return opt;
}

//数字（无需检验）
getValueByName['opacity'] = 
getValueByName['stroke-opacity'] = function(e){//0-1
	var opt = {};
	opt.value = Number(e.target.value);
	return opt;
},

//数字
getValueByName['miter-limit'] = 
getValueByName['round-limit'] = 
getValueByName['offset'] = 
getValueByName['rotate'] = 
getValueByName['text-max-angle'] = 
getValueByName['hue-rotate'] = function(e){
	var opt = {};
	if(e.target.value){
		var value = Number(e.target.value);
		if(isNaN(value)){
			opt.error = "输入有误，属性值为数字";
		}else{
			opt.value = value;
		}
	}
	return opt;
}
//数字（>0）
getValueByName['width'] = 
getValueByName['gap-width'] = 
getValueByName['blur'] = 
getValueByName['spacing'] = 
getValueByName['padding'] = 
getValueByName['text-size'] = 
getValueByName['text-max-width'] = 
getValueByName['text-line-height'] = 
getValueByName['text-letter-spacing'] = 
getValueByName['halo-width'] = 
getValueByName['halo-blur'] = 
getValueByName['radius'] = 
getValueByName['fade-duration'] = 
getValueByName['stroke-width'] = 
getValueByName['fill-extrusion-height'] = 
getValueByName['fill-extrusion-base'] = function(e){
	var opt = {};
	if(e.target.value){
		var value = Number(e.target.value);
		if(isNaN(value)){
			opt.error = "输入有误，属性值为数字";
		}else if(value<0){
			opt.error = "输入有误，属性值不能为负";
		}else{
			opt.value = value;
		}
	}
	return opt;
}

//数字（0-1）
getValueByName['brightness-min'] = 
getValueByName['brightness-max'] = 
getValueByName['icon-size'] = 
getValueByName['saturation'] = 
getValueByName['contrast'] = function(e){
	var opt = {};
	if(e.target.value){
		var value = Number(e.target.value);
		if(isNaN(value)){
			opt.error = "输入有误，属性值为数字";
		}else if(value>1||value<0){
			opt.error = "输入有误，取值范围0-1";
		}else{
			opt.value = value;
		}
	}
	return opt;
}

styleProperty.getValueByName = getValueByName;

module.exports = styleProperty;