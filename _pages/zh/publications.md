---
layout: page
permalink: /zh/publications/
title: 研究
description: 知识增强的语言模型、游戏知识图谱和推荐方面的研究，以及在腾讯做游戏数据系统时申请的专利。论文原文为英文。
nav: false
---

<div class="publications">

<h2 class="pub-section" id="papers">论文</h2>

{% bibliography %}

<h2 class="pub-section" id="patents">专利</h2>

<ol class="bibliography patents">
{% for p in site.data.patents %}
  {% assign year = p.date | default: p.filed | date: "%Y" %}
  <li>
    <div class="row">
      <div class="col col-sm-2 abbr">
        <span class="patent-year">{{ year }}</span>
      </div>
      <div class="col-sm-8">
        <div class="title">{{ p.title_zh }}</div>
        {% if p.inventors_zh %}
          <div class="author">
            {% for n in p.inventors_zh %}{% if n == "黄东晓" %}<em>{{ n }}</em>{% else %}{{ n }}{% endif %}{% unless forloop.last %}，{% endunless %}{% endfor %}
          </div>
        {% endif %}
        <div class="periodical patent-meta">
          {% if p.url %}<a href="{{ p.url }}">{{ p.number }}</a><span class="sep">·</span>{% endif %}{% if p.status == "granted" %}{{ p.date | date: "%Y.%m.%d" }} 授权{% elsif p.status == "published" %}{{ p.date | date: "%Y.%m.%d" }} 公开{% else %}{{ p.filed | date: "%Y.%m" }} 提交{% endif %}<span class="sep">·</span>{{ p.assignee_zh }}
        </div>
      </div>
    </div>
  </li>
{% endfor %}
</ol>

</div>

<script src="{{ '/assets/js/zh-nav.js' | relative_url }}"></script>
