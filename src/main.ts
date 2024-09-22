import {
    App,
    Modal,
    Notice,
    Plugin,
    PluginSettingTab,
    Setting,
} from "obsidian"; // 从 Obsidian 导入核心组件和类
import {format} from "../src/format"

// 定义插件的设置接口，用于存储插件设置的类型
interface DeleteImageLinksSettings {
    mySetting: string;
}

// 定义插件的默认设置
const DEFAULT_SETTINGS: DeleteImageLinksSettings = {
    mySetting: "default",
};

// 这是插件的主类，继承自 Obsidian 的 Plugin 类
export default class DeleteImageLinks extends Plugin {
    // 定义插件的设置字段
    settings: DeleteImageLinksSettings;

    // 插件加载时调用的方法
    async onload() {
        console.log("loading g-box");
        // 加载插件的设置
        await this.loadSettings();
        // 添加 Obsidian 的左侧栏图标，点击时调用 format 方法
        this.addRibbonIcon("circle", "g-box", () => {
            // 内容格式化
            this.format();
        });
        // 在状态栏中添加一个状态文本
        this.addStatusBarItem().setText("Status Bar Text");
        // 添加自定义命令，用户可以通过命令面板打开模态窗口
        this.addCommand({
            id: "g-box", // 命令的唯一 ID
            name: "g-format", // 命令名称
            checkCallback: (checking: boolean) => {
                let leaf = this.app.workspace.activeLeaf;
                if (leaf) {
                    if (!checking) {
                        new SampleModal(this.app).open();
                    }
                    return true;
                }
                // 没有活跃文档时
                return false;
            },
        });

        // 添加一个插件设置的选项卡
        this.addSettingTab(new SampleSettingTab(this.app, this));

        // 注册点击事件监听器
        this.registerDomEvent(document, "click", (evt: MouseEvent) => {
            // 输出点击事件的日志
            console.log("click", evt);
        });

        // 注册一个定时器，每 5 分钟输出一次日志
        this.registerInterval(
            window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000)
        );
    }

    // 插件卸载
    onunload() {
        console.log("unloading g-box plugin");
    }

    // 加载插件的设置数据
    async loadSettings() {
        // 从存储中加载设置并应用默认设置
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    // 保存插件的设置数据
    async saveSettings() {
        await this.saveData(this.settings);
    }

    // 格式化内容
    async format() {
        const note = this.app.workspace.getActiveFile();
        const content = this.app.vault.read(note);
        try {
            // 等待读取的内容
            const resolvedString: string = await content;
            // 格式化内容
            let result = format(resolvedString)
            this.app.vault.modify(note, result);
        } catch (error) {
            console.error(error);
        }
        // 提示格式化成功
        new Notice('success.');
    }
}

// 模态窗口类，继承自 Modal
class SampleModal extends Modal {
    constructor(app: App) {
        super(app);
    }

    // 模态窗口打开时执行的方法
    onOpen() {
        let { contentEl } = this;
        // 在模态窗口中设置文本内容
        contentEl.setText("Woah!");
    }

    // 模态窗口关闭时执行的方法
    onClose() {
        let { contentEl } = this;
        // 清空模态窗口的内容
        contentEl.empty();
    }
}

// 设置选项卡类，继承自 PluginSettingTab
class SampleSettingTab extends PluginSettingTab {
    plugin: DeleteImageLinks;

    // 构造函数，接受 app 和插件实例作为参数
    constructor(app: App, plugin: DeleteImageLinks) {
        super(app, plugin);
        this.plugin = plugin;
    }

    // 渲染设置面板
    display(): void {
        let { containerEl } = this;
        containerEl.empty();
        // 创建标题
        containerEl.createEl("h2", { text: "g-box 设置." });
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
