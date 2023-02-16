let currentAnchorTag = document.querySelector(`a[href="${window.location.pathname}"`)

const routes = {
    "404": {
        title: "404 Page",
        path: "/pages/404.html"
    },
    "/": {
        title: "Home Page",
        path: "/pages/index.html"
    },
    "/about": {
        title: "About Page",
        path: "/pages/about.html"
    },
    "/contact": {
        title: "Contact Page",
        path: "/pages/contact.html"
    },
}

const route = (event) => {
    event = event || window.event
    event.preventDefault()

    if (event.target.href.endsWith(window.location.pathname)) {
        return
    }

    if (currentAnchorTag) {
        currentAnchorTag.classList.remove("active")
    }
    currentAnchorTag = event.target

    window.history.pushState({}, "", event.target.href)
    handleLocation()
}

const handleLocation = async () => {
    const currentPath = window.location.pathname
    const currentRoute = routes[currentPath] || routes[404]
    const html = await fetch(currentRoute.path).then((data) => data.text())

    document.getElementById("main-page").innerHTML = html
    document.title = currentRoute.title
    currentAnchorTag.classList.add("active")
}

window.onpopstate = handleLocation
window.route = route

handleLocation()
