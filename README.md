

## 生成二维码组件
### 安装
npm install gen-qrcode  或  pnpm install gen-qrcode
### props
| 参数         | 说明                   | 类型 | 默认值 | 是否必填 |
|------------|----------------------| ---- |-----|------|
| qrUrl      | 二维码内容                | String |   | 是    |
| qrText     | 二维码底部描述文字            | String | ''  | 否    |
| qrTextSize | 二维码底部描述文字大小          | Number | 28  | 否    |
| width      | 画布宽度                 | Number | 360 | 否    |
| height     | 画布高度                 | Number | 380 | 否    |
| upload  | 是否需要返回上传二维码图片的blob格式 | Boolean | false | 否    |
### 用法
```vue
<script>
  import {ref,onMounted} from "vue";
  const gen = ref(null)
  onMounted(()=>{
	gen.value.handleQrcode()
  })
</script>
<gen-qrcode ref="gen" qrText="https://www.tontjin.com"  qrUrl="https://www.tontjin.com"></gen-qrcode>
```
```vue

<script>
  import {ref} from "vue";
  const $genQrCode= getCurrentInstance().appContext.config.globalProperties.$genQrCode
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
</script>
```
