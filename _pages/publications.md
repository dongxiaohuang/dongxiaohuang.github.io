---
layout: page
permalink: /publications/
title: Research
description: Research on knowledge-enhanced language models, game knowledge graphs, and recommendation, and patents from building games data systems at Tencent.
nav: true
nav_order: 2
---

<div class="publications">

<h2 class="pub-section" id="papers">Papers</h2>

{% bibliography %}

<h2 class="pub-section" id="patents">Patents</h2>

<ol class="bibliography patents">
{% for p in site.data.patents %}
  {% assign year = p.date | default: p.filed | date: "%Y" %}
  <li>
    <div class="row">
      <div class="col col-sm-2 abbr">
        <span class="patent-year">{{ year }}</span>
      </div>
      <div class="col-sm-8">
        <div class="title">{{ p.title_en }}</div>
        {% if p.inventors_en %}
          <div class="author">
            {% for n in p.inventors_en %}{% if n == "Dongxiao Huang" %}<em>{{ n }}</em>{% else %}{{ n }}{% endif %}{% unless forloop.last %}, {% endunless %}{% endfor %}
          </div>
        {% endif %}
        <div class="periodical patent-meta">
          {% if p.url %}<a href="{{ p.url }}">{{ p.number }}</a><span class="sep">·</span>{% endif %}{% if p.status == "granted" %}Granted {{ p.date | date: "%-d %b %Y" }}{% elsif p.status == "published" %}Published {{ p.date | date: "%-d %b %Y" }}{% else %}Filed {{ p.filed | date: "%b %Y" }}{% endif %}<span class="sep">·</span>{{ p.assignee_en }}
        </div>
      </div>
    </div>
  </li>
{% endfor %}
</ol>

</div>
