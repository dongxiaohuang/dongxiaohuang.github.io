---
layout: page
title: 项目
permalink: /zh/projects/
description: 游戏数据、AI agent、教学与分享。
nav: false
categories_zh:
  - [work, 工作]
  - [teaching, 教学]
  - [talks, 分享]
---

<div class="projects">
{% for c in page.categories_zh %}
  <a id="{{ c[0] }}" href=".#{{ c[0] }}">
    <h2 class="category">{{ c[1] }}</h2>
  </a>
  {% assign items = site.pages | where: "zh_project", c[0] | sort: "importance" %}
  <div class="row row-cols-1 row-cols-md-3">
  {% for project in items %}
    <div class="col">
      <a href="{{ project.url | relative_url }}">
        <div class="card h-100 hoverable">
          {% if project.img %}
            {% include figure.liquid loading="eager" path=project.img sizes="250px" alt="project thumbnail" class="card-img-top" %}
          {% endif %}
          <div class="card-body">
            <h2 class="card-title">{{ project.title }}</h2>
            <p class="card-text">{{ project.description }}</p>
          </div>
        </div>
      </a>
    </div>
  {% endfor %}
  </div>
{% endfor %}
</div>

<script src="{{ '/assets/js/zh-nav.js' | relative_url }}"></script>
