# Study Notes for the HSC

A static website for sharing HSC study resources (notes, summaries, practice papers, past HSC questions) organised by subject and topic.

No build step, no framework, no server required — it's plain HTML, CSS, and JavaScript.

## Files

```
index.html      Homepage — hero + subject index
library.html    Browsable, filterable resource library
style.css        All styling
script.js        Library filtering/search logic
data.js          The subject list and resource entries — edit this to add your own content
resources/       One folder per subject, where your actual PDFs live
```

## Adding your own resources

1. **Add the file.** Drop your PDF into the matching folder in `resources/`, e.g.
   `resources/biology/my-notes.pdf`.

2. **Add an entry in `data.js`.** Open `data.js` and add an object to the `RESOURCES` array:

   ```js
   { subject: "biology", topic: "Module 5: Heredity", title: "My DNA notes", type: "Notes", file: "resources/biology/my-notes.pdf" },
   ```

   - `subject` must match a subject `slug` from the `SUBJECTS` array at the top of the file.
   - `topic` should match one of that subject's topics (or you can add a new topic string — it'll still work, it just won't be pre-listed anywhere else).
   - `type` is a free-text label — `Notes`, `Summary`, `Practice Paper`, and `Past HSC Questions` are used already, but you can invent your own; it'll show up automatically as a filter option.
   - `file` is the path to the PDF you just added.

3. Refresh the page — new entries appear immediately, no build step.

## Adding a new subject

Add an object to the `SUBJECTS` array in `data.js`:

```js
{ name: "Software Engineering", slug: "software-engineering", topics: ["Programming Fundamentals", "Software Development Cycle"] },
```

Then create a matching folder: `resources/software-engineering/`.

## Removing the sample data

Everything in `data.js` right now is placeholder scaffolding so you can see the structure in action. The `file` paths point to PDFs that don't exist yet — clicking "Download" on an unfilled entry will 404. Once you've replaced the entries with your real resources, remove any leftover placeholders you don't need.

## Hosting it

This is a fully static site, so any static host works. Two free, simple options:

- **Netlify** — drag the whole `hsc-site` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
- **GitHub Pages** — push this folder to a GitHub repo, then enable Pages in the repo settings (Settings → Pages → deploy from branch).

## Customizing the look

Colors, fonts, and spacing are all defined as CSS variables at the top of `style.css` (the `:root` block), so you can retheme the whole site by changing a handful of values there.
