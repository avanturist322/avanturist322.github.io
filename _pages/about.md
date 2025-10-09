---
layout: about
title: about
permalink: /
# subtitle: <a href='#'>Affiliations</a>. Address. Contacts. Motto. Etc.
subtitle: Research Scientist (RL, Robotics)
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

Hello! I am researching memory in Reinforcement Learning and Robotics (specifically as it applies to transformer architectures). I am currently pursuing a PhD in this field.

<div class="social social-inline">
  <div class="contact-icons">{% include social.liquid %}</div>
</div>

<!-- Mini News Section -->
<div class="mini-news-section" style="margin: -3rem 0 2rem 0; padding: 1.5rem; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #007bff; max-width: 600px;">
  <h3 style="margin-top: 0; color: #333; font-size: 1.2rem;">📰 Latest Updates</h3>
  <div class="mini-news-container" style="max-height: 150px; overflow-y: auto;">
    {% if site.news != blank %}
      {% assign news = site.news | reverse %}
      {% for item in news %}
        <div class="mini-news-item" style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e9ecef;">
          <div class="mini-news-date" style="font-size: 0.85rem; color: #6c757d; font-weight: 500; margin-bottom: 0.5rem;">
            {% if item.start_date and item.end_date %}
              {% assign start_date = item.start_date | date: '%b %d' %}
              {% assign end_date = item.end_date | date: '%b %d, %Y' %}
              {{ start_date }} - {{ end_date }}
            {% else %}
              {{ item.date | date: '%b %d, %Y' }}
            {% endif %}
          </div>
          <div class="mini-news-content" style="font-size: 0.9rem; line-height: 1.4;">
            {% if item.inline %}
              {{ item.content | remove: '<p>' | remove: '</p>' | emojify }}
            {% else %}
              <a href="{{ item.url | relative_url }}" style="text-decoration: none; color: #007bff;">{{ item.title }}</a>
            {% endif %}
            {% if item.location %}
              <br><small style="color: #6c757d; font-size: 0.75rem;">{{ item.location }}</small>
            {% endif %}
          </div>
        </div>
      {% endfor %}
    {% else %}
      <p style="font-size: 0.9rem; color: #6c757d; font-style: italic;">No news updates yet...</p>
    {% endif %}
  </div>
  <div style="margin-top: 1rem; text-align: right;">
    <a href="/news/" style="font-size: 0.85rem; color: #007bff; text-decoration: none;">View all news →</a>
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
      <div class="news-item-full" style="margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid #e9ecef;">
        <div class="news-date-full" style="font-size: 0.9rem; color: #6c757d; font-weight: 500; margin-bottom: 0.75rem;">
          {% if item.start_date and item.end_date %}
            {% assign start_date = item.start_date | date: '%b %d' %}
            {% assign end_date = item.end_date | date: '%b %d, %Y' %}
            {{ start_date }} - {{ end_date }}
          {% else %}
            {{ item.date | date: '%b %d, %Y' }}
          {% endif %}
        </div>
        <div class="news-content-full" style="font-size: 0.95rem; line-height: 1.5;">
          {% if item.inline %}
            {{ item.content | remove: '<p>' | remove: '</p>' | emojify }}
          {% else %}
            <a href="{{ item.url | relative_url }}" style="text-decoration: none; color: #007bff; font-weight: 500;">{{ item.title }}</a>
          {% endif %}
          {% if item.location %}
            <br><small class="text-muted" style="font-size: 0.85rem;">{{ item.location }}</small>
          {% endif %}
        </div>
      </div>
    {% endfor %}
  {% else %}
    <p style="font-size: 0.95rem; color: #6c757d; font-style: italic;">No news updates yet...</p>
  {% endif %}
</div>

{% endtab %}

{% tab content Media %}

## Talks & Media Appearances
TBD

<!-- Most of the talks and sources are in my native language - Russian.

**2025** - [Talk](#) at AIRI summer school about Latent Action Models and their limitations, based on my ICML 2025 paper.

**2024** - [Short talk](#) at AIRI about XLand-MiniGrid, which was accepted to NeurIPS 2024.

**2024** - [Blog](#) post about XLand-100B dataset, largest to date in in-context RL.

**2024** - Short Forbes [interview](#), about my story and the research for which I won the Yandex ML Prize ([video in russian](#)).

**2023** - Democratizing Meta-RL Research talk presenting XLand-MiniGrid library ([video in russian](#)) -->

{% endtab %}

{% endtabs %}
