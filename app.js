const pages = [...document.querySelectorAll(".page")];
const app = document.querySelector("#app");
const pageCount = document.querySelector("#page-count");
const progressBar = document.querySelector("#progress-bar");
const prevButton = document.querySelector("#prev-page");
const nextButton = document.querySelector("#next-page");
const profileForm = document.querySelector("#profile-form");
const briefForm = document.querySelector("#brief-form");
const processItems = [...document.querySelectorAll("#process-list li")];
const viewResultButton = document.querySelector("#view-result");
const toast = document.querySelector("#toast");

let currentPage = 0;
let strategy = null;
let positioningVariant = 0;
let topicVariant = 0;
let touchStartX = 0;
let touchStartY = 0;

const sample = {
  name: "周屿",
  role: "人工智能公司创始人",
  resume: "连续创业十五年，带领团队把前沿算法转化为企业级产品，服务多个行业头部客户，并完成全球化市场布局。",
  industry: "人工智能 / 企业服务",
  viewpoint: "AI 的价值不是取代人，而是放大优秀团队的判断力。",
  goal: "建立兼具技术权威与商业影响力的创始人形象",
  audience: "企业管理者、创业者与投资人"
};

const libraries = {
  specialties: [
    { pattern: /人工智能|AI|算法|大模型|软件|科技/, label: "科技商业化", direction: "AI 与商业变革" },
    { pattern: /新能源|汽车|能源|制造/, label: "产业创新", direction: "产业升级与技术创新" },
    { pattern: /消费|零售|电商|品牌/, label: "品牌增长", direction: "品牌与消费者增长" },
    { pattern: /金融|投资|资本/, label: "产业投资", direction: "产业趋势与资本判断" },
    { pattern: /教育|人才|人力|组织/, label: "人才发展", direction: "人才与组织进化" },
    { pattern: /.*/, label: "行业创新", direction: "行业趋势与关键判断" }
  ],
  roleTags: [
    { pattern: /创始人|董事长|CEO|总裁/, tags: ["长期主义创业者", "商业破局者", "组织领航者"] },
    { pattern: /技术|CTO|科学家|研发/, tags: ["技术理想主义者", "复杂问题翻译者", "创新推动者"] },
    { pattern: /品牌|市场|CMO|公关/, tags: ["品牌增长操盘手", "公众叙事者", "用户洞察者"] },
    { pattern: /.*/, tags: ["行业实践者", "战略决策者", "价值创造者"] }
  ],
  goals: [
    { pattern: /影响力|认知|权威/, label: "行业话语权", direction: "高管观点与行业议题" },
    { pattern: /品牌|企业/, label: "企业品牌背书", direction: "企业使命与品牌价值" },
    { pattern: /人才|招聘|团队/, label: "人才吸引力", direction: "组织文化与人才管理" },
    { pattern: /客户|合作|业务|增长/, label: "商业增长力", direction: "客户价值与增长实践" },
    { pattern: /.*/, label: "公众影响力", direction: "领导者的判断与选择" }
  ],
  positioningTemplates: [
    ({ role, specialty, goal }) => `一位以${specialty}定义未来、用长期判断建立${goal}的${role}。`,
    ({ role, specialty, industry }) => `站在${industry}前沿，把${specialty}转化为真实商业价值的${role}。`,
    ({ role, specialty, audience }) => `为${audience}提供${specialty}新答案的${role}。`,
    ({ role, goal }) => `不只经营企业，更以清晰观点塑造${goal}的${role}。`
  ],
  titleTemplates: [
    ({ thesis }) => `${trimPunctuation(thesis)}，真正被低估的是什么`,
    ({ industry }) => `${industry}进入深水区，领导者需要重新回答三个问题`,
    ({ role }) => `成为${role}后，我不再追求每一次正确`,
    ({ thesis }) => `比${extractKeyword(thesis)}更重要的，是背后的判断力`,
    ({ industry }) => `${industry}的下一场竞争，不会只发生在产品层面`,
    ({ role }) => `${role}真正要管理的，不是答案，而是不确定性`
  ]
};

function goToPage(index) {
  const safeIndex = Math.max(0, Math.min(pages.length - 1, index));
  if (safeIndex === currentPage) return;

  app.classList.toggle("turning-back", safeIndex < currentPage);

  pages[currentPage].classList.remove("is-active");
  pages[currentPage].classList.add("was-active");
  const previous = currentPage;
  currentPage = safeIndex;

  pages.forEach((page, pageIndex) => {
    if (pageIndex !== previous) page.classList.remove("was-active");
  });
  pages[currentPage].classList.add("is-active");
  pages[currentPage].scrollTop = 0;
  updateChrome();
}

function updateChrome() {
  const darkPages = new Set([0, 2, 3]);
  app.classList.toggle("is-dark", darkPages.has(currentPage));
  app.classList.toggle("is-cover", currentPage === 0);
  pageCount.textContent = `${String(currentPage + 1).padStart(2, "0")} / ${String(pages.length).padStart(2, "0")}`;
  progressBar.style.width = `${((currentPage + 1) / pages.length) * 100}%`;
  prevButton.disabled = currentPage === 0;
  nextButton.disabled = currentPage === pages.length - 1 || currentPage === 3;
}

function validateAndGo(formId, target) {
  const form = document.querySelector(`#${formId}`);
  if (!form.reportValidity()) return;
  goToPage(target);
}

document.querySelectorAll("[data-goto]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = Number(button.dataset.goto);
    const formId = button.dataset.validate;
    formId ? validateAndGo(formId, target) : goToPage(target);
  });
});
document.querySelectorAll("[data-next]").forEach((button) => button.addEventListener("click", () => goToPage(currentPage + 1)));
prevButton.addEventListener("click", () => goToPage(currentPage - 1));
nextButton.addEventListener("click", () => goToPage(currentPage + 1));
document.querySelector("#brand-home").addEventListener("click", () => goToPage(0));

document.addEventListener("keydown", (event) => {
  if (event.target.matches("input, textarea, [contenteditable='true']")) return;
  if (event.key === "ArrowRight" && !nextButton.disabled) goToPage(currentPage + 1);
  if (event.key === "ArrowLeft" && !prevButton.disabled) goToPage(currentPage - 1);
});

document.querySelector("#book").addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
  touchStartY = event.changedTouches[0].screenY;
}, { passive: true });

document.querySelector("#book").addEventListener("touchend", (event) => {
  if (event.target.closest("input, textarea, button, [contenteditable='true']")) return;
  const deltaX = event.changedTouches[0].screenX - touchStartX;
  const deltaY = event.changedTouches[0].screenY - touchStartY;
  if (Math.abs(deltaX) < 65 || Math.abs(deltaX) < Math.abs(deltaY) * 1.3) return;
  if (deltaX > 0 && currentPage < pages.length - 1 && currentPage !== 3) goToPage(currentPage + 1);
  if (deltaX < 0 && currentPage > 0) goToPage(currentPage - 1);
}, { passive: true });

document.querySelector("#load-example").addEventListener("click", () => {
  Object.entries(sample).forEach(([key, value]) => {
    const field = profileForm.elements[key] || briefForm.elements[key];
    if (field) field.value = value;
  });
  showToast("示例档案已载入");
});

document.querySelector("#generate-button").addEventListener("click", async () => {
  if (!profileForm.reportValidity() || !briefForm.reportValidity()) return;
  positioningVariant = 0;
  topicVariant = 0;
  goToPage(3);
  viewResultButton.hidden = true;
  processItems.forEach((item, index) => {
    item.classList.remove("is-running", "is-done");
    if (index === 0) item.classList.add("is-running");
  });

  const data = collectData();
  for (let index = 0; index < processItems.length; index += 1) {
    await wait(520);
    processItems[index].classList.remove("is-running");
    processItems[index].classList.add("is-done");
    if (processItems[index + 1]) processItems[index + 1].classList.add("is-running");
  }
  strategy = buildStrategy(data);
  renderAll();
  viewResultButton.hidden = false;
});

viewResultButton.addEventListener("click", () => goToPage(4));

document.querySelectorAll("[data-regenerate]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!strategy) return;
    if (button.dataset.regenerate === "positioning") {
      positioningVariant += 1;
      strategy = buildStrategy(collectData(), positioningVariant, topicVariant);
      renderPositioning();
      showToast("本页已换一种表达");
    } else {
      topicVariant += 1;
      strategy = buildStrategy(collectData(), positioningVariant, topicVariant);
      renderTopics();
      showToast("选题已重新生成");
    }
  });
});

document.querySelectorAll("[data-copy]").forEach((button) => button.addEventListener("click", copyStrategy));

function collectData() {
  return {
    ...Object.fromEntries(new FormData(profileForm)),
    ...Object.fromEntries(new FormData(briefForm))
  };
}

function buildStrategy(data, positionOffset = 0, topicOffset = 0) {
  const specialty = libraries.specialties.find((item) => item.pattern.test(`${data.industry} ${data.resume} ${data.viewpoint}`));
  const roleGroup = libraries.roleTags.find((item) => item.pattern.test(data.role));
  const goalGroup = libraries.goals.find((item) => item.pattern.test(data.goal));
  const cleanIndustry = data.industry.split(/[\/／、,，]/)[0].trim() || "所在行业";
  const context = {
    ...data,
    industry: cleanIndustry,
    specialty: specialty.label,
    goal: goalGroup.label,
    thesis: data.viewpoint
  };
  const template = libraries.positioningTemplates[positionOffset % libraries.positioningTemplates.length];
  const tags = unique([
    specialty.label + "推动者",
    roleGroup.tags[positionOffset % roleGroup.tags.length],
    goalGroup.label + "构建者"
  ]).slice(0, 3);
  const directions = unique([
    specialty.direction,
    goalGroup.direction,
    roleGroup.tags[(positionOffset + 1) % roleGroup.tags.length].replace(/者$/, "与方法")
  ]).slice(0, 3);

  return {
    data,
    positioning: template(context),
    tags,
    directions,
    topics: buildTopics(context, topicOffset)
  };
}

function buildTopics(context, offset) {
  const templates = libraries.titleTemplates;
  const starts = [offset % templates.length, (offset + 1) % templates.length, (offset + 2) % templates.length];
  return starts.map((templateIndex, index) => {
    const title = templates[templateIndex](context);
    if (index === 0) {
      return {
        title,
        angle: `从${context.role}的亲身判断切入，把个人观点转化为${context.audience}可以带走的行动框架。`,
        hook: `当所有人都在寻找标准答案时，真正决定差距的，往往是一个领导者如何定义问题。${ensureSentence(context.thesis)}`,
        outline: [
          `为什么行业正在误读“${extractKeyword(context.thesis)}”`,
          `${context.role}在真实决策中的三个判断标准`,
          `给${context.audience}的一份行动清单`
        ]
      };
    }
    if (index === 1) {
      return {
        title,
        angle: `用一次关键选择或管理复盘建立人物可信度，体现成功背后的方法，而不是只展示结果。`,
        hook: `成功很容易被总结成结果，但在结果出现以前，每一位管理者都经历过无人能代替的选择。`,
        outline: [
          `一次改变业务方向的关键判断`,
          `决策背后被忽略的代价与坚持`,
          `这段经历如何重塑今天的管理方法`
        ]
      };
    }
    return {
      title,
      angle: `站在${context.industry}变化的前沿提出鲜明判断，建立这位高管面向未来的行业话语权。`,
      hook: `${context.industry}真正的分水岭已经出现：未来的赢家，不会只是拥有更多资源，而是更早看见结构性变化。`,
      outline: [
        `${context.industry}正在发生的三个结构性变化`,
        `为什么旧的成功经验开始失效`,
        `领导者今天应该提前布局什么`
      ]
    };
  });
}

function renderAll() {
  renderPositioning();
  renderTopics();
}

function renderPositioning() {
  document.querySelector("#result-person").textContent = `${strategy.data.name} · ${strategy.data.role}`;
  document.querySelector("#positioning").textContent = strategy.positioning;
  document.querySelector("#memory-tags").replaceChildren(
    ...strategy.tags.map((tag) => createEditable("div", "memory-tag", tag))
  );
  document.querySelector("#content-directions").replaceChildren(
    ...strategy.directions.map((direction) => createEditable("li", "", direction))
  );
}

function renderTopics() {
  document.querySelector("#topic-list").replaceChildren(
    ...strategy.topics.map((topic, index) => {
      const article = document.createElement("article");
      article.className = "topic-card";
      const number = document.createElement("div");
      number.className = "topic-no";
      number.textContent = `DAY ${String(index + 1).padStart(2, "0")}`;

      const content = document.createElement("div");
      content.className = "topic-content";
      content.append(createEditable("h3", "topic-title", topic.title));

      const meta = document.createElement("div");
      meta.className = "topic-meta";
      meta.append(
        makeTopicRow("角度", createEditable("p", "", topic.angle)),
        makeTopicRow("HOOK", createEditable("p", "", topic.hook)),
        makeTopicRow("大纲", makeOutline(topic.outline))
      );
      content.append(meta);
      article.append(number, content);
      return article;
    })
  );
}

function makeTopicRow(label, body) {
  const row = document.createElement("div");
  row.className = "topic-row";
  const heading = document.createElement("span");
  heading.textContent = label;
  row.append(heading, body);
  return row;
}

function makeOutline(items) {
  const list = document.createElement("ol");
  list.contentEditable = "true";
  list.spellcheck = false;
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.append(li);
  });
  return list;
}

function createEditable(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = text;
  element.contentEditable = "true";
  element.spellcheck = false;
  return element;
}

async function copyStrategy() {
  if (!strategy) return;
  const tags = [...document.querySelectorAll(".memory-tag")].map((item) => item.textContent.trim());
  const directions = [...document.querySelectorAll("#content-directions li")].map((item) => item.textContent.trim());
  const topicCards = [...document.querySelectorAll(".topic-card")].map((card, index) => {
    const title = card.querySelector(".topic-title").textContent.trim();
    const rows = [...card.querySelectorAll(".topic-row")];
    const angle = rows[0].querySelector("p").textContent.trim();
    const hook = rows[1].querySelector("p").textContent.trim();
    const outline = [...rows[2].querySelectorAll("li")].map((item) => item.textContent.trim());
    return `DAY ${index + 1}｜${title}\n角度：${angle}\nHook：${hook}\n大纲：\n${outline.map((item, itemIndex) => `${itemIndex + 1}. ${item}`).join("\n")}`;
  });
  const output = [
    `《高见》高管 IP 策略｜${strategy.data.name}`,
    "",
    "一句话定位",
    document.querySelector("#positioning").textContent.trim(),
    "",
    "三个记忆标签",
    tags.map((item) => `- ${item}`).join("\n"),
    "",
    "三个长期内容方向",
    directions.map((item) => `- ${item}`).join("\n"),
    "",
    "三天公众号选题",
    topicCards.join("\n\n")
  ].join("\n");

  try {
    await navigator.clipboard.writeText(output);
    showToast("已复制完整方案");
  } catch {
    showToast("复制失败，请手动选择文字");
  }
}

function trimPunctuation(value) {
  return value.trim().replace(/[。！!？?，,；;：:]+$/g, "");
}

function ensureSentence(value) {
  const clean = value.trim();
  return /[。！!？?]$/.test(clean) ? clean : `${clean}。`;
}

function extractKeyword(value) {
  const clean = trimPunctuation(value);
  const clauses = clean.split(/[，,；;：:]/).filter(Boolean);
  const candidate = clauses.sort((a, b) => a.length - b.length)[0] || clean;
  return candidate.length > 12 ? candidate.slice(0, 12) : candidate;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function wait(duration) {
  return new Promise((resolve) => window.setTimeout(resolve, duration));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 1700);
}

updateChrome();
