<h1 align="center">eggsy.xyz</h1>

<p align="center">
  <img src="/demo.png" />
</p>

<p align="center">
  <img src="https://api.netlify.com/api/v1/badges/235c4935-39c2-4aef-9b79-f5b6c5686855/deploy-status" alt="Deploy status" />

  <img src="https://app.codacy.com/project/badge/Grade/ff917529015742d3a3c3eda2674162de" alt="Codacy code quality" />
</p>

My personal portfolio website, built with Nuxt.js, Windi CSS, TypeScript and Firebase.

### ✨ Features

Website features many custom built systems, integrations and pages!

- ✅ Projects, experiences, skills, GitHub Repositories, favorite songs, contact pages.
- ✅ Fully static markdown-driven blog with Nuxt Content.
- ✅ Firebase integration.
- ✅ Real-time Discord profile data using [Lanyard API](https://github.com/Phineas/lanyard/).
- ✅ Last.fm API to display top tracks and recently played songs－[example](https://eggsy.xyz/me/songs).
- ✅ Written in TypeScript.
- ✅ Tons of handmade custom components.

### 🔧 Getting Started

You need to install [Node.js](https://nodejs.org/) and [Git](https://git-scm.com/downloads) to your machine. Node.js comes with its own package manager called `npm`, you can either use that or you can use [`pnpm`](https://pnpm.io/installation) since it's faster and caches downloaded dependencies properly.

- Clone the repository with `git clone https://github.com/eggsy/website`
- Install dependencies with your preffered package manager.
  - With pnpm: `pnpm install`
  - With NPM: `npm install`
- If you are going to use Firebase, you'll need to rename `.env.example` to `.env` and fill the config.
  - **P.S.** You can use the website without the Fireabse integration as it requires a bunch of additional steps on its own. Read the title below for more information.
- Start the app:
  - For development:
    - With pnpm: `pnpm dev`
    - With NPM: `npm run dev`
  - To build and compile:
    - With pnpm: `pnpm generate` (or `pnpm build`)
    - With NPM: `npm run generate` or (`npm run build`)

If you are wondering about **how to host it on free/paid static hosting services** like (Netlify, Vercel etc.), you can refer to [Nuxt.js docs](https://nuxtjs.org/deployments/netlify/). My project is hosted on [Netlify](https://netlify.com).

### 🤔 Don't need Firebase?

If you don't want to take the additional steps installing and configuring a Firebase account just to use the website, follow these steps:

1. Remove `firebase` and `@nuxtjs/firebase` modules via your package manager.
2. Remove `@nuxtjs/firebase` from `tsconfig.json`.
3. Remove `firebase` import and the line of `@nuxtjs/firebase` reference in the array in `config/modules.ts` file.
4. Remove `@/plugins/Firebase` reference from the plugins array in `config/plugins.ts` (remove the whole object), and delete that file from `plugins` directory, you don't need it anymore.
5. Delete `config/modules/firebase.ts`.
6. Delete the Daily page: `src/pages/daily.vue`.
   - Delete existing links and references to this page as it might throw errors when building the app.

### 💖 Sponsors

<p align="center">
  <a href="https://github.com/sponsors/eggsy">
    <img src='https://cdn.jsdelivr.net/gh/eggsy/.github/sponsors.svg'/>
  </a>
</p>
