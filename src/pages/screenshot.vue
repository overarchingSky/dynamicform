<template>
	<div class="screen-shot" >
		<img ref="shot" src="../assets/canmar.png" />
		<a @click="startShot">点击截图</a>
		<div ref="content">
			<p>已截取图片：</p>
		</div>
	</div>
</template>
<script>
import { draw } from "../lib/modules/screen-shot";
export default {
	name: "shot",
	data() {
		return {
			shot: null,
			content: null,
			img: ""
		};
	},
	mounted() {
		this.shot = this.$refs.shot;
		this.content = this.$refs.content;
	},
	methods: {
		startShot() {
			draw(this.shot).then(canvas => {
				this.img = canvas;
				this.content.appendChild(this.img);
			});
		}
	}
};
</script>
