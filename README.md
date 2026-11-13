# Your library in 15 minutes

**Try it:** https://ajthakkar.github.io/osu-library-onboarding/

A prototype onboarding module that introduces first-year Ohio State students to University Libraries resources. It's designed to drop into the GE Launch Seminar, which nearly every new student takes.

Built by the BDAA Product Development Track team as part of our project with The Ohio State University Libraries on new-student awareness of library resources. **This is a student prototype, not an official University Libraries page.**

## What's in it

- **Before-you-start check:** students mark which of 12 resources they've already heard of. The end page compares this with what they've now seen, which doubles as a simple pre/post awareness measure.
- **Five short lessons (2–3 minutes each):**
  1. Where things are: Thompson, 18th Avenue, subject libraries, plus common myths
  2. Get help with research: Ask Us, A+ Research Coaching, subject librarians, guides
  3. Find and borrow: Libraries Search, databases, OhioLINK, Interlibrary Loan, course reserves
  4. Places to study: group study rooms, late-night hours, student org rooms
  5. Explore beyond class: special collections, workshops and events, Copyright Services, the Undergraduate Research Library Fellowship
- **A quick check after each lesson** with instant feedback.
- **An 8-question final check** (6 correct to pass). Missed questions link back to the lesson that covers them.
- **A toolkit page** with the key links, ready to print or save.

Progress is shown on a library "date due" card that gets stamped as each lesson is finished. Progress is saved in the browser on that device only. Nothing is sent anywhere.

## Run it

It's a static site with no build step. Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Edit the content

All lesson text, links, quiz questions and the toolkit live in `content.js`. Layout and behavior are in `styles.css` and `app.js`, and don't need to change when the content does.

Facts and links were checked against library.osu.edu and related Ohio State pages in November 2026. Hours, booking rules and program details change, so re-check before each semester.

## Design notes

- Colors follow Ohio State's primary palette from the BUX design system (Scarlet `#BA0C2F`, Gray `#A7B1B7`, white), plus one manila tone for the progress card.
- Fonts: Libre Franklin and Source Serif 4, self-hosted under the SIL Open Font License (see `/fonts`).
- Accessible by design: keyboard navigation, visible focus, screen-reader labels, and reduced-motion support.

## Ideas for a next version

- Embed in Carmen (Canvas) as a module page or SCORM package for GE Launch sections.
- Send pre-check and quiz results to a Qualtrics survey or Carmen quiz so the Libraries can measure awareness gaps across sections.
- Let instructors pick which lessons to include.
