// 01. Section Indicator

const sections = document.querySelectorAll(".home, .about, .skills, .projects, .footer");

const indicatorLinks = document.querySelectorAll(".indicator-link");

const progressBar = document.querySelector(
    ".indicator-progress"
);

const header = document.querySelector(".header");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const currentId = entry.target.id;

            // Home에서는 인디케이터 숨기기
            header.classList.toggle(
                "is-visible",
                currentId !== "home"
            );

            // 현재 섹션에 맞춰 메뉴 활성화
            indicatorLinks.forEach((link) => {
                link.classList.toggle(
                    "active",
                    link.dataset.section === currentId
                );
            });
        });
    },
    {
        threshold: 0.5
    }
);

sections.forEach((section) => {
    observer.observe(section);
});


// =========================
// 02. Scroll Progress
// =========================

function updateProgress() {
    const documentHeight =
        document.documentElement.scrollHeight;

    const viewportHeight = window.innerHeight;

    const scrollableHeight =
        documentHeight - viewportHeight;

    const scrollTop = window.scrollY;

    const progress =
        scrollableHeight > 0
            ? (scrollTop / scrollableHeight) * 100
            : 0;

    progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateProgress);
window.addEventListener("resize", updateProgress);

updateProgress();


// =========================
// 03. Project Slider
// =========================

const projectTrack = document.querySelector(".project-track");
const projectWindow = document.querySelector(".project-window");
const projectCards = document.querySelectorAll(".project-card");

const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

const currentSlide = document.querySelector(".current-slide");
const totalSlides = document.querySelector(".total-slides");

let currentIndex = 0;

if (
    projectTrack &&
    projectWindow &&
    projectCards.length > 0 &&
    prevButton &&
    nextButton &&
    currentSlide &&
    totalSlides
) {
    const totalCount = projectCards.length;

    totalSlides.textContent = String(totalCount).padStart(2, "0");

    // 슬라이더 업데이트
    function updateSlider() {
        const windowWidth = projectWindow.clientWidth;

        // 현재 인덱스에 해당하는 프로젝트로 이동
        projectTrack.style.transform =
            `translate3d(-${currentIndex * windowWidth}px, 0, 0)`;

        // 활성 프로젝트 표시
        projectCards.forEach((card, index) => {
            card.classList.toggle("active", index === currentIndex);
        });

        // 페이지 번호 업데이트
        currentSlide.textContent =
            String(currentIndex + 1).padStart(2, "0");
    }

    // 다음 버튼: 마지막에서 처음으로
    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % totalCount;
        updateSlider();
    });

    // 이전 버튼: 처음에서 마지막으로
    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + totalCount) % totalCount;
        updateSlider();
    });

    // 브라우저 크기 변경 대응
    window.addEventListener("resize", updateSlider);

    // 최초 실행
    updateSlider();
}


/* =========================================
   04. 페이지별 등장 애니메이션
========================================= */

document.documentElement.classList.add("has-js");

const animatedSections = document.querySelectorAll(
    ".home, .about, .skills, .projects, .footer"
);

const animationObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-inview");
            } else {
                // 화면에서 벗어나면 초기화
                // 다시 진입할 때 애니메이션 재생
                entry.target.classList.remove("is-inview");
            }
        });
    },
    {
        threshold: 0.15,
        rootMargin: "-5% 0px -5% 0px"
    }
);

animatedSections.forEach((section) => {
    animationObserver.observe(section);
});
