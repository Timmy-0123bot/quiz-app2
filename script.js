// 問題データ（answer は choices の正解インデックス、0始まり）
const questions = [
  {
    question: "アイドルグループ・SKE48の元メンバーで、のちにAV女優としてデビューしたのは誰？",
    choices: ["三上悠亜", "紗倉まな", "蒼井そら", "波多野結衣"],
    answer: 0,
    explanation: "三上悠亜はSKE48の元メンバーで、2015年にAVデビューしました。"
  },
  {
    question: "小説『最低。』を書いたAV女優は誰？",
    choices: ["明日花キララ", "紗倉まな", "上原亜衣", "吉沢明歩"],
    answer: 1,
    explanation: "紗倉まなは作家としても活動しており、『最低。』は2017年に映画化されました。"
  },
  {
    question: "中国で絶大な人気を集め、「中国で最も有名な日本人の一人」ともいわれたのは誰？",
    choices: ["及川奈央", "三上悠亜", "蒼井そら", "紗倉まな"],
    answer: 2,
    explanation: "蒼井そらは中国のSNS・微博（ウェイボー）で非常に多くのフォロワーを集めました。"
  },
  {
    question: "自伝的小説『プラトニック・セックス』がベストセラーになり、タレントとしても活躍したのは誰？",
    choices: ["飯島愛", "及川奈央", "吉沢明歩", "小澤マリア"],
    answer: 0,
    explanation: "飯島愛はバラエティ番組でも人気を集め、『プラトニック・セックス』は2000年に出版されベストセラーになりました。"
  },
  {
    question: "「AV女優」の「AV」は何の略？",
    choices: ["オーディオ・ビジュアル", "アート・ビジュアル", "アダルトビデオ", "アニマルビデオ"],
    answer: 2,
    explanation: "「AV」はアダルトビデオの略です。オーディオ・ビジュアルも「AV」と略されるので、ひっかけでした。"
  }
];

const progressEl = document.getElementById("progress");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const scoreEl = document.getElementById("score");
const resultMessageEl = document.getElementById("result-message");
const retryButton = document.getElementById("retry-button");

// 不正解時の煽りフレーズ（ランダムで1つ表示）
const tauntMessages = [
  "え、それ選びます？",
  "はい残念〜。常識どこに置いてきました？",
  "自信満々で押しましたよね、今？",
  "それはさすがにないでしょ…",
  "おっと、その答えは予想外でした（悪い意味で）"
];

let currentIndex = 0;
let score = 0;

// クイズを最初から始める
const startQuiz = () => {
  currentIndex = 0;
  score = 0;
  resultScreen.hidden = true;
  quizScreen.hidden = false;
  showQuestion();
};

// 現在の問題を表示する
const showQuestion = () => {
  const current = questions[currentIndex];

  progressEl.textContent = `第${currentIndex + 1}問 / 全${questions.length}問`;
  questionEl.textContent = current.question;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextButton.hidden = true;
  choicesEl.innerHTML = "";

  current.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.textContent = choice;
    button.addEventListener("click", () => selectAnswer(index));
    choicesEl.appendChild(button);
  });
};

// 回答を判定してフィードバックを表示する
const selectAnswer = (selectedIndex) => {
  const current = questions[currentIndex];
  const buttons = choicesEl.querySelectorAll(".choice");
  const isCorrect = selectedIndex === current.answer;

  buttons.forEach((button) => {
    button.disabled = true;
  });
  buttons[current.answer].classList.add("correct");

  if (isCorrect) {
    score++;
    feedbackEl.textContent = `⭕ 正解！ ${current.explanation}`;
    feedbackEl.classList.add("correct");
  } else {
    buttons[selectedIndex].classList.add("incorrect");
    const taunt = tauntMessages[Math.floor(Math.random() * tauntMessages.length)];
    feedbackEl.textContent = `❌ ${taunt} 正解は「${current.choices[current.answer]}」。${current.explanation}`;
    feedbackEl.classList.add("incorrect");
  }

  const isLast = currentIndex === questions.length - 1;
  nextButton.textContent = isLast ? "結果を見る" : "次の問題へ";
  nextButton.hidden = false;
};

// 結果画面を表示する
const showResult = () => {
  quizScreen.hidden = true;
  resultScreen.hidden = false;
  scoreEl.textContent = `${questions.length}問中${score}問正解`;

  if (score === questions.length) {
    resultMessageEl.textContent = "全問正解？まあ、この程度は常識ですからね。ドヤ顔はまだ早いですよ？";
  } else if (score >= questions.length / 2) {
    resultMessageEl.textContent = "え、全問正解じゃないんですか？これ基本問題ですよ？";
  } else {
    resultMessageEl.textContent = "……本当に本気出しました？小学生からやり直しますか？";
  }
};

nextButton.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

retryButton.addEventListener("click", startQuiz);

startQuiz();
