<template>
  <div class="px-4 pt-6 pb-14">
    <section
      class="flex items-center justify-center w-full mt-12 space-x-2 sm:mt-24 dark:text-gray-200"
    >
      <nuxt-link class="sm:hidden" to="/">
        <icon name="arrow-left" class="w-6 h-6" />
      </nuxt-link>

      <icon name="lightning-bolt" class="hidden w-6 h-6 sm:block" />

      <a :href="getLink" rel="noreferrer" target="_blank"
        ><h2 class="text-2xl font-bold">is-inside.me</h2></a
      >
    </section>

    <section
      class="mx-auto mt-12 text-justify sm:mt-24 space-y-14 sm:space-y-28"
    >
      <!-- What is is-inside.me? -->
      <div class="sm:w-6/12">
        <h2 class="project-title">
          What is
          <a
            :href="getLink"
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
      <div class="ml-auto text-right sm:w-6/12">
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
      <div class="mx-auto text-center sm:w-5/12">
        <h2 class="project-title">Are you ready?</h2>

        <div class="text-gray-800 dark:text-gray-300">
          <a
            :href="getLink"
            class="font-medium text-red-600"
            rel="noreferrer"
            target="_blank"
            >Click here</a
          >
          to create your first account! Or
          <a
            :href="getLink"
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
  computed: {
    getLink() {
      return this.$config.links.isInsideMe
    },
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
