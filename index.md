---
layout: home
permalink: /
---
<div class='case-studies-wrapper'>
  <h1>Case Studies</h1>
  {% for category in site.categories %}
  {% assign category_name = category | first %}
  <h3>{{ category_name | capitalize }}</h3>
    <div>
    {% for post in site.categories[category_name] %}
      <a href="{{ post.url }}">{{ post.title }}</a><br>
    {% endfor %}
    </div>
  {% endfor %}
</div>