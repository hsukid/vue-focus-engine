require('./FocusEngine.min')

const plugin = {
  install (Vue) {
    Vue.$focusengine = window.FocusEngine.render()
    Vue.directive('femod', function (el, binding, vnode) {
      vnode.context.$isFeNode = binding.value != false
    })
    Vue.mixin({
      created () {
        this.$focusengine = Vue.$focusengine
      },
      mounted () {
        if (!this.$isFeNode) return
        let node = this;
        let parentFENode = null;
        while (node) {
          if (node.$parent && node.$parent.$isFeNode) {
            parentFENode = this.$parent.$fenode
            node = null
          } else {
            node = node.$parent
          }
        }
        if (parentFENode) {
          parentFENode.reRender()
        } else {
          this.$focusengine.reRender()
        }
        this.$fenode = this.$focusengine.getWidgetById(this.$el.id)
      },
      activated () {
        if (!this.$isFeNode) return
        let had = this.$fenode.parentWidget.childWidgets.some(node => this.$fenode == node)
        if (!had) {
          this.$fenode.parentWidget.childWidgets.push(this.$fenode)
        }
        this.$nextTick(()=>{
          this.$fenode.activate()
          this.$fenode.focus()
        })
      },
      deactivated () {
        if (!this.$fenode || !this.$isFeNode) return
        this.$fenode.freeze()
        this.$fenode.blur()
      },
      beforeDestroy () {
        if (this.$fenode) {
          this.$fenode.destroy()
        }
      }
    })
  }
}

export default plugin
export const install = plugin.install