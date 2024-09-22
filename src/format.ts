// 校验入参
function isVailed(text) {
    if (text === null || text === "") {
        return false;
    }
    return true;
}

// 去除序号
function removeIds(text) {
    if (!isVailed(text)) {
        return text; 
    }
    const regex = /^\d+\.\s*/gm;
    const result = text.replace(regex, "");
    return result;
}

// 去除一些无关说明
function removeText(text) {
    if (!isVailed(text)) {
        return text; 
    }
    const regex = /^(复制代码|ts|javaScript|xml|java|bash)\s*$/gim;
    const result = text.replace(regex, "");
    return result;
}

// 规格化一些文字
function formatText(text) {
    if (!isVailed(text)) {
        return text;
    }
    // 定义替换规则的映射数组
    const rules = [
        { regex: /^(功能:|功能：)\s*/gim, replacement: "作用: " },
        { regex: /^(方法签名:|方法签名：)\s*/gim, replacement: "格式: " },
        { regex: /^(示例:|示例：|使用示例:|使用示例：|例子:|例子：)\s*/gim, replacement: "使用: " },
        { regex: /^(注意事项:|注意事项：|提醒:|提醒：)\s*/gim, replacement: "注意: " },
    ];

    // 遍历所有规则并进行替换
    rules.forEach(rule => {
        text = text.replace(rule.regex, rule.replacement);
    });

    return text;
}


// 插入 Tab
function insertTab(text) {
    if (!isVailed(text)) {
        return text; 
    }
    const regex = /^.{1,6}:\s*/gm;
    // 使用 replace 方法在匹配的行前插入一个 Tab
    const result = text.replace(regex, '\t$&');
    return result;
}

// 组合格式化函数
function format(text) {
    if (!isVailed(text)) {
        return text; 
    }
    let newText = text;
    newText = removeIds(newText);
    newText = formatText(newText);
    newText = removeText(newText);
    newText = insertTab(newText);
    return newText;
}

// 导出函数
export { format };
