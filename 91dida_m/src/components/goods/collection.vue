<template lang='jade'>
  a.collection(
    @click='collection',
    :class='{active: isCollection}'
  )
    em.icon-collection.icon-30
    p 收藏
</template>

<script lang='babel'>
  import * as apis from '../../store/apis';
  export default {
    props: ['productId', 'isCollection'],
    methods: {
      collection() {
        this.$store.dispatch('toggleCollectionGoods', {
          id: this.productId,
          type: 1,
          status: this.isCollection,
          callback: function() {
            if (this.isCollection) {
              this.$emit('collection-event', 0);
            } else {
              this.$emit('collection-event', 1);
            }
          }.bind(this)
        })
      },
    }
  }
</script>
