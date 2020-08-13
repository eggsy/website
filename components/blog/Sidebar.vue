<template>
  <div>
    <div class="sidebar">
      <v-icon>mdi-music-note</v-icon>
      <h3 style="margin-left:4px;margin-top:2px;">Günün Müziği</h3>

      <v-spacer />
      <div style="display:flex">
        <v-menu ref="menu" v-model="menu" transition="scale-transition" offset-x min-width="290px">
          <template v-slot:activator="{ on }">
            <v-btn
              v-tippy="{ content: 'Geçmiş bir tarih seçmek için tıklayın.' }"
              v-on="on"
              icon
              small
            >
              <v-icon>mdi-calendar</v-icon>
            </v-btn>
          </template>

          <v-date-picker
            dark
            locale="tr"
            v-model="date"
            :show-current="date"
            type="date"
            class="mt-4"
            min="2020-01-09"
            :max="
              new Date().getFullYear() +
                `-${
                  new Date().getMonth() < 9
                    ? '0' + (new Date().getMonth() + 1)
                    : new Date.getMonth() + 1
                }-${
                  new Date().getDate() < 9
                    ? '0' + new Date().getDate()
                    : new Date().getDate()
                }`
            "
            @input="
              dateChange($event);
              menu = false;
            "
          ></v-date-picker>
        </v-menu>

        <v-btn
          v-tippy="{
            content:
              (!selectedSong && iframeSrc == 'dQw4w9WgXcQ') ||
              (selectedSong && selectedSong == 'dQw4w9WgXcQ')
                ? 'Bugüne özel seçilmiş bir müzik yok.'
                : 'Tarihi sıfırlamak için tıklayın.',
          }"
          v-if="
            selectedSong ||
              (!selectedSong && iframeSrc == 'dQw4w9WgXcQ') ||
              (selectedSong && selectedSong == 'dQw4w9WgXcQ')
          "
          icon
          small
          @click="
            date = today;
            selectedSong = null;
          "
        >
          <v-icon
            v-if="
              (!selectedSong && iframeSrc == 'dQw4w9WgXcQ') ||
                (selectedSong && selectedSong == 'dQw4w9WgXcQ')
            "
          >mdi-cancel</v-icon>
          <v-icon v-else>mdi-delete</v-icon>
        </v-btn>
      </div>
    </div>

    <iframe
      v-if="selectedSong || iframeSrc"
      :src="'https://www.youtube.com/embed/' + `${selectedSong || iframeSrc}`"
      width="100%"
      height="300px"
      frameborder="0"
      allowfullscreen
    ></iframe>

    <div style="display:flex;margin-top:10px;margin-bottom:10px">
      <v-icon>mdi-star</v-icon>
      <h3 style="margin-left:4px;margin-top:2px;">Popüler Gönderiler</h3>
    </div>

    <v-simple-table style="margin-bottom:20px;" dark>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Gönderi</th>
            <th class="text-right"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="key in $props.mostViewed" :key="key._id">
            <td
              :title="key.title"
              @click="$router.push('/blog/gonderi/' + key._id)"
              style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden;max-width:150px;"
            >{{ key.title }}</td>
            <td class="text-right">
              <v-icon v-tippy="{ content: 'Toplam görüntülenme sayısı.' }">mdi-eye</v-icon>
              {{ key.views ? key.views : 0 }}
              <v-icon
                v-tippy="{ content: 'Verilen toplam tepki sayısı.' }"
                style="margin-left:6px;"
              >mdi-emoticon-cool</v-icon>
              {{
              key.reactions.excited +
              key.reactions.lol +
              key.reactions.angry +
              key.reactions.cry +
              key.reactions.dead +
              key.reactions.heart
              }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<style lang="scss" scoped>
*:focus {
  outline: 0;
}

tr {
  cursor: pointer;
}

.sidebar {
  display: flex;
  margin-bottom: 10px;
}
</style>

<script>
export default {
  props: ["mostViewed", "songs"],
  data() {
    const today =
      new Date().getFullYear() +
      "-" +
      `${
        new Date().getMonth() < 9
          ? "0" + (new Date().getMonth() + 1)
          : new Date.getMonth() + 1
      }` +
      "-" +
      `${
        new Date().getDate() < 9
          ? "0" + new Date().getDate()
          : new Date().getDate()
      }`;

    return {
      menu: false,
      selectedSong: null,
      iframeSrc:
        this.$props.songs.find(
          (i) =>
            i.date ==
            `${
              new Date().getMonth() + 1
            }/${new Date().getDate()}/${new Date().getFullYear()}`
        )?.url || "dQw4w9WgXcQ",
      today: today,
      date:
        new Date().getFullYear() +
        "-" +
        `${
          new Date().getMonth() < 9
            ? "0" + (new Date().getMonth() + 1)
            : new Date.getMonth() + 1
        }` +
        "-" +
        `${
          new Date().getDate() < 9
            ? "0" + new Date().getDate()
            : new Date().getDate()
        }`,
    };
  },
  methods: {
    dateChange(newDate) {
      const find = this.$props.songs.find(
        (i) =>
          i.date ==
          `${
            newDate.slice(5, 7).startsWith("0")
              ? newDate.slice(6, 7)
              : newDate.slice(5, 7)
          }` +
            "/" +
            `${
              newDate.slice(8, 10).startsWith("0")
                ? newDate.slice(9, 10)
                : newDate.slice(8, 10)
            }` +
            "/" +
            newDate.slice(0, 4)
      );

      this.selectedSong = find ? find.url : "dQw4w9WgXcQ";
    },
  },
};
</script>
