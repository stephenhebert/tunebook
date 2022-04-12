<template>
	<ClientOnly>
		<div ref='paper' class="render-abc"></div>
	</ClientOnly>
</template>

<script>
	import Vue from 'vue';
	export default {
		name: "render-abc",
		props: {
			abc: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				visualObj: null,
			};
		},
		mounted() {
			Vue.nextTick(() => {
				const abcjs = require('abcjs');
				const el = this.$refs.paper;
				this.visualObj = abcjs.renderAbc(el, this.abc);
			});
		},
		methods: {
			getObj() {
				return this.visualObj[0];
			}
		}
	}
</script>
