---
layout: page
title: 博客
permalink: /zh/blog/
description: 图解大模型推理、缓存和 API 计费。
nav: false
---

{% assign essays = site.data.published_essays.essays | where: "live", true | sort: "date" | reverse %}

<div class="essay-list">
  {% for e in essays %}
    <a class="essay-item" href="{{ e.zh_permalink | relative_url }}">
      {% if e.cover %}<img class="essay-cover" src="{{ e.cover | relative_url }}" alt="" loading="lazy">{% endif %}
      <span class="essay-text">
        <span class="essay-date">{{ e.date | date: "%Y 年 %-m 月 %-d 日" }}</span>
        <span class="essay-title">{{ e.title_zh | split: "：" | first }}</span>
        {% if e.summary_zh %}<span class="essay-desc">{{ e.summary_zh }}</span>{% endif %}
        <span class="essay-tags">
          {% for t in e.tags %}<span class="essay-tag">#{{ t }}</span>{% endfor %}
        </span>
      </span>
    </a>
  {% endfor %}
</div>

<script src="{{ '/assets/js/zh-nav.js' | relative_url }}"></script>
