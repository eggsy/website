<!--
  THIS PAGE IS STILL WORK IN PROGRESS.
  IT DOESN'T SUPPORT MOBILE DEVICES AND DOESN'T DO
  ANYTHING OTHER THAN JUST SHOWING OFF THE UI, YET.
-->

<template>
  <div class="pt-6 space-y-8">
    <div>
      <h1 class="text-xl font-semibold">Presence Metadata Creator</h1>
      <p>
        Create a free metadata.json file for your amazing and new PreMiD service
        with an easy to use and free graphical user interface! Worry. You will
        still need to code the presence to get it working! Machines can't do
        everything 😅
      </p>
    </div>

    <div class="mt-2 space-y-6">
      <!-- Author Information -->
      <div>
        <h2 class="text-lg font-medium">Author Information</h2>

        <div class="grid gap-3 mt-1 sm:grid-cols-2">
          <input
            v-model="service.author.name"
            class="input"
            placeholder="Your Discord username, without the #tag"
          />

          <input
            v-model="service.author.id"
            class="input"
            placeholder="Your Discord ID"
          />
        </div>
      </div>

      <!-- Service Information -->
      <div>
        <h2 class="text-lg font-medium">Service Information</h2>

        <div class="grid gap-3 mt-1 sm:grid-cols-2">
          <input
            v-model="service.name"
            class="input"
            placeholder="Name of the service"
          />

          <select v-model="service.category.selected" class="input">
            <option value="Select a category" selected disabled>
              Select a category
            </option>

            <option
              v-for="(option, index) in service.category.options"
              :key="`category-option-${index}`"
              :value="option"
            >
              {{ option }}
            </option>
          </select>

          <input
            v-model="service.logo"
            class="input"
            placeholder="Logo of the service, 512x512 is recommended"
          />

          <input
            v-model="service.thumbnail"
            class="input"
            placeholder="Thumbnail of the service, usually a screenshot of the service"
          />
        </div>

        <div class="grid grid-cols-2 gap-3 mt-3">
          <div class="relative">
            <input
              readonly
              class="w-full input"
              placeholder="Service color"
              :value="service.color"
              @click="$refs.color.click()"
            />

            <input
              ref="color"
              v-model="service.color"
              class="absolute top-0 bottom-0 left-0 right-0 invisible"
              type="color"
              placeholder="Service color"
            />
          </div>

          <input
            v-model="service.version"
            class="input"
            placeholder="Service version"
          />
        </div>

        <div class="grid gap-3 mt-3 sm:grid-cols-3">
          <!-- URLs -->
          <div
            class="h-56 space-y-2 overflow-y-hidden bg-gray-100 rounded-md ring-2 ring-gray-300 ring-opacity-25 dark:bg-gray-800 dark:ring-gray-700"
          >
            <input
              v-model="service.url.input"
              class="w-full px-4 py-2 rounded-tl-md rounded-tr-md focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              placeholder="URL(s) of the service"
              @keydown.enter="addItem('url')"
            />

            <!-- List -->
            <div class="h-full overflow-y-auto scrollbar">
              <div
                class="px-2 pb-16 space-y-1 text-gray-800 dark:text-gray-200"
              >
                <div
                  v-for="(url, index) in service.url.list"
                  :key="`url-${index}`"
                  class="flex items-center space-x-4"
                >
                  <span class="flex-grow truncate">
                    {{ url }}
                  </span>

                  <icon
                    name="x"
                    title="Click to remove this URL"
                    @click.native="removeItem(url, 'url')"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Tags -->
          <div
            class="h-56 space-y-2 overflow-y-hidden bg-gray-100 rounded-md ring-2 ring-gray-300 ring-opacity-25 dark:bg-gray-800 dark:ring-gray-700"
          >
            <input
              v-model="service.tags.input"
              class="w-full px-4 py-2 rounded-tl-md rounded-tr-md focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              placeholder="Tags for the service"
              @keydown.enter="addItem('tag')"
            />

            <!-- List -->
            <div class="h-full overflow-y-auto scrollbar">
              <div
                class="px-2 pb-16 space-y-1 text-gray-800 dark:text-gray-200"
              >
                <div
                  v-for="(tag, index) in service.tags.list"
                  :key="`tag-${index}`"
                  class="flex items-center space-x-4"
                >
                  <span class="flex-grow truncate">
                    {{ tag }}
                  </span>

                  <icon
                    name="x"
                    title="Click to remove this tag"
                    @click.native="removeItem(tag, 'tag')"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Descriptions -->
          <div
            class="h-56 space-y-2 overflow-y-hidden bg-gray-100 rounded-md ring-2 ring-gray-300 ring-opacity-25 dark:bg-gray-800 dark:ring-gray-700"
          >
            <div>
              <input
                v-model="service.description.inputs.langCode"
                class="w-full px-4 py-2 rounded-tl-md rounded-tr-md focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                placeholder="Language code, e.g. en"
                @keydown.enter="$refs.descriptionInput.focus()"
              />

              <input
                ref="descriptionInput"
                v-model="service.description.inputs.content"
                class="w-full px-4 py-2 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                placeholder="Localized description"
                @keydown.enter="addItem('description')"
              />
            </div>

            <!-- List -->
            <div class="h-full overflow-y-auto scrollbar">
              <div
                class="px-2 pb-16 space-y-1 text-gray-800 dark:text-gray-200"
              >
                <div
                  v-for="(description, index) in service.description.list"
                  :key="`description-${index}`"
                  class="flex items-center space-x-4"
                >
                  <div class="flex-grow">
                    <span class="truncate">
                      {{ description.langCode }}
                    </span>

                    <p class="text-xs line-clamp-2">
                      {{ description.content }}
                    </p>
                  </div>

                  <icon
                    name="x"
                    @click.native="
                      removeItem(description.langCode, 'description')
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Settings -->
      <div>
        <div class="mb-4">
          <h2 class="text-lg font-medium">
            Additional Settings
            <span
              class="text-sm font-normal cursor-pointer hover:underline"
              @click="additionalSettings = !additionalSettings"
            >
              {{ additionalSettings ? "hide" : "show" }}
            </span>
          </h2>

          <p>
            Settings under this title are not necessary, only fill these if you
            know what you are doing, otherwise, you can just skip this section.
          </p>
        </div>

        <transition name="fade">
          <div v-if="additionalSettings === true" class="space-y-4">
            <div class="grid gap-3 sm:grid-cols-3">
              <input
                v-model="service.regexp.url"
                class="input"
                placeholder="URL regex"
              />

              <input
                v-model="service.regexp.iframe"
                class="input"
                placeholder="Iframe regex"
              />

              <button
                :class="{
                  'input text-white transition': true,
                  'bg-green-600': service.warning === true,
                  'bg-red-600': service.warning === false,
                }"
                @click="service.warning = !service.warning"
              >
                {{ service.warning ? "Disable" : "Enable" }} Warning
              </button>
            </div>

            <div class="grid sm:grid-cols-2">
              <div
                class="bg-gray-100 rounded-tl-md rounded-bl-md ring-2 ring-gray-300 ring-opacity-25 dark:bg-gray-800 dark:ring-gray-700"
              >
                <input
                  v-model="service.contributors.inputs.name"
                  class="w-full rounded-none ring-0 rounded-tl-md rounded-tr-md input"
                  placeholder="Contributor name"
                  @keydown.enter="$refs.contributorsIdInput.focus()"
                />

                <input
                  ref="contributorsIdInput"
                  v-model="service.contributors.inputs.id"
                  class="w-full rounded-none ring-0 rounded-bl-md rounded-br-md input"
                  placeholder="Contributor ID"
                  @keydown.enter="addItem('contributor')"
                />
              </div>

              <div
                class="space-y-2 overflow-y-hidden bg-gray-100 rounded-tr-md rounded-br-md ring-2 ring-gray-300 ring-opacity-25 dark:bg-gray-800 dark:ring-gray-700"
              >
                <div
                  class="flex items-center h-full px-4 mx-auto space-x-6 overflow-x-auto scrollbar"
                >
                  <div
                    v-for="(contributor, index) in service.contributors.list"
                    :key="`contributor-${index}`"
                    class="flex items-center flex-shrink-0 space-x-2 truncate"
                  >
                    <span class="flex-shrink-0">{{ contributor.name }}</span>
                    <icon
                      name="x"
                      title="Click to remove this tag"
                      @click.native="removeItem(contributor.id, 'contributor')"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      additionalSettings: false,
      service: {
        author: {
          name: "",
          id: "",
        },
        contributors: {
          inputs: {
            name: "",
            id: "",
          },
          list: [],
        },
        name: "",
        category: {
          selected: "Select a category",
          options: [
            "Anime",
            "Games",
            "Music",
            "Socials & Stream",
            "Videos",
            "Other",
          ],
        },
        description: {
          inputs: {
            langCode: "",
            content: "",
          },
          list: [
            {
              langCode: "en",
              content: "This is the English description of your service.",
            },
          ],
        },
        version: "1.0.0",
        logo: "",
        thumbnail: "",
        color: "",
        url: {
          input: "",
          list: [],
        },
        tags: {
          input: "",
          list: [],
        },
        regexp: {
          url: "",
          iframe: "",
        },
        warning: false,
      },
    }
  },
  head() {
    const title = "Presence Metadata Creator"
    const image = "https://i.imgur.com/FowB3D5.png"
    const description =
      "Easy and free to use tool to create PreMiD Presence metadata files easily, without even needing to open your code editor!"

    return {
      title,
      meta: [
        {
          hid: "og:title",
          name: "og:title",
          content: title,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: description,
        },
        {
          hid: "description",
          name: "description",
          content: description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: image,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: image,
        },
      ],
      link: [
        {
          rel: "canonical",
          href: "https://new.eggsy.xyz/projects/premid/mdcreator",
        },
      ],
    }
  },
  methods: {
    /**
     * Adds item to specified data object, array or list.
     * @param {string} [type=url] The object name.
     */
    addItem(type = "url") {
      const service = this.service

      const url = {
        input: service.url.input,
        list: service.url.list,
      }

      const tags = {
        input: service.tags.input,
        list: service.tags.list,
      }

      const description = {
        inputs: service.description.inputs,
        list: service.tags.list,
      }

      const contributors = {
        inputs: {
          name: service.contributors.inputs.name,
          id: service.contributors.inputs.id,
        },
        list: service.contributors.list,
      }

      if (type === "url" && !url.list.includes(url.input) && url.input) {
        service.url.list.push(url.input)
        service.url.input = ""
      } else if (
        type === "tag" &&
        !tags.list.includes(tags.input) &&
        tags.input
      ) {
        service.tags.list.push(tags.input)
        service.tags.input = ""
      } else if (
        type === "description" &&
        description.inputs.langCode &&
        description.inputs.content &&
        !Object.keys(
          description.list.find(
            (desc) => desc.langCode === description.inputs.langCode
          ) || {}
        )?.length
      ) {
        service.description.list.push({
          langCode: description.inputs.langCode,
          content: description.inputs.content,
        })

        service.description.inputs.langCode = ""
        service.description.inputs.content = ""
      } else if (
        type === "contributor" &&
        contributors.inputs.name &&
        contributors.inputs.id &&
        !Object.keys(
          contributors.list.find(
            (contributor) => contributor.id === contributors.inputs.id
          ) || {}
        )?.length
      ) {
        service.contributors.list.push({
          name: contributors.inputs.name,
          id: contributors.inputs.id,
        })

        service.contributors.inputs.name = ""
        service.contributors.inputs.id = ""
      }
    },
    /**
     * Removes the target from specified data object, array or list.
     * @param {string} target The target item ID to remove from the specified list.
     * @param {string} [type=url] The object name.
     */
    removeItem(target, type = "url") {
      if (type === "url")
        this.service.url.list = this.service.url.list.filter(
          (url) => url !== target
        )
      else if (type === "tag")
        this.service.tags.list = this.service.tags.list.filter(
          (tag) => tag !== target
        )
      else if (type === "description")
        this.service.description.list = this.service.description.list.filter(
          (description) => description.langCode !== target
        )
      else if (type === "contributor")
        this.service.contributors.list = this.service.contributors.list.filter(
          (contributor) => contributor.id !== target
        )
    },
  },
}
</script>

<style lang="scss" scoped>
h1,
h2 {
  @apply text-gray-900 dark:text-gray-100;
}

p,
.span {
  @apply text-gray-800 dark:text-gray-200;
}

.scrollbar {
  @apply scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-400;

  &::-webkit-scrollbar {
    width: 6px;
  }
}

.dark .scrollbar {
  @apply scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-600;

  &::-webkit-scrollbar {
    width: 6px;
  }
}

.svg-icon {
  @apply flex-shrink-0 w-6 h-6 p-1 bg-gray-200 rounded-full cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-300;
}

.input {
  @apply focus:outline-none px-4 py-2 dark:bg-gray-700  dark:text-gray-200;

  &:not(.rounded-none) {
    @apply rounded-md;
  }

  &:not(.ring-0) {
    @apply ring-2 dark:ring-gray-800 ring-opacity-25 ring-gray-300 focus:ring-4;
  }
}
</style>
