<template>
  <div class="hello">
    <h1>芸朵科技组件库</h1>
    <ul>
		目录
      <li>
		  <router-link to="/beijingHospital">北京医院表单</router-link>
		  <router-link to="/dynamic-form">动态表单</router-link>
      	<router-link to="/layout-form">表格嵌套表单</router-link>
		  <router-link to="/edit-dynamic-form">编辑表单</router-link>
		   <router-link to="/json">表单配置json</router-link>
		   <router-link to="/screenshot">js截屏</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
	name: "HelloWorld",
	data() {
		return {
			msg: "Welcome to Your Vue.js App"
		};
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
	font-weight: normal;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
