<template>
  <div class="pt-6 pb-14 px-4">
    <nav class="hidden sm:block fixed w-full top-0 left-0 py-4">
      <div
        class="container mx-auto flex items-center text-gray-800 dark:text-gray-200"
      >
        <nuxt-link to="/" class="flex items-center space-x-2 hover:underline">
          <icon name="arrow-left" class="h-6 w-6" />
          <span>Go Back Home</span>
        </nuxt-link>

        <div class="flex items-center space-x-2 ml-auto">
          <a
            href="https://is-inside.me/?utm_source=eggsy.xyz"
            target="_blank"
            rel="noreferrer"
          >
            <h1 class="font-semibold">is-inside.me</h1>
          </a>
          <icon name="cursor-click" class="h-6 w-6" />
        </div>
      </div>
    </nav>

    <section
      class="mt-12 sm:mt-24 w-full flex items-center justify-center space-x-2 dark:text-gray-200"
    >
      <nuxt-link class="sm:hidden" to="/">
        <icon name="arrow-left" class="h-6 w-6" />
      </nuxt-link>

      <icon name="lightning-bolt" class="hidden sm:block h-6 w-6" />

      <a
        href="https://is-inside.me/?utm_source=eggsy.xyz"
        rel="noreferrer"
        target="_blank"
        ><h2 class="text-2xl font-bold">is-inside.me</h2></a
      >
    </section>

    <section
      class="mt-12 sm:mt-24 space-y-14 sm:space-y-28 sm:w-9/12 mx-auto text-justify"
    >
      <!-- What is is-inside.me? -->
      <div class="sm:w-6/12">
        <h2 class="project-title">
          What is
          <a
            href="https://is-inside.me/?utm_source=eggsy.xyz"
            class="text-red-600"
            rel="noreferrer"
            target="_blank"
            >is-inside.me</a
          >?
        </h2>

        <p class="dark:text-gray-300">
          It is a website that was created by me and Tresmos. It is a custom
          uploader which everyone can signup for free and start uploading their
          images, videos or files! You can set and start using is-inside.me with
          desktop apps like
          <a
            href="https://getsharex.com/?utm_source=eggsy.xyz"
            class="font-medium"
            rel="noreferrer"
            target="_blank"
            >ShareX</a
          >
          (Windows),
          <a
            href="https://github.com/ArsenArsen/KShare/?utm_source=eggsy.xyz"
            class="font-medium"
            rel="noreferrer"
            target="_blank"
            >KShare</a
          >
          (Linux),
          <a
            href="https://magiccap.me/?utm_source=eggsy.xyz"
            class="font-medium"
            rel="noreferrer"
            target="_blank"
            >MagicCap</a
          >
          (Linux, Mac) or your favourite screen capturing tool that supports
          custom uploaders!
        </p>
      </div>

      <!-- What's cool about it? -->
      <div class="ml-auto sm:w-6/12 text-right">
        <h2 class="project-title">
          What's cool about <span class="text-red-600">it?</span>
        </h2>

        <p class="dark:text-gray-300">
          Using a custom uploader with such programs means that you can generate
          custom URLs. Instead of using URLs from Imgur, or other image
          services, with using is-inside.me, you'll get a special sub-domain for
          the username of your choice and you will upload your files under that
          sub-domain. When you upload a picture, our service will return you a
          link to your file with your name in it:
          <span class="text-red-500">bananas.is-inside.me</span> 😳
        </p>
      </div>

      <div class="sm:w-6/12">
        <h2 class="project-title">
          How do you trust
          <span class="text-red-600">us</span>?
        </h2>

        <p class="dark:text-gray-300">
          We are two friends who's trying their best to gain your trust and
          create stuff that you, our users, would use. We encrypt all of the
          data (passwords, files) you share with our service. Though we are not
          responsible of any "misuse" of our service, we care about your privacy
          and we will never sell your data, <strong>never</strong>.
        </p>
      </div>

      <!-- Are you ready? -->
      <div class="sm:w-5/12 mx-auto text-center">
        <h2 class="project-title">Are you ready?</h2>

        <div class="text-gray-800 dark:text-gray-300">
          <a
            href="https://is-inside.me/?utm_source=eggsy.xyz"
            class="font-medium text-red-600"
            rel="noreferrer"
            target="_blank"
            >Click here</a
          >
          to create your first account! Or
          <a
            href="https://is-inside.me/faq/?utm_source=eggsy.xyz"
            class="font-medium"
            rel="noreferrer"
            target="_blank"
            >click here</a
          >
          if you have any more questions!
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head: {
    title: "is-inside.me",
  },
}
</script>

<style lang="scss" scoped>
a {
  @apply hover:underline;
}

.project-title {
  @apply text-xl font-semibold text-gray-800 dark:text-gray-200;
}
</style>
