---
layout: page
permalink: /news/
title: news
nav: true
nav_order: 3
---

<div class="news">
  {% if site.news != blank %}
    {% assign news_size = site.news | size %}
    <div class="table-responsive">
      <table class="table table-sm table-borderless">
        {% assign news = site.news | reverse %}
        {% for item in news %}
          <tr>
            <th scope="row" style="width: 20%">
              {% if item.start_date and item.end_date %}
                {% assign start_date = item.start_date | date: '%b %d' %}
                {% assign end_date = item.end_date | date: '%b %d, %Y' %}
                {{ start_date }} - {{ end_date }}
              {% else %}
                {{ item.date | date: '%b %d, %Y' }}
              {% endif %}
            </th>
            <td>
              {% if item.inline %}
                {{ item.content | remove: '<p>' | remove: '</p>' | emojify }}
              {% else %}
                <a class="news-title" href="{{ item.url | relative_url }}">{{ item.title }}</a>
              {% endif %}
              {% if item.location %}
                <br><small class="text-muted">{{ item.location }}</small>
              {% endif %}
            </td>
          </tr>
        {% endfor %}
      </table>
    </div>
  {% else %}
    <p>No news available yet.</p>
  {% endif %}
</div>