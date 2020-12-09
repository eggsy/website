## EGGSY's Personal Website

> I am rewriting my website in TailwindCSS on another branch! Check out the [tailwind](https://github.com/eggsy/eggsy-website/tree/tailwind) branch to see the progress and [here](https://eggsy-tailwind-netlify.app) to see what I've done so far! I'll merge that branch with this one when I'm done with it.

<p align="center">
    <img src="/images/featuring.png" />
</p>

> This is the source code of [eggsy.xyz](https://eggsy.xyz), use it wisely and improve yourself 🙏❤

Hello all 👋 after a long time journey I am finally publishing my website's source code to public! Use this as a template for your new project and make sure to edit the required parts because there are some really old code in this repository that I am going to take a look at when I have time...

For Nuxt users, it'll be easy to control and manage but if you're new to Nuxt and/or Vue world it might look a bit hard but trust me, it's really easy. The reason I used Nuxt on my website is that I really like Vue's syntax and find it easier than others and Nuxt had many great modules, community, SSR and SSG support and even more! They keep improving the system and making Vue even better.

> **Note** that I am a Turkish developer and most of my followers are Turkish, although 90% of this website is in English, my blog is completely Turkish _because who would read my useless stories_ 🤣

### Table of contents:

- [🛠 Requirements](#-requirements)
- [📩 Installation](#-installation)
- [📄 To do](#-to-do)
- [🙏 Special Thanks](#-special-thanks)

#### 🛠 Requirements

You'll need [Node.JS](https://nodejs.org/tr/download/) installed on your system. Then you'll have to choose between NPM (pre-installed with Node.JS) or [Yarn](https://yarnpkg.com/) (I prefer this one).

> **Note** that you will or will not need a Node.JS server to host this website. If you don't need blog or its embeds (which requires to be rendered on the server's side to get previews like [this](/images/discord-preview.png) on Discord or other platforms) - BUT, it doesn't mean you can't show previews at all, you can still show things that you set in `nuxt.config.js` head. If it's not a problem for you to not have meta tags depending on the page you're on, than you can completely disable server-side rendering and export this as a static app (you'll also have to remove API that I created to create Canvas images) and then you can use it on a web hosting or Netlify, Vercel, GitHub Pages etc.

#### 📩 Installation

Make sure you have everything installed and ready, please note that depending on your machine, the installation process could take up to 5 minutes (it takes ~45 seconds on a SSD).

- Clone this repository or download ZIP: `git clone https://github.com/eggsydev/eggsy-website`,
- Install modules with your preferred package manager (NPM or Yarn):
  - With yarn, do: `yarn` or `yarn install`,
  - With NPM, do: `npm install`.
- Copy `.env.example` and paste it as `.env`, fill the fields.
  - **Note** that if you are going to export your project as static than you can completely delete this file. But note that you will also have to remove `@nuxtjs/firebase` from build modules in `nuxt.config.js` so it won't try to look for your key in an unexistant file.
- Start in development, production or export the website.
  - To start the project in development mode with hot module replacement: `yarn dev` or `npm run dev`,
  - To start it in production or test your static app in your machine (you need to `yarn build`/`npm run build` before this): `yarn start` or `yarn dev`.
  - To export the website, use the build command (`yarn build`/`npm run build`) and then run `yarn generate` or `npm run generate`.
    - After this step, you can copy the files in `dist/` directory to your web hosting service or if you want to test it on your machine then you can do `yarn start` or `npm run start`. Check [Nuxt.js docs](https://nuxtjs.org/faq/github-pages) (use the left side menu to find your hosting provider).

> **⚠ Important note!** Like I said, if you don't have a Node.JS server and you don't want to buy one, or you just want to host it on free services like GH Pages etc. you can use Nuxt's full static generation method to export your website. But, this website is **originally** designed to run on a Node.JS server so you have to edit some parts that require a server to work (like Canvas API) and the pages that connects to it before you can run it on those services. If something errors out and you can't figure out what's wrong, join my [Discord server](https://eggsy.xyz/discord) and message me.

#### 📄 To do

- [ ] **Clean the code!**
- [ ] Move Canvas API to HTML Canvas and remove API.
- [ ] If not going to remove API, move API to SVG to PNG system.

#### 🙏 Special Thanks

To [Nuxt.js](https://nuxtjs.org), its modules, community, [Vue.js](https://vuejs.org) and users in [my Discord server](https://eggsy.xyz/discord).
