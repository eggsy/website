<template>
  <div class="pt-6">
    <div class="space-y-8">
      <div>
        <h1 class="text-xl font-semibold">Presence Metadata Creator</h1>
        <p>
          Create a metadata.json file for your amazing and new PreMiD service
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
              class="h-56 space-y-2 overflow-y-hidden bg-gray-100 rounded-md ring dark:bg-gray-800"
            >
              <input
                v-model="service.url.input"
                class="w-full px-4 py-2 rounded-tl-md rounded-tr-md h-1/5 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                placeholder="URL(s) of the service"
                @keyup.enter="addItem('url')"
              />

              <!-- List -->
              <div class="overflow-y-auto h-4/5 scrollbar">
                <div
                  class="px-2 pb-4 space-y-1 text-gray-800 dark:text-gray-200"
                  :class="{
                    'h-full flex justify-center items-center':
                      service.url.list.length === 0,
                  }"
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

                  <div
                    v-if="service.url.list.length === 0"
                    class="text-sm text-center text-gray-500 select-none dark:text-gray-400"
                  >
                    Enter URL and hit enter
                  </div>
                </div>
              </div>
            </div>

            <!-- Tags -->
            <div
              class="h-56 space-y-2 overflow-y-hidden bg-gray-100 rounded-md ring dark:bg-gray-800"
            >
              <input
                v-model="service.tags.input"
                class="w-full px-4 py-2 rounded-tl-md rounded-tr-md h-1/5 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                placeholder="Tags for the service"
                @keyup.enter="addItem('tag')"
              />

              <!-- List -->
              <div class="overflow-y-auto h-4/5 scrollbar">
                <div
                  class="px-2 pb-4 space-y-1 text-gray-800 dark:text-gray-200"
                  :class="{
                    'h-full flex justify-center items-center':
                      service.tags.list.length === 0,
                  }"
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

                  <div
                    v-if="service.tags.list.length === 0"
                    class="text-sm text-center text-gray-500 select-none dark:text-gray-400"
                  >
                    Enter tag name and hit enter
                  </div>
                </div>
              </div>
            </div>

            <!-- Descriptions -->
            <div
              class="h-56 overflow-y-hidden bg-gray-100 rounded-md ring dark:bg-gray-800"
            >
              <div class="h-full space-y-2">
                <div class="h-1/3">
                  <input
                    v-model="service.description.inputs.langCode"
                    class="w-full px-4 py-2 rounded-tl-md rounded-tr-md h-1/2 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                    placeholder="Language code, e.g. en"
                    @keyup.enter="$refs.descriptionInput.focus()"
                  />

                  <input
                    ref="descriptionInput"
                    v-model="service.description.inputs.content"
                    class="w-full px-4 py-2 h-1/2 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                    placeholder="Localized description"
                    @keyup.enter="addItem('description')"
                  />
                </div>

                <!-- List -->
                <div class="overflow-y-auto h-2/3 scrollbar">
                  <div
                    class="px-2 pb-4 space-y-1 text-gray-800 dark:text-gray-200"
                    :class="{
                      'h-full flex justify-center items-center':
                        service.description.list.length === 0,
                    }"
                  >
                    <div
                      v-for="(description, index) in service.description.list"
                      :key="`description-${index}`"
                      class="flex items-center space-x-4"
                    >
                      <div class="flex-grow overflow-x-hidden">
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

                    <div
                      v-if="service.description.list.length === 0"
                      class="text-sm text-center text-gray-500 select-none dark:text-gray-400"
                    >
                      Fill the inputs and hit enter
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Settings -->
        <div>
          <div>
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
              Settings under this title are not necessary, only fill these if
              you know what you are doing, otherwise, you can just skip this
              section.
            </p>
          </div>

          <transition name="fade">
            <div v-if="additionalSettings === true" class="mt-4 space-y-4">
              <div class="grid gap-3 sm:grid-cols-2">
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
              </div>

              <div class="grid gap-x-3 gap-y-2 sm:grid-cols-3">
                <button
                  v-tippy="{
                    content: 'To be able to read data from iframe sources',
                    placement: 'top',
                  }"
                  :class="{
                    'input text-white transition': true,
                    'bg-green-600': service.iframe === true,
                    'bg-red-600': service.iframe === false,
                  }"
                  @click="service.iframe = !service.iframe"
                >
                  {{ service.iframe ? "Disable" : "Enable" }} Iframe Support
                </button>

                <button
                  v-tippy="{
                    content:
                      'Small warning icon that will take place next to your Presence on Store',
                    placement: 'top',
                  }"
                  :class="{
                    'input text-white transition': true,
                    'bg-green-600': service.warning === true,
                    'bg-red-600': service.warning === false,
                  }"
                  @click="service.warning = !service.warning"
                >
                  {{ service.warning ? "Disable" : "Enable" }} Warning Icon
                </button>

                <button
                  v-tippy="{
                    content:
                      'Required permission to be able to read Console entries',
                    placement: 'top',
                  }"
                  :class="{
                    'input text-white transition': true,
                    'bg-green-600': service.readLogs === true,
                    'bg-red-600': service.readLogs === false,
                  }"
                  @click="service.readLogs = !service.readLogs"
                >
                  {{ service.readLogs ? "Disable" : "Enable" }} Read Logs
                </button>
              </div>

              <div class="grid rounded-md ring sm:grid-cols-2">
                <div
                  class="h-full bg-gray-100 rounded-tl-md rounded-bl-md ring dark:bg-gray-800"
                >
                  <input
                    v-model="service.contributors.inputs.name"
                    class="w-full rounded-none rounded-tl-md h-1/2 ring-0 input"
                    placeholder="Contributor name"
                    @keyup.enter="$refs.contributorsIdInput.focus()"
                  />

                  <input
                    ref="contributorsIdInput"
                    v-model="service.contributors.inputs.id"
                    class="w-full rounded-none rounded-bl-md h-1/2 ring-0 input"
                    placeholder="Contributor ID"
                    @keyup.enter="addItem('contributor')"
                  />
                </div>

                <div
                  class="space-y-2 overflow-y-hidden bg-gray-100 rounded-tr-md rounded-br-md dark:bg-gray-800"
                >
                  <div
                    class="flex items-center h-full px-4 mx-auto space-x-6 overflow-x-auto scrollbar"
                    :class="{
                      'flex items-center justify-center w-full':
                        service.contributors.list.length === 0,
                      'py-2': service.contributors.list.length > 0,
                    }"
                  >
                    <div
                      v-for="(contributor, index) in service.contributors.list"
                      :key="`contributor-${index}`"
                      class="flex items-center flex-shrink-0 space-x-2 text-gray-900 truncate dark:text-gray-100"
                    >
                      <span class="flex-shrink-0">{{ contributor.name }}</span>
                      <icon
                        name="x"
                        title="Click to remove this tag"
                        @click.native="
                          removeItem(contributor.id, 'contributor')
                        "
                      />
                    </div>

                    <div
                      v-if="service.contributors.list.length === 0"
                      class="text-sm text-center text-gray-500 select-none dark:text-gray-400"
                    >
                      Fill the inputs and hit enter
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid rounded-md ring sm:grid-cols-2">
                <div
                  class="bg-gray-100 rounded-tl-md rounded-bl-md dark:bg-gray-800"
                >
                  <input
                    v-model="service.altnames.input"
                    class="w-full rounded-none rounded-tl-md rounded-bl-md ring-0 input"
                    placeholder="Alternative name(s), e.g. 精靈寶可夢 (Pokémon)"
                    @keyup.enter="addItem('altname')"
                  />
                </div>

                <div
                  class="space-y-2 overflow-y-hidden bg-gray-100 rounded-tr-md rounded-br-md dark:bg-gray-800"
                >
                  <div
                    class="flex items-center h-full px-4 mx-auto space-x-6 overflow-x-auto scrollbar"
                    :class="{
                      'flex items-center justify-center w-full':
                        service.contributors.list.length === 0,
                      'py-2': service.altnames.list.length > 0,
                    }"
                  >
                    <div
                      v-for="(altname, index) in service.altnames.list"
                      :key="`altname-${index}`"
                      class="flex items-center flex-shrink-0 space-x-2 text-gray-900 truncate dark:text-gray-100"
                    >
                      <span class="flex-shrink-0">{{ altname }}</span>
                      <icon
                        name="x"
                        title="Click to remove this alternative name"
                        @click.native="removeItem(altname, 'altname')"
                      />
                    </div>

                    <div
                      v-if="service.altnames.list.length === 0"
                      class="text-sm text-center text-gray-500 select-none dark:text-gray-400"
                    >
                      Enter a name and hit enter
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-2 text-sm">
                <p>
                  <strong class="font-medium">P.S.</strong> You can't configure
                  Presence Settings with this tool. You have to take a look at
                  the docs from this point. I am not able to produce it since
                  there are many possibilities and more to be added in the
                  future. It's best if you just follow the Documentation.
                </p>

                <p>
                  🐛 If you wish to report a bug, a feature request or contact
                  me in general, you can visit my website's GitHub repository
                  and leave an issue.
                </p>

                <p>
                  🎉 If you liked my work, please consider donating to see more
                  tools like this. Visit
                  <nuxt-link
                    :to="{ name: 'donate' }"
                    class="font-medium underline"
                    >donation</nuxt-link
                  >
                  page for more information.
                </p>
              </div>
            </div>
          </transition>

          <div
            class="flex-wrap items-center mt-4 space-y-2 sm:space-y-0 sm:space-x-4 sm:flex"
          >
            <div
              class="flex items-center justify-center space-x-2 control-button"
              @click="resultWindow = true"
            >
              <icon name="cog" class="w-5 h-5 no-style" />
              <span>Generate</span>
            </div>

            <div
              class="control-button"
              :class="{ 'cursor-not-allowed': importLoading === true }"
              @click="importFromStore"
            >
              <icon
                v-if="importLoading === true"
                name="sync"
                class="w-6 h-6 mx-auto animate-spin no-style"
              />

              <div v-else class="flex items-center justify-center space-x-2">
                <icon name="inbox-in" class="w-5 h-5 no-style" />
                <span>Import From Store</span>
              </div>
            </div>

            <div
              class="flex items-center justify-center space-x-2 control-button"
              @click="service = initialService"
            >
              <icon name="x" class="w-5 h-5 no-style" />
              <span>Clear</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="resultWindow === true"
      class="fixed top-0 bottom-0 left-0 right-0 hidden bg-black bg-opacity-50 sm:block"
      @click="resultWindow = false"
    />

    <transition name="slide-left" mode="out-in">
      <div
        v-if="resultWindow === true"
        class="fixed top-0 bottom-0 right-0 min-h-full overflow-y-auto bg-gray-100 scrollbar sm:shadow-md sm:ml-auto dark:bg-gray-800 sm:w-8/12"
      >
        <div class="p-4 space-y-8 sm:w-10/12 sm:p-10">
          <div class="space-y-1">
            <div
              class="flex items-center space-x-2 text-gray-900 dark:text-gray-100"
            >
              <icon name="cog" class="w-5 h-5 no-style" />
              <h2 class="text-lg font-semibold">Metadata Result</h2>
            </div>

            <p class="text-gray-800 dark:text-gray-200">
              The result of your metadata.json, you can see your issues, and
              download your config from this window. Make sure to fill every and
              each required input correctly before doing anything!
            </p>
          </div>

          <div class="space-y-1">
            <div
              class="flex items-center space-x-2 text-gray-900 dark:text-gray-100"
            >
              <icon name="exclamation-circle" class="w-5 h-5 no-style" />
              <h2 class="text-lg font-semibold">Errors</h2>
            </div>

            <div
              v-if="getMetadata.error === false"
              class="p-4 text-white bg-green-600 rounded-md"
            >
              No issues/errors found. You're good to go!
            </div>

            <div v-else class="grid gap-1 sm:grid-cols-2">
              <div
                v-for="(error, index) of getMetadata.errors"
                :key="`error-${index}`"
                class="p-4 text-white truncate bg-red-600 rounded-md"
                :class="{ 'col-span-2': getMetadata.errors.length === 1 }"
              >
                {{ error }}
              </div>
            </div>
          </div>

          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <div
                class="flex items-center space-x-2 text-gray-900 dark:text-gray-100"
              >
                <icon name="fire-solid" class="w-5 h-5 no-style" />
                <h2 class="text-lg font-semibold">Your Metadata File</h2>
              </div>
            </div>

            <!-- eslint-disable vue/no-v-html -->
            <pre
              v-if="getMetadata.error === false"
              class="w-full overflow-y-auto rounded-md shadow h-96 language-json scrollbar"
              v-html="getHighlightedJson"
            />

            <span v-else class="text-gray-800 dark:text-gray-200">
              You have to fix the errors before you can access the metadata
              JSON.
            </span>
          </div>

          <div
            class="space-y-2 sm:items-center sm:flex sm:space-y-0 sm:space-x-4"
          >
            <a
              v-if="getMetadata.error === false"
              class="flex items-center justify-center space-x-2 bg-gray-200 control-button no-background hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 sm:w-max"
              download="metadata.json"
              :href="`data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(getMetadata.result, null, 2)
              )}`"
            >
              <icon name="inbox-in" class="w-5 h-5 no-style" />
              <span>Download</span>
            </a>

            <div
              class="flex items-center justify-center space-x-2 bg-gray-200 control-button no-background hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 sm:w-max"
              @click="resultWindow = false"
            >
              <icon name="x" class="w-5 h-5 no-style" />
              <span>Close</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Prism from "prismjs"
import "prism-themes/themes/prism-coldark-dark.css"

export default {
  data() {
    const initialService = {
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
      altnames: {
        input: "",
        list: [],
      },
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
        list: [],
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
      // This won't be available to be manipulated with this tool, but if a user imports a presence with settings, we will overwrite this array.
      settings: [],
      iframe: false,
      warning: false,
      readLogs: false,
    }

    // Clone the object without letting Vue syncronize each other
    const service = JSON.parse(JSON.stringify(initialService))

    return {
      additionalSettings: false,
      importLoading: false,
      resultWindow: false,
      initialService,
      service,
    }
  },
  head() {
    const title = "Presence Metadata Creator"
    const image = "https://i.vgy.me/NZdome.png"
    const description =
      "Easy and free to use tool to create PreMiD Presence metadata files easily, without even opening your code editor!"

    return {
      title,
      link: [
        {
          rel: "canonical",
          href: "https://eggsy.xyz/projects/premid/mdcreator",
        },
      ],
      meta: this.$prepareMeta({
        title,
        description,
        image,
        keywords: "premid, custom, status",
        url: "https://eggsy.xyz/projects/premid/mdcreator",
      }),
    }
  },
  computed: {
    /**
     * Checks if any required fields are missing, returns errors or the actual metadata.
     * @returns {{error: boolean, errors: string[], result: object}} Error boolean and list of errors or metadata JSON.
     */
    getMetadata() {
      const imageRegex = {
        logo: /^https?:\/\/?(?:[a-z0-9-]+\.)*[0-9a-z_-]+(?:\.[a-z]+)+\/.*$/g,
        thumbnail: /^https?:\/\/?([a-z0-9-]+\.)*[0-9a-z_-]+(\.[a-z]+)+\/.*$/g,
      }

      const service = this.service
      const errors = []
      let object = {}

      // Check the required fields
      const requiredFields = [
        "name",
        "url",
        "logo",
        "thumbnail",
        "version",
        "color",
      ]

      for (const field of requiredFields) {
        if (!service[field]) errors.push(`Missing field: ${field}`)
      }

      // Check if service has URL
      if (service.url.list.length === 0) errors.push("Missing field: url")

      // Check if service has a description and one English one
      if (service.description.list.length === 0)
        errors.push("Missing field: description")
      else if (!service.description.list.find((d) => d.langCode === "en"))
        errors.push("Missing field: english description")

      // Check if images match the pattern
      if (service.logo && imageRegex.logo.test(service.logo) === false)
        errors.push("Not an image: logo")
      if (
        service.thumbnail &&
        imageRegex.thumbnail.test(service.thumbnail) === false
      )
        errors.push("Not an image: thumbnail")

      // Check if required field objects missing any keys
      if (!service.author.name) errors.push("Missing field: author name")
      if (!service.author.id) errors.push("Missing field: author id")
      if (service.category.selected === "Select a category")
        errors.push("Missing field: category")

      // Check if service version is in the allowed format
      if (
        service.version &&
        service.version.split(".").filter((i) => i).length !== 3
      )
        errors.push("Wrong versioning format")

      if (errors.length === 0) {
        object = {
          $schema: "https://schemas.premid.app/metadata/1.3",
          service: service.name,
          author: service.author,
          category: service.category.selected.toLowerCase(),
          logo: service.logo,
          thumbnail: service.thumbnail,
          version: service.version,
          color: service.color,
        }

        if (service.tags.list.length > 0) object.tags = service.tags.list
        if (service.altnames.list.length > 0)
          object.altnames = service.altnames.list

        if (service.regexp.url) object.regExp = service.regexp.url
        if (service.regexp.iframe) object.iFrameRegExp = service.regexp.iframe

        if (service.url.list.length === 1) object.url = service.url.list[0]
        else object.url = service.url.list

        const descriptionObject = {}
        for (const description of service.description.list) {
          descriptionObject[description.langCode] = description.content
        }

        object.description = descriptionObject

        if (service.settings.length > 0) object.settings = service.settings
        if (service.contributors.list.length > 0)
          object.contributors = service.contributors.list

        if (service.iframe === true) object.iframe = true
        if (service.warning === true) object.warning = true
        if (service.readLogs === true) object.readLogs = true
      }

      return {
        error: errors.length > 0,
        result: object,
        errors,
      }
    },
    /**
     * Returns highlihted string of HTML elements using PrismJS
     * @returns {string} Highlighted strings as HTML elements.
     */
    getHighlightedJson() {
      return Prism.highlight(
        JSON.stringify(this.getMetadata.result, null, 2),
        Prism.languages.javascript,
        "json"
      )
    },
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

      const altnames = {
        input: service.altnames.input,
        list: service.altnames.list,
      }

      const contributors = {
        inputs: {
          name: service.contributors.inputs.name,
          id: service.contributors.inputs.id,
        },
        list: service.contributors.list,
      }

      try {
        if (
          type === "url" &&
          !url.list.includes(new URL(url.input).hostname) &&
          url.input
        ) {
          const testUrl = new URL(url.input)
          service.url.list.push(testUrl.hostname)
          service.url.input = ""
        } else if (
          type === "tag" &&
          !tags.list.includes(tags.input) &&
          tags.input
        ) {
          const tag = tags.input.replace(/\s/g, "-")
          service.tags.list.push(tag)
          service.tags.input = ""
        } else if (
          type === "altname" &&
          altnames.input &&
          !altnames.list.includes(altnames.input)
        ) {
          service.altnames.list.push(altnames.input)
          service.altnames.input = ""
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
      } catch (err) {
        alert(err.message)
        console.error(err)
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
      else if (type === "altname")
        this.service.altnames.list = this.service.altnames.list.filter(
          (altname) => altname !== target
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
    /**
     * Fetches data from PreMiD API and appends to the Vue data.
     */
    async importFromStore() {
      const input = prompt(
        "Enter the name of the Presence you want to import. Name should match the capitalization of the original name."
      )
      if (!input) return

      this.importLoading = true
      const api = `https://api.premid.app/v2/presences/${encodeURI(
        input
      )}/metadata.json`

      try {
        const { data } = await this.$axios.get(api)
        if (data.error !== undefined || !data.metadata) return

        const metadata = data?.metadata

        this.service.name = metadata.service
        this.service.author = metadata.author
        this.service.version = metadata.version

        this.service.settings = metadata.settings || []
        this.service.category.selected = metadata.category
          ? `${metadata.category?.[0]?.toUpperCase()}${metadata.category
              ?.slice(1)
              ?.toLowerCase()}`
          : "Select a category"

        this.service.logo = metadata.logo || ""
        this.service.thumbnail = metadata.thumbnail || ""
        this.service.color = metadata.color || ""

        this.service.tags.list = metadata.tags || []
        this.service.contributors.list = metadata.contributors || []
        this.service.altnames.list = metadata.altnames || []
        this.service.description.list = this.parseDescriptionObject(
          metadata.description
        )

        this.service.regexp.url = metadata.regExp || ""
        this.service.regexp.iframe = metadata.iFrameRegExp || ""

        this.service.readLogs = metadata.readLogs || false
        this.service.warning = metadata.warning || false

        if (typeof metadata.url === "string")
          this.service.url.list.push(metadata.url)
        else if (typeof metadata.url === "object")
          this.service.url.list = metadata.url

        this.importLoading = false
      } catch (err) {
        this.importLoading = false
        console.error(err)
      }
    },
    /**
     * Loops through the object and converts it to local array format.
     * @param {object} object Original PreMiD metadata description object.
     * @returns {Array.<{ langCode: string, description: string }>}
     */
    parseDescriptionObject(object) {
      const inLocaleDataFormat = []

      for (const key in object)
        inLocaleDataFormat.push({
          langCode: key,
          content: object[key],
        })

      return inLocaleDataFormat
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

.control-button {
  @apply px-4 py-2 rounded text-gray-900 select-none dark:text-gray-100 ring-1 ring-gray-200 dark:ring-gray-700;

  &:not(.no-background) {
    @apply bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700;
  }

  &:not(.cursor-not-allowed) {
    @apply cursor-pointer;
  }
}

.svg-icon:not(.no-style) {
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

.ring {
  @apply ring-2 ring-gray-300 dark:ring-gray-700;

  &:not(.no-opacity) {
    @apply ring-opacity-25;
  }
}
</style>
