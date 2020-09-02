<template>
  <div class="sticky">
    <div class="mt-2 mb-4">
      <v-card class="announcement-card" width="100%" height="145px">
        <div>
          <h5 class="text-h5">Blog Yenilendi</h5>
          <span class="text-subtitle-2">Gelişmiş ve yeni özelliklerle dolu blogumuza merhaba deyin!</span>
        </div>
      </v-card>
    </div>

    <div>
      <h3 class="mb-2">Beni Takip Et</h3>

      <ul class="follow-me">
        <li @click="open('https://github.com/eggsydev')">
          <v-card class="profile-card pa-2" width="100%">
            <span>
              <v-icon left>mdi-github</v-icon>eggsydev
            </span>
          </v-card>
        </li>
        <li @click="open('https://twitter.com/eggsydev')">
          <v-card class="profile-card pa-2" width="100%">
            <span>
              <v-icon left>mdi-twitter</v-icon>eggsydev
            </span>
          </v-card>
        </li>
        <li @click="open('https://steamcommunity.com/id/eggsydev')">
          <v-card class="profile-card pa-2" width="100%">
            <span>
              <v-icon left>mdi-steam</v-icon>eggsydev
            </span>
          </v-card>
        </li>
        <li @click="open('https://instagram.com/eggsy_dev')">
          <v-card class="profile-card pa-2" width="100%">
            <span>
              <v-icon left>mdi-instagram</v-icon>eggsy_dev
            </span>
          </v-card>
        </li>
        <li @click="open('https://discord.com/users/162969778699501569')">
          <v-card class="profile-card pa-2" width="100%">
            <span>
              <v-icon left>mdi-discord</v-icon>EGGSY#3388
            </span>
          </v-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.announcement-card {
  border-radius: 4px;
  background: linear-gradient(45deg, red, blue);

  div {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 85%;

    h5,
    span {
      text-shadow: 0px 0px 10px #000000;
    }
  }
}

.profile-card {
  height: 35px;
  border-radius: 4px;
  background: linear-gradient(45deg, #212121, transparent);

  h5,
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    text-shadow: 0px 0px 10px #000000;
  }
}

.follow-me {
  padding: 0;

  li {
    cursor: pointer;
    color: #196ec3;
    transition: opacity 0.2s;
    list-style: none;

    i {
      width: 24px;
    }

    &:not(:last-child) {
      margin-bottom: 4px;
    }

    &:hover {
      opacity: 0.75;
    }
  }
}
</style>