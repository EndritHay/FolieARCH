# Project media folder

Put your project **images** and **videos** here so they are included when you deploy (e.g. to Netlify).

- Use the same filenames as in `src/App.tsx` in the `featuredProjects` array.
- Paths in the app are `/projects/yourfile.png` or `/projects/yourfile.mp4`
- **All 9 videos** (parkupavarsia1–9.mp4) and the image must be in this folder and **committed to Git** so they deploy.

**If videos still don’t load on live:** In GitHub Desktop, make sure `public/projects/` (with all .mp4 and .png files) is staged and pushed. Do not use Git LFS for these files if you deploy to Netlify, or enable LFS in Netlify.
