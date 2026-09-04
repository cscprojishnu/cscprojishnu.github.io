/* =========================================================
   JISHNU TEJA DANDAMUDI
   WEBSITE JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (navLinks.classList.contains("active")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });


    /* Close menu after clicking a navigation link */

    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        });

    });

}


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const sections = document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-links a");


function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(function (link) {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (href === "#" + currentSection) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


updateActiveNavigation();



/* =========================================================
   PUBLICATION ANIMATION
========================================================= */

const publicationItems =
    document.querySelectorAll(".publication-item");


const observerOptions = {

    threshold: 0.12

};


const publicationObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "publication-visible"
                    );

                }

            });

        },
        observerOptions
    );


publicationItems.forEach(function (item) {

    publicationObserver.observe(item);

});



/* =========================================================
   TIMELINE ANIMATION
========================================================= */

const timelineItems =
    document.querySelectorAll(".timeline-item");


const timelineObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "timeline-visible"
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


timelineItems.forEach(function (item) {

    timelineObserver.observe(item);

});



/* =========================================================
   RESEARCH ORBIT
========================================================= */

const researchVisual =
    document.querySelector(".research-visual");


if (researchVisual) {

    const nodes =
        researchVisual.querySelectorAll(".orbit-node");


    researchVisual.addEventListener(
        "mousemove",
        function (event) {

            const rect =
                researchVisual.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const moveX =
                (x - centerX) / 35;

            const moveY =
                (y - centerY) / 35;


            nodes.forEach(function (node, index) {

                const multiplier =
                    (index + 1) * 0.15;

                node.style.translate =
                    `${moveX * multiplier}px ${moveY * multiplier}px`;

            });

        }
    );


    researchVisual.addEventListener(
        "mouseleave",
        function () {

            nodes.forEach(function (node) {

                node.style.translate = "0 0";

            });

        }
    );

}



/* =========================================================
   RESUME / CV PLACEHOLDERS
========================================================= */

/*
   Once you upload your files to GitHub, change:

   resume.pdf
   cv.pdf

   to the exact names of your files.
*/


const resumeButton =
    document.getElementById("resumeDownload");


const cvButton =
    document.getElementById("cvDownload");


if (resumeButton) {

    resumeButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            alert(
                "Resume will be available here once the PDF is uploaded to the repository."
            );

        }
    );

}


if (cvButton) {

    cvButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            alert(
                "CV will be available here once the PDF is uploaded to the repository."
            );

        }
    );

}



/* =========================================================
   FOOTER YEAR
========================================================= */

const copyright =
    document.querySelector(".copyright");


if (copyright) {

    copyright.textContent =
        "© " +
        new Date().getFullYear() +
        " Jishnu Teja Dandamudi";

}
