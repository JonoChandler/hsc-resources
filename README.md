# Study Notes for the HSC

A static website for sharing HSC study resources (notes, practice questions, past papers), organised the way students actually think about them: **Year → Subject → Module → Resource.**

No build step, no framework, no server required — it's plain HTML, CSS, and JavaScript.

## How the site flows

1. **Home** (`index.html`) — pick Year 11 or Year 12.
2. **Subjects** (`subjects.html?year=11`) — every subject offered that year, as a contents-style list.
3. **Subject page** (`subject.html?year=11&subject=chemistry`) — that subject's modules (or topics, for the Maths courses) as clickable buttons, plus a separate row of past-paper buttons (Prelim Papers for Year 11; Trial Papers and HSC Papers for Year 12).
4. **Library** (`library.html?...`) — clicking a module or paper button lands here, showing just that topic's resources. The **Library** link in the nav bar instead opens a full browsable view with filters for year, subject, and resource type.

## Files

```
index.html      Year 11 / Year 12 picker
subjects.html   Subject list for the chosen year
subject.html    Module buttons + past-paper buttons for one subject/year
library.html    Focused topic view, or full filterable browse view
style.css       All styling
script.js       Library page logic (focused view + filters)
data.js         Subjects, their modules per year, and every resource entry
resources/      One folder per subject, where your actual PDFs live
```

## Adding your own resources

1. **Add the file.** Drop your PDF into the matching folder in `resources/`, e.g.
   `resources/biology/my-notes.pdf`.

2. **Add an entry in `data.js`.** Find the `RESOURCES` array (or the bottom of the file, where starter resources are generated) and add an object:

   ```js
   RESOURCES.push({ subject: "biology", year: 12, topic: "Module 5: Heredity", title: "My DNA notes", type: "Notes", file: "resources/biology/my-notes.pdf" });
   ```

   - `subject` must match a subject `slug` from the `SUBJECTS` array.
   - `year` is `11` or `12`.
   - `topic` must exactly match one of that subject/year's `modules` entries — or one of its `paperTypes` (e.g. `"Trial Papers"`) if it's a past paper.
   - `type` is a free-text label — `Notes`, `Practice Paper`, `Past Paper` are used already, but you can invent your own; it becomes a filter option automatically on the Library page.
   - `file` is the path to the PDF you just added.

3. Refresh the page — new entries appear immediately, no build step.

## Adding a new subject, or a new year for an existing one

Add (or extend) an entry in the `SUBJECTS` array in `data.js`:

```js
{
  name: "Software Engineering",
  slug: "software-engineering",
  unitLabel: "Module",       // or "Topic" — this word is used in headings, e.g. "Modules"
  years: {
    11: { modules: ["Programming Fundamentals", "..."], paperTypes: ["Prelim Papers"] },
    12: { modules: ["Software Development Cycle", "..."], paperTypes: ["Trial Papers", "HSC Papers"] },
  },
},
```

Omit a year entirely (like Mathematics Extension 2, which has no Year 11) if the subject isn't offered that year — it'll automatically stay off that year's subject list.

Then create a matching folder: `resources/software-engineering/`.

## About the sample data

Every resource currently in the library is auto-generated placeholder scaffolding (two per module, two past papers per paper type) so every button leads somewhere real instead of a dead end. The `file` paths point to PDFs that don't exist yet — clicking "Download" on one will 404 until you add the real file. Replace them gradually as you add your own content; there's no need to remove the generator, just add your real entries alongside or instead of it.

## Hosting it

This is a fully static site, so any static host works. Two free, simple options:

- **Netlify** — drag the whole `hsc-site` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
- **GitHub Pages** — push this folder to a GitHub repo, then enable Pages in the repo settings (Settings → Pages → deploy from branch).

## Customizing the look

Colors, fonts, and spacing are all defined as CSS variables at the top of `style.css` (the `:root` block), so you can retheme the whole site by changing a handful of values there.
