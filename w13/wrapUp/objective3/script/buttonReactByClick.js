const pages = document.querySelectorAll("section");
const btns = document.querySelectorAll(".pageBtn");
let lastBtn = null;
const pageBtnMap = new Map();

const setMap = () => {
  pages.forEach((eachPage, idx) => {
    pageBtnMap.set(eachPage, btns[idx]);
  });
};

setMap();

const scrollIntoView = (dom) => {
  // 부모 요소 선택
  const parentElem = dom.offsetParent;

  // 스크롤할 양을 계산하기 위해 자식 요소의 위치와 크기 정보 가져오기
  const childRect = dom.getBoundingClientRect();

  // 부모 요소의 위치와 크기 정보 가져오기
  const parentRect = parentElem.getBoundingClientRect();

  // 자식 요소가 완전히 보이도록 스크롤할 양 계산
  let scrollAmt;

  if (childRect.left < parentRect.left) {
    // 자식 요소가 부모 요소의 왼쪽을 벗어났을 때
    scrollAmt = childRect.left - parentRect.left - 32;
  } else if (childRect.right > parentRect.right) {
    // 자식 요소가 부모 요소의 오른쪽을 벗어났을 때
    scrollAmt = childRect.right - parentRect.right + 32;
  }

  // 스크롤할 양이 존재할 때만 스크롤 수행
  if (scrollAmt !== undefined && scrollAmt !== 0) {
    // 가로로 스크롤하기
    parentElem.scrollBy({
      top: 0,
      left: scrollAmt,
      behavior: "smooth", // 스크롤 애니메이션 적용 (선택 사항)
    });
  }
};

const interObsCallback = (obsTargets) => {
  obsTargets.forEach((eachObsTarget) => {
    if (eachObsTarget.isIntersecting) {
      const targetBtn = pageBtnMap.get(eachObsTarget.target);
      console.log(targetBtn);
      lastBtn?.classList.remove("pressed");
      targetBtn.classList.add("pressed");
      scrollIntoView(targetBtn);
      lastBtn = targetBtn;
    }
  });
};

const interObs = new IntersectionObserver(interObsCallback, {
  rootMargin: "50% 0px 50% 0px",
  threshold: [1],
});

pages.forEach((eachPage) => {
  interObs.observe(eachPage);
});