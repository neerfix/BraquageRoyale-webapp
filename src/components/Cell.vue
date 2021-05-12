<template>
  <div class="cell">
   {{ this.cell }}
  </div>
</template>

<script>
export default {
  name: 'Cell',
  data() {
    return{
      tileSize: 32,
      tileSetWidth: 19,
      tileNumber: 23,
      x:  0,
      y:  0,
      cell: '',
    }
  },
  mounted() {
    const coordinates = this.getTileCoordinates();
    this.cell = `
            <div class="background" style="background-position : -${coordinates.x*this.tileSize}px -${coordinates.y*this.tileSize}px"></div>
            <div class="obstacle">
                <slot name="obstacle"></slot>
            </div>`;
  },
  methods: {
    getTileCoordinates(){
      return { x : this.tileNumber % this.tileSetWidth, y : Math.floor(this.tileNumber/this.tileSetWidth)}
    }
  }
}

</script>

<style scoped>

</style>