---
layout: page
title: "Projects"
author: marcoonroad
permalink: /projects/
foot-icons: false
analytics: true
---

<style>
    .github-project-name {
        font-weight: bold;
        font-size: 1.1em;
    }

    .github-project-item {
        /*
        display: inline-block;
        */
        padding-top: 0.75em;
        padding-bottom: 0.75em;
    }
    .github-project-item:last-of-type hr {
        display: none;
        visibility: none;
    }
    .github-project-topics li {
        display: inline-block;
        margin-left: 0.2em;
        margin-right: 0.2em;
        margin-top: 0.1em;
        margin-bottom: 0.1em;
        color: white;
        background-color: black;
        padding-left: 0.5em;
        padding-right: 0.5em;
        padding-bottom: 0.25em;
        padding-top: 0.25em;
        border-radius: 10px;
        font-size: 0.8em;
    }
    .github-project-topics li a,
    .github-project-topics li a:hover {
        text-transform: none;
        text-decoration: none;
        color: white;
    }
    .github-project-topics li:hover {
        opacity: 0.9;
    }
    .github-project-topics:first-child {
        margin-left: 0em;
    }
    .github-project-topics:last-child {
        margin-right: 0em;
    }
    .github-project-description {
        font-style: none;
    }
    ul.github-projects-list {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
</style>

<div class="github-projects-descriptions">
<ul class="github-projects-list">
{% assign projects = site.github-projects-descriptions | sort: 'name' %}
{% for project in projects %}
   {% assign name = project.name %}
   {% assign description = project.description %}
    <li id="github-project-{{ name }}" class="github-project-item">
        <span class="github-project-name">{{ name }}</span>
        (<a href="https://marcoonroad.dev/{{ name }}">docs</a> |
        <a href="https://github.com/marcoonroad/{{ name }}">repo</a>) <br/>
        <a href="https://github.com/marcoonroad/{{ name }}/stargazers">
            <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/marcoonroad/{{ name }}">
        </a>
        <!-- Stars :star: <span id="github-project-{{ name }}-stars">?</span> --> <span>{{ " " }}</span>
        <a href="https://github.com/marcoonroad/{{ name }}/watchers">
            <img alt="GitHub watchers" src="https://img.shields.io/github/watchers/marcoonroad/{{ name }}">
        </a>
        <!-- Watches :eye: <span id="github-project-{{ name }}-watches">?</span> --> <span>{{ " " }}</span>
        <a href="https://github.com/marcoonroad/{{ name }}/network/members">
            <img alt="GitHub forks" src="https://img.shields.io/github/forks/marcoonroad/{{ name }}">
        </a>
        <!-- Forks :fork_and_knife: <span id="github-project-{{ name }}-forks">?</span> --> <span>{{ " " }}</span>
        <a href="https://github.com/marcoonroad/{{ name }}/issues">
            <img alt="GitHub issues" src="https://img.shields.io/github/issues/marcoonroad/{{ name }}"/>
        </a>
        <span>{{ " " }}</span>
        <a href="https://github.com/marcoonroad/{{ name }}/pulse">
        <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/y/marcoonroad/{{ name }}"/>
        </a>
        <span>{{ " " }}</span>
        <a href="https://github.com/marcoonroad/{{ name }}/commits">
        <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/marcoonroad/{{ name }}"/>
        </a>
        <!-- Issues :information_source: <span id="github-project-{{ name }}-issues">?</span> --> <br/>
        <span id="github-project-{{ name }}-description" class="github-project-description">{{ description }}</span> <br/>
        <ul id="github-project-{{ name }}-topics" class="github-project-topics"></ul>
        <script>
            (async () => {
                /*
                let etag = localStorage.getItem('github-project-{{ name }}-etag');
                let modified = localStorage.getItem('github-project-{{ name }}-modified');
                let cached = localStorage.getItem('github-project-{{ name }}-cached') || '{}';
                const url = 'https://api.github.com/repos/marcoonroad/{{ name }}';
                const headers = {
                    'Accept': 'application/vnd.github.v3+json',
                };
                if (!!etag) {
                    headers['If-None-Match'] = '"' + etag + '"';
                }
                if (!!modified) {
                    headers['If-Modified-Since'] = modified;
                }
                const cache = 'default';
                const span = document.querySelector("#github-project-{{ name }}-description");
                let response = null;
                if (!span.innerText && !span.innerHTML) {
                    response = await fetch(url, { headers, cache });
                }
                let retries = 1;
                while (response != null && response.status == 403) {
                    if (retries > 3) {
                        response = null;
                        //span.innerHTML = '<span style="color: red">Failed to retrieve project description!</span>';
                        //return;
                        break;
                    }
                    await new Promise((resolve, reject) => {
                        setTimeout(() => resolve(true), 1000);
                    });
                    response = await fetch(url, { headers, cache });
                    retries += 1;
                }
                let json = {};
                if (response == null || response.status == 304 || retries > 3) {
                    json = JSON.parse(cached);
                }
                else {
                    json = await response.json();
                    cached = JSON.stringify(json);
                    etag = response.headers.get('etag');
                    modified = response.headers.get('last-modified');
                    if (etag.startsWith('"') || etag.endsWith('"')) {
                        etag = etag.replace(/"/g, '');
                    }
                    localStorage.setItem('github-project-{{ name }}-etag', etag);
                    localStorage.setItem('github-project-{{ name }}-cached', cached);
                    localStorage.setItem('github-project-{{ name }}-modified', modified);
                }
                if (json.description) {
                    let description = json.description
                        .split(' ')
                        .filter(word => !word.startsWith(':') && !word.endsWith(':'))
                        .join(' ');
                    span.innerText = description;
                }
                if (json.topics) {
                    const topics = document.querySelector("#github-project-{{ name }}-topics");
                    topics.innerHTML = topics.innerHTML || "";
                    for (let topic of json.topics) {
                        topics.innerHTML += '<li><a href="https://github.com/topics/' + topic + '">#' + topic + '</a></li>';
                    }
                }
                */
                //const forks = json.forks_count;
                //const issues = json.open_issues_count;
                //const stars = json.stargazers_count;
                //const watches = json.watchers_count;
                //document.querySelector("#github-project-{{ name }}-forks").innerText = forks;
                //document.querySelector("#github-project-{{ name }}-stars").innerText = stars;
                // document.querySelector("#github-project-{{ name }}-issues").innerText = issues;
                //document.querySelector("#github-project-{{ name }}-watches").innerText = watches;
            })().catch(console.error);
        </script>
        <br/>
        <hr/>
    </li>
{% endfor %}
</ul>
</div>
