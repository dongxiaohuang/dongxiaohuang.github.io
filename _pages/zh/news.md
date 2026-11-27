---
layout: page
title: 新闻
permalink: /zh/news/
nav: false
---

<div class="news">
  <div class="table-responsive">
    <table class="table table-sm table-borderless">
      {%- assign zh_news = site.news | where_exp: "n", "n.zh or n.zh_title" | sort: "date" | reverse -%}
      {%- for n in zh_news -%}
        <tr>
          <th scope="row" style="width: 20%">{{ n.date | date: "%Y.%m.%d" }}</th>
          <td>
            {%- if n.zh_title -%}<a class="news-title" href="{{ n.zh_url | relative_url }}">{{ n.zh_title }}</a>{%- else -%}{{ n.zh }}{%- endif -%}
          </td>
        </tr>
      {%- endfor -%}
    </table>
  </div>
</div>

<script src="{{ '/assets/js/zh-nav.js' | relative_url }}"></script>
