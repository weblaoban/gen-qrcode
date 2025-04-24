import genQr from './genQrcode.vue'
import { createApp } from "vue";
let app = null;
let rootNode = null;
console.log(genQr)
interface Options {

}
const genQrCode = (options:Options) => {
    rootNode = document.createElement("div");
    // 创建应用实例（第一个参数是根组件。第二个参数可选，它是要传递给根组件的 props）
    app = createApp(genQr, {
        ...options,
    });
    // 将应用实例挂载到创建的 DOM 元素上
 return app.mount(rootNode)
};
genQrCode.install = (app:any) => {
    // 注册全局属性
    app.config.globalProperties.$genQrCode = (options:Options) => genQrCode(options);
};
export default genQrCode
