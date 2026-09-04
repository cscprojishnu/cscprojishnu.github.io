/* =========================================================
   JISHNU TEJA DANDAMUDI
   RESEARCH PORTFOLIO JAVASCRIPT
   VERSION 2.0
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();

    initNavigation();

    initScrollProgress();

    initActiveNavigation();

    initRevealAnimations();

    initStatistics();

    initPublicationFilters();

    initPublicationSearch();

    initResearchOrbit();

    initProfileReveal();

    initBackToTop();

    initCopyright();

});


/* =========================================================
   PAGE LOADER
========================================================= */

function initLoader() {

    const loader =
        document.getElementById("pageLoader");

    if (!loader) return;


    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("loaded");

        }, 500);

    });

}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function initNavigation() {

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");

    if (!menuToggle || !navLinks) return;


    const icon =
        menuToggle.querySelector("i");


    menuToggle.addEventListener("click", () => {

        const isOpen =
            navLinks.classList.toggle("active");


        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );


        if (isOpen) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });


    navLinks
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    closeMobileNavigation();

                }
            );

        });


    document.addEventListener(
        "click",
        event => {

            const clickedInside =
                navLinks.contains(event.target) ||
                menuToggle.contains(event.target);


            if (
                !clickedInside &&
                navLinks.classList.contains("active")
            ) {

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


        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

}


/* =========================================================
   SCROLL PROGRESS + NAVBAR
========================================================= */

function initScrollProgress() {

    const progress =
        document.getElementById("scrollProgress");

    const navbar =
        document.getElementById("navbar");


    function updateScrollUI() {

        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const percentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;


        if (progress) {

            progress.style.width =
                `${percentage}%`;

        }


        if (navbar) {

            navbar.classList.toggle(
                "scrolled",
                scrollTop > 40
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateScrollUI,
        { passive: true }
    );


    updateScrollUI();

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const links =
        document.querySelectorAll(
            ".nav-links a"
        );


    if (!sections.length || !links.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const id =
                        entry.target.getAttribute("id");


                    links.forEach(link => {

                        link.classList.remove("active");


                        if (
                            link.getAttribute("href") ===
                            `#${id}`
                        ) {

                            link.classList.add("active");

                        }

                    });

                });

            },
            {
                rootMargin:
                    "-30% 0px -60% 0px",

                threshold: 0
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initRevealAnimations() {

    const revealElements =
        document.querySelectorAll(".reveal");


    if (!revealElements.length) {
        return;
    }


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(
        element => observer.observe(element)
    );

}


/* =========================================================
   STATISTICS COUNTER
========================================================= */

function initStatistics() {

    const counters =
        document.querySelectorAll(
            ".stat-number"
        );


    if (!counters.length) {
        return;
    }


    const animateCounter =
        element => {

            const target =
                Number(
                    element.dataset.target
                );


            if (!Number.isFinite(target)) {
                return;
            }


            const duration = 1300;

            const startTime =
                performance.now();


            function update(currentTime) {

                const elapsed =
                    currentTime -
                    startTime;


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


                element.textContent =
                    Math.floor(
                        eased * target
                    );


                if (progress < 1) {

                    requestAnimationFrame(
                        update
                    );

                } else {

                    element.textContent =
                        target;

                }

            }


            requestAnimationFrame(update);

        };


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        counters.forEach(
                            animateCounter
                        );


                        observer.disconnect();

                    }

                });

            },
            {
                threshold: 0.4
            }
        );


    const statsSection =
        document.querySelector(
            ".stats-section"
        );


    if (statsSection) {

        observer.observe(statsSection);

    }

}


/* =========================================================
   PUBLICATION FILTERS
========================================================= */

function initPublicationFilters() {

    const filterButtons =
        document.querySelectorAll(
            ".filter-btn"
        );


    const publications =
        document.querySelectorAll(
            ".publication-item"
        );


    if (
        !filterButtons.length ||
        !publications.length
    ) {
        return;
    }


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                button.classList.add("active");


                const filter =
                    button.dataset.filter;


                publications.forEach(
                    publication => {

                        const type =
                            publication.dataset.type;


                        const matches =
                            filter === "all" ||
                            type === filter;


                        publication.classList.toggle(
                            "hidden",
                            !matches
                        );

                    }
                );


                updatePublicationEmptyState();

            }
        );

    });

}


/* =========================================================
   PUBLICATION SEARCH
========================================================= */

function initPublicationSearch() {

    const searchInput =
        document.getElementById(
            "publicationSearch"
        );


    const publications =
        document.querySelectorAll(
            ".publication-item"
        );


    if (
        !searchInput ||
        !publications.length
    ) {
        return;
    }


    searchInput.addEventListener(
        "input",
        () => {

            const query =
                searchInput.value
                    .trim()
                    .toLowerCase();


            const activeFilter =
                document.querySelector(
                    ".filter-btn.active"
                );


            const filter =
                activeFilter
                    ? activeFilter.dataset.filter
                    : "all";


            publications.forEach(
                publication => {

                    const text =
                        (
                            publication.dataset.search ||
                            publication.textContent
                        ).toLowerCase();


                    const type =
                        publication.dataset.type;


                    const matchesSearch =
                        !query ||
                        text.includes(query);


                    const matchesFilter =
                        filter === "all" ||
                        type === filter;


                    publication.classList.toggle(
                        "hidden",
                        !(
                            matchesSearch &&
                            matchesFilter
                        )
                    );

                }
            );


            updatePublicationEmptyState();

        }
    );

}


/* =========================================================
   PUBLICATION EMPTY STATE
========================================================= */

function updatePublicationEmptyState() {

    const publications =
        document.querySelectorAll(
            ".publication-item"
        );


    const emptyState =
        document.getElementById(
            "noPublicationResults"
        );


    if (!emptyState) {
        return;
    }


    const visibleCount =
        Array.from(publications)
            .filter(
                publication =>
                    !publication.classList.contains(
                        "hidden"
                    )
            )
            .length;


    emptyState.style.display =
        visibleCount === 0
            ? "block"
            : "none";

}


/* =========================================================
   RESEARCH ORBIT INTERACTION
========================================================= */

function initResearchOrbit() {

    const visual =
        document.querySelector(
            ".research-visual"
        );


    if (!visual) {
        return;
    }


    const nodes =
        visual.querySelectorAll(
            ".orbit-node"
        );


    if (!nodes.length) {
        return;
    }


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reducedMotion) {
        return;
    }


    visual.addEventListener(
        "mousemove",
        event => {

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


            const offsetX =
                (x - centerX) / 30;


            const offsetY =
                (y - centerY) / 30;


            nodes.forEach(
                (node, index) => {

                    const multiplier =
                        (index + 1) * 0.08;


                    node.style.translate =
                        `${offsetX * multiplier}px ${offsetY * multiplier}px`;

                }
            );

        }
    );


    visual.addEventListener(
        "mouseleave",
        () => {

            nodes.forEach(node => {

                node.style.translate =
                    "0 0";

            });

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


    if (!profile) {
        return;
    }


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
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );


    if (!button) {
        return;
    }


    const toggleButton =
        () => {

            button.classList.toggle(
                "visible",
                window.scrollY > 600
            );

        };


    window.addEventListener(
        "scroll",
        toggleButton,
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


    toggleButton();

}


/* =========================================================
   FOOTER YEAR
========================================================= */

function initCopyright() {

    const copyright =
        document.querySelector(
            ".copyright"
        );


    if (!copyright) {
        return;
    }


    copyright.textContent =
        `© ${new Date().getFullYear()} Jishnu Teja Dandamudi`;

}
