// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 아바타
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(avatarImg);

  // 컨텐츠 제목, 타이틀, 정보
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);

  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);

  const contentInfo = document.createElement("div");
  contentInfo.className = "discussion__information";
  contentInfo.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString("ko-KR")}`;
  discussionContent.append(contentInfo);

  // 답변 여부에 따른 체크박스 유무
  const isAnswered = document.createElement("p");
  isAnswered.textContent = obj.answer ? "☑" : "◻︎";
  discussionAnswered.append(isAnswered);

  // 할당
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// form에 입력된 정보를 출력
const discussion = [];
const form = document.querySelector(".form");
const author = document.querySelector("#name");
const title = document.querySelector("#title");
const story = document.querySelector("#story");

// local storage
let agoraData = [...agoraStatesDiscussions];
const storedkey = JSON.parse(localStorage.getItem("key"));

if (storedkey === null) {
  localStorage.setItem("key", JSON.stringify(agoraData));
} else {
  agoraData = JSON.parse(localStorage.getItem("key"));
}

// submit event listener
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newDiscussion = {
    id: "",
    createdAt: Date().toLocaleString("ko-KR"),
    title: title.value,
    url: "",
    author: author.value,
    avatarUrl: "icon.png",
    bodyHTML: story.value,
    answer: null,
  };
  ul.prepend(convertToDiscussion(newDiscussion));

  agoraData.unshift(newDiscussion);
  localStorage.setItem("key", JSON.stringify(agoraData));
});

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraData.length; i += 1) {
    element.append(convertToDiscussion(agoraData[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
