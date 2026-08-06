// ===========================
// Animated Counters
// ===========================

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target);

        let current = 0;
        const duration = 1800;
        const stepTime = 16;
        const increment = target / (duration / stepTime);

        const updateCounter = () => {
            current += increment;

            if (current >= target) {
                counter.textContent = target + "+";
                return;
            }

            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        };

        updateCounter();
        observer.unobserve(counter);

    });
}, {
    threshold: 0.5
});

counters.forEach((counter) => {
    observer.observe(counter);
});

// ===========================
// Back To Top
// ===========================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    const scrollPosition = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    if (scrollPosition + windowHeight >= pageHeight - 250) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ===========================
// 1. المتغيرات الأساسية (تعريف مرة واحدة فقط)
// ===========================
const reveals = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a"); // تم التعريف هنا ولن نكرره
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-links");

// ===========================
// 2. Scroll Reveal (ظهور العناصر عند النزول)
// ===========================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

reveals.forEach((section) => {
    revealObserver.observe(section);
});

// ===========================
// 3. Active Navbar (تغيير لون الرابط في القائمة)
// ===========================
window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// ===========================
// 4. Mobile Menu (قائمة الموبايل)
// ===========================
if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const icon = menuToggle.querySelector("i");

        if (icon) {
            if (navMenu.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }
    });
}

// إغلاق قائمة الموبايل عند الضغط على أي رابط
if (navLinks) {
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    });
}
