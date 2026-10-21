// 問題データ（answer は choices の正解インデックス、0始まり）
const questions = [
  {
    question: "日本で一番高い山はどれ？",
    choices: ["北岳", "富士山", "槍ヶ岳", "御嶽山"],
    answer: 1,
    explanation: "富士山の標高は3,776mで、日本一高い山です。"
  },
  {
    question: "1気圧のもとで、水が沸騰する温度はおよそ何度？",
    choices: ["50℃", "80℃", "100℃", "120℃"],
    answer: 2,
    explanation: "1気圧のもとでは、水はおよそ100℃で沸騰します。"
  },
  {
    question: "北半球で、1年のうち昼の時間が最も長い日を何という？",
    choices: ["春分", "夏至", "秋分", "冬至"],
    answer: 1,
    explanation: "夏至は北半球で昼が最も長い日で、毎年6月21日ごろです。"
  },
  {
    question: "日本の国会を構成する2つの議院は、衆議院とどれ？",
    choices: ["貴族院", "元老院", "参議院", "枢密院"],
    answer: 2,
    explanation: "日本の国会は衆議院と参議院の二院制です。"
  },
  {
    question: "1年（365日）はおよそ何週間？",
    choices: ["48週", "50週", "52週", "54週"],
    answer: 2,
    explanation: "1年（365日）は52週と1日です。"
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
    resultMessageEl.textContent = "え、全問正解じゃないんですか？これ「一般常識」クイズですよ？";
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
