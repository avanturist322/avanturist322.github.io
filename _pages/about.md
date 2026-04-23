---
layout: about
title: about
permalink: /
# subtitle: <a href='#'>Affiliations</a>. Address. Contacts. Motto. Etc.
subtitle: Research Scientist (RL, VLA, Robotics)
tabs: true

profile:
  align: right
  image: profile_photo.png
  image_circular: false # crops the image to make it circular
  # more_info: >
  #   <p>555 your office number</p>
  #   <p>123 your address street</p>
  #   <p>Your City, State 12345</p>

selected_papers: false # includes a list of papers marked as "selected={true}"
move_social_buttons: false # includes social icons right after the subtitle
social: false # includes social icons at the bottom of the page

announcements:
  enabled: false # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

<!-- Current status — edit the text inside .current-status__text; remove whole block to hide. -->
<div class="current-status">
  <span class="current-status__label">Currently</span>
  <span class="current-status__text">🇧🇷 Attending ICLR 2026 in Rio de Janeiro</span>
</div>

Hello! I am a PhD researcher studying memory mechanisms in reinforcement learning and embodied robotics, with a focus on transformer-based sequence models for long-horizon, partially observable tasks.

<!-- Project pages: [KAGEBench](/KAGEBench/). -->

<div class="social social-inline">
  <div class="contact-icons">{% include social.liquid %}</div>
</div>

<!-- Mini News Section -->
<div class="mini-news-section">
  <h3>📰 Latest Updates</h3>
  <div class="mini-news-container">
    {% if site.news != blank %}
      {% assign news = site.news | reverse %}
      {% for item in news %}
        <div class="mini-news-item">
          <div class="mini-news-date">
            {% if item.start_date and item.end_date %}
              {% assign start_date = item.start_date | date: '%b %d' %}
              {% assign end_date = item.end_date | date: '%b %d, %Y' %}
              {{ start_date }} - {{ end_date }}
            {% else %}
              {{ item.date | date: '%b %d, %Y' }}
            {% endif %}
          </div>
          <div class="mini-news-content">
            {% if item.inline %}
              {{ item.content | remove: '<p>' | remove: '</p>' | emojify }}
            {% else %}
              <a href="{{ item.url | relative_url }}">{{ item.title }}</a>
            {% endif %}
            {% if item.location %}
              <br><small>{{ item.location }}</small>
            {% endif %}
          </div>
        </div>
      {% endfor %}
    {% else %}
      <p style="font-style: italic; color: var(--global-text-color-light);">No news updates yet...</p>
    {% endif %}
  </div>
  <div class="mini-news-footer">
    <a href="/news/">View all news →</a>
  </div>
</div>

{% tabs content %}

{% tab content Research %}

<div class="publications">
{% bibliography %}
</div>

{% endtab %}

{% tab content News %}

<div class="news-section-full">
  {% if site.news != blank %}
    {% assign news = site.news | reverse %}
    {% for item in news %}
      <div class="news-item-full" style="margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--global-divider-color);">
        <div class="news-date-full" style="font-size: 0.9rem; color: var(--global-text-color-light); font-weight: 500; margin-bottom: 0.75rem;">
          {% if item.start_date and item.end_date %}
            {% assign start_date = item.start_date | date: '%b %d' %}
            {% assign end_date = item.end_date | date: '%b %d, %Y' %}
            {{ start_date }} - {{ end_date }}
          {% else %}
            {{ item.date | date: '%b %d, %Y' }}
          {% endif %}
        </div>
        <div class="news-content-full" style="font-size: 0.95rem; line-height: 1.5; color: var(--global-text-color);">
          {% if item.inline %}
            {{ item.content | remove: '<p>' | remove: '</p>' | emojify }}
          {% else %}
            <a href="{{ item.url | relative_url }}" style="text-decoration: none; color: var(--global-theme-color); font-weight: 500;">{{ item.title }}</a>
          {% endif %}
          {% if item.location %}
            <br><small style="color: var(--global-text-color-light); font-size: 0.85rem;">{{ item.location }}</small>
          {% endif %}
        </div>
      </div>
    {% endfor %}
  {% else %}
    <p style="font-size: 0.95rem; color: var(--global-text-color-light); font-style: italic;">No news updates yet...</p>
  {% endif %}
</div>

{% endtab %}

{% tab content Media %}

## Talks & Media Appearances

| Date       | Language | Venue   | Title                                                                                              | Link                                                                    |
| ---------- | -------- | ------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 22.03.2026 | Russian  | Offline | [ROS Meetup '26](https://rosmeetup.ru/) talk on "Memory mechanisms in VLA models"                                           | TBA                                   |
| 26.12.2025 | Russian  | Online  | Embodied AI Reading Club talk on VLA models with memory                                            | TBA                                                                     |
| 04.12.2025 | Russian  | Online  | AIRI "ИИшнница" talk on my papers, accepted to NeurIPS-2025: RATE and "Memory, Benchmark & Robots" | [YouTube](https://www.youtube.com/live/frxpTdPPucg)                     |
| 21.11.2025 | Russian  | Offline | AIJ-2025 Deep Dive live talk on "Memory, Benchmark & ​​Robots"                                     | TBA                                                                     |
| 13.11.2025 | Russian  | Online  | Seminar of the Center for Cognitive Modeling "Memory and Transformers in Reinforcement Learning"   | [YouTube](https://www.youtube.com/live/DWp3072ZLDY?si=fkO9Os3fBXsylory) |

{% endtab %}

{% endtabs %}
