---
layout: page
title: "Data-Driven Game Publishing"
description: Kingston University 受邀分享，2026 年 10 月 7 日
img: assets/img/kingston-2026.jpg
permalink: /zh/projects/kingston-talk/
zh_project: talks
importance: 1
nav: false
---

2026 年 10 月 7 日腾讯到 Kingston University 校园宣讲期间，我做了一场分享：数据如何影响游戏发行决策，AI 又如何让这些数据更容易用起来。

**发行是一连串下注。** 签约、本地化、上线、运营，每一步都要在结果出来之前投入时间、钱和人。每一步都需要数据：同类游戏的排名和收入、市场规模、获客成本、留存、评论情绪。

**卡脖子的是数据获取。** 这些数据散在不同工具里，不同团队的口径不一样，每个追问都要等 SQL，查起来很慢。

**DataBrain 让数据可以直接问。** DataBrain 是我为腾讯全球发行团队负责的平台。它的 AI agent 读懂一句自然语言问题，取回对应的数据源（市场数据、Steam、评论、达人、内部数据），把信号串起来，给出图表、数据来源和自动生成的看板。

**案例：PEAK。** 一款 7.99 美元的合作攀爬游戏，怎么做到约 17 万同时在线？向 agent 问了四个问题：

1. 上线以来的同时在线人数呈现四波高峰，而不是一次冲高：上线一次，之后三次更新各一次。
2. Steam 评论里排在前面的是和朋友一起玩、性价比高，主要风险是部分电脑上会崩溃。
3. 播放量上百万的达人视频集中出现在每次更新前后，工作室每次更新前几天都会在 TikTok 上预热。
4. 一句请求就生成了一个看板，包含玩家数、评分和达人热度，并会随最新数据刷新。

最后的结论：AI 让数据更容易用，发行决策仍然由人来做。

<div class="row justify-content-center mt-4">
  <div class="col-6 col-md-4">
    {% include figure.liquid loading="eager" path="assets/img/kingston-speaker.jpg" alt="在 Kingston University 分享" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-6 col-md-4">
    {% include figure.liquid loading="eager" path="assets/img/kingston-2026.jpg" alt="Kingston University 的阶梯教室" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<script src="{{ '/assets/js/zh-nav.js' | relative_url }}"></script>
