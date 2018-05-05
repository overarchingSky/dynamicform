<template>
  <div class="json">
    <h1>北京医院</h1>
    <ul>
		目录
      <li>
		  <router-link to="/json/aorto-arteritis">大动脉炎CRF表</router-link>
		  <router-link to="/json/aortopathy">主动脉病变CRF表</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

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
