import {App, PluginSettingTab, Setting} from "obsidian";
import {gBox} from "../main";

export class SampleSettingTab extends PluginSettingTab {
    plugin: gBox;

    // 构造函数，接受 app 和插件实例作为参数
    constructor(app: App, plugin: gBox) {
        super(app, plugin);
        this.plugin = plugin;
    }

    // 渲染设置面板
    display(): void {
        let {containerEl} = this;
        containerEl.empty();
        // 创建标题
        containerEl.createEl("h2", {text: "g-box 设置."});
        // 创建一个设置项
        new Setting(containerEl)
            .setName("设置")
            .setDesc("暂无内容")
            .addText((text) =>
                text
                    .setPlaceholder("输入设置内容")
                    // 设置默认值
                    .setValue("")
                    // 监听输入变化
                    .onChange(async (value) => {
                        // 输出输入的值
                        console.log("Secret: " + value);
                        // 更新插件的设置
                        this.plugin.settings.mySetting = value;
                        await this.plugin.saveSettings();
                    })
            );
    }
}
