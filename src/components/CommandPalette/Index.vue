<script lang="ts">
import Vue from "vue"

// Types
interface Page {
  title: string
  icon: string
  href: string
}

interface Control {
  name: string
  title: string
  component: string
  icon?: string
  onSelectEvent?: string
}

interface Items {
  name: string
  value: Page[] | Control[]
}

export default Vue.extend({
  data() {
    return {
      selectedSubMenu: "welcome",
      items: [
        {
          name: "Dynamic",
          value: [
            {
              name: "welcome",
              title: "Welcome",
              icon: "Star",
              component: "CommandPaletteItems" + "Welcome",
            },
            {
              name: "blog",
              title: "Blog",
              icon: "Inbox",
              component: "CommandPaletteItems" + "Blog",
            },
            {
              name: "github",
              title: "GitHub",
              icon: "Cog",
              component: "CommandPaletteItems" + "Github",
            },
          ],
        },
        {
          name: "Pages",
          value: [
            {
              title: "Contact",
              icon: "At",
              href: "/me/contact",
            },
            {
              title: "Donate",
              icon: "Fire",
              href: "/donate",
            },
            {
              title: "Repositories",
              icon: "Cog",
              href: "/me/repos",
            },
          ],
        },
        {
          name: "Socials",
          value: [
            {
              title: "GitHub",
              icon: "Link",
              href: this.$config.social.github,
            },
            {
              title: "Twitter",
              icon: "Link",
              href: this.$config.social.twitter,
            },
          ],
        },
      ] as Items[],
    }
  },
  computed: {
    isVisible(): boolean {
      return this.$store.state?.palette?.visible || false
    },
    getSelectedItem(): Control | undefined {
      const dynamicItems = this.items.find((item) => item.name === "Dynamic")
        ?.value as Control[]

      return dynamicItems?.find(({ name }) => name === this.selectedSubMenu)
    },
  },

  /*
      Watch for changes to the isVisible and disable scrolling
      when the palette is visible.
    */
  watch: {
    isVisible(isVisible: boolean) {
      const keys = ["overflow-y-hidden"]

      if (isVisible) document.body.classList.add(...keys)
      else document.body.classList.remove(...keys)
    },
  },

  /*
    Add and remove a keydown event listener to the body element
    to handle key shortcut.
  */
  mounted() {
    window.addEventListener("keydown", this.onKeyDown)
  },
  beforeMount() {
    window.removeEventListener("keydown", this.onKeyDown)
  },

  methods: {
    /*
      Handle keydown events.
    */
    onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.altKey) && event.key === "k") {
        this.toggleVisibility()
      }
    },
    /*
      Toggle the visibility of the palette through the Vuex
      store.
    */
    toggleVisibility() {
      this.$store.commit("palette/toggleVisibility")
    },
  },
})
</script>

<template>
  <transition name="fade" mode="out-in">
    <div v-show="isVisible" class="hidden lg:block">
      <div
        class="flex bg-black/60 inset-0 dark fixed items-center justify-center"
      >
        <div
          class="rounded-lg bg-black/70 mx-auto/40 max-h-[95vh] py-8 px-4 transition-all ease-in-out ring-black/70 ring-4 text-neutral-300 w-6/12 backdrop-filter backdrop-blur-sm md:w-[45rem]"
        >
          <div class="flex divide-x-1 divide-neutral-800/40">
            <div class="space-y-6 w-3/12 overflow-y-auto">
              <!-- Dynamic -->
              <div class="space-y-2">
                <Title size="xs">Dynamic</Title>

                <div class="space-y-1">
                  <CommandPaletteControls
                    v-for="(value, idx) in items[0].value"
                    :key="`${value.title}-${idx}`"
                  >
                    <CommandPaletteControlsItem
                      :title="value.title"
                      :icon="value.icon"
                      :active="value.name === selectedSubMenu"
                      @click.native="selectedSubMenu = value.name"
                    />
                  </CommandPaletteControls>
                </div>
              </div>

              <!-- Pages & Socials -->
              <div
                v-for="(value, idx) in items.slice(1)"
                :key="`${value.name}-${idx}`"
                class="space-y-2"
              >
                <Title size="xs">{{ value.name }}</Title>

                <div class="space-y-1">
                  <CommandPaletteControls>
                    <SmartLink
                      v-for="item in value.value"
                      :key="item.title"
                      :href="item.href"
                      :blank="value.name !== 'Pages'"
                    >
                      <CommandPaletteControlsItem
                        :title="item.title"
                        :icon="item.icon"
                        @click.native="toggleVisibility"
                      />
                    </SmartLink>
                  </CommandPaletteControls>
                </div>
              </div>
            </div>

            <div class="w-9/12">
              <Component
                :is="getSelectedItem.component"
                v-if="!!getSelectedItem"
                @close="toggleVisibility"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Button -->
      <div
        class="flex space-x-2 inset-x-0 bottom-8 items-center justify-center fixed"
        @click="toggleVisibility"
      >
        <Kbd>⌘</Kbd> <Kbd>K</Kbd>
      </div>
    </div>
  </transition>
</template>
