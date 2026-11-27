---
name: publish-essay
description: >-
  Publishes illustrated Obsidian essays to this Jekyll site in Chinese and
  English, and checks that both match the note by SHA-256. Use when the user
  says 同步文章, 笔记更新了, publish essays, or asks to update the illustrated
  KV Cache, prefix caching, vLLM, or Batch API posts.
---

# Publish essay

中文笔记是原文。站点上的中文稿和英文稿都从它生成。英文只放在 `_posts`，不在 Obsidian 再存一份。

图解 HTML 是图的原文。两语共用 `assets/figures/<id>.html`。图内短标签保持中文。图注在 Markdown 里，随语言翻译。

## 路径

- Vault：`/Users/donhuang/Library/Mobile Documents/iCloud~md~obsidian/Documents/Agent`（可用 `ESSAY_VAULT` 覆盖）
- 图片：`/Users/donhuang/Library/Mobile Documents/iCloud~md~obsidian/Documents/Attachments`
- 登记表：`_data/published_essays.yml`
- 术语表：`_data/essay_glossary.yml`
- 校验：`ruby bin/essay-status`

只处理登记表里的篇目。笔记 frontmatter 的 `status` 不是 `complete` 或 `完成` 时，停下来，不发布。

## 先核对

```bash
ruby bin/essay-status
ruby bin/essay-status --json
```

哈希以脚本输出为准，不要另算。

| status | 含义 | 动作 |
| --- | --- | --- |
| synced | 笔记、中文稿、英文稿、图拷贝、笔记回写一致 | 不改 |
| missing | 稿或图拷贝不存在 | 按下面的步骤生成 |
| source-drifted | 笔记正文变了 | 重做中文稿，再整篇重译英文 |
| figure-drifted | 图解 HTML 变了，或站点拷贝不一致 | 重新拷贝 HTML，更新两边的 `figure_sha` |
| translation-drifted | 中文已跟上，英文还对着旧原文 | 从新的中文整篇重译，不在旧英文上改 |
| en-hand-edited | 英文正文被人改过，原文没变 | 停下来问。没有明确同意就不要覆盖 |
| needs-en-hash | 稿已对齐，还没记录英文正文哈希 | `ruby bin/essay-status --fill-en-hash ID` |
| unstamped | 站点已对齐，笔记还没回写 | `ruby bin/essay-status --stamp ID` |

`--stamp` 和 `--fill-en-hash` 只在稿件已经对齐时写入。它们会改 Obsidian 笔记的三个字段，或英文稿的 `en_body_sha`。

## 发布或更新一篇

1. 跑 `ruby bin/essay-status --json`，抄下该篇的 `source_sha` 和 `figure_sha`。
2. 读登记表条目和笔记。确认 `status: complete`（或 `完成`）。
3. 把图解 HTML 按原字节拷到 `figure_asset`。
4. 按转换规则写出中文稿。`source_sha`、`figure_sha` 用第 1 步的值。
5. 从这份中文正文整篇译出英文稿。术语按 `_data/essay_glossary.yml`。`translated_from_sha` 等于同一个 `source_sha`。`en_body_sha` 先写 `pending`。
6. 再跑脚本。状态应是 `needs-en-hash` 或 `unstamped`。
7. `ruby bin/essay-status --fill-en-hash ID`
8. `ruby bin/essay-status --stamp ID`
9. 再跑一次，状态应是 `synced`。

英文过期时，从新中文重译整篇。不要对着旧英文打补丁。

用户没有明确要求时，不要 git commit。

## 稿件 frontmatter

文件名和 permalink 以登记表为准，不要改 id。

```yaml
---
layout: post
title: "<title_zh 或 title_en>"
date: <登记表 date> 12:00:00 +0800
description: "<正文第一段，一句话>"
tags: ai-infra illustrations
categories: illustrations
lang: zh
canonical_id: kv-cache
source_sha: <64 位十六进制>
figure_sha: <64 位十六进制>
alternate: /en/kv-cache/
related_posts: false
---
```

英文稿把 `lang` 换成 `en`，`alternate` 指向中文 permalink，并增加：

```yaml
translated_from_sha: <与 source_sha 相同>
en_body_sha: pending
```

文首放互链，中文稿写 `[English](/en/kv-cache/)`，英文稿写 `[中文](/zh/kv-cache/)`。permalink 用登记表里的，不要手写错 id。

## 转换

`dataviewjs` 块：

```html
<iframe
  src="{{ '/assets/figures/<id>.html#only-<fig>' | relative_url }}"
  style="width:100%;height:<h>px;border:0;background:#fff"
  loading="lazy"
  title="<fig>"
></iframe>
```

`<fig>` 和 `<h>` 来自 `dv.view(..., {fig:"...", h:...})`。`<id>` 是登记表 id。

Obsidian 双链：

- 目标在某一篇的 `links` 里：链到对应语言的 permalink。带 `#标题` 时，锚点用标题的小写、空格变 `-`、去掉标点。
- 同一篇的 `[[#标题|文字]]`：链到本页锚点。
- 其他 `[[笔记]]`：只留显示文字，不链接。
- 外部 `http` 链接保留。

呼出块 `> [!summary] 标题`：

- summary / info / tip / note → `{: .block-tip }`
- warning / caution → `{: .block-warning }`
- danger / failure → `{: .block-danger }`

写成：

```markdown
> ##### 标题
>
> 正文
{: .block-tip }
```

`![[某图.png]]`：在 Attachments 下按文件名找到图片，拷到 `assets/img/essays/<id>/`，改成普通 Markdown 图片。

数学：保留 `$$`。行内 `$...$` 若含 `\`, `_`, 或 `^`，改成 `$$...$$`。货币金额保持原文。

不要改图解 HTML 里的句子。不要新增 `_layouts`、`_includes`、`_sass`。

## 回写笔记

`--stamp` 只增改这三个顶层字段，不动正文：

```yaml
published_id: kv-cache
published_sha: <当前 source_sha>
published_at: <当天 YYYY-MM-DD>
```

笔记里的 `published_sha` 与中文稿、英文稿的 `translated_from_sha` 相同，即同一版。
