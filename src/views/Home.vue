<template>
  <div class="home">
    <RaceTrack></RaceTrack>
  </div>
</template>

<script>
// @ is an alias to /src
import RaceTrack from '@/components/RaceTrack.vue'

export default {
  name: 'home',
  components: {
    RaceTrack
  }
}
</script>
