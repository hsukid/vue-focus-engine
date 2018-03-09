# vue-focus-engine
一个基于阿里FocusEngine.js的vue插件，用于实现电视端/OTT端<strong>单页面应用</strong>中的焦点管理。

## 关于FocusEngine
在使用插件之前，需要先了解原生FocusEngine.js的接口和规范。文档见<a href="http://developer.tv.yunos.com/example/fe/01-focus-manager.html#FocusEngine-1">Focus Engine（焦点引擎）介绍</a>
## 安装

```npm install vue-focus-engine```

## 如何使用

#### 1.根节点/引擎实例 Vue.$focusengine
在Vue实例中可以通过 ```this.$focusengine``` 访问焦点引擎的实例，即根节点。

#### 2.模块节点 this.$fenode
阅读过原生文档后应了解到，并不是所有的节点都是焦点组件。<br>
在需要定义为容器组件的节点标签中，加上 v-femod 属性，即可被视为模块节点，每个模块节点可以单独重新渲染，<br>
便于在dom发生改变时，如页面切换、异步请求数据后新增元素等，可以有针对性地重新渲染。
```
  <templet>
    <div v-femod fe-role="Switch">
    </div>
  </templet>
```
<strong>需要注意的是，v-femod 属性只能添加在vue组件的根元素上，插件只会通过判断vue实例是否存在该属性选择是否生成模块节点。</strong>
因此，如何合理地定义项目内的模块节点，有待在实际项目场景中做具体的安排。

每个模块节点会保存自身的widget组件节点信息，通过调用 ```this.$fenode``` 可以操作该widget的接口和事件。关于widget详情，请参见上文的引擎文档链接。

#### 3.模块参数 this.$isFeNode
每个模块节点都拥有该属性，并且值为true，表明其为模块节点。

