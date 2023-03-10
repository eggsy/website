<script lang="ts">
import Vue from "vue"

/* Import third-party modules */
import { highlight, languages } from "prismjs"
import "prism-themes/themes/prism-coldark-dark.css"

/* Interfaces */
import type { PresenceMetadata, PresenceSetting } from "@/types/PreMiD"

interface Metadata {
  error: boolean
  errors: string[]
  result: PresenceMetadata
}

export default Vue.extend({
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
        list: [] as Array<{ id: string; name: string }>,
      },
      name: "",
      altnames: {
        input: "",
        list: [] as string[],
      },
      category: {
        selected: "Select a category",
        options: ["Anime", "Games", "Music", "Socials", "Videos", "Other"],
      },
      description: {
        inputs: {
          langCode: "",
          content: "",
        },
        list: [] as Array<{ langCode: string; content: string }>,
      },
      version: "1.0.0",
      logo: "",
      thumbnail: "",
      color: "",
      url: {
        input: "",
        list: [] as string[],
      },
      tags: {
        input: "",
        list: [] as string[],
      },
      regexp: {
        url: null as RegExp | null,
        iframe: null as RegExp | null,
      },
      // This won't be available to be manipulated with this tool, but if a user imports a presence with settings, we will overwrite this array.
      settings: [] as PresenceSetting[],
      iframe: false,
      warning: false,
      readLogs: false,
    }

    // Clone the object without letting Vue syncronize each other
    const service = Object.assign({}, initialService)

    return {
      lastSchemaUrl: "https://schemas.premid.app/metadata/1.6",
      additionalSettings: false,
      importLoading: false,
      resultWindow: false,
      initialService,
      service,
    }
  },
  fetchOnServer: false,
  async fetch() {
    // Fetch latest schema version and update the lastSchemaUrl
    const versions: { name: string }[] = (
      await this.$axios.get(
        "https://api.github.com/repos/PreMiD/Schemas/contents/schemas/metadata"
      )
    ).data

    const filteredVersions = versions
      .filter((c) => c.name?.endsWith(".json"))
      .map((c) => c.name?.replace(".json", ""))

    const lastSchemaVersion = filteredVersions?.pop()

    if (lastSchemaVersion)
      this.lastSchemaUrl = `https://schemas.premid.app/metadata/${lastSchemaVersion}`
  },
  head() {
    const title = "Presence Metadata Creator"
    const image = "https://i.imgur.com/CuVtvKW.png"
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
     * @returns {Metadata} Error boolean and list of errors or metadata JSON.
     */
    getMetadata(): Metadata {
      const imageRegex = {
        logo: /^https?:\/\/?(?:[a-z0-9-]+\.)*[0-9a-z_-]+(?:\.[a-z]+)+\/.*$/g,
        thumbnail: /^https?:\/\/?([a-z0-9-]+\.)*[0-9a-z_-]+(\.[a-z]+)+\/.*$/g,
      }

      const service = this.service
      const errors: string[] = []
      let object: any = {}

      // Check the required fields
      const requiredFields: Array<
        "name" | "url" | "logo" | "thumbnail" | "version" | "color"
      > = ["name", "url", "logo", "thumbnail", "version", "color"]

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
          $schema: this.lastSchemaUrl,
          author: service.author,
          contributors: service.contributors.list.length
            ? service.contributors.list
            : null,
          service: service.name,
          altnames: service.altnames.list.length ? service.altnames.list : null,
          description: {},
          url:
            service.url.list.length === 1
              ? service.url.list[0]
              : service.url.list,
          regExp: service.regexp.url,
          version: service.version,
          logo: service.logo,
          thumbnail: service.thumbnail,
          color: service.color,
          category: service.category.selected.toLowerCase(),
          tags: service.tags.list.length ? service.tags.list : null,
          iframe: service.iframe,
          iFrameRegExp: service.regexp.iframe,
          readLogs: service.readLogs,
          settings: service.settings.length ? service.settings : null,
        }

        const descriptionObject: { [lang: string]: string } = {
          en: service.description.list.find((d) => d.langCode === "en")!
            .content,
        }

        for (const description of service.description.list.filter(
          (d) => d.langCode !== "en"
        )) {
          descriptionObject[description.langCode] = description.content
        }

        object.description = descriptionObject

        for (const [k, v] of Object.entries(object)) if (!v) delete object[k]
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
    getHighlightedJson(): string {
      return highlight(
        JSON.stringify(this.getMetadata.result, null, 2),
        languages.javascript,
        "json"
      )
    },
  },
  methods: {
    /**
     * Adds item to specified data object, array or list.
     * @param {string} [type=url] The object name.
     */
    addItem(type: string = "url"): void {
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
        list: service.description.list,
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
    removeItem(target: string, type: string = "url"): void {
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
    async importFromStore(): Promise<void> {
      const input = prompt(
        "Enter the name of the Presence you want to import. Name should match the capitalization of the original name."
      )
      if (!input) return

      this.importLoading = true

      try {
        const { data } = (await this.$axios.post("https://api.premid.app/v3/", {
          query: `
              query {
                presences(service: "${input}", limit: 1) {
                  metadata {
                    service,
                    author {id, name},
                    version,
                    settings {id,title,icon,if{propretyNames,,patternProprties}placeholder,value,values,multiLanguage}
                    category,
                    logo,
                    thumbnail,
                    color,
                    tags,
                    contributors {id, name},
                    altnames,
                    description,
                    regExp,
                    url,
                    iframeRegExp,
                    iframe,
                    readLogs,
                    warning,
                  }
                }
              }
            `,
        })) as {
          data: { data: { presences: { metadata: PresenceMetadata }[] } }
        }

        const metadata = data?.data?.presences[0]?.metadata

        if (!metadata) {
          this.importLoading = false
          return
        }

        this.resetService()

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

        this.service.regexp.url = metadata.regExp || null
        this.service.regexp.iframe = metadata.iFrameRegExp || null

        this.service.iframe = metadata.iframe || false
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
    parseDescriptionObject(
      object: Record<string, string>
    ): Array<{ langCode: string; content: string }> {
      const inLocaleDataFormat = []

      for (const key in object)
        inLocaleDataFormat.push({
          langCode: key,
          content: object[key],
        })

      return inLocaleDataFormat
    },
    /**
     * Resets all values in the service object.
     */
    resetService() {
      this.service = this.initialService

      // I have to manually reset these for some reason
      this.service.url.list = []
      this.service.tags.list = []
      this.service.description.list = []
      this.service.contributors.list = []
      this.service.altnames.list = []

      this.service.category.selected = "Select a category"

      this.service.regexp.iframe = null
      this.service.regexp.url = null

      this.service.iframe = false
      this.service.warning = false
      this.service.readLogs = false
    },
  },
})
</script>

<template>
  <div class="pt-6">
    <div class="space-y-8">
      <div class="py-8">
        <Title size="2">Presence Metadata Creator</Title>

        <p class="mt-4">
          Create a metadata.json file for your amazing and new PreMiD service
          with an easy to use and free graphical user interface! Worry. You will
          still need to code the presence to get it working! Machines can't do
          everything 😅
        </p>
      </div>

      <div class="space-y-12 mt-2">
        <!-- Author Information -->
        <div>
          <Title>Author Information</Title>

          <div class="mt-1 grid gap-3 sm:grid-cols-2">
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
          <Title>Service Information</Title>

          <div class="mt-1 grid gap-3 sm:grid-cols-2">
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

          <div class="mt-3 grid gap-3 grid-cols-2">
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
                class="top-0 right-0 bottom-0 left-0 absolute invisible"
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

          <div class="mt-3 grid gap-3 sm:grid-cols-3">
            <!-- URLs -->
            <div
              class="rounded-md space-y-2 bg-gray-100 h-56 ring overflow-y-hidden dark:bg-neutral-800"
            >
              <input
                v-model="service.url.input"
                class="rounded-tl-md rounded-tr-md h-1/5 w-full py-2 px-4 dark:(bg-neutral-700 text-gray-200) focus:outline-none"
                placeholder="URL(s) of the service"
                @keyup.enter="addItem('url')"
              />

              <!-- List -->
              <div class="h-4/5 overflow-y-auto scrollbar">
                <div
                  class="space-y-1 px-2 pb-4 text-gray-800 dark:text-gray-200"
                  :class="{
                    'h-full flex justify-center items-center':
                      service.url.list.length === 0,
                  }"
                >
                  <div
                    v-for="(url, index) in service.url.list"
                    :key="`url-${index}`"
                    class="flex space-x-4 items-center"
                  >
                    <span class="flex-grow truncate">{{ url }}</span>

                    <IconX
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
              class="rounded-md space-y-2 bg-gray-100 h-56 ring overflow-y-hidden dark:bg-neutral-800"
            >
              <input
                v-model="service.tags.input"
                class="rounded-tl-md rounded-tr-md h-1/5 w-full py-2 px-4 dark:(bg-neutral-700 text-gray-200) focus:outline-none"
                placeholder="Tags for the service"
                @keyup.enter="addItem('tag')"
              />

              <!-- List -->
              <div class="h-4/5 overflow-y-auto scrollbar">
                <div
                  class="space-y-1 px-2 pb-4 text-gray-800 dark:text-gray-200"
                  :class="
                    service.tags.list.length === 0 &&
                    'h-full flex justify-center items-center'
                  "
                >
                  <div
                    v-for="(tag, index) in service.tags.list"
                    :key="`tag-${index}`"
                    class="flex space-x-4 items-center"
                  >
                    <span class="flex-grow truncate">{{ tag }}</span>

                    <IconX
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
              class="rounded-md bg-gray-100 h-56 ring overflow-y-hidden dark:bg-neutral-800"
            >
              <div class="h-full space-y-2">
                <div class="h-1/3">
                  <input
                    v-model="service.description.inputs.langCode"
                    class="rounded-tl-md rounded-tr-md h-1/2 w-full py-2 px-4 dark:(bg-neutral-700 text-gray-200) focus:outline-none"
                    placeholder="Language code, e.g. en"
                    @keyup.enter="$refs.descriptionInput.focus()"
                  />

                  <input
                    ref="descriptionInput"
                    v-model="service.description.inputs.content"
                    class="h-1/2 w-full py-2 px-4 dark:(bg-neutral-700 text-gray-200) focus:outline-none"
                    placeholder="Localized description"
                    @keyup.enter="addItem('description')"
                  />
                </div>

                <!-- List -->
                <div class="h-2/3 overflow-y-auto scrollbar">
                  <div
                    class="space-y-1 px-2 pb-4 text-gray-800 dark:text-gray-200"
                    :class="{
                      'h-full flex justify-center items-center':
                        service.description.list.length === 0,
                    }"
                  >
                    <div
                      v-for="(description, index) in service.description.list"
                      :key="`description-${index}`"
                      class="flex space-x-4 items-center"
                    >
                      <div class="flex-grow overflow-x-hidden">
                        <span class="truncate">{{ description.langCode }}</span>

                        <p class="text-xs line-clamp-2">
                          {{ description.content }}
                        </p>
                      </div>

                      <IconX
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
        <div class="space-y-8">
          <div>
            <Title>
              Additional Settings
              <span
                class="cursor-pointer font-normal text-xs hover:underline"
                @click="additionalSettings = !additionalSettings"
                >－ {{ additionalSettings ? "hide" : "show" }}</span
              >
            </Title>

            <p class="mt-4">
              Settings under this title are not necessary, only fill these if
              you know what you are doing, otherwise, you can just skip this
              section.
            </p>
          </div>

          <transition name="fade" mode="out-in">
            <div v-if="additionalSettings === true" class="space-y-6 mt-4">
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
                <Button
                  v-tippy="{
                    content: 'To be able to read data from iframe sources',
                    placement: 'top',
                  }"
                  block
                  @click.native="service.iframe = !service.iframe"
                >
                  {{ service.iframe ? "Disable" : "Enable" }} Iframe Support
                </Button>

                <Button
                  v-tippy="{
                    content:
                      'Small warning icon that will take place next to your Presence on Store',
                  }"
                  block
                  :elevated="service.warning"
                  @click.native="service.warning = !service.warning"
                >
                  {{ service.warning ? "Disable" : "Enable" }} Warning Icon
                </Button>

                <Button
                  v-tippy="{
                    content:
                      'Required permission to be able to read Console entries',
                  }"
                  block
                  :elevated="service.readLogs"
                  @click.native="service.readLogs = !service.readLogs"
                >
                  {{ service.readLogs ? "Disable" : "Enable" }} Read Logs
                </Button>
              </div>

              <div class="rounded-md ring grid sm:grid-cols-2">
                <div
                  class="rounded-tl-md rounded-bl-md h-full bg-gray-100 ring dark:bg-neutral-800"
                >
                  <input
                    v-model="service.contributors.inputs.name"
                    class="rounded-none rounded-tl-md h-1/2 w-full ring-0 input"
                    placeholder="Contributor name"
                    @keyup.enter="$refs.contributorsIdInput.focus()"
                  />

                  <input
                    ref="contributorsIdInput"
                    v-model="service.contributors.inputs.id"
                    class="rounded-none rounded-bl-md h-1/2 w-full ring-0 input"
                    placeholder="Contributor ID"
                    @keyup.enter="addItem('contributor')"
                  />
                </div>

                <div
                  class="rounded-tr-md rounded-br-md space-y-2 bg-gray-100 overflow-y-hidden dark:bg-neutral-800"
                >
                  <div
                    class="flex h-full mx-auto space-x-6 px-4 items-center overflow-x-auto scrollbar"
                    :class="{
                      'flex items-center justify-center w-full':
                        service.contributors.list.length === 0,
                      'py-2': service.contributors.list.length > 0,
                    }"
                  >
                    <div
                      v-for="(contributor, index) in service.contributors.list"
                      :key="`contributor-${index}`"
                      class="flex space-x-2 flex-shrink-0 text-gray-900 items-center truncate dark:text-gray-100"
                    >
                      <span class="flex-shrink-0">{{ contributor.name }}</span>
                      <IconX
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

              <div class="rounded-md ring grid sm:grid-cols-2">
                <div
                  class="rounded-tl-md rounded-bl-md bg-gray-100 dark:bg-neutral-800"
                >
                  <input
                    v-model="service.altnames.input"
                    class="rounded-none rounded-tl-md rounded-bl-md w-full ring-0 input"
                    placeholder="Alternative name(s), e.g. 精靈寶可夢 (Pokémon)"
                    @keyup.enter="addItem('altname')"
                  />
                </div>

                <div
                  class="rounded-tr-md rounded-br-md space-y-2 bg-gray-100 overflow-y-hidden dark:bg-neutral-800"
                >
                  <div
                    class="flex h-full mx-auto space-x-6 px-4 items-center overflow-x-auto scrollbar"
                    :class="{
                      'flex items-center justify-center w-full':
                        service.contributors.list.length === 0,
                      'py-2': service.altnames.list.length > 0,
                    }"
                  >
                    <div
                      v-for="(altname, index) in service.altnames.list"
                      :key="`altname-${index}`"
                      class="flex space-x-2 flex-shrink-0 text-gray-900 items-center truncate dark:text-gray-100"
                    >
                      <span class="flex-shrink-0">{{ altname }}</span>
                      <IconX
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

              <div class="space-y-4 text-sm">
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
                  <SmartLink
                    :href="{ name: 'donate' }"
                    class="font-medium underline"
                    >donation</SmartLink
                  >
                  {{ "" }} page for more information.
                </p>
              </div>
            </div>
          </transition>

          <div
            class="flex-wrap space-y-2 mt-4 items-center sm:(flex space-y-0 space-x-4)"
          >
            <Button icon="IconCog" @click.native="resultWindow = true">
              Generate
            </Button>

            <Button
              icon="IconInbox"
              :disabled="importLoading === true"
              @click.native="importFromStore"
            >
              {{ importLoading ? "Importing..." : "Import From Store" }}
            </Button>

            <Button icon="IconX" @click.native="resetService"> Clear </Button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="resultWindow === true"
      class="bg-black bg-opacity-50 top-0 right-0 bottom-0 left-0 fixed hidden sm:block"
      @click="resultWindow = false"
    />

    <transition name="slide-left" mode="out-in">
      <div
        v-show="resultWindow === true"
        class="min-h-full bg-gray-100 top-0 right-0 bottom-0 fixed overflow-y-auto scrollbar sm:(ml-auto shadow-md w-8/12) dark:bg-neutral-900"
      >
        <div class="space-y-8 p-2 sm:(py-10 px-8) sm:w-10/12">
          <div class="space-y-1">
            <Title class="flex space-x-2 items-center">
              <IconCog class="h-5 w-5 no-style" />
              <span>Metadata Result</span>
            </Title>

            <p class="!text-black/50 pt-4 block !dark:text-white/30">
              The result of your metadata.json, you can see your issues, and
              download your config from this window. Make sure to fill every and
              each required input correctly before doing anything!
            </p>
          </div>

          <div class="space-y-4">
            <Title class="flex space-x-2 items-center">
              <IconExclamation class="h-5 w-5 no-style" />
              <span>Errors</span>
            </Title>

            <BlogNotification v-if="getMetadata.error === false" type="success">
              No issues/errors found. You're good to go!
            </BlogNotification>

            <div v-else class="grid gap-2 sm:grid-cols-2">
              <Card
                v-for="(error, index) of getMetadata.errors"
                :key="`error-${index}`"
                :class="{ 'col-span-2': getMetadata.errors.length === 1 }"
                type="danger"
              >
                🚨 {{ error }}
              </Card>
            </div>
          </div>

          <div class="space-y-1">
            <Title class="flex space-x-2 items-center">
              <IconFire class="h-5 w-5 no-style" />
              <span>Your Metadata File </span>
            </Title>

            <!-- eslint-disable vue/no-v-html -->
            <pre
              v-if="getMetadata.error === false"
              class="rounded-md h-96 shadow w-full overflow-y-auto language-json scrollbar"
              v-html="getHighlightedJson"
            />

            <span v-else class="text-black/50 pt-4 block dark:text-white/30">
              You have to fix the errors before you can access the metadata
              JSON.
            </span>
          </div>

          <div class="space-y-2 sm:(flex space-y-0 space-x-4 items-center)">
            <Button
              v-if="getMetadata.error === false"
              icon="IconInbox"
              download="metadata.json"
              :href="`data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(getMetadata.result, null, 2)
              )}`"
            >
              Download
            </Button>

            <Button icon="IconX" @click.native="resultWindow = false">
              <span>Close</span>
            </Button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
p,
.span {
  @apply text-black/50 dark:text-white/30;
}

svg:not(.no-style) {
  @apply rounded-full cursor-pointer bg-gray-200 flex-shrink-0 h-6 p-1 w-6 dark:(bg-neutral-800 hover:bg-neutral-700) hover:bg-gray-300;
}

.input {
  @apply bg-black/5 transition-colors dark:(bg-white/10 text-white/70 placeholder-white/30) text-black/70 text-sm px-4 py-2 placeholder-black/50 outline-none border border-transparent;

  &:not(.rounded-none) {
    @apply rounded-lg;
  }

  &:not(.ring-0) {
    @apply focus:border-black/10 dark:focus:border-white/10;
  }
}

pre[class*="language-"] {
  @apply bg-white/5 rounded-lg;
}

.ring {
  @apply ring-1 ring-black/10 dark:ring-white/10;
}
</style>
