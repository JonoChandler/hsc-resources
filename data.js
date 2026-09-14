// data.js — the resource library.
//
// Structure: SUBJECTS defines each subject's modules/topics per year (11 = Preliminary,
// 12 = HSC), plus which kinds of past papers apply. RESOURCES holds every downloadable
// file, each tagged with subject + year + topic (a module name, or a paper-type name
// like "Trial Papers"). See README.md for how to add your own.

const SUBJECTS = [
  {
    name: "Mathematics Advanced",
    slug: "maths-advanced",
    unitLabel: "Topic",
    years: {
      11: {
        modules: ["Functions", "Trigonometric Functions", "Calculus", "Exponential and Logarithmic Functions", "Statistical Analysis"],
        paperTypes: ["Prelim Papers"],
      },
      12: {
        modules: ["Functions", "Trigonometric Functions", "Calculus", "Exponential and Logarithmic Functions", "Statistical Analysis", "Financial Mathematics"],
        paperTypes: ["Trial Papers", "HSC Papers"],
      },
    },
  },
  {
    name: "Mathematics Extension 1",
    slug: "maths-ext1",
    unitLabel: "Topic",
    years: {
      11: {
        modules: ["Functions", "Trigonometric Functions", "Calculus", "Combinatorics"],
        paperTypes: ["Prelim Papers"],
      },
      12: {
        modules: ["Proof", "Vectors", "Trigonometric Functions", "Calculus", "Statistical Analysis"],
        paperTypes: ["Trial Papers", "HSC Papers"],
      },
    },
  },
  {
    name: "Mathematics Extension 2",
    slug: "maths-ext2",
    unitLabel: "Topic",
    years: {
      // Extension 2 is a Year 12-only HSC course — there is no Preliminary (Year 11) version.
      12: {
        modules: ["Proof", "Vectors", "Complex Numbers", "Calculus", "Mechanics"],
        paperTypes: ["Trial Papers", "HSC Papers"],
      },
    },
  },
  {
    name: "Chemistry",
    slug: "chemistry",
    unitLabel: "Module",
    years: {
      11: {
        modules: ["Module 1: Properties of Matter", "Module 2: Introduction to Quantitative Chemistry", "Module 3: Reactive Chemistry", "Module 4: Drivers of Reactions"],
        paperTypes: ["Prelim Papers"],
      },
      12: {
        modules: ["Module 5: Equilibrium and Acid Reactions", "Module 6: Acid/Base Reactions", "Module 7: Organic Chemistry", "Module 8: Applying Chemical Ideas"],
        paperTypes: ["Trial Papers", "HSC Papers"],
      },
    },
  },
  {
    name: "Physics",
    slug: "physics",
    unitLabel: "Module",
    years: {
      11: {
        modules: ["Module 1: Kinematics", "Module 2: Dynamics", "Module 3: Waves and Thermodynamics", "Module 4: Electricity and Magnetism"],
        paperTypes: ["Prelim Papers"],
      },
      12: {
        modules: ["Module 5: Advanced Mechanics", "Module 6: Electromagnetism", "Module 7: The Nature of Light", "Module 8: From the Universe to the Atom"],
        paperTypes: ["Trial Papers", "HSC Papers"],
      },
    },
  },
  {
    name: "Biology",
    slug: "biology",
    unitLabel: "Module",
    years: {
      11: {
        modules: ["Module 1: Cells as the Basis of Life", "Module 2: Organisation of Living Things", "Module 3: Biological Diversity", "Module 4: Ecosystem Dynamics"],
        paperTypes: ["Prelim Papers"],
      },
      12: {
        modules: ["Module 5: Heredity", "Module 6: Genetic Change", "Module 7: Infectious Disease", "Module 8: Non-Infectious Disease and Disorders"],
        paperTypes: ["Trial Papers", "HSC Papers"],
      },
    },
  },
];

// ---- Helpers ----
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function subjectBySlug(slug) {
  return SUBJECTS.find((s) => s.slug === slug);
}

// ---- Resources ----
// Hand-authored sample resources for each module/topic and paper type, so every
// button leads somewhere real. Replace "file" paths with your own PDFs — see README.md.
const RESOURCES = [];

function addResource(subject, year, topic, title, type, filename) {
  RESOURCES.push({
    subject,
    year,
    topic,
    title,
    type,
    file: `resources/${subject}/${filename}`,
  });
}

// Give every module two starter resources (notes + practice), and every paper
// type two starter past papers, so nothing is a dead end.
SUBJECTS.forEach((subject) => {
  Object.entries(subject.years).forEach(([year, yearData]) => {
    yearData.modules.forEach((topic) => {
      const topicSlug = slugify(topic);
      addResource(subject.slug, Number(year), topic, `${topic} — notes`, "Notes", `y${year}-${topicSlug}-notes.pdf`);
      addResource(subject.slug, Number(year), topic, `${topic} — practice questions`, "Practice Paper", `y${year}-${topicSlug}-practice.pdf`);
    });
    yearData.paperTypes.forEach((paperType) => {
      const paperSlug = slugify(paperType);
      addResource(subject.slug, Number(year), paperType, `2023 ${paperType.replace(/s$/, "")}`, "Past Paper", `y${year}-${paperSlug}-2023.pdf`);
      addResource(subject.slug, Number(year), paperType, `2022 ${paperType.replace(/s$/, "")}`, "Past Paper", `y${year}-${paperSlug}-2022.pdf`);
    });
  });
});
