<template>
  <div>
    <transition name="page" mode="out-in">
      <slot>
        <router-view v-bind="$attrs"></router-view>
      </slot>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'wt-view'
}
</script>

<style type="text/css">
.page-enter-active,
.page-leave-active {
  transition: opacity .2s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .15s
}
.fade-enter,
.fade-leave-to {
  opacity: 0
}
</style>