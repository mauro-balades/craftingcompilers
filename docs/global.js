
const pages = {
    "": {
        title: "Home",
        description: "Welcome to crafting compilers!",
        home: true,
    },
    "introduction": {
        "about.html": {
            title: "About Elysian",
            description: "Learn about the Elysian programming language."
        },
    },
}

function renderSidebar(page, otherPages = []) {
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
    for (let innerPage in otherPages) {
        let newPage = page[innerPage];
        if (typeof newPage === "undefined") {
            continue;
        }
        let sidebarPage = document.createElement("li");
        sidebarPage.id = "sidebar-page";
        sidebarPage.innerHTML = newPage.title;
        sidebarPages.appendChild(sidebarPage);
    }
    sidebarContent.appendChild(sidebarPages);
    sidebar.appendChild(sidebarContent);
    document.body.appendChild(sidebar);
}

function renderPage(page, otherPages = []) {
    document.title = page.title;
    renderSidebar(page, otherPages);
    if (typeof window.pageContents !== "undefined") {
        let content = document.createElement("div");
        content.id = "content";
        var converter = new showdown.Converter(),
        html      = converter.makeHtml(window.pageContents);
        content.innerHTML = html;
        document.body.appendChild(content);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    let path = window.location.pathname.split("/");
    let inGithubPages = window.location.hostname == "github.io" || window.location.hostname == "github.dev";
    if (path.length == inGithubPages) {
        path = ["", ""];
    }

    let page = pages[path[2]];
    console.log(page)
    if (!page.home) {
        return renderPage(page[path[3]], page);
    } 
    return renderPage(page, []);
});
