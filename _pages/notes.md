---
layout: page
title: Blog
permalink: /blog/
description: Illustrated notes on LLM inference, caching and API pricing.
nav: true
nav_order: 4
---

{% assign essays = site.data.published_essays.essays | where: "live", true | sort: "date" | reverse %}

<div class="essay-list">
  {% for e in essays %}
    {% assign en = site.pages | where: "url", e.en_permalink | first %}
    <a class="essay-item" href="{% if en %}{{ e.en_permalink | relative_url }}{% else %}{{ e.zh_permalink | relative_url }}{% endif %}">
      {% if e.cover %}<img class="essay-cover" src="{{ e.cover | relative_url }}" alt="" loading="lazy">{% endif %}
      <span class="essay-text">
        <span class="essay-date">{{ e.date | date: "%b %-d, %Y" }}</span>
        {% if en %}
          <span class="essay-title">{{ e.title_en | split: ":" | first }}</span>
          <span class="essay-desc">{{ e.summary_en }}</span>
        {% else %}
          <span class="essay-title">{{ e.title_zh | split: "：" | first }}</span>
          <span class="essay-desc">{{ e.summary_zh }}</span>
        {% endif %}
        <span class="essay-tags">
          {% for t in e.tags_en %}<span class="essay-tag">#{{ t }}</span>{% endfor %}
        </span>
      </span>
    </a>
  {% endfor %}
</div>
