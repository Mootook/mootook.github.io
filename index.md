---
layout: home
permalink: /
---
<div class='case-studies-wrapper'>
  <h1>Case Studies</h1>
  {% for category in site.categories %}
  {% assign category_name = category | first %}
  {% if category_name != "notes" %}
  <h3 class='category-list-header'>{{ category_name | capitalize }}</h3>
    {% for post in site.categories[category_name] %}
      <a href="{{ post.url }}">{{ post.title }}</a><br>
    {% endfor %}
  {% endif %}
  {% endfor %}
  <br>
  <h1>Notes</h1>
  {% for post in site.categories.notes %}
    <a href="{{ post.url }}">{{ post.title }}</a><br>
  {% endfor %}
</div>