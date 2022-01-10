<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  data() {
    return {
      ratings: [
        {
          name: "Daredevil",
          rating: 10,
          platform: "Netflix",
          seasons: 3,
          status: 2,
          anchor: "#daredevil",
        },

        {
          name: "Prison Break",
          rating: 10,
          platform: "Fox",
          seasons: 5,
          status: 1,
          anchor: "#prison-break",
        },
        {
          name: "Arcane",
          rating: 10,
          platform: "Netflix",
          seasons: 1,
          isNew: true,
          anchor: "#arcane",
        },
        {
          name: "Love, Death & Robots",
          rating: 10,
          platform: "Netflix",
          seasons: 2,
          anchor: "#love-death--robots",
        },
        {
          name: "Élite",
          rating: 9.5,
          platform: "Netflix",
          seasons: 3,
          status: 1,
          anchor: "#élite",
        },
        {
          name: "The Witcher",
          rating: 9.5,
          platform: "Netflix",
          seasons: 3,
          anchor: "#the-witcher",
        },
        {
          name: "The Boys",
          rating: 9.5,
          platform: "Amazon Prime",
          seasons: 2,
          anchor: "#the-boys",
        },
        {
          name: "Rise of Empires: Ottoman",
          rating: 9.5,
          platform: "Netflix",
          seasons: 1,
          status: 1,
          anchor: "#rise-of-empires-ottoman",
        },
        {
          name: "The Mandalorian",
          rating: 9.5,
          platform: "Disney+",
          seasons: 2,
          anchor: "#the-mandalorian",
        },
        {
          name: "La Casa de Papel",
          rating: 9.5,
          platform: "Netflix",
          seasons: 4,
          anchor: "#la-casa-de-papel",
        },
        {
          name: "Sex Education",
          rating: 9,
          platform: "Netflix",
          seasons: 2,
          anchor: "#sex-education",
        },
        {
          name: "Locke & Key",
          rating: 9,
          platform: "Netflix",
          seasons: 1,
          anchor: "#locke--key",
        },
        {
          name: "Stranger Things",
          rating: 9,
          platform: "Netflix",
          seasons: 4,
          anchor: "#stranger-things",
        },
        {
          name: "See",
          rating: 9,
          platform: "Apple TV+",
          seasons: 1,
          anchor: "#see",
        },
        {
          name: "Sherlock",
          rating: 9,
          platform: "BBC",
          seasons: 4,
          status: 1,
          anchor: "#sherlock",
        },
        {
          name: "Loki",
          rating: 9,
          platform: "Disney+",
          seasons: 1,
          isNew: true,
          anchor: "#loki",
        },
        {
          name: "Lupin",
          rating: 9,
          platform: "Netflix",
          seasons: 2,
          anchor: "#lupin",
        },
        {
          name: "Snowpiercer",
          rating: 9,
          platform: "TNT",
          seasons: 2,
          anchor: "#snowpiercer",
        },
        {
          name: "The Haunting of Bly Manor",
          rating: 9,
          platform: "Netflix",
          seasons: 4,
          status: 1,
          anchor: "#the-haunting-of-bly-manor",
        },
        {
          name: "What If...?",
          rating: 9,
          platform: "Disney+",
          seasons: 1,
          isNew: true,
          anchor: "#what-if",
        },
        {
          name: "When They See Us",
          rating: 9,
          platform: "Netflix",
          seasons: 1,
          status: 1,
          anchor: "#when-they-see-us",
        },
        {
          name: "Sense8",
          rating: 9,
          platform: "Netflix",
          seasons: 2,
          status: 1,
          anchor: "#sense8",
        },
        {
          name: "Chilling Adventures of Sabrina",
          rating: 9,
          platform: "Netflix",
          seasons: 4,
          status: 1,
          anchor: "#chilling-adventures-of-sabrina",
        },
        {
          name: "Altered Carbon",
          rating: 9,
          platform: "Netflix",
          seasons: 2,
          status: 2,
          anchor: "#altered-carbon",
        },
        {
          name: "The Queen's Gambit",
          rating: 9,
          platform: "Netflix",
          seasons: 1,
          status: 1,
          anchor: "#the-queens-gambit",
        },
        {
          name: "Aşk 101",
          rating: 8.5,
          platform: "Netflix",
          seasons: 2,
          anchor: "#aşk-101",
        },
        {
          name: "The Order",
          rating: 8.5,
          platform: "Netflix",
          seasons: 2,
          anchor: "#the-order",
        },
        {
          name: "BoJack Horseman",
          rating: 8.5,
          platform: "Netflix",
          seasons: 6,
          status: 1,
          anchor: "#bojack-horseman",
        },
        {
          name: "Rick and Morty",
          rating: 8.5,
          platform: "Adult Swim",
          seasons: 4,
          anchor: "#rick-and-morty",
        },
        {
          name: "Lost in Space",
          rating: 8.5,
          platform: "Netflix",
          seasons: 2,
          anchor: "#lost-in-space",
        },
        {
          name: "The Haunting of Hill House",
          rating: 8,
          platform: "Netflix",
          seasons: 1,
          status: 1,
          anchor: "#the-haunting-of-hill-house",
        },
        {
          name: "You",
          rating: 8,
          platform: "Netflix",
          seasons: 2,
          anchor: "#you",
        },
        {
          name: "Lucifer",
          rating: 8,
          platform: "Netflix",
          seasons: 5,
          anchor: "#lucifer",
        },
        {
          name: "The Umbrella Academy",
          rating: 8,
          platform: "Netflix",
          seasons: 2,
          anchor: "#the-umbrella-academy",
        },
      ].sort((a, b) => b.rating - a.rating),
    }
  },
})
</script>

<template>
  <div class="mb-6 grid gap-2 lg:grid-cols-2">
    <BlogRating
      v-for="item in ratings"
      :key="item.name"
      :rating="item.rating"
      :platform="item.platform"
      :seasons="item.seasons"
      :isnew="item.isNew"
      :status="item.status"
    >
      <a :href="item.anchor">{{ item.name }}</a>
    </BlogRating>
  </div>
</template>
