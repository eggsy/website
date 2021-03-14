## 🔥 My Personal Website

<p align="center">
  <img src="/demo/featuring.jpg" />
</p>

<p align="center">
  <img src="https://api.netlify.com/api/v1/badges/235c4935-39c2-4aef-9b79-f5b6c5686855/deploy-status" alt="Deploy status" />

  <img src="https://app.codacy.com/project/badge/Grade/ff917529015742d3a3c3eda2674162de" alt="Codacy code quality" />
</p>

> This is a Nuxt.js Fully Static website, so you can use/host it anywhere!

After almost a year that I have published my website's source code on GitHub, I've been working on a new and better version. All I had to do was learn TailwindCSS, Nuxt.js, and Vue.js better. It's been a long journey since I pushed myself into the TailwindCSS world, but it was amazing! It doesn't give you any components; it asks you to create your ones! And that is the most important thing to improve yourself in my opinion. It's been a great learning experience for me, and I think I've learned and improved myself a lot.

It is my website that I use daily, so I had to include everything that I needed. You'll see some pages that may not be suitable for you, but this is a real-world app, and I need them 😅

### ✨ What is included?

Website features many custom built systems, integrations and pages!

- ✅ Sections for a freelancer!
  - Projects, experiences, skills, GitHub repositories, and social media accounts.
- ✅ Static blog!
  - Completely static, no API needed, Nuxt.js Content blog ready to go!
- ✅ Firebase integration!
  - My "Daily Song" page fetches data from Firebase to display the today's song! It's all statically generated on client!
- ✅ Designed with TailwindCSS!
  - Clean, beautiful, fast, and responsive UI!
  - No CSS used! The website is done without touching CSS (except some transitions and directives)
- ✅ Over 15+ custom components!
  - Custom props, styles, and classes!

### 🔧 Getting Started

If you are interested in downloading the code, compiling it and running it, you need some tools!

First of all, all of the systems require [Node.js](https://nodejs.org/) to work, so you'll have to download it and install it on your device. This program comes with a package manager called `NPM` where you'll use to download all the dependencies of this project, including (but not limited to) Nuxt.js, Vue.js and TailwindCSS.

If you aren't already using `yarn`, I recommend yarn because it is faster and runs better on most machines. You can install yarn globally to your system using `npm install yarn -g` command. Then you'll have access to `yarn` on your terminal (you might need to restart it).

- Download the source as a ZIP folder or clone it via `git` using the `git clone` command.
- Install dependencies with your preffered package manager.
  - With yarn: `yarn`
  - With NPM: `npm install`
- If you are going to use Firebase, you'll need to rename `.env.example` to `.env` and fill the config.
  - **P.S.** You don't need Firebase in this project except for the Daily page. If you are not going to create one for your own, or use Firebase for other purposes, you'll have to do this step. Otherwise you can just remove the file, delete the parts where it is imported and used, then you'll be ready to go.
- Now you can start the app using one of these commands.
  - For development:
    - With yarn: `yarn dev`
    - With NPM: `npm run dev`
  - To build and compile:
    - With yarn: `yarn generate` (or `yarn build`)
    - With NPM: `npm run generate` or (`npm run build`)

If you are wondering about **how to host it on free/paid static hosting services** like (Netlify, Vercel etc.), you can refer to [Nuxt.js docs](https://nuxtjs.org/docs/2.x/deployment/netlify-deployment). My project is hosted on Netlify.

### ❓ What has changed?

If you are wondering what has changed and what are the differences from the old version; I can only say: "EVERYTHING!"

You can take a look at [old.eggsy.xyz](https://old.eggsy.xyz) and compare it yourself 😂 You can already say UI is a lot nicer and there are some additional pages in this new one! But I also had to remove some features, including my whole API for "Overlay Creator" (it's still available under the `old.eggsy.xyz` domain but you won't be able to access it anymore from the main domain).

<p align="center">
  <img src="/demo/old-vs-new1.jpg" />
</p>

<p align="center">
  <img src="/demo/old-vs-new2.jpg" />
</p>

<p align="center">
  <img src="/demo/old-vs-new3.jpg" />
</p>

<p align="center">
  <img src="/demo/old-vs-new4.jpg" title="No page lol" />
</p>

### 🙏 Thanks

This project wouldn't be possible if Nuxt.js team wouldn't have created such an amazing framework, and of course Vue.js is the king 👑 TailwindCSS is a really good CSS utility framework that helped me a lot and I can't get myself out of it anymore! Last but not least, I'd like to thank to the module authors, they're all amazing and I appreciate your work!
