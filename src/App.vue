<script setup lang="ts">
import {ref,onMounted} from "vue";
import {getCurrentInstance} from "vue";
import GenQrcode from "./genQrcode.vue";
const $genQrCode= getCurrentInstance()?.appContext.config.globalProperties.$genQrCode
const qrUrl = ref(null)
const qr = $genQrCode({
	qrText: 'https://www.tontjin.com',
	qrUrl: 'https://www.tontjin.com',
	width: 200,
	height: 200,
	canvasId: 'canvas',
	qrTextSize:18,
})
qr.handleQrcode().then(res=>{
	console.log(res)
	qrUrl.value = res
})
const gen = ref(null)
onMounted(()=>{
	gen.value.handleQrcode()
})
</script>

<template>
	<img :src="qrUrl" alt="">
	<gen-qrcode ref="gen" qrText="https://www.tontjin.com" qrUrl="https://www.tontjin.com"></gen-qrcode>
</template>
