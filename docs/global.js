
const IS_GITHUB = window.location.hostname == "github.io" || window.location.hostname == "github.dev";
const HOME = "/docs";
const pages = {
    "": {
        _type: "page",
        title: "Home",
        description: "Welcome to crafting compilers!",
        home: true,
        url: `${HOME}/`
    },
    "intro": {
        _type: "dir",
        title: "Introduction",
        "about.html": {
            title: "About Elysian",
            description: "Learn about the Elysian programming language.",
            url: `${HOME}/intro/about.html`,
        },
    },
}

function renderSidebarPage(page) {
    if (page._type == "dir") {
        let sidebarPage = document.createElement("li");
        sidebarPage.classList.add("section");
        sidebarPage.innerHTML = page.title;
        document.getElementById("sidebar-pages").appendChild(sidebarPage);
        for (let innerPage in page) {
            if (innerPage == "_type") {
                continue;
            }
            renderSidebarPage(page[innerPage]);
        }
        return;
    }
    if (typeof page.title === "undefined" || typeof page.url === "undefined") {
        return;
    }
    let sidebarPage = document.createElement("li");
    let sidebarPageTitle = document.createElement("a");
    sidebarPageTitle.href = page.url;
    sidebarPageTitle.innerHTML = page.title;
    sidebarPage.appendChild(sidebarPageTitle);
    let sidebarPageDescription = document.createElement("p");
    sidebarPageDescription.innerHTML = page.description;
    sidebarPage.appendChild(sidebarPageDescription);
    document.getElementById("sidebar-pages").appendChild(sidebarPage);
}

function renderSidebar(page) {
    let sidebar = document.createElement("div");
    sidebar.id = "sidebar";
    let sidebarContent = document.createElement("div");
    sidebarContent.id = "sidebar-content";
    let sidebarTitle = document.createElement("h1");
    sidebarTitle.id = "sidebar-title";
    sidebarTitle.innerHTML = "Crafting Compilers";
    sidebarContent.appendChild(sidebarTitle);
    let sidebarDescription = document.createElement("p");
    sidebarDescription.id = "sidebar-description";
    sidebarDescription.innerHTML = "A guide to crafting compilers.";
    sidebarContent.appendChild(sidebarDescription);
    let sidebarPages = document.createElement("ul");
    sidebarPages.id = "sidebar-pages";
    sidebarContent.appendChild(sidebarPages);
    sidebar.appendChild(sidebarContent);
    document.body.appendChild(sidebar);
    for (let innerPage in pages) {
        renderSidebarPage(pages[innerPage]);
    }
}

function initializeHighlights() {
    // Insert style sheets and run scripts
    let highlight = document.createElement("link");
    highlight.rel = "stylesheet";
    highlight.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css";
    document.head.appendChild(highlight);
    let highlightScript = document.createElement("script");
    highlightScript.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js";
    document.head.appendChild(highlightScript);
    const languages = ["python", "typescript", "javascript", "llvm"];
    for (let language of languages) {
        let languageScript = document.createElement("script");
        languageScript.src = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/${language}.min.js`;
        document.head.appendChild(languageScript);
    }
    highlightScript.onload = () => {
        document.querySelectorAll("pre code").forEach((block) => {
            hljs.highlightBlock(block);
        });
    };
}

function renderPage(page) {
    document.title = page.title;
    renderSidebar(page);
    if (typeof window.pageContents !== "undefined") {
        let content = document.createElement("div");
        content.id = "content";
        var converter = new showdown.Converter(),
        html      = converter.makeHtml(window.pageContents);
        content.innerHTML = html;
        document.body.appendChild(content);
    }
    initializeHighlights();
}

window.addEventListener("DOMContentLoaded", () => {
    let path = window.location.pathname.split("/");
    if (path.length == IS_GITHUB) {
        path = ["", ""];
    }

    let page = pages[path[2]];
    if (!page.home) {
        return renderPage(page[path[3]], page);
    } 
    return renderPage(page, []);
});
