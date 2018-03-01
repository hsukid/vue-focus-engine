# vue-focus-engine
一个基于阿里FocusEngine.js的vue插件，用于实现<strong>单页面应用</strong>中的焦点管理

## 关于FocusEngine
在使用插件之前，需要先了解原生FocusEngine.js的接口和规范。文档见<a href="http://developer.tv.yunos.com/example/fe/01-focus-manager.html#FocusEngine-1">Focus Engine（焦点引擎）介绍</a>

## 如何使用

#### 1.根节点/引擎实例 this.$focusengine
在Vue实例中可以通过 ```this.$focusengine``` 访问焦点引擎的实例，即根节点。

#### 2.模块节点 this.$fenode
阅读过原生文档后应了解到，并不是所有的节点都是焦点组件。<br>
在需要定义为容器组件的节点标签中，加上 v-fe-mod 属性，即可被视为模块节点，每个模块节点可以单独重新渲染，<br>
便于在dom发生改变时，如页面切换、异步请求数据后新增元素等，可以有针对性地重新渲染。
```
  <templet>
    <div v-fe-mod fe-role="Switch">
    </div>
  </templet>
```
<strong>需要注意的是，v-fe-mod 属性只能添加在vue组件的根元素上，插件只会通过判断vue实例是否存在该属性选择是否生成模块节点。<strong><br>
你可以选择将所有数据都放在页面组件上并只把页面组件作为该页面的唯一模块节点。当然，我并不建议这么做，在页面数据少的时候，这是可行的，<br>
但通常我们的页面会加载许多内容，
