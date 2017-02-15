<style lang='sass'>
  @import "../../scss/variable";
  @import "../../scss/css3Module";
  @import "../../scss/line";
  .modal-mask {
    z-index: 9;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    display: table;
    background-color: rgba(0, 0, 0, .3);
    @include transition(opacity .3s ease);
    &.disabled {
      background-color: transparent;
    }
  }
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  .modal-container {
    margin: 0 auto;
    width: 85%;
    border-radius: 5px;
    background-color: #fff;
    pointer-events: all;
    @include transition(all .3s ease);
  }
  .modal-content {
    line-height: 1.3;
    padding: 20px;
    text-align: center;
    position: relative;
    font-size: 16px;
    @include borderBottom;
  }
  .modal-footer {
    overflow: hidden;
    a {
      float: left;
      width: 50%;
      padding: 10px 0;
      text-align: center;
    }
    .btn-cancel {
      position: relative;
      @include borderRight;
    }
    &.btn-cancel-hide {
      .btn-confirm {
        width: 100%;
      }
    }
  }
  .modal-enter, .modal-leave-active {
    opacity: 0;
  }
  .modal-enter,
  .modal-leave-active {
    .modal-container{
      @include transform(scale(1.1));
    }
  }
</style>

<template lang='jade'>
  transition(name='modal')
    .modal-mask
      .modal-wrapper
        section.modal-container(:class='modalOptions.className')
          header.modal-header
            slot(name='title')
          article.modal-content
            slot(name='content')
          footer.modal-footer(:class='{"btn-cancel-hide": modalOptions.hideCancelBtn}')
            a.btn-cancel(
              v-if='!modalOptions.hideCancelBtn',
              v-text='modalOptions.cancelText',
              @click='toggleModal'
            )
            a.btn-confirm(
              v-text='modalOptions.confirmText',
              @click='confirmHandler'
            )
</template>

<script lang='babel'>
  export default {
    computed: {
      ...Vuex.mapGetters(['modalType', 'modalParams', 'modalOptions'])
    },
    methods: {
      ...Vuex.mapActions(['toggleModal']),
      confirmHandler() {
        this.$store.dispatch(this.modalType, this.modalParams);
        this.toggleModal();
      }
    }
  }
</script>
