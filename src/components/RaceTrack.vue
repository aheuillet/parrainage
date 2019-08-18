<template>
  <v-container>
    <v-layout text-center wrap>
      <div class="track">
        <div class="test-square info" ref="info" style="background: blue;"></div>
        <div class="test-square elec" ref="elec" style="background: orange;"></div>
        <div class="test-square telecom" ref="telecom" style="background: purple;"></div>
        <div class="test-square matmeca" ref="matmeca" style="background: red;"></div>
        <div class="test-square ensegid" ref="ensegid" style="background: green;"></div>
        <div class="test-square rsi" ref="rsi" style="background: grey;"></div>
        <div class="test-square see" ref="see" style="background: yellow;"></div>
        <svg
          xmlns:dc="http://purl.org/dc/elements/1.1/"
          xmlns:cc="http://creativecommons.org/ns#"
          xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
          xmlns:svg="http://www.w3.org/2000/svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
          xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
          width="210mm"
          height="297mm"
          viewBox="0 0 210 297"
          version="1.1"
          id="svg8"
          inkscape:version="0.92.4 (5da689c313, 2019-01-14)"
          sodipodi:docname="track.svg"
        >
          <defs id="defs2">
            <inkscape:path-effect effect="spiro" id="path-effect3715" is_visible="true" />
          </defs>
          <sodipodi:namedview
            id="base"
            pagecolor="#ffffff"
            borderColor="#666666"
            borderopacity="1.0"
            inkscape:pageopacity="0.0"
            inkscape:pageshadow="2"
            inkscape:zoom="0.35"
            inkscape:cx="400"
            inkscape:cy="560"
            inkscape:document-units="mm"
            inkscape:current-layer="layer1"
            showgrid="false"
            inkscape:window-width="1920"
            inkscape:window-height="1001"
            inkscape:window-x="-9"
            inkscape:window-y="-9"
            inkscape:window-maximized="1"
          />
          <metadata id="metadata5">
            <rdf:RDF>
              <cc:Work rdf:about>
                <dc:format>image/svg+xml</dc:format>
                <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
                <dc:title />
              </cc:Work>
            </rdf:RDF>
          </metadata>
          <g inkscape:label="Calque 1" inkscape:groupmode="layer" id="layer1">
            <path
              transform="translate(17.386905,0.75595238)"
              style="fill:none;stroke:#000000;stroke-width:0.26458332px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
              d="m 34.017857,65.67857 c 15.426895,-7.811519 33.044685,-9.715098 49.892857,-13.607142 7.942563,-1.834787 15.782715,-4.133903 23.802576,-5.594236 8.01986,-1.460332 16.30714,-2.067231 24.30599,-0.495863 7.99884,1.571368 15.72564,5.481819 20.82303,11.843207 2.5487,3.180694 4.40367,6.937438 5.2222,10.930268 0.81853,3.99283 0.58241,8.218175 -0.82642,12.042815 -2.12128,5.758747 -6.7918,10.338801 -12.18447,13.268307 -5.39268,2.929506 -11.48405,4.342781 -17.5678,5.149567 -6.08376,0.806787 -12.23095,1.038457 -18.32347,1.776087 -6.09253,0.73762 -12.202749,2.00841 -17.692112,4.75247 -9.489583,4.74372 -16.286953,13.40132 -23.216671,21.43463 -3.464859,4.01666 -7.05746,7.95714 -11.186269,11.28756 -4.128809,3.33042 -8.833806,6.04872 -13.978014,7.34328 -4.798406,1.20754 -9.900342,1.13884 -14.688733,-0.10782 -4.78839,-1.24666 -9.257533,-3.66082 -12.987302,-6.91223 C 7.9537132,132.28665 3.6481192,122.50032 3.192359,112.61479 2.7365988,102.72926 5.9796725,92.827497 11.615413,84.693013 17.251154,76.558529 25.189143,70.149053 34.017857,65.67857 Z"
              id="path3713"
            />
          </g>
        </svg>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from "../firebaseConfig";
import { setTimeout } from 'timers';
export default {
  name: "raceTrack",
  data: () => ({
    anims: [],
    racers: {},
    racer_order: {},
    anim_duration: 5000,
    loop_spacer_unit: 0.07,
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
    initTrack: function() {
      this.anims["info"] = this.initAnim("info");
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
      }
      else if (value < 0 ) {
        return value + this.anim_duration;
      }
      return value;
    },
    recomputeOrder: function() {
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
            this.anims[racer[0]].pause();
            this.anims[racer[0]].seek(this.normalizeProgress((this.anims[racer[0]].progress * 0.01 * this.anim_duration) +
              (rank_diff * spacer_timestamp)));
            this.anims[racer[0]].play();
          }
        } else {
          this.anims[racer[0]].pause();
          this.anims[racer[0]].seek(index * spacer_timestamp);
          this.anims[racer[0]].play();
        }
        this.racer_order[racer[0]] = index;
      }
      setTimeout(this.recomputeOrder, 5000);
    },
  },
  mounted() {
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
  }
};
</script>

<style>
.test-square {
  margin: 1px;
  width: 18px;
  height: 18px;
  position: absolute;
  top: -9px;
  left: 55px;
}

.track {
  position: relative;
  margin: auto;
  display: float;
  float: inherit;
}
</style>