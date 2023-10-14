<script>
import { h, isVNode } from 'vue';

export default {
  name: 'VNode',

  props: {
    vnode: {
      type: [Object, Array],
      require: true,
      validator: (value) => (Array.isArray(value) ? value.every((item) => isVNode(item)) : isVNode(value)),
    },
  },

  render() {
    if (Array.isArray(this.vnode)) {
      return this.vnode.map((item) => h(item.type, item.props, item.children));
    }

    return h(this.vnode.type, this.vnode.props, this.vnode.children);
  },
};
</script>
