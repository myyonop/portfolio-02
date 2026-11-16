# JO EUN SU | Portfolio

> **Web Developer & Designer Portfolio · 2026**  
> 좋아하는 것을 만들고, 만든 것을 다시 좋아할 수 있도록.  
> 오늘도 조금씩 저만의 웹을 만들어가고 있습니다.

<br>

## 🔗 Preview

- **Live Site** : [Portfolio Website](https://portfolio-02-mauve.vercel.app)
- **GitHub** : [portfolio-01](https://github.com/myyonop/portfolio-01)

<br>

## 📌 Overview

개인 포트폴리오를 소개하기 위해 제작한 웹사이트입니다.

웹 개발과 디자인에 대한 관심을 바탕으로 저만의 분위기와 개성을 담은 포트폴리오를 구현했습니다.

미니멀한 레이아웃과 차분한 컬러를 중심으로 구성했으며, 섹션별 정보를 직관적으로 확인할 수 있도록 스크롤 인터랙션과 프로젝트 슬라이더를 적용했습니다.

### Design Concept

- **Minimal** : 불필요한 요소를 줄인 간결한 구성
- **Editorial** : 잡지와 에디토리얼 디자인에서 영감을 받은 레이아웃
- **Texture** : 노이즈 텍스처를 활용한 아날로그 감성
- **Interaction** : 자연스러운 전환 효과와 직관적인 사용자 경험

<br>

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 |
| Interaction | JavaScript |
| Font | Google Fonts |
| Deployment | Vercel |
| Version Control | Git & GitHub |

<br>

## ✨ Main Features

### 01. Section Indicator

페이지의 현재 위치를 시각적으로 확인할 수 있는 네비게이션입니다.

- HOME, ABOUT, SKILLS, PROJECTS 섹션으로 이동
- `IntersectionObserver`를 활용한 현재 섹션 감지
- 활성화된 섹션에 따른 메뉴 스타일 변경
- HOME 섹션에서는 인디케이터 자동 숨김
- 스크롤 위치에 따른 진행 바 업데이트

### 02. About Me

개인 프로필과 주요 이력을 소개하는 섹션입니다.

- 프로필 및 자기소개
- 학력 및 자격증
- 개인 성향 및 MBTI 정보
- CSS Grid와 Flexbox를 활용한 정보 배치

### 03. Skills & Tools

보유 기술과 작업 방식을 소개하는 섹션입니다.

**Skills**
- HTML / CSS
- JavaScript
- React / Next.js
- Responsive Web
- DOM Manipulation
- REST API / JSON
- Git / GitHub

**Tools**
- Visual Studio Code
- Figma
- GitHub
- Vercel

### 04. Project Slider

제작한 프로젝트를 하나씩 확인할 수 있는 슬라이더입니다.

- 이전 / 다음 버튼을 통한 프로젝트 이동
- 마지막 프로젝트에서 다음 버튼 클릭 시 첫 번째 프로젝트로 순환
- 첫 번째 프로젝트에서 이전 버튼 클릭 시 마지막 프로젝트로 순환
- CSS Transform을 활용한 슬라이드 전환
- 활성 프로젝트에 따른 투명도 변경
- 현재 페이지 및 전체 프로젝트 수 표시
- 브라우저 크기 변경 시 슬라이더 위치 자동 조정

### 05. Visual Design

사이트 전체의 통일된 디자인을 위한 시각적 요소입니다.

- CSS 변수를 활용한 컬러 시스템
- Google Fonts를 활용한 타이포그래피
- `clamp()`를 활용한 유동적인 글자 크기
- Radial Gradient를 활용한 메인 배경
- SVG Filter를 활용한 노이즈 텍스처
- Scroll Snap을 활용한 섹션 단위 스크롤

<br>

## ⚙️ Implementation

### 1. IntersectionObserver

현재 화면에 표시되는 섹션을 감지하여 네비게이션 상태를 변경합니다.

```javascript
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const currentId = entry.target.id;

            header.classList.toggle(
                "is-visible",
                currentId !== "home"
            );

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
```

각 섹션이 화면의 일정 비율 이상 보이면 현재 섹션을 감지하고, 해당 메뉴를 활성화합니다.

### 2. Scroll Progress

전체 문서의 스크롤 가능 높이와 현재 스크롤 위치를 계산하여 진행 바를 구현했습니다.

```javascript
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
```

스크롤 및 브라우저 크기 변경 이벤트에 대응하여 진행 상태를 업데이트합니다.

### 3. Project Slider

현재 프로젝트 인덱스를 기준으로 슬라이드 위치를 계산하고, CSS Transform을 이용해 프로젝트를 전환합니다.

```javascript
function updateSlider() {
    const windowWidth = projectWindow.clientWidth;

    projectTrack.style.transform =
        `translate3d(-${currentIndex * windowWidth}px, 0, 0)`;

    projectCards.forEach((card, index) => {
        card.classList.toggle(
            "active",
            index === currentIndex
        );
    });

    currentSlide.textContent =
        String(currentIndex + 1).padStart(2, "0");
}
```

다음 프로젝트와 이전 프로젝트 이동은 나머지 연산을 활용하여 무한 순환하도록 구현했습니다.

```javascript
// Next
currentIndex = (currentIndex + 1) % totalCount;

// Previous
currentIndex = (currentIndex - 1 + totalCount) % totalCount;
```

프로젝트 개수가 변경되더라도 별도의 인덱스 수정 없이 동작하도록 구성했습니다.

<br>

## 📁 Project Structure

```text
portfolio-01/
│
├── index.html       # 웹사이트 전체 구조
├── style.css        # 레이아웃 및 디자인 스타일
├── script.js        # 스크롤 및 슬라이더 인터랙션
│
└── README.md        # 프로젝트 소개 및 문서
```

<br>

## 🚀 Getting Started

별도의 패키지 설치 없이 브라우저에서 실행할 수 있습니다.

**1. Repository Clone**

```bash
git clone https://github.com/myyonop/portfolio-01.git
```

**2. Project Folder 이동**

```bash
cd portfolio-01
```

**3. Run**

`index.html` 파일을 브라우저에서 실행하거나 VS Code의 Live Server를 이용해 확인할 수 있습니다.

<br>

## 📚 What I Learned

이번 프로젝트를 통해 HTML, CSS, JavaScript를 활용한 개인 포트폴리오 제작 과정을 경험했습니다.

- CSS Grid와 Flexbox를 활용한 레이아웃 구성
- CSS Transition과 Transform을 활용한 애니메이션 구현
- IntersectionObserver를 활용한 스크롤 기반 인터랙션
- JavaScript를 활용한 슬라이더 상태 관리
- 브라우저 리사이즈에 대응하는 동적 레이아웃 처리
- CSS 변수와 시각적 요소를 활용한 디자인 시스템 구성

특히 원하는 디자인을 실제 웹 화면으로 구현하는 과정에서 레이아웃의 구조와 요소 간의 관계를 이해하고, 작은 디테일까지 조정하는 경험을 할 수 있었습니다.

<br>

## 🌱 Future Improvements

- 반응형 레이아웃 개선
- 프로젝트 상세 페이지 추가
- 프로젝트 이미지 및 콘텐츠 확장
- 다양한 인터랙션과 애니메이션 추가
- 접근성 및 사용자 경험 개선

<br>

---

<p align="center">
  **JO EUN SU**
  <br>
  Web Developer & Designer
  <br><br>
  © 2026 JO EUN SU. All Rights Reserved.
</p>
