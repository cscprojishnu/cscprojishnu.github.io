/* =========================================================
   JISHNU TEJA DANDAMUDI
   PORTFOLIO JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();

    initMobileNavigation();

    initTheme();

    initScrollProgress();

    initActiveNavigation();

    initRevealAnimations();

    initCounters();

    initProfileReveal();

    initResearchOrbit();

    initTypingEffect();

    initProjectFilters();

    initPublicationFilters();

    initBackToTop();

    initCopyEmail();

    initKeyboardAccessibility();

});



/* =========================================================
   PAGE LOADER
========================================================= */

function initLoader() {

    const loader =
        document.getElementById("pageLoader");

    if (!loader) return;


    const hideLoader = () => {

        loader.classList.add("loaded");

    };


    if (document.readyState === "complete") {

        setTimeout(hideLoader, 250);

    } else {

        window.addEventListener(
            "load",
            () => {

                setTimeout(
                    hideLoader,
                    250
                );

            },
            {
                once: true
            }
        );

    }


    /* Safety fallback */

    setTimeout(
        hideLoader,
        2500
    );

}



/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function initMobileNavigation() {

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");


    if (!menuToggle || !navLinks) return;


    const icon =
        menuToggle.querySelector("i");


    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                navLinks.classList.toggle("active");


            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            if (icon) {

                icon.classList.toggle(
                    "fa-bars",
                    !isOpen
                );

                icon.classList.toggle(
                    "fa-xmark",
                    isOpen
                );

            }

        }
    );


    navLinks
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    closeMobileNavigation();

                }
            );

        });


    document.addEventListener(
        "click",
        (event) => {

            const clickedInsideNav =
                navLinks.contains(event.target);

            const clickedMenu =
                menuToggle.contains(event.target);


            if (
                !clickedInsideNav &&
                !clickedMenu &&
                navLinks.classList.contains("active")
            ) {

                closeMobileNavigation();

            }

        }
    );


    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 950) {

                closeMobileNavigation();

            }

        }
    );


    function closeMobileNavigation() {

        navLinks.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        if (icon) {

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        }

    }

}



/* =========================================================
   THEME
========================================================= */

function initTheme() {

    const toggle =
        document.getElementById("themeToggle");


    if (!toggle) return;


    const icon =
        toggle.querySelector("i");


    const savedTheme =
        localStorage.getItem(
            "jtd-theme"
        );


    if (savedTheme === "light") {

        document.body.classList.add(
            "light-theme"
        );

    }


    updateThemeIcon();


    toggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-theme"
            );


            const isLight =
                document.body.classList.contains(
                    "light-theme"
                );


            localStorage.setItem(
                "jtd-theme",
                isLight
                    ? "light"
                    : "dark"
            );


            updateThemeIcon();

        }
    );


    function updateThemeIcon() {

        if (!icon) return;


        const isLight =
            document.body.classList.contains(
                "light-theme"
            );


        icon.classList.toggle(
            "fa-sun",
            !isLight
        );

        icon.classList.toggle(
            "fa-moon",
            isLight
        );

    }

}



/* =========================================================
   SCROLL PROGRESS
========================================================= */

function initScrollProgress() {

    const progress =
        document.getElementById(
            "scrollProgress"
        );


    if (!progress) return;


    let ticking = false;


    function updateProgress() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement
                .scrollHeight;

        const viewportHeight =
            window.innerHeight;


        const total =
            documentHeight -
            viewportHeight;


        const percentage =
            total > 0
                ? (scrollTop / total) * 100
                : 0;


        progress.style.width =
            `${percentage}%`;


        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateProgress
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );


    updateProgress();

}



/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections =
        Array.from(
            document.querySelectorAll(
                "main section[id]"
            )
        );


    const links =
        Array.from(
            document.querySelectorAll(
                ".nav-links a"
            )
        );


    if (
        !sections.length ||
        !links.length
    ) return;


    const linkMap =
        new Map();


    links.forEach((link) => {

        const href =
            link.getAttribute("href");


        if (
            href &&
            href.startsWith("#")
        ) {

            linkMap.set(
                href.substring(1),
                link
            );

        }

    });


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            links.forEach(
                                (link) => {

                                    link.classList.remove(
                                        "active"
                                    );

                                }
                            );


                            const activeLink =
                                linkMap.get(
                                    entry.target.id
                                );


                            if (activeLink) {

                                activeLink.classList.add(
                                    "active"
                                );

                            }

                        }

                    }
                );

            },
            {
                rootMargin:
                    "-30% 0px -60% 0px",
                threshold: 0
            }
        );


    sections.forEach(
        (section) => {

            observer.observe(
                section
            );

        }
    );

}



/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

function initRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!elements.length) return;


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        elements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;

    }


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            (entries, obs) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            obs.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: .12,
                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    elements.forEach(
        (element) => {

            observer.observe(
                element
            );

        }
    );

}



/* =========================================================
   COUNTERS
========================================================= */

function initCounters() {

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    if (!counters.length) return;


    const animateCounter =
        (counter) => {

            const target =
                Number(
                    counter.dataset.target
                );


            if (
                !Number.isFinite(target)
            ) return;


            const duration =
                1200;

            const start =
                performance.now();


            function update(
                currentTime
            ) {

                const elapsed =
                    currentTime -
                    start;


                const progress =
                    Math.min(
                        elapsed / duration,
                        1
                    );


                const eased =
                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );


                counter.textContent =
                    String(
                        Math.floor(
                            eased * target
                        )
                    );


                if (progress < 1) {

                    window.requestAnimationFrame(
                        update
                    );

                } else {

                    counter.textContent =
                        String(target);

                }

            }


            window.requestAnimationFrame(
                update
            );

        };


    if (
        !("IntersectionObserver" in window)
    ) {

        counters.forEach(
            (counter) => {

                counter.textContent =
                    counter.dataset.target;

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            (entries, obs) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounter(
                                entry.target
                            );

                            obs.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: .6
            }
        );


    counters.forEach(
        (counter) => {

            observer.observe(
                counter
            );

        }
    );

}



/* =========================================================
   PROFILE REVEAL
========================================================= */

function initProfileReveal() {

    const profile =
        document.getElementById(
            "profileReveal"
        );


    if (!profile) return;


    const reveal =
        () => {

            profile.classList.add(
                "is-revealed"
            );

        };


    profile.addEventListener(
        "mouseenter",
        reveal
    );


    profile.addEventListener(
        "click",
        reveal
    );


    profile.addEventListener(
        "touchstart",
        reveal,
        {
            passive: true
        }
    );

}



/* =========================================================
   RESEARCH ORBIT
========================================================= */

function initResearchOrbit() {

    const visual =
        document.querySelector(
            ".research-visual"
        );


    if (!visual) return;


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) return;


    const nodes =
        visual.querySelectorAll(
            ".orbit-node"
        );


    if (!nodes.length) return;


    let frame =
        null;


    visual.addEventListener(
        "pointermove",
        (event) => {

            const rect =
                visual.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const moveX =
                (x - centerX) / 50;


            const moveY =
                (y - centerY) / 50;


            if (frame) {

                cancelAnimationFrame(
                    frame
                );

            }


            frame =
                requestAnimationFrame(
                    () => {

                        nodes.forEach(
                            (node, index) => {

                                const multiplier =
                                    (index + 1) * .35;


                                node.style.translate =
                                    `${moveX * multiplier}px ${moveY * multiplier}px`;

                            }
                        );

                    }
                );

        }
    );


    visual.addEventListener(
        "pointerleave",
        () => {

            if (frame) {

                cancelAnimationFrame(
                    frame
                );

            }


            nodes.forEach(
                (node) => {

                    node.style.translate =
                        "0 0";

                }
            );

        }
    );

}



/* =========================================================
   TYPING EFFECT
========================================================= */

function initTypingEffect() {

    const element =
        document.getElementById(
            "typingText"
        );


    if (!element) return;


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) return;


    const words = [
        "see",
        "reason",
        "learn",
        "explain",
        "act"
    ];


    let wordIndex = 0;

    let characterIndex = 0;

    let deleting = false;


    function type() {

        const currentWord =
            words[wordIndex];


        if (!deleting) {

            characterIndex++;


            element.textContent =
                currentWord.substring(
                    0,
                    characterIndex
                );


            if (
                characterIndex >=
                currentWord.length
            ) {

                deleting = true;

                setTimeout(
                    type,
                    1500
                );

                return;

            }

        } else {

            characterIndex--;


            element.textContent =
                currentWord.substring(
                    0,
                    characterIndex
                );


            if (
                characterIndex <= 0
            ) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1) %
                    words.length;

            }

        }


        setTimeout(
            type,
            deleting ? 55 : 85
        );

    }


    setTimeout(
        type,
        1000
    );

}



/* =========================================================
   PROJECT FILTERS
========================================================= */

function initProjectFilters() {

    const buttons =
        document.querySelectorAll(
            ".project-filter"
        );


    const cards =
        document.querySelectorAll(
            ".project-card"
        );


    if (
        !buttons.length ||
        !cards.length
    ) return;


    buttons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    buttons.forEach(
                        (item) => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    const category =
                        button.dataset.category ||
                        "all";


                    cards.forEach(
                        (card) => {

                            const categories =
                                card.dataset.category ||
                                "";


                            const shouldShow =
                                category === "all" ||
                                categories
                                    .split(" ")
                                    .includes(
                                        category
                                    );


                            card.classList.toggle(
                                "hidden",
                                !shouldShow
                            );

                        }
                    );

                }
            );

        }
    );

}



/* =========================================================
   PUBLICATION FILTERS
========================================================= */

function initPublicationFilters() {

    const buttons =
        document.querySelectorAll(
            ".pub-filter"
        );


    const search =
        document.getElementById(
            "publicationSearch"
        );


    const items =
        document.querySelectorAll(
            ".publication-item"
        );


    const empty =
        document.getElementById(
            "publicationEmpty"
        );


    if (!items.length) return;


    let activeYear =
        "all";


    function filterPublications() {

        const query =
            search
                ? search.value
                    .trim()
                    .toLowerCase()
                : "";


        let visibleCount =
            0;


        items.forEach(
            (item) => {

                const year =
                    item.dataset.year ||
                    "";


                const text =
                    item.dataset.search ||
                    item.textContent ||
                    "";


                const matchesYear =
                    activeYear === "all" ||
                    year === activeYear;


                const matchesSearch =
                    !query ||
                    text
                        .toLowerCase()
                        .includes(query);


                const visible =
                    matchesYear &&
                    matchesSearch;


                item.style.display =
                    visible
                        ? ""
                        : "none";


                if (visible) {

                    visibleCount++;

                }

            }
        );


        if (empty) {

            empty.hidden =
                visibleCount !== 0;

        }

    }


    buttons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    buttons.forEach(
                        (item) => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    activeYear =
                        button.dataset.filter ||
                        "all";


                    filterPublications();

                }
            );

        }
    );


    if (search) {

        search.addEventListener(
            "input",
            filterPublications
        );

    }


    filterPublications();

}



/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );


    if (!button) return;


    function updateVisibility() {

        button.classList.toggle(
            "visible",
            window.scrollY > 500
        );

    }


    window.addEventListener(
        "scroll",
        updateVisibility,
        {
            passive: true
        }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    updateVisibility();

}



/* =========================================================
   COPY EMAIL
========================================================= */

function initCopyEmail() {

    const button =
        document.getElementById(
            "copyEmail"
        );


    const toast =
        document.getElementById(
            "toast"
        );


    if (!button) return;


    button.addEventListener(
        "click",
        async () => {

            const email =
                button.dataset.email;


            if (!email) return;


            try {

                if (
                    navigator.clipboard &&
                    navigator.clipboard.writeText
                ) {

                    await navigator.clipboard.writeText(
                        email
                    );

                } else {

                    fallbackCopy(
                        email
                    );

                }


                showToast(
                    "Email copied to clipboard."
                );

            } catch (error) {

                fallbackCopy(
                    email
                );

                showToast(
                    "Email address copied."
                );

            }

        }
    );


    function fallbackCopy(text) {

        const textarea =
            document.createElement(
                "textarea"
            );


        textarea.value =
            text;

        textarea.style.position =
            "fixed";

        textarea.style.opacity =
            "0";


        document.body.appendChild(
            textarea
        );


        textarea.select();


        try {

            document.execCommand(
                "copy"
            );

        } catch (error) {

            /* Ignore */

        }


        textarea.remove();

    }


    function showToast(message) {

        if (!toast) return;


        const span =
            toast.querySelector(
                "span"
            );


        if (span) {

            span.textContent =
                message;

        }


        toast.classList.add(
            "show"
        );


        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

    }

}



/* =========================================================
   KEYBOARD ACCESSIBILITY
========================================================= */

function initKeyboardAccessibility() {

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                const nav =
                    document.getElementById(
                        "navLinks"
                    );


                const menu =
                    document.getElementById(
                        "menuToggle"
                    );


                if (
                    nav &&
                    nav.classList.contains(
                        "active"
                    )
                ) {

                    nav.classList.remove(
                        "active"
                    );


                    if (menu) {

                        menu.setAttribute(
                            "aria-expanded",
                            "false"
                        );


                        const icon =
                            menu.querySelector(
                                "i"
                            );


                        if (icon) {

                            icon.classList.remove(
                                "fa-xmark"
                            );

                            icon.classList.add(
                                "fa-bars"
                            );

                        }

                    }

                }

            }

        }
    );

}
