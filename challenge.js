// const wordList = [["아보카도", "망치", "망고",  "반지", "여우", "앵무새", "교수", "대학생", "고양이", "연필", "오징어", "딸기", "스타벅스", "KFC", "콜라", "사이다", "노트북", "떡볶이", "김밥", "아령", "컴퓨터", "핫도그", "뉴발란스", "인공눈물", "맥도날드", "나루토", "유튜브", "미용실", "근손실", "치킨", "소", "에어팟", "한국외대", "월드콘", "웰시코기", "틀니", "입생로랑", "팬더", "버블티", "닌텐도스위치", "피자", "손목시계","병아리", "당근", "소맥", "생일", "사과","환자", "문신", "초밥", "피카츄", "게", "롯데리아", "사랑의 불시착", "고래", "개구리", "태극기", "그루트", "얼룩말", "삽살개", "딱따구리", "토끼", "전동킥보드", "소화기"],
//     ["다마고치", "엄마는외계인","아이언맨", "겨울왕국", "부(BOO)", "놀이공원", "조커", "해리포터", "동물의숲", "별의 커비", "슈퍼마리오", "아프니까 청춘이다", "닭가슴살", "엽기떡볶이", "치과", "스타워즈", "트랜스포머", "백종원", "깡", "노래방", "올리브영", "이마트", "밴드", "도서관", "스펀지밥", "뚱이", "징징이", "짱구", "펭수", "마라탕", "헐크", "카트라이더", "기생충(영화)", "보노보노", "뉴스", "검정고무신", "미운오리새끼", "빨간망토소녀", "백설공주", "신데렐라", "써브웨이", "신사임당", "분식", "너구리", "라라랜드", "레고", "미키마우스", "라따뚜이"]]; 

// const challengeBanner = document.querySelector(".challenge__banner"),
//     challengeBannerBtn = challengeBanner.querySelector(".challenge__Btn"),
//     challengeInfo = challengeBanner.querySelector(".challenge__info"),
//     challengeTime = challengeInfo.querySelector("select"),
//     challengeStartBtn = challengeInfo.querySelector(".challenge__start"),
//     challengeCloseBtn = challengeInfo.querySelector(".challenge__close"),
//     challengeMode = document.querySelector(".challenge--ing"),
//     challengeWord = challengeMode.querySelector(".keyword"),
//     challengeTimeStamp = challengeMode.querySelector(".timestamp"),
//     challengeClearBtn = challengeMode.querySelector(".challenge__clear"),
//     challengePassBtn = challengeMode.querySelector(".challenge__pass"),
//     challengeResult = challengeMode.querySelector(".challenge__result"),
//     challengeRetryTime = challengeResult.querySelector("select"),
//     challengeRetryBtn = challengeResult.querySelector("button"),
//     challengeQuitBtn = document.querySelector(".challenge__quit--big");


// let showChallengeInfo = false, // 챌린지가 무엇인지 소개하는 팝업을 보여줄지 여부
//     canDraw = true,// 챌린지가 진행중이지 않거나 아직 챌린지 시간이 종료되지 않은 상태인지 여부
//     count = 1; //여태까지 몇 번 challenge를 실행했는지 확인함

// function handleBannerBtnClick(event){
//     if (showChallengeInfo){
//         challengeInfo.style.display = "none";
//     } else{
//         challengeInfo.style.display = "block";
//     }
//     showChallengeInfo = !(showChallengeInfo);
// }

// function getRandomWord(timeLimit){
//     if (timeLimit >= 20000){
//         if(Math.floor(Math.random()*(wordList[0].length + wordList[1].length)) < wordList[0].length){
//             return wordList[0][Math.floor(Math.random()*(wordList[0].length))];
//         } else{
//             return wordList[1][Math.floor(Math.random()*(wordList[1].length))];
//         }
//     } else{
//         return wordList[0][Math.floor(Math.random()*(wordList[0].length))];
//     }
// }

// function hideChallengeBanner(){
//     showChallengeInfo = false;
//     challengeBannerBtn.style.display = "none";
//     challengeInfo.style.display = "none";
// }

// function getTimeLimit(isRetry){
//     if (isRetry){
//         return parseInt(challengeRetryTime.value) * 1000;
//     } else{
//         return parseInt(challengeTime.value) * 1000;
//     }
// }

// function formatTime(time){
//     return time < 10 ? `0${time}` : time;
// }

// function showChallengeQuitBtn(){
//     challengeQuitBtn.style.display = "flex";
// }

// function hideChallengeQuitBtn(){
//     challengeQuitBtn.style.display = "none";
// }

// function startChallenge(isRetry){
//     hideChallengeBanner();
//     showChallengeQuitBtn();
//     const nthChallenge = count++;
//     canDraw = true;
//     challengeMode.classList.remove("hide");
//     challengeTimeStamp.style.color = "black";
//     let timeLimit = getTimeLimit(isRetry);
//     challengeWord.innerText = getRandomWord(timeLimit);
//     let repeat = setInterval(function(){
//         if (nthChallenge != count-1){
//             return
//         }
//         const seconds = formatTime(parseInt(timeLimit/1000));
//         const miliseconds = formatTime(parseInt((timeLimit%1000)/10));
//         timeLimit -= 10;
//         if (seconds <= 10){
//             challengeTimeStamp.style.color = "red";
//             if (timeLimit <= 0){
//                 challengeTimeStamp.innerText = "TIMEOUT 💣";
//                 canDraw = false;
//                 clearInterval(repeat);
//                 setTimeout(function(){
//                     challengeResult.classList.remove("hide")
//                 }, 750);
//                 return 0;
//             }
//         }
//         challengeTimeStamp.innerText = `00:${seconds}:${miliseconds}`;
//     }, 10);
// }

// function clearChallenge(){
//     timeLimit = 0;
// }

// function hideRetryBtn(){
//     challengeResult.classList.add("hide")
// }

// function retryChallenge(event){
//     event.preventDefault();
//     hideRetryBtn();
//     startChallenge(true);
// }

// function quitChallenge(){
//     canDraw = true;
//     challengeBannerBtn.style.display = "flex";
//     challengeMode.classList.add("hide");
//     hideRetryBtn();
//     hideChallengeQuitBtn();

// }

// function init(){
//     challengeBannerBtn.addEventListener("click", handleBannerBtnClick);
//     challengeCloseBtn.addEventListener("click", handleBannerBtnClick);
//     challengeStartBtn.addEventListener("click", startChallenge);
//     challengeClearBtn.addEventListener("click", clearChallenge);
//     challengePassBtn.addEventListener("click", startChallenge);
//     challengeRetryBtn.addEventListener("click", retryChallenge);
//     challengeQuitBtn.addEventListener("click", quitChallenge);
// }

// init();