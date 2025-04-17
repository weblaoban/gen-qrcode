<script setup lang="ts">
import QRCode from 'qrcode'
import { nextTick, onMounted, ref, watch } from 'vue'

const props = defineProps({
	// 二维码存储内容
	qrUrl: {
		type: String,
		default: '',
	},
	// canvas width
	width: {
		type: Number,
		default: 360,
	},
	// canvas height
	height: {
		type: Number,
		default: 380,
	},
	// 二维码底部文字
	qrText: {
		type: String,
		default: '',
	},
	// 底部说明文字字号
	qrTextSize: {
		type: Number,
		default: 28,
	},
	// 是否通过点击下载而不是立即下载
	lazy: {
		type: Boolean,
		default: true,
	},
	upload:{
		type: Boolean,
		default: false,
	},
})

const infos = ref({ ...props,qrSize:props.width-10 || 360 })
let ctx:any = null
let dom:any = null
let maxLine = 1
let ceilMax = 1
const gap = 10
const realHeight = ref(props.height)

const qrCodeOption = {
	errorCorrectionLevel: 'M',
	width: infos.value.width - 10,
	version: 7,
}

const canvas = ref<HTMLCanvasElement>()

/**
 *  qrUrl        二维码内容
 *  qrSize       二维码大小
 *  qrText       二维码底部显示文字
 *  qrTextSize   二维码底部显示文字大小(默认16px)
 */
// 根据链接生成二维码
function handleQrcode() {
	return new Promise((resolve, reject) => {
		if(!infos.value.qrUrl){
			reject('请传入二维码内容')
			return
		}
		//@ts-ignore
		QRCode.toDataURL(infos.value.qrUrl, qrCodeOption)
				.then((url: string) => {
					const image = new Image()
					image.src = url
					image.onload = () => {
						genImage(image, resolve, reject)
					}
				})
				.catch((err: Error) => {
					reject()
					console.error(err)
				})
	})
}

// 将DataURL转换为Blob对象
function dataURLtoBlob(dataurl:string) {
	const arr:Array<any> = dataurl?dataurl.split(','):[]
	if(!arr.length){
		return
	}
	const mime = arr[0].match(/:(.*?);/)[1]
	const binaryString = window.atob(arr[1])
	const len = binaryString.length
	const u8arr = new Uint8Array(len)
	for (let i = 0; i < len; i++) {
		u8arr[i] = binaryString.charCodeAt(i)
	}
	return new Blob([u8arr], { type: mime })
}

// function handelUpload(blod, resolve, reject) {
// 	const formData = new FormData()
// 	formData.append('file', blod, `${infos.value.qrText}.png`)
// 	uploadFiles(formData)
// 			.then((res) => {
// 				resolve(res)
// 			})
// 			.catch(() => {
// 				reject()
// 			})
// }

// 1.将生成的二维码画到画布 2.如果有文字 把文字也画到画布 3.然后将画布内容转为dataUrl格式 4.将dataUrl转成blob 5.上传到服务器
function genImage(image:HTMLImageElement, resolve:any, reject:any) {
	const { width, qrSize, qrText } = infos.value
	ctx.fillStyle = '#FFFFFF' // 白色，也可以使用ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, width, realHeight.value)
	ctx.drawImage(image, (width - qrSize) / 2, 0, qrSize, qrSize)
	if (qrText) {
		drawWrapText()
	}
	const dataUrl = dom.toDataURL('image/png', 0.5)
	const blob = dataURLtoBlob(dataUrl)
	if(props.upload){
		resolve(blob, resolve, reject)
	}else{
		resolve(dataUrl)
	}
}

function drawWrapText() {
	const { qrTextSize, qrText, qrSize, width } = infos.value // 设置字体
	ctx.font = `${qrTextSize}px Arial`
	const preLine = Math.floor(qrText.length / maxLine)
	for (let i = 0; i < ceilMax; i++) {
		const text = qrText.substring(i * preLine, (i + 1) * preLine)
		const realW = ctx.measureText(text).width // 文字真实宽度
		const fTop = qrSize - 10 + qrTextSize * i // 根据字体大小计算文字top
		const fLeft = (width - realW) / 2 // 根据字体大小计算文字left
		ctx.textBaseline = 'top' // 设置绘制文本时的文本基线。
		ctx.fillStyle = '#333'
		ctx.fillText(text, fLeft, fTop)
	}
}

// 计算基础信息 文字最大行和画布的高度
function calculateBaseData() {
	const { qrTextSize } = infos.value
	dom = canvas.value as HTMLCanvasElement
	ctx = dom.getContext('2d') as CanvasRenderingContext2D
	ctx.font = `${qrTextSize}px Arial`
	const tw = ctx.measureText(props.qrText).width // 文字真实宽度
	maxLine = tw / (infos.value.qrSize - gap * 2)
	ceilMax = Math.ceil(maxLine)
	realHeight.value = props.height + (ceilMax - 1) * props.qrTextSize
}

watch(
		() => props,
		(newVal) => {
			infos.value = { ...newVal,qrSize:newVal.width-10 || 360 }
			console.log(newVal)
			calculateBaseData()
		},
		{ deep: true },
)
onMounted(() => {
	nextTick(() => {
		calculateBaseData()
		if (!props.qrUrl) {
			console.log('error')
			// handleQrcode(qrUrl);
		}
	})
})
defineExpose({
	handleQrcode,
})
</script>

<template>
	<canvas ref="canvas" :width="width" :height="realHeight" />
</template>
