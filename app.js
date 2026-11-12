(function () {
  "use strict";

  var M = window.MODULE;
  var KEY = "ul-launch-module-v1";
  var LESSONS = M.lessons;
  var STAMPED_STEPS = LESSONS.map(function (l) { return l.id; }).concat(["quiz"]);
  var STAMP_TILT = [-7, 4, -3, 6, -5, 3];

  var main = document.getElementById("main");
  var slip = document.getElementById("progress");
  var freshStamp = null;

  /* ---------- state ---------- */

  function blankState() {
    return { stamps: {}, precheck: null, checks: {}, quiz: { i: 0, answers: [], finished: false } };
  }

  function load() {
    try {
      var saved = JSON.parse(window.localStorage.getItem(KEY));
      if (saved && saved.stamps) {
        var s = blankState();
        s.stamps = saved.stamps || {};
        s.precheck = saved.precheck || null;
        s.checks = saved.checks || {};
        s.quiz = saved.quiz || s.quiz;
        return s;
      }
    } catch (e) { /* storage unavailable; keep progress in memory only */ }
    return blankState();
  }

  var state = load();

  function save() {
    try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  function stamp(id) {
    if (!state.stamps[id]) {
      var d = new Date();
      state.stamps[id] = d.getDate() + " " + d.toLocaleString("en-US", { month: "short" });
      freshStamp = id;
      save();
    }
  }

  /* ---------- helpers ---------- */

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Stable shuffle so answer order doesn't change between visits.
  function order(n, seedText) {
    var seed = 0;
    for (var i = 0; i < seedText.length; i++) seed = (seed * 31 + seedText.charCodeAt(i)) >>> 0;
    var idx = [];
    for (var j = 0; j < n; j++) idx.push(j);
    for (var k = n - 1; k > 0; k--) {
      seed = (seed * 1103515245 + 12345) >>> 0;
      var r = seed % (k + 1);
      var t = idx[k]; idx[k] = idx[r]; idx[r] = t;
    }
    return idx;
  }

  var EXT_ICON = '<svg class="ext" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M4.5 2.5h-2v7h7v-2M7 2.5h2.5V5M9.5 2.5 5.5 6.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function extLink(href, text, cls) {
    return '<a class="' + (cls || "") + '" href="' + esc(href) + '" target="_blank" rel="noopener">' +
      esc(text) + EXT_ICON + '<span class="visually-hidden"> (opens in a new tab)</span></a>';
  }

  function stampHTML(id, tiltIndex) {
    var date = state.stamps[id];
    if (!date) return "";
    var cls = "stamp" + (freshStamp === id ? " is-new" : "");
    return '<span class="' + cls + '" style="--tilt:' + STAMP_TILT[tiltIndex % STAMP_TILT.length] + 'deg">' +
      '<span class="stamp__word">Done</span><span class="stamp__date">' + esc(date) + "</span>" +
      '<span class="visually-hidden">, completed</span></span>';
  }

  function stampedCount() {
    return STAMPED_STEPS.filter(function (id) { return state.stamps[id]; }).length;
  }

  function go(route) {
    if (location.hash === "#" + route) render();
    else location.hash = route;
  }

  /* ---------- progress card ---------- */

  function renderSlip(route) {
    var rows = [{ id: "welcome", num: "", title: "Start here", stampable: false }];
    LESSONS.forEach(function (l, i) { rows.push({ id: l.id, num: String(i + 1), title: l.short, stampable: true, tilt: i }); });
    rows.push({ id: "quiz", num: "", title: "Final check", stampable: true, tilt: 5 });
    rows.push({ id: "done", num: "", title: "Your toolkit", stampable: false });

    var html = '<div class="slip">' +
      '<div class="slip__head"><p class="slip__title">' + esc(M.title) + '</p>' +
      '<p class="slip__sub">' + esc(M.course) + "</p></div>" +
      '<div class="slip__cols" aria-hidden="true"><span>Lesson</span><span>Stamped</span></div>' +
      '<ol class="slip__rows">';

    rows.forEach(function (r) {
      var current = r.id === route ? ' aria-current="step"' : "";
      var extra = r.stampable ? "" : " slip-row--plain";
      html += '<li class="slip__item' + extra + '"><a class="slip-row" href="#' + r.id + '"' + current + ">" +
        '<span class="slip-row__num">' + esc(r.num) + "</span>" +
        '<span class="slip-row__title">' + esc(r.title) + "</span>" +
        '<span class="slip-row__stamp">' + (r.stampable ? stampHTML(r.id, r.tilt) : "") + "</span>" +
        "</a></li>";
    });

    html += "</ol>" +
      '<p class="slip__count">' + stampedCount() + " of " + STAMPED_STEPS.length + " stamped</p></div>";
    slip.innerHTML = html;
  }

  /* ---------- welcome ---------- */

  function renderWelcome() {
    var checked = state.precheck || [];
    var total = LESSONS.reduce(function (sum, l) { return sum + l.minutes; }, 0) + 2;
    var items = M.checklist.map(function (c) {
      var on = checked.indexOf(c.id) > -1 ? " checked" : "";
      return '<li><label class="pick"><input type="checkbox" name="precheck" value="' + esc(c.id) + '"' + on + ">" +
        "<span>" + esc(c.label) + "</span></label></li>";
    }).join("");

    var started = stampedCount() > 0;
    var resumeTarget = nextUnstamped();

    main.innerHTML =
      '<p class="lesson__meta">Start here</p>' +
      '<h1 id="page-title">Your library, in 15 minutes</h1>' +
      '<div class="prose">' +
      "<p>Ohio State's University Libraries do a lot more than lend books. In this module you'll find out where to get research help, how to borrow almost anything for free, where to study late, and a few things many students don't discover until much later.</p>" +
      "</div>" +
      '<ul class="overview">' +
      "<li><strong>Five short lessons</strong><span>Two or three minutes each</span></li>" +
      "<li><strong>A quick check after each</strong><span>One question to try what you learned</span></li>" +
      "<li><strong>A final check</strong><span>Eight questions; get six right to finish</span></li>" +
      "</ul>" +
      '<form class="precheck" id="precheck">' +
      '<fieldset><legend><span class="precheck__title">Before you start: which of these have you heard of?</span>' +
      '<span class="precheck__hint">Check any that sound familiar. There are no wrong answers, and at the end we\'ll show you what\'s new to you.</span></legend>' +
      '<ul class="precheck__list">' + items + "</ul></fieldset>" +
      '<div class="lesson-nav lesson-nav--start">' +
      '<button type="submit" class="btn btn--primary">' + (started ? "Save and continue" : "Start lesson 1") + "</button>" +
      (started ? '<p class="lesson-nav__note">You\'ll pick up at ' + esc(labelFor(resumeTarget)) + ".</p>" : "") +
      "</div></form>";

    document.getElementById("precheck").addEventListener("submit", function (e) {
      e.preventDefault();
      var boxes = main.querySelectorAll('input[name="precheck"]:checked');
      state.precheck = Array.prototype.map.call(boxes, function (b) { return b.value; });
      save();
      go(started ? resumeTarget : LESSONS[0].id);
    });
  }

  function nextUnstamped() {
    for (var i = 0; i < STAMPED_STEPS.length; i++) if (!state.stamps[STAMPED_STEPS[i]]) return STAMPED_STEPS[i];
    return "done";
  }

  function labelFor(route) {
    if (route === "quiz") return "the final check";
    if (route === "done") return "your toolkit";
    var i = indexOfLesson(route);
    return "lesson " + (i + 1);
  }

  function indexOfLesson(id) {
    for (var i = 0; i < LESSONS.length; i++) if (LESSONS[i].id === id) return i;
    return -1;
  }

  /* ---------- lessons ---------- */

  function renderSections(sections) {
    return sections.map(function (s) {
      if (s.type === "records") {
        return '<section class="block"><h2>' + esc(s.heading) + '</h2><ul class="records">' +
          s.items.map(function (r) {
            var fields = (r.fields || []).map(function (f) {
              return "<div><dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd></div>";
            }).join("");
            return '<li class="record"><h3 class="record__name">' + esc(r.name) + "</h3>" +
              '<p class="record__summary">' + esc(r.summary) + "</p>" +
              (fields ? '<dl class="record__fields">' + fields + "</dl>" : "") +
              (r.link ? '<p class="record__link-wrap">' + extLink(r.link.href, r.link.text, "record__link") + "</p>" : "") +
              "</li>";
          }).join("") + "</ul></section>";
      }
      if (s.type === "myths") {
        return '<section class="block"><h2>' + esc(s.heading) + "</h2>" +
          (s.lead ? '<p class="block__lead">' + esc(s.lead) + "</p>" : "") +
          '<div class="myths">' + s.items.map(function (m) {
            return '<details class="myth"><summary><span class="myth__tag">Myth</span>' +
              '<span class="myth__text">' + esc(m.myth) + "</span>" +
              '<span class="myth__toggle" aria-hidden="true"></span></summary>' +
              '<p class="myth__fact"><span class="myth__tag myth__tag--true">Actually</span>' + esc(m.fact) + "</p></details>";
          }).join("") + "</div></section>";
      }
      return "";
    }).join("");
  }

  function optionsHTML(q, seed, chosen, groupName) {
    var ord = order(q.options.length, seed);
    var answered = chosen !== undefined && chosen !== null;
    return '<div class="options" role="group" aria-labelledby="' + groupName + '-q">' +
      ord.map(function (oi, pos) {
        var o = q.options[oi];
        var cls = "option";
        var mark = "";
        if (answered) {
          if (o.correct) { cls += " is-correct"; mark = '<span class="visually-hidden"> (correct answer)</span>'; }
          else if (oi === chosen) { cls += " is-wrong"; mark = '<span class="visually-hidden"> (your answer)</span>'; }
          else cls += " is-muted";
        }
        return '<button type="button" class="' + cls + '" data-option="' + oi + '"' + (answered ? " disabled" : "") + ">" +
          '<span class="option__letter" aria-hidden="true">' + "ABCD".charAt(pos) + "</span>" +
          '<span class="option__text">' + esc(o.text) + mark + "</span></button>";
      }).join("") + "</div>";
  }

  function feedbackHTML(q, chosen) {
    if (chosen === undefined || chosen === null) return "";
    var right = !!q.options[chosen].correct;
    return '<p class="feedback ' + (right ? "feedback--right" : "feedback--wrong") + '">' +
      "<strong>" + (right ? "That's right." : "Not quite.") + "</strong> " + esc(q.explain) + "</p>";
  }

  function renderLesson(lesson) {
    var i = indexOfLesson(lesson.id);
    var next = i < LESSONS.length - 1 ? LESSONS[i + 1].id : "quiz";
    var prev = i > 0 ? LESSONS[i - 1].id : "welcome";
    var chosen = state.checks[lesson.id];

    main.innerHTML =
      '<p class="lesson__meta">Lesson ' + (i + 1) + " of " + LESSONS.length + ", about " + lesson.minutes + " minutes</p>" +
      '<h1 id="page-title">' + esc(lesson.title) + "</h1>" +
      '<div class="prose">' + lesson.intro.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>" +
      renderSections(lesson.sections) +
      '<section class="check" aria-labelledby="check-title">' +
      '<h2 id="check-title" class="check__title">Quick check</h2>' +
      '<p class="check__question" id="check-q">' + esc(lesson.check.question) + "</p>" +
      '<div id="check-body">' + optionsHTML(lesson.check, lesson.id, chosen, "check") + "</div>" +
      '<div role="status" id="check-feedback">' + feedbackHTML(lesson.check, chosen) + "</div>" +
      "</section>" +
      '<nav class="lesson-nav" aria-label="Lesson navigation">' +
      '<a class="btn btn--secondary" href="#' + prev + '">' + (prev === "welcome" ? "Back to start" : "Previous lesson") + "</a>" +
      '<button type="button" class="btn btn--primary" id="continue">' +
      (next === "quiz" ? "Finish and go to the final check" : "Finish lesson " + (i + 1)) + "</button>" +
      "</nav>";

    bindOptions(document.getElementById("check-body"), function (oi) {
      state.checks[lesson.id] = oi;
      save();
      document.getElementById("check-body").innerHTML = optionsHTML(lesson.check, lesson.id, oi, "check");
      document.getElementById("check-feedback").innerHTML = feedbackHTML(lesson.check, oi);
    });

    document.getElementById("continue").addEventListener("click", function () {
      stamp(lesson.id);
      go(next);
    });
  }

  function bindOptions(container, onPick) {
    container.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-option]");
      if (!btn || btn.disabled) return;
      onPick(parseInt(btn.getAttribute("data-option"), 10));
    });
  }

  /* ---------- final check ---------- */

  function quizScore() {
    return state.quiz.answers.reduce(function (n, a, i) {
      return n + (M.quiz.questions[i].options[a] && M.quiz.questions[i].options[a].correct ? 1 : 0);
    }, 0);
  }

  function renderQuiz() {
    var Q = M.quiz.questions;
    if (state.quiz.finished) return renderResults();

    var i = Math.min(state.quiz.i, Q.length - 1);
    var q = Q[i];
    var chosen = state.quiz.answers[i];
    var answered = chosen !== undefined && chosen !== null;
    var pct = Math.round(((i + (answered ? 1 : 0)) / Q.length) * 100);
    var last = i === Q.length - 1;

    main.innerHTML =
      '<p class="lesson__meta">Final check, ' + Q.length + " questions, about 2 minutes</p>" +
      '<h1 id="page-title">Show what you know</h1>' +
      '<div class="prose"><p>Answer at least ' + M.quiz.passScore + " of " + Q.length +
      " correctly to finish the module. You can retake it as many times as you like.</p></div>" +
      '<section class="check check--quiz" aria-labelledby="quiz-q">' +
      '<div class="quiz-progress"><p class="quiz-progress__label">Question ' + (i + 1) + " of " + Q.length + "</p>" +
      '<div class="quiz-progress__bar" aria-hidden="true"><span style="width:' + pct + '%"></span></div></div>' +
      '<p class="check__question" id="quiz-q">' + esc(q.question) + "</p>" +
      '<div id="quiz-body">' + optionsHTML(q, "quiz-" + i, chosen, "quiz") + "</div>" +
      '<div role="status" id="quiz-feedback">' + feedbackHTML(q, chosen) + "</div>" +
      '<div class="quiz-next">' + (answered
        ? '<button type="button" class="btn btn--primary" id="quiz-next">' + (last ? "See my results" : "Next question") + "</button>"
        : "") + "</div>" +
      "</section>";

    bindOptions(document.getElementById("quiz-body"), function (oi) {
      state.quiz.answers[i] = oi;
      save();
      renderQuiz();
      var nextBtn = document.getElementById("quiz-next");
      if (nextBtn) nextBtn.focus();
    });

    var nextBtn = document.getElementById("quiz-next");
    if (nextBtn) nextBtn.addEventListener("click", function () {
      if (last) {
        state.quiz.finished = true;
        if (quizScore() >= M.quiz.passScore) stamp("quiz");
      } else {
        state.quiz.i = i + 1;
      }
      save();
      render();
    });
  }

  function renderResults() {
    var Q = M.quiz.questions;
    var score = quizScore();
    var passed = score >= M.quiz.passScore;

    var review = Q.map(function (q, i) {
      var a = state.quiz.answers[i];
      var right = q.options[a] && q.options[a].correct;
      var correct = q.options.filter(function (o) { return o.correct; })[0];
      var li = indexOfLesson(q.lesson);
      return '<li class="review__item ' + (right ? "is-right" : "is-wrong") + '">' +
        '<p class="review__q"><span class="review__mark">' + (right ? "Correct" : "Missed") + "</span>" + esc(q.question) + "</p>" +
        (right ? "" : '<p class="review__a">You chose: ' + esc(q.options[a] ? q.options[a].text : "no answer") + "<br>" +
          "Answer: " + esc(correct.text) + "</p>" +
          (li > -1 ? '<p class="review__link"><a href="#' + q.lesson + '">Review lesson ' + (li + 1) + "</a></p>" : "")) +
        "</li>";
    }).join("");

    main.innerHTML =
      '<p class="lesson__meta">Final check results</p>' +
      '<h1 id="page-title">' + (passed ? "You passed the final check" : "Almost there") + "</h1>" +
      '<div class="score"><p class="score__num">' + score + '<span> of ' + Q.length + "</span></p>" +
      '<p class="score__msg">' + (passed
        ? "Nice work. Your module card is stamped, and your toolkit of links is ready."
        : "You need " + M.quiz.passScore + " correct to finish. Look over what you missed below, then try again.") + "</p></div>" +
      '<nav class="lesson-nav" aria-label="Results navigation">' +
      '<button type="button" class="btn btn--secondary" id="retake">Retake the final check</button>' +
      (passed ? '<a class="btn btn--primary" href="#done">See your library toolkit</a>' : "") +
      "</nav>" +
      '<section class="block"><h2>Your answers</h2><ul class="review">' + review + "</ul></section>";

    document.getElementById("retake").addEventListener("click", function () {
      state.quiz = { i: 0, answers: [], finished: false };
      save();
      render();
    });
  }

  /* ---------- toolkit (end page) ---------- */

  function renderDone() {
    var pre = state.precheck;
    var total = M.checklist.length;
    var compare = "";
    if (pre) {
      var newOnes = M.checklist.filter(function (c) { return pre.indexOf(c.id) === -1; });
      compare = '<div class="compare"><p class="compare__line">Before you started, you had heard of <strong>' +
        pre.length + " of " + total + "</strong> of these resources. Now you've seen all " + total + ".</p>" +
        (newOnes.length ? '<p class="compare__sub">New to you:</p><ul class="compare__list">' +
          newOnes.map(function (c) { return "<li>" + esc(c.label) + "</li>"; }).join("") + "</ul>" : "") +
        "</div>";
    }

    var notDone = state.stamps.quiz ? "" :
      '<p class="notice">You haven\'t passed the final check yet. <a href="#quiz">Take the final check</a> to finish the module.</p>';

    main.innerHTML =
      '<p class="lesson__meta">Your library toolkit</p>' +
      '<h1 id="page-title">' + (state.stamps.quiz ? "You finished the module" : "Your library toolkit") + "</h1>" +
      notDone +
      '<div class="prose"><p>Save these links somewhere you\'ll find them in week ten, when the paper is due and the textbook is expensive. When in doubt, start with Ask Us.</p></div>' +
      compare +
      '<section class="block"><h2>Links to keep</h2><ul class="toolkit">' +
      M.toolkit.map(function (t) {
        return "<li>" + extLink(t.href, t.label, "toolkit__link") + '<span class="toolkit__note">' + esc(t.note) + "</span></li>";
      }).join("") + "</ul></section>" +
      '<nav class="lesson-nav" aria-label="Toolkit actions">' +
      '<a class="btn btn--secondary" href="#welcome">Back to start</a>' +
      '<button type="button" class="btn btn--primary" id="print">Print or save these links</button>' +
      "</nav>";

    document.getElementById("print").addEventListener("click", function () { window.print(); });
  }

  /* ---------- router ---------- */

  function currentRoute() {
    var r = (location.hash || "#welcome").slice(1);
    if (r === "welcome" || r === "quiz" || r === "done" || indexOfLesson(r) > -1) return r;
    return "welcome";
  }

  function render() {
    var route = currentRoute();
    if (route === "welcome") renderWelcome();
    else if (route === "quiz") renderQuiz();
    else if (route === "done") renderDone();
    else renderLesson(LESSONS[indexOfLesson(route)]);
    renderSlip(route);
    document.body.setAttribute("data-route", route);
    freshStamp = null;
  }

  var firstRender = true;
  window.addEventListener("hashchange", function () {
    render();
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  });

  /* ---------- reset (two-step, no browser dialogs) ---------- */

  var resetBtn = document.getElementById("reset");
  var resetArmed = false;
  resetBtn.addEventListener("click", function () {
    if (!resetArmed) {
      resetArmed = true;
      resetBtn.textContent = "Select again to erase your progress";
      setTimeout(function () { resetArmed = false; resetBtn.textContent = "Start over"; }, 4000);
      return;
    }
    resetArmed = false;
    resetBtn.textContent = "Start over";
    state = blankState();
    try { window.localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
    go("welcome");
  });

  render();
  if (firstRender) firstRender = false;
})();
