export default {
  levels: [
    {
      id: 0,
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
      playerTraits: {
        speed: 8,
        health: 10,
        player1: { sprite: "playerGreen", pos: [4, 11] },
        player2: { sprite: "playerYellow", pos: [18, 11] }
      },
      enemyTraits: {
        speed: 8,
        health: 10,
        followRange: 400,
        pathfinding: false,
        sprite: "enemyRed",
        enemies: [
          {
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
    },

    {
      id: 1,
      map: `- - - - - - - - - - - - - - - - - - - - -
			# # # # # # # # # # # # # # # # # # # # #
			# # # d . . . . # . . . # . . . . d # # #
			# # # d . . . . # . . . # . . . . d # # #
			# d d d . . . . . . . . . . . . . d d d #
			# . . . . . . . . . . . . . . . . . . . #
			# . . . . . d d d d d d d d d . . . . . #
			# . . d d d d d d d d d d d d d d d . . #
			# . . d d d d d d . . . d d d d d d . . #
			# . . . . . d d d . . . d d d . . . . . #
			# . . . . . # . . . . . . . # . . . . . #
			# # # # # # # # # # # # # # # # # # # # #`,
      soundConfig: {
        bgMusic: "main_1"
      },
      playerTraits: {
        speed: 8,
        health: 10,
        player1: { sprite: "playerGreen", pos: [6, 11] },
        player2: { sprite: "playerYellow", pos: [16, 11] }
      },
      enemyTraits: {
        speed: 8,
        health: 10,
        followRange: 400,
        pathfinding: false,
        sprite: "enemyRed",
        enemies: [
          {
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
            pos: [9, 8],
            waypoints: [[9, 8], [11, 8], [11, 10], [9, 10]]
          }
        ]
      }
    },

    {
      id: 2,
      map: `- - - - - - - - - - - - - - - - - - - - -
			# # # # # # # # # # # # # # # # # # # # #
			# . . . # . . . # . . . # . . . # . . . #
			# . . . # . . . # . . . # . . . # . . . #
			# . . . # . . . # . . . # . . . # . . . #
			# # d # # # d # # # d # # # d # # # d # #
			# . . . . . . . . . . . . . . . . . . . #
			# . d d d d d d # d d d # d d d d d d . #
			# . . . . . . . # . . . # . . . . . . . #
			# . d d d d # # # . . . # # # d d d d . #
			# . . . . . # . . . . . . . # . . . . . #
			# # # # # # # # # # # # # # # # # # # # #`,
      soundConfig: {
        bgMusic: "main_1"
      },
      playerTraits: {
        speed: 8,
        health: 10,
        player1: { sprite: "playerGreen", pos: [6, 11] },
        player2: { sprite: "playerYellow", pos: [16, 11] }
      },
      enemyTraits: {
        speed: 8,
        health: 10,
        followRange: 400,
        pathfinding: false,
        sprite: "enemyRed",
        enemies: [
          {
            pos: [1, 2],
            waypoints: [[1, 2], [3, 2], [3, 4], [1, 4]]
          },
          {
            pos: [7, 2],
            waypoints: [[7, 2], [5, 2], [5, 4], [7, 4]]
          },

          {
            pos: [9, 2],
            waypoints: [[9, 2], [11, 2], [11, 4], [9, 4]]
          },

          {
            pos: [15, 2],
            waypoints: [[15, 2], [13, 2], [13, 4], [15, 4]]
          },

          {
            pos: [17, 2],
            waypoints: [[17, 2], [19, 2], [19, 4], [17, 4]]
          },

          {
            pos: [1, 7],
            waypoints: [[1, 7], [1, 6], [8, 6], [1, 6]]
          },
          {
            pos: [19, 7],
            waypoints: [[19, 7], [19, 6], [12, 6], [19, 6]]
          },
          {
            pos: [10, 8],
            waypoints: [[10, 8], [10, 10]]
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
        subtitle: "Faster Enemy Spawn",
        pickupScore: 40,
        trait: {
          enemySpawnRate: 10
        }
      },
      {
        name: "The Devil",

        subtitle: "Spawn Dummy Tanks",
        pickupScore: 10,
        trait: {
          spawnDummyTanks: true
        }
      },
      {
        name: "The Magician",
        subtitle: "Faster Powerup Spawn",
        pickupScore: 20,
        trait: {
          powerupSpawnRate: 10
        }
      },
      {
        name: "The Chariot",
        subtitle: "Faster Gameplay",
        pickupScore: 30,
        trait: {
          gameSpeed: 1
        }
      }
    ]
  }
};
