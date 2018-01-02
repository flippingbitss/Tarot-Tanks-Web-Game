export default {
  levels: [
    {
      map: `- - - - - - - - - - - - - - - - - - - - -
			# # # # # # # # # # # # # # # # # # # # #
			# d d d . . . . d d d d d . . . . d d d #
			# d d d . . . . d d d d d . . . . d d d #
			# d d d . . . . . . . . . . . . . d d d #
			# . . . . . . . . . . . . . . . . . . . #
			# . . . . . . . d d d d d . . . . . . . #
			# . . # # d d d d d d d d d d d # # . . #
			# . . # # d d d d d d d d d d d # # . . #
			# . . . . d d d d d d d d d d d . . . . #
			# . . . . . . . d d d d d . . . . . . . #
			# # # # # # # # # # # # # # # # # # # # #`,
      soundConfig: {
        bgMusic: "main_1"
      },
      playerConfig: {
        speed: 15,
        health: 10,
        player1: { sprite: "playerGreen", pos: [4, 11] },
        player2: { sprite: "playerYellow", pos: [18, 11] }
      },
      enemyConfig: {
        speed: 10,
        health: 10,
        followRange: 400,
        pathfinding: false,
        sprite: "enemyRed",
        enemies: [
          {
            sprite: "playerYellow",
            pos: [6, 5],
            waypoints: [[6, 5], [14, 5]]
          },
          {
            pos: [4, 2],
            waypoints: [[4, 2], [7, 2], [7, 3], [4, 3]]
          },
          {
            pos: [16, 2],
            waypoints: [[16, 2], [13, 2], [13, 3], [16, 3]]
          },
          {
            pos: [7, 6],
            waypoints: [[7, 6], [4, 6], [1, 7], [1, 6]]
          },
          {
            pos: [13, 6],
            waypoints: [[13, 6], [16, 6], [19, 7], [19, 6]]
          }
        ]
      }
    }
  ],
  tarotsConfig: {
    default: {
      enemySpawnRate: 5,
      powerupSpawnRate: 5,
      gameSpeed: 1
    },

    /*
		
		The Devil - spawn dummy tanks
		The Tower - increase enemy health 
		The Sun - increase enemy spawn frequency
		The Magician - increase power up spawn frequency
		The Chariot - Increases everything's move speed

		*/
    cards: [
      {
        name: "The Sun",
        pickupScore: 40,
        trait: {
          enemySpawnRate: 10
        }
      },
      {
        name: "The Devil",
        pickupScore: 30,
        trait: {
          spawnDummyTanks: true
        }
      },
      {
        name: "The Magician",
        pickupScore: 20,
        trait: {
          powerupSpawnRate: 10
        }
      },
      {
        name: "The Chariot",
        pickupScore: 10,
        trait: {
          gameSpeed: 1.5
        }
      }
    ]
  }
};
