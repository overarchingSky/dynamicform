<template>
    <el-date-picker
    @input="updateValue"
    v-model="val"
    type="date"
    placeholder="选择日期">
      </el-date-picker>
</template>
<script>
export default {
  name: "v-Date",
  props: {
    value: [Date, Number],
    options: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      val: this.value,
      option: this.options
    };
  },
  methods: {
    updateValue(val) {
      val = Date.parse(val);
      this.$emit("input", val);
    }
  }
};
</script>
