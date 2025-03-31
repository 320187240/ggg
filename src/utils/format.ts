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
        { regex: /^(功能[:：])\s*/gim, replacement: "作用: " },
        { regex: /^(方法签名[:：])\s*/gim, replacement: "格式: " },
        { regex: /^(示例[:：]|使用示例[:：]|例子[:：])\s*/gim, replacement: "使用: " },
        { regex: /^(注意事项[:：]|提醒[:：])\s*/gim, replacement: "注意: " },
    ];

    // 遍历所有规则并进行替换
    rules.forEach(rule => {
        text = text.replace(rule.regex, rule.replacement);
    });

    return text;
}

// 在匹配行开头添加一个 Tab，末尾添加换行符
function insertTab(text) {
    if (!isVailed(text)) {
        return text;
    }
    const regex = /^(.{1,6}[:：]\s*)(.*?)(?=\n)/gm;
    let result= text.replace(regex, '\t$1$2\n');
    return result;
}

//在每个匹配行后的段落开头添加两个tab
function addTabsToFirstParagraph(text) {
    const lines = text.split('\n');
    let firstParagraphAdded = false;

    const result = lines.map((line, index) => {
        // 跳过空白行，直到找到第一个非空白行
        if (!firstParagraphAdded && line.trim() === '') {
            return line;
        }

        // 如果当前行是非空行
        if (line.trim() !== '') {
            // 查找前面的行，直到找到非空行或到达开头
            let previousLine = null;
            for (let i = index - 1; i >= 0; i--) {
                if (lines[i].trim() !== '') {
                    previousLine = lines[i];
                    break;
                }
            }

            // 判断前一非空行是否符合条件
            const isTargetLine = previousLine && /^.{1,6}[:；]\s*$/.test(previousLine.trim());

            // 如果前一行是目标行，添加两个 Tabs
            if (!firstParagraphAdded && isTargetLine) {
                // 只会在第一个段落前添加
                firstParagraphAdded = true;
                return '\t\t' + line;
            }
        }

        // 如果当前行是目标行，重置标志
        if (/^.{1,6}[:；]\s*$/.test(line)) {
            firstParagraphAdded = false;
        }

        // 其他行保持不变
        return line;
    }).join('\n');

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
    newText = addTabsToFirstParagraph(newText);
    return newText;
}

// 导出函数
export { format };
