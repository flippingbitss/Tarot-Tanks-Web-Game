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
      maxPowerupCount: 3,
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
        followRange: 300,
        pathfinding: false,
        sprite: "enemyGreen",
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
      maxPowerupCount: 4,
      soundConfig: {
        bgMusic: "main_2"
      },
      playerTraits: {
        speed: 8,
        health: 10,
        player1: { sprite: "playerGreen", pos: [6, 11] },
        player2: { sprite: "playerYellow", pos: [16, 11] }
      },
      enemyTraits: {
        speed: 8,
        health: 15,
        followRange: 400,
        pathfinding: false,
        sprite: "enemyGreen",
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
      maxPowerupCount: 5,
      soundConfig: {
        bgMusic: "main_3"
      },
      playerTraits: {
        speed: 8,
        health: 10,
        player1: { sprite: "playerGreen", pos: [6, 11] },
        player2: { sprite: "playerYellow", pos: [16, 11] }
      },
      enemyTraits: {
        speed: 8,
        health: 20,
        followRange: 400,
        pathfinding: false,
        sprite: "enemyGreen",
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
      reviveEnemies: false,
      enemiesRepair: false,
      powerupSpawnRate: 5,
      bulletSpeedMultiplier: 1
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
        subtitle: "Revive Dead Enemies",
        fitnessScore: 5,
        trait: {
          reviveEnemies: true
        },
        aliveTime: 5
      },
      {
        name: "The Devil",
        subtitle: "Enemies Repair themselves",
        fitnessScore: 10,
        trait: {
          enemiesRepair: true
        },
        aliveTime: 10
      },
      {
        name: "The Magician",
        subtitle: "Faster Powerup Spawn",
        fitnessScore: 20,
        trait: {
          powerupSpawnRate: 20
        },
        aliveTime: 10
      },
      {
        name: "The Chariot",
        subtitle: "Faster Player Bullets",
        fitnessScore: 40,
        trait: {
          bulletSpeedMultiplier: 2
        },
        aliveTime: 15
      }
    ]
  },
  powerupConfig: {
    powerups: [
      {
        name: "Revive",
        sprite: "revive",
        fitnessScore: 50,
        pickupTime: 5
      },
      {
        name: "Repair",
        sprite: "wrench",
        fitnessScore: 60,
        pickupTime: 15,
      },
      {
        name: "Invulnerability",
        sprite: "shield",
        fitnessScore: 30,
        pickupTime: 10,
        usageTime: 5
      }
    ]
  }
};
