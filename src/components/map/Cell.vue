<template>
  <div class="cell" :style="styleCell" @click="move">
    <div class="background" :style="styleBackground"></div>
    <div class="obstacle">
        <slot name="obstacle"></slot>
    </div>
    <div class="decoration">
      <slot name="decoration"></slot>
    </div>
    <div class="caracter" v-if="player">
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <img :src="player.vitality > 0 ? player.img : ripImage" alt="caracter" 
            v-bind="attrs" v-on="on"/>
        </template>
        <span>{{ player.username }}</span>
      </v-tooltip>
    </div>
    <div class="highlight"
      :class="
        (obstacleTile !== -1 && decorationTile === -1) ? 'red_obstacle'
        : (isAccessible && !player) ? 'accessible' : null
      "
    ></div>
  </div>
</template>

<script>
import bgImage from '../../assets/img/village.png'
import ripImage from '../../assets/img/caracters/rip.png'

const tileSize = 32
const tileSetWidth = 19

export default {
  name: 'Cell',
  props: {
    x: Number,
    y: Number,
    tileNumber: Number,
    obstacleTile: Number,
    decorationTile: Number,
    isAccessible: Boolean,
    player: Object,
  },
  data() {
    return {
      styleCell: {
        width: `${tileSize}px`,
        height: `${tileSize}px`,
        minWidth: `${tileSize}px`,
        minHeight: `${tileSize}px`,
      },
      styleBackground: {},
      bgImage: bgImage,
      ripImage: ripImage,
    }
  },
  mounted() {
    const coordinates = this.getTileCoordinates();
    this.styleBackground = {
      backgroundPosition: `-${coordinates.x * tileSize}px -${coordinates.y * tileSize}px`,
      height: '100%',
      width: '100%',
      backgroundImage: `url(${this.bgImage})`
    }
  },
  methods: {
    getTileCoordinates(){
      return {
        x : this.tileNumber % tileSetWidth,
        y : Math.floor(this.tileNumber / tileSetWidth)
      }
    },
    move() {
      if(this.isAccessible && this.obstacleTile === -1 && !this.player) {
        this.$emit('move', { x: this.x, y: this.y })
      }
    }
  },
  watch: {
    player() {
      console.log(this.player)
    }
  }
}
</script>

<style scoped lang="scss">

</style>