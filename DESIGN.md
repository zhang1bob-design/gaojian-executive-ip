---
name: 高见
description: 会工作的先锋财经杂志式高管内容工具
colors:
  oxblood: "#a3152c"
  oxblood-deep: "#68101e"
  paper: "#f0ece2"
  paper-bright: "#fbf8f0"
  ink: "#12110f"
  ivory: "#f8f3e8"
  muted: "#686158"
typography:
  display:
    fontFamily: "Noto Serif SC, STZhongsong, Songti SC, STSong, SimSun, serif"
    fontSize: "clamp(2.5rem, 11vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Noto Serif SC, STZhongsong, Songti SC, STSong, SimSun, serif"
    fontSize: "clamp(1.75rem, 7.4vw, 2.875rem)"
    fontWeight: 750
    lineHeight: 1.3
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Noto Sans SC, PingFang SC, Hiragino Sans GB, Microsoft YaHei, DengXian, sans-serif"
    fontSize: "15px"
    fontWeight: 480
    lineHeight: 1.7
  label:
    fontFamily: "Noto Sans SC, PingFang SC, Hiragino Sans GB, Microsoft YaHei, DengXian, sans-serif"
    fontSize: "10px"
    fontWeight: 800
    lineHeight: 1.4
    letterSpacing: "0.04em"
rounded:
  square: "0px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "28px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.square}"
    padding: "0 16px"
    height: "48px"
  button-accent:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.square}"
    padding: "0 16px"
    height: "50px"
  field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "14px 0 18px"
  topic-sheet:
    backgroundColor: "{colors.paper-bright}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "14px 15px 17px"
---

# Design System: 高见

## Overview

**Creative North Star: "财经编辑部校样"**

《高见》的界面像一份正在被编辑、批注和交付的先锋财经杂志。封面承担品牌冲击和产品解释，操作页回到克制、清楚的校样纸；用户感受到的是编辑判断正在成形，而不是一个抽象 AI 在表演。

系统强调硬边纸张、人物摄影、中文观点标题和少量酒红批注。信息密度随任务变化：封面大胆，表单安静，结果像可带走的编辑计划。拒绝玻璃拟态、发光圆环、通用卡片阵列和连续的英文眉题。

**Key Characteristics:**

- 酒红、墨黑与校样纸白的受限色盘
- 中文宋体表达观点，中文黑体承担操作
- 方角、细线、页码和硬边纸张
- 封面大胆，工作页克制，结果页可读
- 可跟手的纸张右滑翻页是唯一标志性动效

## Colors

色彩来自财经刊物的封面油墨和编辑校样，酒红只用于刊头、动作和批注，纸白承担大部分阅读面积。

### Primary

- **编辑酒红:** 核心品牌色，用于刊头、主动作、批注数字和完成印章。
- **深酒红:** 仅用于人物封面的环境底色与深色摄影衔接。

### Neutral

- **校样纸:** 所有操作页与固定导航的主背景。
- **亮纸:** 封面信息校样与选题稿件的局部承载面。
- **油墨黑:** 正文、规则线、按钮与暗色生成页。
- **暖象牙:** 暗色表面的高对比文字。
- **编辑灰:** 说明性正文和次要状态。

**The One Red Rule.** 酒红用于决定与批注，不把每个容器都染红；同一屏只有一个主要红色动作。

## Typography

**Display Font:** Noto Serif SC，回退到华文中宋、宋体系统栈。  
**Body Font:** Noto Sans SC，回退到苹方、微软雅黑与等线系统栈。

**Character:** 高对比、重字重的中文宋体带来财经杂志的判断感；中性黑体保证表单与长文本在手机端易读。英文只作少量刊物标识，不承担信息层级。

### Hierarchy

- **Display:** 极少使用，只用于刊头和页面主标题；内容页最大不超过 4rem，封面刊头可放大至 6.75rem。
- **Headline:** 用于定位与选题标题，保持严格中文换行和舒展行高。
- **Body:** 用于输入、角度、开篇与大纲，控制在舒适的中文阅读行长。
- **Label:** 用于页码、字段序号与编辑批注，不承担主要说明。

**The Chinese-First Rule.** 所有关键任务、状态和动作必须先用中文说清楚；装饰性英文不能替代中文标签。

## Layout

移动端是基准画布。页面使用 20px 侧边距、清晰的顶部刊物栏与底部翻页栏；内容页为独立可滚动纸张，并为固定控制保留足够底部空间。宽屏把整份杂志限制在 1180px 内，表单和结果内容限制在 920px 内。

封面采用满版极近景人物摄影：横向中文刊头覆盖头发上缘但避开双眼，主标题落在左下深色区域，唯一主动作位于底部拇指区。桌面选题使用“一篇主稿 + 两篇侧稿”，手机端回到单列。

## Elevation & Depth

系统默认平面化，以纸张叠放而非圆角卡片表达层级。阴影只出现在封面校样、生成校样和翻页中的活动纸张，必须同时有偏移与柔和模糊；静止操作面不使用装饰性阴影。

**The Moving Paper Rule.** 只有正在被翻动或被拿起的纸张获得阴影，静止内容依靠色面、线条和留白分层。

## Shapes

所有主要表面与控件保持方角。边界由 1px 编辑线、4–5px 章节规则和硬边色块构成；不使用胶囊按钮、圆角卡片或有机几何遮罩。人物保持原始摄影轮廓，不用 CSS 图形替代抠图。

## Components

### Buttons

- **Shape:** 硬边矩形，最小触控高度 44px。
- **Primary:** 油墨黑底配暖象牙文字；生成完成等关键状态可使用编辑酒红。
- **Hover / Focus:** 悬停只轻微降低亮度；键盘焦点使用 3px 高对比轮廓，暗色页切换为暖象牙色。

### Cards / Containers

- **Corner Style:** 方角。
- **Background:** 校样纸或亮纸。
- **Shadow Strategy:** 静止卡片无阴影；校样和翻动纸张使用结构性柔影。
- **Border:** 选题稿件以顶部粗规则线标记，不套完整边框。

### Inputs / Fields

- **Style:** 透明背景、顶部细规则线、字段序号与中文标签并置。
- **Focus:** 顶部规则线转为编辑酒红并加粗。
- **Placeholder:** 使用可读的编辑灰，不依赖低透明度。

### Navigation

顶部显示刊名、产品任务与页码；底部显示上一页、进度和下一页。拥有本页主要动作时隐藏重复的全局下一页；封面只保留一个主动作。

### Editorial Proof

生成过程使用略微旋转的纸质校样、正文规则线与酒红完成印章。完成后动画停止，文案从“选题编校中”明确变为“选题编校完成”。

## Do's and Don'ts

### Do:

- **Do** 让第一次进入页面的人在数秒内看懂“高管 IP 公众号选题生成器”。
- **Do** 先保证中文标题、正文和长内容在 360px 手机上可读。
- **Do** 把酒红留给决定、批注和完成状态。
- **Do** 让翻页、焦点、滚动条、光标与选中态都属于同一套视觉语言。

### Don't:

- **Don't** 使用发光 AI 圆环、渐变文字、玻璃卡片或通用图标卡阵列。
- **Don't** 让英文眉题承担中文用户必须理解的信息。
- **Don't** 在同一屏提供两个语义相同的“下一步”动作。
- **Don't** 让固定导航遮住正文、表单动作或可编辑结果。
