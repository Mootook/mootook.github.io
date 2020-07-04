---
layout: home
permalink: /
---
<div class='case-studies-wrapper'>
  <h1>Case Studies</h1>
  {% for category in site.categories %}
  {% assign category_name = category | first %}
  <h2>{{ category_name | capitalize }}</h2>
    <div>
    {% for post in site.categories[category_name] %}
      <a href="{{ post.url }}">{{ post.title }}</a>
    {% endfor %}
    </div>
  {% endfor %}
</div>