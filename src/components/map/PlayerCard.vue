<template>
  <div class="player-card relative">
    <v-card
      class="mx-auto mb-3"
      elevation="2"
      color="#FFF"
    >
      <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="text-h5 mb-1 text-black">{{ player.username }}</v-list-item-title>
            <div class="text-overline mt-3">
              <div class="text-black"><span class="text-primary">Vie : </span>{{ player.vitality }} / 100</div>
              <div class="d-flex align-center flex-wrap justify-space-between">
                <div class="text-black"><span class="text-primary">Attaque : </span>{{ player.attack }}</div>
                <div class="text-black"><span class="text-primary">Kills : </span>{{ player.kills }}</div>
              </div>
            </div>
          </v-list-item-content>

          <v-list-item-avatar>
            <img :src="player.img" alt="avatar" />
          </v-list-item-avatar>
        </v-list-item>
    </v-card>
    <v-overlay :value="isDead()" :absolute="true">
      <img :src="deadBannier" alt="dead" />
    </v-overlay>
  </div>
</template>

<script>
import DeadBannier from '../../assets/img/player-dead.png'
export default {
  name: 'PlayerCard',
  props: {
    player: Object
  },
  data() {
    return {
      deadBannier: DeadBannier
    }
  },
  methods: {
    isDead() {
      return this.player.vitality === 0
    }
  }
}
</script>

<style lang="scss" scoped>
.player-card {
  ::v-deep {
    .v-list-item {
      padding: 0 10px;
      .v-list-item__content {
        padding: 5px 0;

        .v-list-item__title {
          font-size: 1.15rem !important;
        }
      }
    }

    .v-overlay {
      .v-overlay__content {
        height: 100%;
        overflow: hidden;

        img {
          width: 115%;
          transform: rotate(-26deg);
          opacity: 0.7;
          margin-top: 25px;
          margin-left: -24px;
        }
      }
    }
  }
  .text-overline {
    div {
      line-height: 1.5;
      font-size: .65rem;
    }
  }
}
</style>