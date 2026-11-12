/*
  All module text lives here so the team (or the Libraries) can edit it
  without touching the layout code. Facts were checked against
  library.osu.edu and related Ohio State pages in November 2026.
  Hours and services change, so re-check before each semester.
*/

window.MODULE = {
  title: "Your library in 15 minutes",
  course: "GE Launch Seminar",

  // Shown on the welcome page. Matches the resources taught in the lessons
  // so the end page can show a before-and-after comparison.
  checklist: [
    { id: "askus", label: "Ask Us help (desk, chat, phone, email)" },
    { id: "coaching", label: "A+ Research Coaching with a peer coach" },
    { id: "subject", label: "Appointments with a subject librarian" },
    { id: "search", label: "Libraries Search and research databases" },
    { id: "ohiolink", label: "OhioLINK and Interlibrary Loan" },
    { id: "reserves", label: "Textbooks on course reserve" },
    { id: "rooms", label: "Group study room reservations" },
    { id: "late", label: "Overnight study at 18th Avenue Library" },
    { id: "special", label: "Special collections, like the Billy Ireland Cartoon Library & Museum" },
    { id: "events", label: "Free workshops, exhibits and events" },
    { id: "copyright", label: "Copyright Services" },
    { id: "urlf", label: "The paid Undergraduate Research Library Fellowship" }
  ],

  lessons: [
    {
      id: "lesson-1",
      short: "Where things are",
      title: "The library is bigger than you think",
      minutes: 2,
      intro: [
        "Many students arrive knowing two things about the library: you can study there, and you can borrow books. Both are true. But University Libraries is a whole network of buildings, experts and services, and almost all of it is free to you as a student.",
        "This first lesson shows you where things are. The rest of the module covers what you can do once you get there."
      ],
      sections: [
        {
          type: "records",
          heading: "Where to go",
          items: [
            {
              name: "Thompson Library",
              summary: "The main library, on the Oval at 1858 Neil Avenue Mall. Home of the Ask Us Desk, group study rooms, exhibits and most of the general collection.",
              fields: [["Good for", "Getting help in person, studying between classes, finding books"]],
              link: { href: "https://library.osu.edu/locations", text: "Check Thompson's hours" }
            },
            {
              name: "18th Avenue Library",
              summary: "At 175 West 18th Avenue, near the engineering and science buildings. During the semester it stays open overnight for most of the week, and you need a current BuckID between midnight and 7 a.m.",
              fields: [["Good for", "Late-night studying, especially around midterms and finals"]],
              link: { href: "https://library.osu.edu/locations/18th", text: "Check 18th Avenue's hours" }
            },
            {
              name: "Subject libraries",
              summary: "Smaller libraries built around a field: Architecture, Fine Arts, Music & Dance, Geology, Health Sciences, Law, Veterinary Medicine, and the FAES Library & Student Success Center. Regional campuses (Lima, Mansfield, Marion, Newark and Wooster) have their own libraries too.",
              fields: [["Good for", "Quieter study spots and collections for your major"]],
              link: { href: "https://library.osu.edu/locations", text: "See all locations and hours" }
            }
          ]
        },
        {
          type: "myths",
          heading: "Four things students often get wrong",
          lead: "Select each statement to see what's actually true.",
          items: [
            {
              myth: "Librarians only help you find books.",
              fact: "Librarians and trained peer coaches help you pick a topic, find good sources and cite them. Lesson 2 covers how to book them."
            },
            {
              myth: "If Ohio State doesn't own a book, you can't get it.",
              fact: "OhioLINK and Interlibrary Loan bring books and articles from other libraries to you, free. That's in lesson 3."
            },
            {
              myth: "You have to buy every textbook.",
              fact: "Many course textbooks are on reserve at the library, so you can borrow them for a few hours at a time for free."
            },
            {
              myth: "Special collections are only for professors.",
              fact: "The Billy Ireland Cartoon Library & Museum's galleries and reading room are free and open to everyone, including first-year students."
            }
          ]
        }
      ],
      check: {
        question: "It's 1 a.m. during midterms and Thompson Library is closed. Where can you keep studying?",
        options: [
          { text: "18th Avenue Library, with your BuckID", correct: true },
          { text: "The Billy Ireland Cartoon Library & Museum" },
          { text: "Nowhere; all campus libraries close at midnight" },
          { text: "The Research Commons" }
        ],
        explain: "18th Avenue Library stays open overnight for most of the week during the semester. Bring your BuckID, because it's required between midnight and 7 a.m."
      }
    },

    {
      id: "lesson-2",
      short: "Get research help",
      title: "Get help with research",
      minutes: 3,
      intro: [
        "You don't need a polished question to ask the library for help. Walking up to the Ask Us Desk and saying “I don't know where to start” is a perfectly good way to begin.",
        "There are four main ways to get help, from a quick question to a full appointment."
      ],
      sections: [
        {
          type: "records",
          heading: "Ways to get help",
          items: [
            {
              name: "Ask Us",
              summary: "Your first stop for any library question. Staff can point you to sources, explain a service or connect you with the right expert.",
              fields: [
                ["In person", "Ask Us Desk, first floor of Thompson Library"],
                ["Online", "Chat, an email form, and an FAQ that's available any time"],
                ["Phone", "614-292-8463"]
              ],
              link: { href: "https://library.osu.edu/askus", text: "Open Ask Us" }
            },
            {
              name: "A+ Research Coaching",
              summary: "One-on-one sessions with a trained peer research coach, in person at Thompson Library or online. Coaches help you develop a research question, find sources and cite them.",
              fields: [
                ["How to book", "In OnCourse, choose Schedule Appointment, then Academic Discovery and Success, then Service, then University Libraries A+ Research Coaching"]
              ],
              link: { href: "https://library.osu.edu/a-research-coaching", text: "Learn about research coaching" }
            },
            {
              name: "Subject librarians",
              summary: "Librarians who specialize in a field, like business, engineering, history or nursing. Fill out a short form and a librarian will contact you to set up a time.",
              fields: [
                ["Short on time?", "If your assignment is due within two working days, call Ask Us at 614-292-8463 instead of using the form"]
              ],
              link: { href: "https://library.osu.edu/subject-librarian-request", text: "Request a subject librarian" }
            },
            {
              name: "Subject and course guides",
              summary: "Starting points put together by librarians for each major, and for many specific courses. Search for your course number to see if it has one.",
              fields: [["Good for", "Finding the right databases and sources for a class assignment"]],
              link: { href: "https://guides.osu.edu", text: "Browse the guides" }
            }
          ]
        }
      ],
      check: {
        question: "Your GE Launch assignment asks for three credible sources, and you're not sure how to narrow your topic. It's due next week. What's a good first step?",
        options: [
          { text: "Book an A+ Research Coaching session or ask a subject librarian", correct: true },
          { text: "Use the first three results from a web search" },
          { text: "Wait until the night before and email your instructor" },
          { text: "Buy a textbook on the topic" }
        ],
        explain: "Research coaches and subject librarians help with exactly this: turning a broad topic into a research question and finding credible sources. With a week to go, there's time to book an appointment."
      }
    },

    {
      id: "lesson-3",
      short: "Find and borrow",
      title: "Find and borrow almost anything",
      minutes: 3,
      intro: [
        "Ohio State's own collection is huge, but you're not limited to it. If something isn't here, the library can usually get it for you, and you won't pay for it.",
        "Off campus, sign in with your Ohio State name.# and password when a library site or database asks."
      ],
      sections: [
        {
          type: "records",
          heading: "Find it",
          items: [
            {
              name: "Libraries Search",
              summary: "One search box for books, e-books and other materials across all Ohio State libraries and OhioLINK.",
              fields: [["Good for", "Finding a specific book, or seeing what the library has on a topic"]],
              link: { href: "https://search.library.osu.edu", text: "Open Libraries Search" }
            },
            {
              name: "Research databases",
              summary: "Specialized search tools for scholarly articles, data and news, organized by subject. Your instructor or a subject guide can tell you which ones fit your class.",
              fields: [["Good for", "Peer-reviewed articles and sources you won't find with a regular web search"]],
              link: { href: "https://guides.osu.edu/databases", text: "Browse research databases" }
            }
          ]
        },
        {
          type: "records",
          heading: "Borrow it",
          items: [
            {
              name: "OhioLINK",
              summary: "A partnership of 115 academic libraries across Ohio plus the State Library of Ohio. Request a book from Libraries Search and it's delivered to campus for you to pick up.",
              fields: [["Cost", "Free"]],
              link: { href: "https://search.library.osu.edu", text: "Request through Libraries Search" }
            },
            {
              name: "Interlibrary Loan",
              summary: "For anything that isn't available through Ohio State or OhioLINK. Sign in to ILLiad with your Ohio State login to request books or articles from libraries beyond Ohio.",
              fields: [["Cost", "Free"]],
              link: { href: "https://library.osu.edu/ill", text: "Open Interlibrary Services" }
            },
            {
              name: "Course reserves and affordable textbooks",
              summary: "Ask at any library location whether your course book is on reserve. If it is, you can borrow it for a few hours a day for free. Ohio State's Affordable Learning Exchange also works with instructors to lower what you pay for course materials.",
              fields: [["Good for", "Expensive textbooks you only need now and then"]],
              link: { href: "https://affordablelearning.osu.edu/students", text: "Learn how to save on textbooks" }
            }
          ]
        }
      ],
      check: {
        question: "Your required textbook costs $180, and you only need two chapters of it for one assignment. What should you try first?",
        options: [
          { text: "See if it's on course reserve at the library", correct: true },
          { text: "Buy it at the bookstore" },
          { text: "Skip the reading" },
          { text: "Submit a Copyright Services request" }
        ],
        explain: "Course reserves let you borrow a class textbook for a few hours at a time for free. If it isn't on reserve, Ask Us can help you look for another copy through OhioLINK."
      }
    },

    {
      id: "lesson-4",
      short: "Places to study",
      title: "Places to study and work together",
      minutes: 2,
      intro: [
        "Group projects start in your first semester. Instead of crowding around one laptop in a dorm lounge, you can book a room with a door."
      ],
      sections: [
        {
          type: "records",
          heading: "Spaces you can use",
          items: [
            {
              name: "Group study rooms",
              summary: "Bookable rooms at Thompson Library, 18th Avenue Library and the FAES Library & Student Success Center.",
              fields: [
                ["How to book", "Online or in the Ohio State mobile app; walk-up and phone requests aren't accepted"],
                ["When", "From the same day up to a week in advance, for up to 4 hours"]
              ],
              link: { href: "https://library.osu.edu/roomreservation", text: "Reserve a room" }
            },
            {
              name: "Late-night study",
              summary: "18th Avenue Library is the place for late nights during the semester. Hours change for breaks and holidays, so check the hours page before you head over, especially around finals.",
              fields: [["Bring", "Your BuckID; it's required between midnight and 7 a.m."]],
              link: { href: "https://library.osu.edu/locations/18th", text: "Check 18th Avenue's hours" }
            },
            {
              name: "Student organization rooms",
              summary: "Registered student organizations in good standing can reserve some library rooms for meetings, for up to two hours at no charge.",
              fields: [["Note", "Rooms can't be reserved the week before or during finals week"]],
              link: { href: "https://library.osu.edu/roomrental/studentorg", text: "See rooms for student orgs" }
            }
          ]
        }
      ],
      check: {
        question: "Your group of four needs to meet Thursday afternoon for two hours. It's Monday. How do you get a room?",
        options: [
          { text: "Reserve a group study room online or in the Ohio State app", correct: true },
          { text: "Call the library on Thursday to ask for one" },
          { text: "You can't; study rooms are only for graduate students" },
          { text: "Show up and hope a table is free" }
        ],
        explain: "Group study rooms can be booked online or in the app, from the same day up to a week ahead, for up to four hours. Phone and walk-up requests aren't accepted."
      }
    },

    {
      id: "lesson-5",
      short: "Explore beyond class",
      title: "Explore beyond your classes",
      minutes: 3,
      intro: [
        "Some of the most interesting parts of the library have nothing to do with your next assignment. According to library staff, these are the resources students tend to find late, or never find at all."
      ],
      sections: [
        {
          type: "records",
          heading: "Worth discovering",
          items: [
            {
              name: "Special collections",
              summary: "Rare and one-of-a-kind materials you can actually see and use: the Billy Ireland Cartoon Library & Museum (the world's largest collection of comics and cartoon art), the Rare Books & Manuscripts Library, the Lawrence and Lee Theatre Research Institute, the Byrd Polar archives and University Archives.",
              fields: [["Visit", "The Billy Ireland's galleries and reading room are free and open to all, at 1813 North High Street"]],
              link: { href: "https://library.osu.edu/special-collections", text: "Explore special collections" }
            },
            {
              name: "Workshops, exhibits and events",
              summary: "Free sessions on skills like Python basics, version control with Git and managing citations with Zotero, plus gallery exhibits in Thompson Library. Some workshops are aimed at graduate students, so check each event page to see who it's for.",
              fields: [["Good for", "Picking up skills for internships and research outside of class"]],
              link: { href: "https://library.osu.edu/events", text: "See upcoming events" }
            },
            {
              name: "Copyright Services",
              summary: "Help with questions about using other people's images, music, video or writing in your projects. You also hold the copyright to your own creative and scholarly work.",
              fields: [["Contact", "libcopyright@osu.edu"]],
              link: { href: "https://library.osu.edu/copyright", text: "Visit Copyright Services" }
            },
            {
              name: "Undergraduate Research Library Fellowship",
              summary: "A paid summer fellowship where you work one-on-one with a library mentor on a project. It's open to students in any major; the 2026 fellowship paid $6,000 for ten weeks, with applications due in February.",
              fields: [["Good for", "Research experience, and something real to put on your resume"]],
              link: { href: "https://u.osu.edu/urlf", text: "Read about the fellowship" }
            }
          ]
        }
      ],
      check: {
        question: "Which library opportunity pays you to work on a summer project with a library mentor?",
        options: [
          { text: "The Undergraduate Research Library Fellowship", correct: true },
          { text: "A+ Research Coaching" },
          { text: "Interlibrary Loan" },
          { text: "Group study rooms" }
        ],
        explain: "The Undergraduate Research Library Fellowship is a paid summer program open to all majors. Applications are typically due in February, so it's worth looking at during your first spring semester."
      }
    }
  ],

  quiz: {
    passScore: 6,
    questions: [
      {
        lesson: "lesson-2",
        question: "Where is the Ask Us Desk?",
        options: [
          { text: "First floor of Thompson Library", correct: true },
          { text: "18th Avenue Library's third floor" },
          { text: "The Ohio Union" },
          { text: "There's no desk; it's online only" }
        ],
        explain: "The Ask Us Desk is on the first floor of Thompson Library. You can also reach Ask Us by chat, email form or phone at 614-292-8463."
      },
      {
        lesson: "lesson-3",
        question: "You need a book that Ohio State doesn't own. What do you do?",
        options: [
          { text: "Request it through OhioLINK or Interlibrary Loan", correct: true },
          { text: "Buy it, because the library can't get it" },
          { text: "Ask your instructor to change the assignment" },
          { text: "Wait for the library to buy a copy" }
        ],
        explain: "OhioLINK connects 115 academic libraries in Ohio, and Interlibrary Loan reaches libraries beyond the state. Both are free."
      },
      {
        lesson: "lesson-3",
        question: "You're at home and a research database asks you to sign in. What do you use?",
        options: [
          { text: "Your Ohio State name.# and password", correct: true },
          { text: "Your BuckID number" },
          { text: "A personal Google account" },
          { text: "Nothing; databases only work on campus" }
        ],
        explain: "Off campus, sign in with your Ohio State name.# and password to use the library's databases and e-resources."
      },
      {
        lesson: "lesson-4",
        question: "How far ahead can you reserve a group study room?",
        options: [
          { text: "From the same day up to a week in advance", correct: true },
          { text: "Only on the day you need it" },
          { text: "A month in advance" },
          { text: "Rooms can't be reserved" }
        ],
        explain: "Group study rooms can be booked from the same day up to a week ahead, for up to four hours, online or in the Ohio State app."
      },
      {
        lesson: "lesson-2",
        question: "You'd like a fellow student to help you narrow down a research topic. Which service is built for that?",
        options: [
          { text: "A+ Research Coaching", correct: true },
          { text: "Copyright Services" },
          { text: "Interlibrary Loan" },
          { text: "Special collections" }
        ],
        explain: "A+ Research Coaching pairs you with a trained peer research coach. Book it through OnCourse, in person or online."
      },
      {
        lesson: "lesson-2",
        question: "Your paper is due in two days and you want to talk to a subject librarian. What should you do?",
        options: [
          { text: "Call Ask Us at 614-292-8463", correct: true },
          { text: "Fill out the appointment form and wait" },
          { text: "Email the Billy Ireland Cartoon Library" },
          { text: "It's too late to get help" }
        ],
        explain: "The subject librarian form is for planning ahead. If your assignment is due within two working days, call Ask Us so they can help you quickly."
      },
      {
        lesson: "lesson-5",
        question: "Which special collection is free to visit and holds the world's largest collection of comics and cartoon art?",
        options: [
          { text: "The Billy Ireland Cartoon Library & Museum", correct: true },
          { text: "The Rare Books & Manuscripts Library" },
          { text: "University Archives" },
          { text: "The Research Commons" }
        ],
        explain: "The Billy Ireland Cartoon Library & Museum, at 1813 North High Street, has galleries and a reading room that are free and open to all."
      },
      {
        lesson: "lesson-5",
        question: "You want to learn the basics of Python for free this semester. Where should you look?",
        options: [
          { text: "The University Libraries events calendar", correct: true },
          { text: "Course reserves" },
          { text: "OhioLINK" },
          { text: "The group study room system" }
        ],
        explain: "The Libraries run free workshops on skills like Python, Git and Zotero. Check each event page to see who it's open to."
      }
    ]
  },

  toolkit: [
    { label: "Ask Us", href: "https://library.osu.edu/askus", note: "Desk, chat, email or 614-292-8463" },
    { label: "A+ Research Coaching", href: "https://library.osu.edu/a-research-coaching", note: "Book a peer coach in OnCourse" },
    { label: "Subject librarians", href: "https://library.osu.edu/subject-librarian-request", note: "Request an appointment" },
    { label: "Libraries Search", href: "https://search.library.osu.edu", note: "Books, e-books and OhioLINK requests" },
    { label: "Research databases", href: "https://guides.osu.edu/databases", note: "Scholarly articles by subject" },
    { label: "Interlibrary Loan", href: "https://library.osu.edu/ill", note: "Anything Ohio State doesn't have" },
    { label: "Reserve a study room", href: "https://library.osu.edu/roomreservation", note: "Up to a week ahead" },
    { label: "Locations and hours", href: "https://library.osu.edu/locations", note: "Check before you go" },
    { label: "Special collections", href: "https://library.osu.edu/special-collections", note: "Including the Billy Ireland" },
    { label: "Events and workshops", href: "https://library.osu.edu/events", note: "Free skills sessions and exhibits" }
  ]
};
