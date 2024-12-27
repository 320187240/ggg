// 功能选择弹窗：选择要执行的操作
import {gBox} from "../main";
import {App, Modal, Setting} from "obsidian";
import {InputModal} from "./InputModal";

export class FunctionSelectionModal extends Modal {

    plugin: gBox;

    constructor(app: App, plugin: gBox) {
        super(app);
        this.plugin = plugin;
    }

    // 打开模态窗口时执行
    onOpen() {
        let {contentEl} = this;
        contentEl.createEl("h2", {text: "选择功能"});

        // 创建按钮，点击后执行相应的功能
        new Setting(contentEl)
            .setName("格式化")
            .addButton((btn) => {
                btn.setButtonText("格式化")
                    .onClick(() => {
                        new InputModal(this.app, "格式化", (input: string) => {
                            console.log("格式化处理:", input);
                            // 在这里调用格式化方法
                            this.plugin.format();
                            this.close();
                        }).open();
                    });
            });

        new Setting(contentEl)
            .setName("处理form")
            .addButton((btn) => {
                btn.setButtonText("处理form")
                    .onClick(() => {
                        new InputModal(this.app, "处理form", (input: string) => {
                            console.log("处理form:", input);
                            // 在这里处理form
                            this.close();
                        }).open();
                    });
            });

        new Setting(contentEl)
            .setName("处理domain")
            .addButton((btn) => {
                btn.setButtonText("处理domain")
                    .onClick(() => {
                        new InputModal(this.app, "处理domain", (input: string) => {
                            console.log("处理domain:", input);
                            // 在这里处理domain
                            this.close();
                        }).open();
                    });
            });

        new Setting(contentEl)
            .setName("处理object")
            .addButton((btn) => {
                btn.setButtonText("处理object")
                    .onClick(() => {
                        new InputModal(this.app, "处理object", (input: string) => {
                            console.log("处理object:", input);
                            // 在这里处理object
                            this.close();
                        }).open();
                    });
            });
    }

    // 关闭时清空内容
    onClose() {
        let {contentEl} = this;
        contentEl.empty();
    }

}
