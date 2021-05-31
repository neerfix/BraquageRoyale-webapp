<template>
  <div class="cell" :style="styleCell">
    <div class="background" :style="styleBackground"></div>
    <div class="obstacle">
        <slot name="obstacle"></slot>
    </div>
    <div class="highlight"></div>
  </div>
</template>

<script>
import bgImage from '../assets/Atlas.png'
const tileSize = 32
const tileSetWidth = 19
export default {
  name: 'Cell',
  props: {
    x: Number,
    y: Number,
    tileNumber: Number,
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
    }
  },
  mounted() {
    const coordinates = this.getTileCoordinates();
    this.styleBackground = {
      backgroundPosition: `${-coordinates.x*tileSize}px ${-coordinates.y*tileSize}px`,
      height: '100%',
      width: '100%',
      backgroundImage: `url(${this.bgImage})`
    }
  },
  methods: {
    getTileCoordinates(){
      return { x : this.tileNumber % tileSetWidth, y : Math.floor(this.tileNumber/tileSetWidth)}
    }
  }
}
</script>

<style scoped>
.cell {
  position : relative;
  display : block;
}
.highlight, .obstacle {
  position : absolute;
  height : 100%;
  width : 100%;
  top : 0;
  left : 0;
  z-index : 5;
  border : 1px solid rgba(68,206,262,0);
  border-radius:7px;
  box-sizing : border-box;
}
.obstacle {
  z-index : 2;
  pointer-events : none;
}

.highlight:hover {
  background-color : rgba(68,206,262,0.5);
  border : 1px solid rgba(68,206,262,1);
}
.red:hover {
  background-color : rgba(252,65,55,0.5);
  border : 1px solid rgba(252,65,55,1);
}
.purple, .purple:hover {
  background-color : rgba(169,52,211,0.5);
  border : 1px solid rgba(169,52,211,1);
}
</style>