var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// src/main.ts
__markAsModule(exports);
__export(exports, {
  gBox: () => gBox
});
var import_obsidian5 = __toModule(require("obsidian"));

// src/components/FunctionSelectionModal.ts
var import_obsidian2 = __toModule(require("obsidian"));

// src/components/InputModal.ts
var import_obsidian = __toModule(require("obsidian"));
var InputModal = class extends import_obsidian.Modal {
  constructor(app, title, onSubmit) {
    super(app);
    this.title = title;
    this.onSubmit = onSubmit;
  }
  onOpen() {
    let {contentEl} = this;
    contentEl.createEl("h2", {text: this.title});
    const inputField = contentEl.createEl("textarea");
    inputField.placeholder = "\u8BF7\u8F93\u5165\u5B57\u7B26\u4E32";
    new import_obsidian.Setting(contentEl).setName("\u63D0\u4EA4").addButton((btn) => {
      btn.setButtonText("\u63D0\u4EA4").onClick(() => {
        const input = inputField.value;
        if (input.trim()) {
          this.onSubmit(input);
          this.close();
        } else {
          new import_obsidian.Notice("\u8BF7\u8F93\u5165\u6709\u6548\u7684\u5B57\u7B26\u4E32");
        }
      });
    });
  }
  onClose() {
    let {contentEl} = this;
    contentEl.empty();
  }
};

// src/components/FunctionSelectionModal.ts
var FunctionSelectionModal = class extends import_obsidian2.Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
  }
  onOpen() {
    let {contentEl} = this;
    contentEl.createEl("h2", {text: "\u9009\u62E9\u529F\u80FD"});
    new import_obsidian2.Setting(contentEl).setName("\u683C\u5F0F\u5316").addButton((btn) => {
      btn.setButtonText("\u683C\u5F0F\u5316").onClick(() => {
        new InputModal(this.app, "\u683C\u5F0F\u5316", (input) => {
          console.log("\u683C\u5F0F\u5316\u5904\u7406:", input);
          this.plugin.format();
          this.close();
        }).open();
      });
    });
    new import_obsidian2.Setting(contentEl).setName("\u5904\u7406form").addButton((btn) => {
      btn.setButtonText("\u5904\u7406form").onClick(() => {
        new InputModal(this.app, "\u5904\u7406form", (input) => {
          console.log("\u5904\u7406form:", input);
          this.close();
        }).open();
      });
    });
    new import_obsidian2.Setting(contentEl).setName("\u5904\u7406domain").addButton((btn) => {
      btn.setButtonText("\u5904\u7406domain").onClick(() => {
        new InputModal(this.app, "\u5904\u7406domain", (input) => {
          console.log("\u5904\u7406domain:", input);
          this.close();
        }).open();
      });
    });
    new import_obsidian2.Setting(contentEl).setName("\u5904\u7406object").addButton((btn) => {
      btn.setButtonText("\u5904\u7406object").onClick(() => {
        new InputModal(this.app, "\u5904\u7406object", (input) => {
          console.log("\u5904\u7406object:", input);
          this.close();
        }).open();
      });
    });
  }
  onClose() {
    let {contentEl} = this;
    contentEl.empty();
  }
};

// src/components/SampleModal.ts
var import_obsidian3 = __toModule(require("obsidian"));
var SampleModal = class extends import_obsidian3.Modal {
  constructor(app) {
    super(app);
  }
  onOpen() {
    let {contentEl} = this;
    contentEl.setText("Woah!");
  }
  onClose() {
    let {contentEl} = this;
    contentEl.empty();
  }
};

// src/components/SampleSettingTab.ts
var import_obsidian4 = __toModule(require("obsidian"));
var SampleSettingTab = class extends import_obsidian4.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    let {containerEl} = this;
    containerEl.empty();
    containerEl.createEl("h2", {text: "g-box \u8BBE\u7F6E."});
    new import_obsidian4.Setting(containerEl).setName("\u8BBE\u7F6E").setDesc("\u6682\u65E0\u5185\u5BB9").addText((text) => text.setPlaceholder("\u8F93\u5165\u8BBE\u7F6E\u5185\u5BB9").setValue("").onChange(async (value) => {
      console.log("Secret: " + value);
      this.plugin.settings.mySetting = value;
      await this.plugin.saveSettings();
    }));
  }
};

// src/utils/format.ts
function isVailed(text) {
  if (text === null || text === "") {
    return false;
  }
  return true;
}
function removeIds(text) {
  if (!isVailed(text)) {
    return text;
  }
  const regex = /^\d+\.\s*/gm;
  const result = text.replace(regex, "");
  return result;
}
function removeText(text) {
  if (!isVailed(text)) {
    return text;
  }
  const regex = /^(复制代码|ts|javaScript|xml|java|bash)\s*$/gim;
  const result = text.replace(regex, "");
  return result;
}
function formatText(text) {
  if (!isVailed(text)) {
    return text;
  }
  const rules = [
    {regex: /^(功能[:：])\s*/gim, replacement: "\u4F5C\u7528: "},
    {regex: /^(方法签名[:：])\s*/gim, replacement: "\u683C\u5F0F: "},
    {regex: /^(示例[:：]|使用示例[:：]|例子[:：])\s*/gim, replacement: "\u4F7F\u7528: "},
    {regex: /^(注意事项[:：]|提醒[:：])\s*/gim, replacement: "\u6CE8\u610F: "}
  ];
  rules.forEach((rule) => {
    text = text.replace(rule.regex, rule.replacement);
  });
  return text;
}
function insertTab(text) {
  if (!isVailed(text)) {
    return text;
  }
  const regex = /^(.{1,6}[:：]\s*)(.*?)(?=\n)/gm;
  let result = text.replace(regex, "	$1$2\n");
  return result;
}
function addTabsToFirstParagraph(text) {
  const lines = text.split("\n");
  let firstParagraphAdded = false;
  const result = lines.map((line, index) => {
    if (!firstParagraphAdded && line.trim() === "") {
      return line;
    }
    if (line.trim() !== "") {
      let previousLine = null;
      for (let i = index - 1; i >= 0; i--) {
        if (lines[i].trim() !== "") {
          previousLine = lines[i];
          break;
        }
      }
      const isTargetLine = previousLine && /^.{1,6}[:；]\s*$/.test(previousLine.trim());
      if (!firstParagraphAdded && isTargetLine) {
        firstParagraphAdded = true;
        return "		" + line;
      }
    }
    if (/^.{1,6}[:；]\s*$/.test(line)) {
      firstParagraphAdded = false;
    }
    return line;
  }).join("\n");
  return result;
}
function format(text) {
  if (!isVailed(text)) {
    return text;
  }
  let newText = text;
  newText = removeIds(newText);
  newText = formatText(newText);
  newText = removeText(newText);
  newText = insertTab(newText);
  newText = addTabsToFirstParagraph(newText);
  return newText;
}

// src/main.ts
var DEFAULT_SETTINGS = {
  mySetting: "default"
};
var gBox = class extends import_obsidian5.Plugin {
  async onload() {
    console.log("loading g-box");
    await this.loadSettings();
    this.addRibbonIcon("circle", "g-box", () => {
      new FunctionSelectionModal(this.app, this).open();
    });
    this.addStatusBarItem().setText("Status Bar Text");
    this.addCommand({
      id: "g-box",
      name: "g-format",
      checkCallback: (checking) => {
        let leaf = this.app.workspace.activeLeaf;
        if (leaf) {
          if (!checking) {
            new SampleModal(this.app).open();
          }
          return true;
        }
        return false;
      }
    });
    this.addSettingTab(new SampleSettingTab(this.app, this));
    this.registerDomEvent(document, "click", (evt) => {
      console.log("click", evt);
    });
    this.registerInterval(window.setInterval(() => console.log("setInterval"), 5 * 60 * 1e3));
  }
  onunload() {
    console.log("unloading g-box plugin");
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async format() {
    const note = this.app.workspace.getActiveFile();
    const content = this.app.vault.read(note);
    try {
      const resolvedString = await content;
      let result = format(resolvedString);
      this.app.vault.modify(note, result);
    } catch (error) {
      console.error(error);
    }
    new import_obsidian5.Notice("success.");
  }
};
