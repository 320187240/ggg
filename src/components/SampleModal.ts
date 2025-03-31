import {App, Modal} from "obsidian";

export class SampleModal extends Modal {
    constructor(app: App) {
        super(app);
    }

    // 模态窗口打开时执行的方法
    onOpen() {
        let {contentEl} = this;
        // 在模态窗口中设置文本内容
        contentEl.setText("Woah!");
    }

    // 模态窗口关闭时执行的方法
    onClose() {
        let {contentEl} = this;
        // 清空模态窗口的内容
        contentEl.empty();
    }
}
