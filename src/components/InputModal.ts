// 输入模态窗口：用于输入字符串
import {App, Modal, Notice, Setting} from "obsidian";

export class InputModal extends Modal {
    title: string;
    onSubmit: (input: string) => void;

    constructor(app: App, title: string, onSubmit: (input: string) => void) {
        super(app);
        this.title = title;
        this.onSubmit = onSubmit;
    }

    // 打开模态窗口时执行
    onOpen() {
        let {contentEl} = this;
        contentEl.createEl("h2", {text: this.title});

        // 创建文本框供用户输入
        const inputField = contentEl.createEl("textarea");
        inputField.placeholder = "请输入字符串";

        // 创建提交按钮
        new Setting(contentEl)
            .setName("提交")
            .addButton((btn) => {
                btn.setButtonText("提交")
                    .onClick(() => {
                        const input = inputField.value;
                        if (input.trim()) {
                            this.onSubmit(input);
                            this.close(); // Close modal after submission
                        } else {
                            new Notice("请输入有效的字符串");
                        }
                    });
            });
    }

    // 关闭时清空内容
    onClose() {
        let {contentEl} = this;
        contentEl.empty();
    }
}
