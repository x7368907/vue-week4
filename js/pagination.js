export default {
    template: '#pagination',
    props: ['pages','getProduct'],
  methods: {
    emitPages(item) {
      this.$emit('emit-pages', item);
    },
  },
}