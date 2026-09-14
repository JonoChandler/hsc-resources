// data.js — the resource library.
// Each entry describes one downloadable file. "file" is the path the download
// button links to. Drop your actual PDFs into /resources/<subject-slug>/ and
// keep the filenames matching, or edit the "file" paths below to match yours.
// See README.md for full instructions.

const SUBJECTS = [
  {
    name: "Mathematics Advanced",
    slug: "maths-advanced",
    topics: ["Functions", "Calculus", "Trigonometric Functions", "Exponential and Logarithmic Functions", "Statistical Analysis"],
  },
  {
    name: "Mathematics Extension 1",
    slug: "maths-ext1",
    topics: ["Proof", "Vectors", "Further Calculus", "Combinatorics", "Inverse Trigonometric Functions"],
  },
  {
    name: "Mathematics Extension 2",
    slug: "maths-ext2",
    topics: ["Proof", "Vectors", "Complex Numbers", "Further Integration", "Mechanics"],
  },
  {
    name: "Chemistry",
    slug: "chemistry",
    topics: ["Module 5: Equilibrium and Acid Reactions", "Module 6: Acid/Base Reactions", "Module 7: Organic Chemistry", "Module 8: Applying Chemical Ideas"],
  },
  {
    name: "Physics",
    slug: "physics",
    topics: ["Module 5: Advanced Mechanics", "Module 6: Electromagnetism", "Module 7: The Nature of Light", "Module 8: From the Universe to the Atom"],
  },
  {
    name: "Biology",
    slug: "biology",
    topics: ["Module 5: Heredity", "Module 6: Genetic Change", "Module 7: Infectious Disease", "Module 8: Non-Infectious Disease"],
  },
];

const RESOURCES = [
  // Maths Advanced
  { subject: "maths-advanced", topic: "Calculus", title: "Differentiation rules cheat sheet", type: "Summary", file: "resources/maths-advanced/calculus-cheat-sheet.pdf" },
  { subject: "maths-advanced", topic: "Calculus", title: "Worked past-paper solutions, 2020–2023", type: "Past HSC Questions", file: "resources/maths-advanced/calculus-past-solutions.pdf" },
  { subject: "maths-advanced", topic: "Functions", title: "Transformations of functions notes", type: "Notes", file: "resources/maths-advanced/functions-notes.pdf" },
  { subject: "maths-advanced", topic: "Statistical Analysis", title: "Binomial distribution practice set", type: "Practice Paper", file: "resources/maths-advanced/binomial-practice.pdf" },
  { subject: "maths-advanced", topic: "Trigonometric Functions", title: "Trig identities summary", type: "Summary", file: "resources/maths-advanced/trig-identities.pdf" },
  { subject: "maths-advanced", topic: "Exponential and Logarithmic Functions", title: "Log laws worked examples", type: "Notes", file: "resources/maths-advanced/log-laws-examples.pdf" },

  // Maths Extension 1
  { subject: "maths-ext1", topic: "Proof", title: "Mathematical Induction - Challenging Questions", type: "Worksheet", file: "resources/maths-ext1/Mathematical Induction - Challenging Questions.pdf" },
  { subject: "maths-ext1", topic: "Proof", title: "Mathematical Induction - Divisibility Questions", type: "Worksheet", file: "resources/maths-ext1/Mathematical Induction - Divisibility Questions.pdf" },
  { subject: "maths-ext1", topic: "Proof", title: "Mathematical Induction - Summation Questions", type: "Worksheet", file: "resources/maths-ext1/Mathematical Induction - Summation Questions.pdf" },
  { subject: "maths-ext1", topic: "Vectors", title: "Vector proofs practice set", type: "Practice Paper", file: "resources/maths-ext1/vectors-practice.pdf" },
  { subject: "maths-ext1", topic: "Combinatorics", title: "Permutations and combinations summary", type: "Summary", file: "resources/maths-ext1/combinatorics-summary.pdf" },
  { subject: "maths-ext1", topic: "Further Calculus", title: "Integration techniques worked solutions", type: "Notes", file: "resources/maths-ext1/further-calculus-solutions.pdf" },
  { subject: "maths-ext1", topic: "Inverse Trigonometric Functions", title: "Past HSC questions, 2018–2023", type: "Past HSC Questions", file: "resources/maths-ext1/inverse-trig-past-questions.pdf" },

  // Maths Extension 2
  { subject: "maths-ext2", topic: "Complex Numbers", title: "Argand diagram and polar form notes", type: "Notes", file: "resources/maths-ext2/complex-numbers-notes.pdf" },
  { subject: "maths-ext2", topic: "Further Integration", title: "Integration by substitution practice", type: "Practice Paper", file: "resources/maths-ext2/further-integration-practice.pdf" },
  { subject: "maths-ext2", topic: "Vectors", title: "3D vector proofs worked examples", type: "Notes", file: "resources/maths-ext2/vectors-3d-examples.pdf" },
  { subject: "maths-ext2", topic: "Mechanics", title: "Resisted motion formula sheet", type: "Summary", file: "resources/maths-ext2/mechanics-formulas.pdf" },
  { subject: "maths-ext2", topic: "Proof", title: "Induction and inequalities practice set", type: "Practice Paper", file: "resources/maths-ext2/proof-practice.pdf" },

  // Chemistry
  { subject: "chemistry", topic: "Module 5: Equilibrium and Acid Reactions", title: "Equilibrium calculations walkthrough", type: "Notes", file: "resources/chemistry/module5-equilibrium.pdf" },
  { subject: "chemistry", topic: "Module 6: Acid/Base Reactions", title: "Titration practical write-up template", type: "Notes", file: "resources/chemistry/module6-titration-template.pdf" },
  { subject: "chemistry", topic: "Module 7: Organic Chemistry", title: "Reaction pathways poster", type: "Notes", file: "resources/chemistry/module7-reaction-pathways.pdf" },
  { subject: "chemistry", topic: "Module 8: Applying Chemical Ideas", title: "Qualitative analysis summary", type: "Summary", file: "resources/chemistry/module8-qualitative-analysis.pdf" },
  { subject: "chemistry", topic: "Module 7: Organic Chemistry", title: "Past HSC questions, 2019–2023", type: "Past HSC Questions", file: "resources/chemistry/module7-past-questions.pdf" },

  // Physics
  { subject: "physics", topic: "Module 5: Advanced Mechanics", title: "Projectile motion formula sheet", type: "Summary", file: "resources/physics/module5-formulas.pdf" },
  { subject: "physics", topic: "Module 6: Electromagnetism", title: "Worked problems, motors and generators", type: "Notes", file: "resources/physics/module6-worked-problems.pdf" },
  { subject: "physics", topic: "Module 7: The Nature of Light", title: "Past HSC questions, 2018–2023", type: "Past HSC Questions", file: "resources/physics/module7-past-questions.pdf" },
  { subject: "physics", topic: "Module 8: From the Universe to the Atom", title: "Nuclear physics notes", type: "Notes", file: "resources/physics/module8-nuclear-notes.pdf" },
  { subject: "physics", topic: "Module 6: Electromagnetism", title: "Practice problem set", type: "Practice Paper", file: "resources/physics/module6-practice-set.pdf" },

  // Biology
  { subject: "biology", topic: "Module 5: Heredity", title: "DNA replication and inheritance summary", type: "Summary", file: "resources/biology/module5-heredity-summary.pdf" },
  { subject: "biology", topic: "Module 6: Genetic Change", title: "Biotechnology case studies", type: "Notes", file: "resources/biology/module6-biotech-cases.pdf" },
  { subject: "biology", topic: "Module 7: Infectious Disease", title: "Pathogen comparison table", type: "Notes", file: "resources/biology/module7-pathogens.pdf" },
  { subject: "biology", topic: "Module 8: Non-Infectious Disease", title: "Practice questions with answers", type: "Practice Paper", file: "resources/biology/module8-practice.pdf" },
  { subject: "biology", topic: "Module 5: Heredity", title: "Past HSC questions, 2018–2023", type: "Past HSC Questions", file: "resources/biology/module5-past-questions.pdf" },
];
