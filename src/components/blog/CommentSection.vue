<template>
  <v-lazy
    v-if="localStorage"
    v-model="isActive"
    :options="{
      threshold: 0.5,
    }"
    min-height="200"
    transition="fade-transition"
  >
    <v-row style="margin-left:0px">
      <v-col class="col-12 col-md-8 mobileReactions">
        <div>
          <v-row
            style="margin-top:14px;"
            class="mx-auto"
            justify="space-between"
          >
            <div>
              <v-icon
                @click="react('excited')"
                :disabled="
                  !localStorage.getItem(`reacted-excited-${params.id}`) &&
                  !$store.state.posts.reacted.includes(
                    `reacted-excited-${params.id}`
                  )
                    ? false
                    : true
                "
                size="40px"
                >mdi-emoticon-excited</v-icon
              >
              <span class="reaction" v-text="reactionsEditable.excited" />
            </div>
            <div>
              <v-icon
                @click="react('lol')"
                :disabled="
                  !localStorage.getItem(`reacted-lol-${params.id}`) &&
                  !$store.state.posts.reacted.includes(
                    `reacted-lol-${params.id}`
                  )
                    ? false
                    : true
                "
                size="40px"
                >mdi-emoticon-lol</v-icon
              >
              <span class="reaction" v-text="reactionsEditable.lol" />
            </div>
            <div>
              <v-icon
                @click="react('angry')"
                :disabled="
                  !localStorage.getItem(`reacted-angry-${params.id}`) &&
                  !$store.state.posts.reacted.includes(
                    `reacted-angry-${params.id}`
                  )
                    ? false
                    : true
                "
                size="40px"
                >mdi-emoticon-angry</v-icon
              >
              <span class="reaction" v-text="reactionsEditable.angry" />
            </div>
            <div>
              <v-icon
                @click="react('cry')"
                :disabled="
                  !localStorage.getItem(`reacted-cry-${params.id}`) &&
                  !$store.state.posts.reacted.includes(
                    `reacted-cry-${params.id}`
                  )
                    ? false
                    : true
                "
                size="40px"
                >mdi-emoticon-cry</v-icon
              >
              <span class="reaction" v-text="reactionsEditable.cry" />
            </div>
            <div>
              <v-icon
                @click="react('dead')"
                :disabled="
                  !localStorage.getItem(`reacted-dead-${params.id}`) &&
                  !$store.state.posts.reacted.includes(
                    `reacted-dead-${params.id}`
                  )
                    ? false
                    : true
                "
                size="40px"
                >mdi-emoticon-dead</v-icon
              >
              <span class="reaction" v-text="reactionsEditable.dead" />
            </div>
            <div>
              <v-icon
                @click="react('heart')"
                :disabled="
                  !localStorage.getItem(`reacted-heart-${params.id}`) &&
                  !$store.state.posts.reacted.includes(
                    `reacted-heart-${params.id}`
                  )
                    ? false
                    : true
                "
                size="40px"
                >mdi-heart</v-icon
              >
              <span class="reaction" v-text="reactionsEditable.heart" />
            </div>
          </v-row>
        </div>

        <div style="margin-top:36px;">
          <h3>Yorumlar</h3>

          <v-form ref="form">
            <v-textarea
              ref="textarea"
              v-model="content"
              style="margin-top:10px;"
              label="Bir yorum bırakın..."
              solo
              :rules="[(v) => !!v || 'Bu alan gereklidir!']"
            ></v-textarea>

            <v-btn @click="comment" style="margin-top:0px;margin-bottom:20px;"
              >Gönder</v-btn
            >
          </v-form>

          <v-list
            v-if="commentsEditable.length > 0"
            class="mobileFriendly"
            three-line
          >
            <template v-for="(comment, index) in commentsEditable">
              <v-list-item :key="index">
                <v-list-item-avatar v-if="comment.admin">
                  <v-img src="/logo.jpg" lazy-src="/logo.jpg"></v-img>
                </v-list-item-avatar>
                <v-list-item-avatar v-else>
                  <v-icon size="42px" dark>mdi-account-circle</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title :style="comment.admin ? 'color:red' : ''"
                    >{{ comment.admin ? "Yönetici" : "Ziyaretçi" }}
                    <span v-if="comment.approved == 'approval'" class="approval"
                      >Onay Bekliyor</span
                    ></v-list-item-title
                  >
                  <v-list-item-subtitle
                    v-html="getDate(comment.date)"
                  ></v-list-item-subtitle>
                  <p>{{ comment.content }}</p>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>

          <div
            v-if="commentsEditable.length === 0"
            style="margin-bottom:24px;"
            class="text-center"
          >
            Henüz hiç yorum yapılmamış.
          </div>
        </div>

        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="headline" primary-title>Hata</v-card-title>

            <v-card-text>{{ message }}</v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">Tamam</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar">
          Yorumunuz başarıyla gönderildi. Yönetici onayından geçtikten sonra
          yayınlanacak.
          <v-btn color="pink" text @click="snackbar = false">Kapat</v-btn>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-lazy>
</template>

<style scoped>
.reaction {
  margin-left: 5px;
  padding: 20px;
}

.approval {
  background-color: #f39c12;
  font-size: small;
  border-radius: 4px;
  padding: 0.1em;
  color: #ffffff;
}

@media only screen and (max-width: 600px) {
  .mobileReactions {
    margin-top: -36px;
  }

  .mobileFriendly {
    margin-bottom: 14px;
    text-align: unset;
  }
}
</style>

<script>
import axios from "axios";
import moment from "moment";

export default {
  props: ["comments", "reactions", "postId"],
  data() {
    return {
      commentsEditable: this.$props.comments
        ?.filter(
          (comment) =>
            comment.approved == true || comment.approved == "approval"
        )
        ?.sort(function(a, b) {
          return new Date(b.date) - new Date(a.date);
        }),
      reactionsEditable: this.$props.reactions,
      params: this.$route.params,
      isActive: false,
      localStorage: undefined,
      dialog: false,
      snackbar: false,
      content: "",
      message: null,
    };
  },
  mounted() {
    this.localStorage = localStorage;
  },
  methods: {
    getDate(pureDate) {
      const date = moment(pureDate),
        now = moment(),
        diffMn = now.diff(date, "minutes"),
        diffHr = now.diff(date, "hours"),
        diffDy = now.diff(date, "days");

      let timeString;

      if (diffHr <= 0 && diffMn == 0) timeString = `Fırından yeni çıktı!`;
      else if (diffMn < 60 && diffMn > 0) timeString = `${diffMn} dakika önce`;
      else if (diffHr < 24 && diffHr > 0) timeString = `${diffHr} saat önce`;
      else if (diffHr <= 48 && diffHr > 24) timeString = "Dün";
      else if (diffDy > 0 && diffDy < 30) timeString = `${diffDy} gün önce`;
      else timeString = `${date.format("DD/MM/YY HH:mm:SS")}`;

      return timeString;
    },
    react(value) {
      if (!localStorage.getItem(`reacted-${value}-${this.params.id}`)) {
        axios
          .post("/api/blog/react/" + this.$props.postId, { add: value })
          .then((res) => {
            if (res && res.data && res.data.newObj) {
              res.data.newObj.reactions[value] += 1;
              this.reactionsEditable = res.data.newObj.reactions;

              localStorage.setItem(`reacted-${value}-${this.params.id}`, true);
              this.$store.commit(
                "posts/addReacted",
                `reacted-${value}-${this.params.id}`
              );
            }
          })
          .catch(() => {
            this.message =
              "Tepki eklenirken bir hata meydana geldi. Lütfen daha sonra tekrar deneyin.";
            this.dialog = true;
          });
      }
    },
    comment() {
      if (this.$refs.form.validate() && this.content.length > 15) {
        axios
          .post("/api/blog/comment/" + this.$props.postId, {
            content: this.content,
            date: new Date(),
            admin:
              this.$auth.loggedIn &&
              this.$auth.user?.id == "162969778699501569",
          })
          .then((res) => {
            if (
              !this.$auth.loggedIn ||
              this.$auth.user?.id != "162969778699501569"
            ) {
              this.commentsEditable.push({
                admin: false,
                approved: "approval",
                content: this.content,
                date: new Date().getTime(),
              });

              this.commentsEditable = this.commentsEditable.sort(function(
                a,
                b
              ) {
                return new Date(b.date) - new Date(a.date);
              });

              this.snackbar = true;
            } else if (
              this.$auth.loggedIn &&
              this.$auth.user?.id == "162969778699501569"
            ) {
              this.commentsEditable.push({
                admin: true,
                approved: true,
                content: this.content,
                date: new Date().getTime(),
              });

              this.commentsEditable = this.commentsEditable.sort(function(
                a,
                b
              ) {
                return new Date(b.date) - new Date(a.date);
              });
            }

            this.$refs.textarea.reset();
          })
          .catch(() => {
            this.message =
              "Lütfen göndermek istediğiniz yorumu girdiğinizden ve yorumun 15 karakterden uzun olduğundan emin olun. Yazmazsanız ne gönderelim yani, sizde...";
            this.dialog = true;
          });
      } else {
        this.message =
          "Lütfen göndermek istediğiniz yorumu girdiğinizden ve yorumun 15 karakterden uzun olduğundan emin olun. Yazmazsanız ne gönderelim yani, sizde...";
        this.dialog = true;
      }
    },
  },
};
</script>
