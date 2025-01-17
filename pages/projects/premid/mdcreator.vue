<script setup lang="ts">
/* Interfaces */
import type { PresenceMetadata, PresenceSetting } from "~/types/PreMiD"

interface Metadata {
  error: boolean
  errors: string[]
  result: PresenceMetadata
}

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

const { $prepareMeta } = useNuxtApp()

const service = ref(Object.assign({}, initialService))

const color = ref<HTMLInputElement>()
const descriptionInput = ref<HTMLInputElement>()
const contributorsIdInput = ref<HTMLInputElement>()

const state = reactive({
  lastSchemaUrl: "https://schemas.premid.app/metadata/1.10",
  additionalSettings: false,
  importLoading: false,
  resultWindow: false,
})

// Fetch schema version

onMounted(async () => {
  const versions: { name: string }[] = await fetch(
    "https://api.github.com/repos/PreMiD/Schemas/contents/schemas/metadata",
  ).then((res) => res.json())

  const filteredVersions = versions
    .filter((c) => c.name?.endsWith(".json"))
    .map((c) => c.name?.replace(".json", ""))

  const lastSchemaVersion = filteredVersions?.pop()

  state.lastSchemaUrl = lastSchemaVersion
    ? `https://schemas.premid.app/metadata/${lastSchemaVersion}`
    : "https://schemas.premid.app/metadata/1.10"
})

useHead(() => {
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
    meta: $prepareMeta({
      title,
      description,
      image,
      keywords: "premid, custom, status",
      url: "https://eggsy.xyz/projects/premid/mdcreator",
    }),
  }
})

const getMetadata = computed((): Metadata => {
  const imageRegex = {
    logo: /^https?:\/\/?(?:[a-z0-9-]+\.)*[0-9a-z_-]+(?:\.[a-z]+)+\/.*$/g,
    thumbnail: /^https?:\/\/?([a-z0-9-]+\.)*[0-9a-z_-]+(\.[a-z]+)+\/.*$/g,
  }

  const errors: string[] = []
  let object: any = {}

  // Check required fields
  const requiredFields = [
    "name",
    "url",
    "logo",
    "thumbnail",
    "version",
    "color",
  ]

  for (const field of requiredFields) {
    if (!service.value[field as keyof typeof service.value])
      errors.push(`Missing field: ${field}`)
  }

  // Check if service has URL
  if (service.value.url.list.length === 0) errors.push("Missing field: url")

  // Check if service has description and English one
  if (service.value.description.list.length === 0)
    errors.push("Missing field: description")
  else if (!service.value.description.list.find((d) => d.langCode === "en"))
    errors.push("Missing field: english description")

  // Check if images match pattern
  if (service.value.logo && imageRegex.logo.test(service.value.logo) === false)
    errors.push("Not an image: logo")
  if (
    service.value.thumbnail &&
    imageRegex.thumbnail.test(service.value.thumbnail) === false
  )
    errors.push("Not an image: thumbnail")

  // Check required field objects
  if (!service.value.author.name) errors.push("Missing field: author name")
  if (!service.value.author.id) errors.push("Missing field: author id")
  if (service.value.category.selected === "Select a category")
    errors.push("Missing field: category")

  // Check version format
  if (
    service.value.version &&
    service.value.version.split(".").filter((i) => i).length !== 3
  )
    errors.push("Wrong versioning format")

  if (errors.length === 0) {
    object = {
      $schema: state.lastSchemaUrl,
      author: service.value.author,
      contributors: service.value.contributors.list.length
        ? service.value.contributors.list
        : null,
      service: service.value.name,
      altnames: service.value.altnames.list.length
        ? service.value.altnames.list
        : null,
      description: {},
      url:
        service.value.url.list.length === 1
          ? service.value.url.list[0]
          : service.value.url.list,
      regExp: service.value.regexp.url,
      version: service.value.version,
      logo: service.value.logo,
      thumbnail: service.value.thumbnail,
      color: service.value.color,
      category: service.value.category.selected.toLowerCase(),
      tags: service.value.tags.list.length ? service.value.tags.list : null,
      iframe: service.value.iframe,
      iFrameRegExp: service.value.regexp.iframe,
      readLogs: service.value.readLogs,
      settings: service.value.settings.length ? service.value.settings : null,
    }

    const descriptionObject: { [lang: string]: string } = {
      en: service.value.description.list.find((d) => d.langCode === "en")!
        .content,
    }

    for (const description of service.value.description.list.filter(
      (d) => d.langCode !== "en",
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
})

const addItem = (type: string = "url") => {
  const { url, tags, description, altnames, contributors } = service.value

  try {
    if (
      type === "url" &&
      !url.list.includes(new URL(url.input).hostname) &&
      url.input
    ) {
      const testUrl = new URL(url.input)
      url.list.push(testUrl.hostname)
      url.input = ""
    } else if (
      type === "tag" &&
      !tags.list.includes(tags.input) &&
      tags.input
    ) {
      const tag = tags.input.replace(/\s/g, "-")
      tags.list.push(tag)
      tags.input = ""
    } else if (
      type === "altname" &&
      altnames.input &&
      !altnames.list.includes(altnames.input)
    ) {
      altnames.list.push(altnames.input)
      altnames.input = ""
    } else if (
      type === "description" &&
      description.inputs.langCode &&
      description.inputs.content &&
      !Object.keys(
        description.list.find(
          (desc) => desc.langCode === description.inputs.langCode,
        ) || {},
      )?.length
    ) {
      description.list.push({
        langCode: description.inputs.langCode,
        content: description.inputs.content,
      })

      description.inputs.langCode = ""
      description.inputs.content = ""
    } else if (
      type === "contributor" &&
      contributors.inputs.name &&
      contributors.inputs.id &&
      !Object.keys(
        contributors.list.find(
          (contributor) => contributor.id === contributors.inputs.id,
        ) || {},
      )?.length
    ) {
      contributors.list.push({
        name: contributors.inputs.name,
        id: contributors.inputs.id,
      })

      contributors.inputs.name = ""
      contributors.inputs.id = ""
    }
  } catch (err) {
    if (err instanceof Error) {
      alert(err.message)
      console.error(err)
    }
  }
}

const removeItem = (target: string, type: string = "url") => {
  if (type === "url")
    service.value.url.list = service.value.url.list.filter(
      (url) => url !== target,
    )
  else if (type === "tag")
    service.value.tags.list = service.value.tags.list.filter(
      (tag) => tag !== target,
    )
  else if (type === "altname")
    service.value.altnames.list = service.value.altnames.list.filter(
      (altname) => altname !== target,
    )
  else if (type === "description")
    service.value.description.list = service.value.description.list.filter(
      (description) => description.langCode !== target,
    )
  else if (type === "contributor")
    service.value.contributors.list = service.value.contributors.list.filter(
      (contributor) => contributor.id !== target,
    )
}

const importFromStore = async () => {
  const input = prompt(
    "Enter the name of the Presence you want to import. Name should match the capitalization of the original name.",
  )

  if (!input) return

  state.importLoading = true

  try {
    const { data } = (await fetch("https://api.premid.app/v3/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
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
            }`,
      }),
    }).then((res) => res.json())) as {
      data: { data: { presences: { metadata: PresenceMetadata }[] } }
    }

    const metadata = data?.data?.presences[0]?.metadata

    if (!metadata) {
      state.importLoading = false
      return
    }

    resetService()

    service.value.name = metadata.service
    service.value.author = metadata.author
    service.value.version = metadata.version

    service.value.settings = metadata.settings || []
    service.value.category.selected = metadata.category
      ? `${metadata.category?.[0]?.toUpperCase()}${metadata.category
          ?.slice(1)
          ?.toLowerCase()}`
      : "Select a category"

    service.value.logo = metadata.logo || ""
    service.value.thumbnail = metadata.thumbnail || ""
    service.value.color = metadata.color || ""

    service.value.tags.list = metadata.tags || []
    service.value.contributors.list = metadata.contributors || []
    service.value.altnames.list = metadata.altnames || []
    service.value.description.list = parseDescriptionObject(
      metadata.description,
    )

    service.value.regexp.url = metadata.regExp || null
    service.value.regexp.iframe = metadata.iFrameRegExp || null

    service.value.iframe = metadata.iframe || false
    service.value.readLogs = metadata.readLogs || false
    service.value.warning = metadata.warning || false

    if (typeof metadata.url === "string")
      service.value.url.list.push(metadata.url)
    else if (typeof metadata.url === "object")
      service.value.url.list = metadata.url

    state.importLoading = false
  } catch (err) {
    state.importLoading = false
    console.error(err)
  }
}

const parseDescriptionObject = (object: Record<string, string>) => {
  const inLocaleDataFormat = []

  for (const key in object)
    inLocaleDataFormat.push({
      langCode: key,
      content: object[key],
    })

  return inLocaleDataFormat
}

const resetService = () => {
  service.value = Object.assign({}, initialService)

  // Manually reset these
  service.value.url.list = []
  service.value.tags.list = []
  service.value.description.list = []
  service.value.contributors.list = []
  service.value.altnames.list = []

  service.value.category.selected = "Select a category"

  service.value.regexp.iframe = null
  service.value.regexp.url = null

  service.value.iframe = false
  service.value.warning = false
  service.value.readLogs = false
}
</script>

<template>
  <PageLayout
    title="Presence Metadata Creator"
    description="Create a metadata.json file for your amazing and new PreMiD service with an easy to use and free graphical user interface! Worry. You will still need to code the presence to get it working! Machines can't do everything 😅"
  >
    <div class="space-y-12 mt-2">
      <!-- Author Information -->
      <div>
        <PageTitle>Author Information</PageTitle>

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
        <PageTitle>Service Information</PageTitle>

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
              @click="color?.click()"
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
              class="rounded-tl-md rounded-tr-md h-1/5 w-full py-2 px-4 dark:bg-neutral-700 dark:text-gray-200 focus:outline-none"
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

                  <Icon
                    name="mdi:times"
                    title="Click to remove this URL"
                    @click="removeItem(url, 'url')"
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
              class="rounded-tl-md rounded-tr-md h-1/5 w-full py-2 px-4 dark:bg-neutral-700 dark:text-gray-200 focus:outline-none"
              placeholder="Tags for the service"
              @keyup.enter="addItem('tag')"
            />

            <!-- List -->
            <div class="h-4/5 overflow-y-auto scrollbar">
              <div
                class="space-y-1 px-2 pb-4 text-gray-800 dark:text-gray-200"
                :class="{
                  'h-full flex justify-center items-center':
                    service.tags.list.length === 0,
                }"
              >
                <div
                  v-for="(tag, index) in service.tags.list"
                  :key="`tag-${index}`"
                  class="flex space-x-4 items-center"
                >
                  <span class="flex-grow truncate">{{ tag }}</span>

                  <Icon
                    name="mdi:times"
                    title="Click to remove this tag"
                    @click="removeItem(tag, 'tag')"
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
                  class="rounded-tl-md rounded-tr-md h-1/2 w-full py-2 px-4 dark:bg-neutral-700 dark:text-gray-200 focus:outline-none"
                  placeholder="Language code, e.g. en"
                  @keyup.enter="descriptionInput?.focus()"
                />

                <input
                  ref="descriptionInput"
                  v-model="service.description.inputs.content"
                  class="h-1/2 w-full py-2 px-4 dark:bg-neutral-700 dark:text-gray-200 focus:outline-none"
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

                    <Icon
                      name="mdi:times"
                      @click="removeItem(description.langCode, 'description')"
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
          <PageTitle>
            Additional Settings
            <span
              class="cursor-pointer font-normal text-xs hover:underline"
              @click="state.additionalSettings = !state.additionalSettings"
              >－ {{ state.additionalSettings ? "hide" : "show" }}</span
            >
          </PageTitle>

          <p class="mt-4">
            Settings under this title are not necessary, only fill these if you
            know what you are doing, otherwise, you can just skip this section.
          </p>
        </div>

        <transition name="fade" mode="out-in">
          <div v-if="state.additionalSettings" class="space-y-6 mt-4">
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
                @click="service.warning = !service.warning"
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
                  @keyup.enter="contributorsIdInput?.focus()"
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
                    <Icon
                      name="mdi:times"
                      title="Click to remove this tag"
                      @click="removeItem(contributor.id, 'contributor')"
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
                    <Icon
                      name="mdi:times"
                      title="Click to remove this alternative name"
                      @click="removeItem(altname, 'altname')"
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
                Presence Settings with this tool. You have to take a look at the
                docs from this point. I am not able to produce it since there
                are many possibilities and more to be added in the future. It's
                best if you just follow the Documentation.
              </p>

              <p>
                🐛 If you wish to report a bug, a feature request or contact me
                in general, you can visit my website's GitHub repository and
                leave an issue.
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

        <div class="space-y-2 flex items-center sm:space-y-0 sm:space-x-4">
          <Button icon="heroicons:cog" @click="state.resultWindow = true">
            Generate
          </Button>

          <Button
            icon="heroicons:inbox-arrow-down"
            :disabled="state.importLoading"
            @click="importFromStore"
          >
            {{ state.importLoading ? "Importing..." : "Import From Store" }}
          </Button>

          <Button icon="mdi:times" @click="resetService"> Clear </Button>
        </div>
      </div>
    </div>

    <div
      v-if="state.resultWindow === true"
      class="bg-black bg-opacity-50 top-0 right-0 bottom-0 left-0 fixed hidden sm:block"
      @click="state.resultWindow = false"
    />

    <Transition name="slide-left" mode="out-in">
      <div
        v-show="state.resultWindow === true"
        class="min-h-full bg-gray-100 top-0 right-0 bottom-0 fixed overflow-y-auto scrollbar sm:ml-auto sm:shadow-md sm:w-8/12 dark:bg-neutral-900"
      >
        <div class="space-y-8 p-2 sm:py-10 sm:px-8 sm:w-10/12">
          <div class="space-y-1">
            <PageTitle class="flex space-x-2 items-center">
              <Icon name="heroicons:cog" class="h-5 w-5 no-style" />
              <span>Metadata Result</span>
            </PageTitle>

            <p class="!text-black/50 pt-4 block dark:!text-white/30">
              The result of your metadata.json, you can see your issues, and
              download your config from this window. Make sure to fill every and
              each required input correctly before doing anything!
            </p>
          </div>

          <div class="space-y-4">
            <PageTitle class="flex space-x-2 items-center">
              <Icon
                :name="
                  getMetadata.error
                    ? 'heroicons:exclamation-circle'
                    : 'heroicons:fire'
                "
                class="h-5 w-5 no-style"
              />
              <span>{{ getMetadata.error ? "Errors" : "Result" }}</span>
            </PageTitle>

            <div
              v-if="getMetadata.error !== null"
              class="grid gap-2 sm:grid-cols-2"
            >
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
            <PageTitle class="flex space-x-2 items-center">
              <Icon name="heroicons:fire" class="h-5 w-5 no-style" />
              <span>Your Metadata File </span>
            </PageTitle>

            <!-- eslint-disable vue/no-v-html -->
            <pre
              v-if="getMetadata.error === false"
              class="rounded-md h-96 shadow w-full overflow-y-auto language-json scrollbar"
              v-html="JSON.stringify(getMetadata.result, null, 2)"
            />

            <span v-else class="text-black/50 pt-4 block dark:text-white/30">
              You have to fix the errors before you can access the metadata
              JSON.
            </span>
          </div>

          <div
            class="space-y-2 sm:flex sm:space-y-0 sm:space-x-4 sm:items-center"
          >
            <Button
              v-if="getMetadata.error === false"
              icon="heroicons:inbox-arrow-down"
              download="metadata.json"
              :href="`data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(getMetadata.result, null, 2),
              )}`"
            >
              Download
            </Button>

            <Button icon="mdi:times" @click.native="state.resultWindow = false">
              <span>Close</span>
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </PageLayout>
</template>

<style lang="scss" scoped>
p,
.span {
  @apply text-black/50 dark:text-white/30;
}

svg:not(.no-style) {
  @apply rounded-full cursor-pointer bg-gray-200 flex-shrink-0 h-6 p-1 w-6 dark:bg-neutral-800 dark:hover:bg-neutral-700 hover:bg-gray-300;
}

.input {
  @apply bg-black/5 transition-colors dark:bg-white/10 dark:text-white/70 dark:placeholder-white/30 text-black/70 text-sm px-4 py-2 placeholder-black/50 outline-none border border-transparent;

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
