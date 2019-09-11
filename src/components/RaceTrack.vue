<template>
  <v-container fluid>
    <v-layout text-center wrap>
      <v-row justify="space-around" align="start">
        <v-col cols="4">
          <div class="track-group">
            <img src="../assets/mini_luigi.png" class="test-square infor" ref="infor" />
            <img src="../assets/mini_toad.png" class="test-square elec" ref="elec" />
            <img src="../assets/mini_wario.png" class="test-square telecom" ref="telecom" />
            <img src="../assets/mini_mario.png" class="test-square matmeca" ref="matmeca" />
            <img src="../assets/mini_bowser.png" class="test-square ensegid" ref="ensegid" />
            <img src="../assets/mini_waluigi.png" class="test-square rsi" ref="rsi" />
            <img src="../assets/mini_peach.png" class="test-square see" ref="see" />
            <SVGTrack class="track" />
          </div>
        </v-col>
        <v-col
          cols="4"
          class="d-flex flex-row flex-wrap justify-space-around align-start"
          style="margin-top: -45px;"
        >
          <transition-group name="scores" tag="div">
            <v-card v-for="(racer, index) in sorted_racers" :key="racer.name" class="score-card">
              <v-card-title
                class="white--text d-flex flex-row justify-space-between flex-wrap align-start"
                :class="getMascotColor(racer.mascot)"
              >
                <h4>{{ racer.name }}</h4>
                <img :src="getScoreImg(racer.mascot)" class="score-img" />
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item class="headline">
                  <v-list-item-avatar>
                    <img :src="getOrderImg(index+1)" />
                  </v-list-item-avatar>
                  <v-list-item-content>Score :</v-list-item-content>
                  <v-list-item-content class="align-end"><strong>{{ racer.score }}</strong></v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </transition-group>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from "../firebaseConfig";
import { setTimeout } from "timers";
import SVGTrack from "../assets/mario_track.svg";
var _ = require("lodash");
export default {
  name: "raceTrack",
  components: {
    SVGTrack
  },
  data: () => ({
    anims: [],
    racers: {},
    settings: {},
    racer_order: {},
    anim_duration: 7000,
    loop_spacer_unit: 0.05
  }),
  computed: {
    info_score: function() {
      return this.racers["info"].score;
    },
    elec_score: function() {
      return this.racers["elec"].score;
    },
    telecom_score: function() {
      return this.racers["telecom"].score;
    },
    matmeca_score: function() {
      return this.racers["matmeca"].score;
    },
    ensegid_score: function() {
      return this.racers["ensegid"].score;
    },
    see_score: function() {
      return this.racers["see"].score;
    },
    rsi_score: function() {
      return this.racers["rsi"].score;
    },
    sorted_racers: function() {
      return _.orderBy(this.racers, "score", "desc");
    }
  },
  methods: {
    initAnim: function(target) {
      const path = this.$anime.path(".track path");
      var anim = this.$anime({
        targets: ".".concat(target),
        translateX: path("x"),
        translateY: path("y"),
        translateZ: 0,
        rotate: path("angle"),
        easing: "linear",
        duration: this.anim_duration,
        autoplay: true,
        loop: true
      });
      return anim;
    },
    sleep: function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    initTrack: function() {
      this.anims["info"] = this.initAnim("infor");
      this.anims["elec"] = this.initAnim("elec");
      this.anims["telecom"] = this.initAnim("telecom");
      this.anims["matmeca"] = this.initAnim("matmeca");
      this.anims["ensegid"] = this.initAnim("ensegid");
      this.anims["see"] = this.initAnim("see");
      this.anims["rsi"] = this.initAnim("rsi");
    },
    normalizeProgress: function(value) {
      if (value > this.anim_duration) {
        return value - this.anim_duration;
      } else if (value < 0) {
        return value + this.anim_duration;
      }
      return Math.round(value);
    },
    recomputeOrder: async function() {
      const spacer_timestamp = this.loop_spacer_unit * this.anim_duration;
      var sortable = [];
      for (let racerName in this.racers) {
        sortable.push([racerName, this.racers[racerName].score]);
      }
      sortable.sort(function(a, b) {
        return a[1] - b[1];
      });
      for (let index = 0; index < sortable.length; index++) {
        const racer = sortable[index];
        if (racer[0] in this.racer_order) {
          const rank_diff = index - this.racer_order[racer[0]];
          if (rank_diff != 0) {
            this.pauseAllAnims();
            await this.sleep(50);
            this.anims[racer[0]].seek(
              this.normalizeProgress(
                this.anims[racer[0]].progress * 0.01 * this.anim_duration +
                  rank_diff * spacer_timestamp
              )
            );
            this.playAllAnims();
          }
        } else {
          this.anims[racer[0]].pause();
          await this.sleep(1);
          this.anims[racer[0]].seek(index * spacer_timestamp);
          this.anims[racer[0]].play();
        }
        this.racer_order[racer[0]] = index;
      }
      setTimeout(this.recomputeOrder, this.settings.refresh_rate);
    },
    pauseAllAnims: function() {
      for (var anim in this.anims) {
        this.anims[anim].pause();
      }
    },
    playAllAnims: function() {
      for (var anim in this.anims) {
        this.anims[anim].play();
      }
    },
    getScoreImg: function(name) {
      var images = require.context("../assets/", false, /\.png$/);
      return images("./" + name + "-icon.png");
    },
    getMascotColor: function(mascot) {
      switch (mascot) {
        case "peach":
          return "pink lighten-3";

        case "bowser":
          return "orange";

        case "luigi":
          return "green";

        case "toad":
          return "blue accent-4";

        case "mario":
          return "red darken-2";

        case "waluigi":
          return "deep-purple";

        case "wario":
          return "yellow";

        default:
          return "primary";
      }
    },
    getOrderImg: function(order) {
      var images = require.context("../assets/", false, /\.png$/);
      return images("./" + order + ".png");
    }
  },
  mounted() {
    this.$rtdbBind("settings", db.ref("settings"))
      // eslint-disable-next-line
      .then(doc1 => {
        this.$rtdbBind("racers", db.ref("racers"))
          // eslint-disable-next-line
          .then(doc => {
            this.initTrack();
            this.recomputeOrder();
            /* this.$watch(
          "racers",
          this.recomputeOrder,
          { deep: true }
        );  */
          })
          .catch(error => {
            // eslint-disable-next-line
            console.log("error in loading: ", error);
          });
      });
  }
};
</script>

<style>
.test-square {
  margin: 1px;
  width: 25px;
  height: 25px;
  position: absolute;
  top: -9px;
  left: -5px;
}

.track-group {
  position: relative;
  margin: auto;
  display: float;
  float: inherit;
}

.score-card {
  width: 250px;
  transform: scale(0.6);
  margin-bottom: -50px;
}

.score-img {
  width: 80px;
  height: 80px;
}

.scores-move {
  transition: transform 1s;
}
</style>