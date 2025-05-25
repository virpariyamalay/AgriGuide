export const crops = [
  {
    id: 'tomato',
    name: 'Tomato',
    category: 'vegetables',
    description: 'A popular garden vegetable with many varieties, from cherry tomatoes to beefsteaks.',
    difficulty: 'Beginner',
    growingTime: '70-90 days',
    waterNeeds: 'Moderate',
    sunlight: 'Full Sun',
    successRate: 85,
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructions: {
      preparation: [
        'Start seeds indoors 6-8 weeks before the last spring frost date.',
        'Use seed starting mix in small containers with drainage holes.',
        'Keep soil consistently moist and in a warm location (70-80°F).',
        'Once seedlings develop their first true leaves, transplant to larger containers.'
      ],
      planting: [
        'Transplant outdoors after danger of frost has passed and soil temperatures reach 60°F.',
        'Space plants 24-36 inches apart in rows 3-4 feet apart.',
        'Dig holes deep enough to bury plants up to their first true leaves.',
        'Add compost or slow-release fertilizer to the planting hole.',
        'Water thoroughly after planting.'
      ],
      care: [
        'Water consistently, providing 1-2 inches of water per week.',
        'Mulch around plants to retain moisture and suppress weeds.',
        'Stake or cage plants to support growth and keep fruit off the ground.',
        'Fertilize every 4-6 weeks with a balanced fertilizer.',
        'Remove suckers (small shoots that develop in the crotch between branches) for indeterminate varieties.',
        'Monitor for pests like hornworms, aphids, and diseases like blight.'
      ],
      harvesting: [
        'Harvest when fruits are firm and fully colored but still slightly soft when pressed.',
        'Cut or gently twist fruits from the vine.',
        'Harvest in the morning when temperatures are cooler for best flavor.',
        'Green tomatoes can be ripened indoors at the end of the season.'
      ]
    },
    growthStages: [
      {
        day: 1,
        name: 'Germination',
        description: 'Seeds begin to sprout, developing their first root and shoot.',
        image: 'https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Keep soil consistently moist but not waterlogged',
          'Maintain warm temperature (70-80°F)',
          'Provide good air circulation to prevent damping off'
        ]
      },
      {
        day: 14,
        name: 'Seedling Stage',
        description: 'Young plants develop their first true leaves and begin photosynthesis.',
        image: 'https://images.pexels.com/photos/1214450/pexels-photo-1214450.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Provide 14-16 hours of light daily',
          'Begin light fertilization with half-strength fertilizer',
          'Prepare to transplant when seedlings have 2-3 sets of true leaves'
        ]
      },
      {
        day: 30,
        name: 'Vegetative Growth',
        description: 'Plants focus on developing stems, leaves, and a strong root system.',
        image: 'https://images.pexels.com/photos/5529587/pexels-photo-5529587.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Install stakes or cages for support',
          'Apply mulch around plants',
          'Begin regular fertilization schedule',
          'Monitor for pests and diseases'
        ]
      },
      {
        day: 45,
        name: 'Flowering',
        description: 'Yellow flowers appear, which will eventually develop into fruits.',
        image: 'https://images.pexels.com/photos/1175816/pexels-photo-1175816.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Gently shake plants to aid pollination',
          'Ensure consistent watering',
          'Remove suckers if growing indeterminate varieties',
          'Apply calcium-rich fertilizer to prevent blossom end rot'
        ]
      },
      {
        day: 60,
        name: 'Fruit Development',
        description: 'Small green fruits begin to form and grow in size.',
        image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Increase watering as fruits develop',
          'Continue to remove suckers and prune if necessary',
          'Ensure adequate support for heavy fruit clusters',
          'Monitor for signs of nutrient deficiencies'
        ]
      },
      {
        day: 80,
        name: 'Ripening',
        description: 'Fruits change color from green to red (or yellow/orange depending on variety).',
        image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Reduce watering slightly to improve flavor',
          'Protect fruits from sunscald',
          'Prepare for harvest',
          'Watch for signs of overripening'
        ]
      }
    ],
    tips: {
      commonProblems: [
        {
          name: 'Blossom End Rot',
          solution: 'Caused by calcium deficiency. Maintain consistent watering and add calcium-rich amendments to soil.'
        },
        {
          name: 'Hornworms',
          solution: 'Large green caterpillars that can defoliate plants. Handpick them off plants or use Bt (Bacillus thuringiensis) spray.'
        },
        {
          name: 'Early Blight',
          solution: 'Fungal disease causing leaf spots. Remove affected leaves, improve air circulation, and apply copper fungicide.'
        },
        {
          name: 'Cracking Fruits',
          solution: 'Caused by irregular watering. Maintain consistent soil moisture and mulch to prevent fluctuations.'
        }
      ],
      expertTips: [
        'Plant companion plants like basil and marigolds nearby to repel pests.',
        'Save seeds from heirloom varieties for next year\'s planting.',
        'Rotate crops yearly to prevent soil-borne diseases.',
        'Prune lower leaves that touch the soil to prevent disease spread.',
        'Harvest early if temperatures consistently drop below 50°F to ripen indoors.'
      ]
    },
    recommendedProducts: [
      {
        name: 'Organic Tomato Fertilizer',
        description: 'Specially formulated for tomatoes with optimal NPK ratio and added calcium.',
        price: 12.99,
        image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Heavy-Duty Tomato Cage',
        description: 'Strong support system for indeterminate varieties that grow tall and produce heavy fruit.',
        price: 8.95,
        image: 'https://images.pexels.com/photos/1675211/pexels-photo-1675211.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Moisture Meter',
        description: 'Accurately measure soil moisture to maintain optimal growing conditions.',
        price: 15.50,
        image: 'https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: 'cucumber',
    name: 'Cucumber',
    category: 'vegetables',
    description: 'A refreshing summer vegetable that\'s easy to grow in warm weather.',
    difficulty: 'Beginner',
    growingTime: '50-70 days',
    waterNeeds: 'High',
    sunlight: 'Full Sun',
    successRate: 80,
    image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructions: {
      preparation: [
        'Start seeds indoors 3-4 weeks before the last frost date, or direct sow after danger of frost has passed.',
        'Use biodegradable pots to minimize transplant shock.',
        'Prepare soil with plenty of organic matter and compost.',
        'Ensure soil pH is between 6.0-7.0 for optimal growth.'
      ],
      planting: [
        'Plant seeds 1 inch deep and 6 inches apart.',
        'For vining varieties, space rows 4-5 feet apart.',
        'For bush varieties, space rows 2-3 feet apart.',
        'If transplanting, handle carefully to avoid damaging delicate roots.',
        'Water thoroughly after planting.'
      ],
      care: [
        'Keep soil consistently moist but not waterlogged.',
        'Apply mulch to retain moisture and control weeds.',
        'Provide trellises or supports for vining varieties to save space and keep fruits clean.',
        'Fertilize with a balanced fertilizer every 3-4 weeks.',
        'Watch for pests such as cucumber beetles and powdery mildew.'
      ],
      harvesting: [
        'Harvest cucumbers when they reach appropriate size for the variety (usually 6-8 inches for slicing types).',
        'Pick frequently to encourage continuous production.',
        'Use sharp scissors or pruners to cut fruits from the vine.',
        'Harvest pickling cucumbers when they\'re smaller (2-4 inches).',
        'Morning is the best time to harvest for freshest taste.'
      ]
    },
    growthStages: [
      {
        day: 1,
        name: 'Germination',
        description: 'Seeds begin to sprout, developing their first root and shoot.',
        image: 'https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Keep soil warm (70-80°F) and moist',
          'Ensure good drainage to prevent rot',
          'Provide consistent light once sprouted'
        ]
      },
      {
        day: 10,
        name: 'Seedling Stage',
        description: 'Plants develop their first true leaves and establish roots.',
        image: 'https://images.pexels.com/photos/4497591/pexels-photo-4497591.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Thin seedlings to prevent overcrowding',
          'Begin light fertilization',
          'Prepare to transplant if started indoors'
        ]
      },
      {
        day: 25,
        name: 'Vegetative Growth',
        description: 'Plants rapidly develop vines and leaves.',
        image: 'https://images.pexels.com/photos/2893330/pexels-photo-2893330.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Install trellises or supports for vining varieties',
          'Apply mulch around plants',
          'Begin regular fertilization schedule',
          'Monitor for cucumber beetles and other pests'
        ]
      },
      {
        day: 35,
        name: 'Flowering',
        description: 'Yellow flowers appear, which will develop into fruits after pollination.',
        image: 'https://images.pexels.com/photos/531777/pexels-photo-531777.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Ensure pollinator access or hand-pollinate if needed',
          'Maintain consistent watering',
          'Continue fertilization schedule'
        ]
      },
      {
        day: 45,
        name: 'Fruit Development',
        description: 'Small cucumbers begin to form and grow rapidly.',
        image: 'https://images.pexels.com/photos/4750160/pexels-photo-4750160.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Increase watering as fruits develop',
          'Guide vines onto supports',
          'Remove any malformed or diseased fruits',
          'Watch for signs of powdery mildew'
        ]
      },
      {
        day: 60,
        name: 'Harvesting',
        description: 'Fruits reach mature size and are ready for picking.',
        image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Harvest regularly to encourage production',
          'Cut rather than pull fruits to avoid damaging vines',
          'Continue watering and fertilizing for ongoing harvest',
          'Watch for signs plant is ending production'
        ]
      }
    ],
    tips: {
      commonProblems: [
        {
          name: 'Cucumber Beetles',
          solution: 'Use row covers until flowering, apply neem oil, and remove beetles by hand. Plant resistant varieties.'
        },
        {
          name: 'Powdery Mildew',
          solution: 'Improve air circulation, avoid overhead watering, and apply fungicides like potassium bicarbonate.'
        },
        {
          name: 'Bitter Fruits',
          solution: 'Caused by stress. Ensure consistent watering, avoid high temperatures, and harvest promptly.'
        },
        {
          name: 'Bacterial Wilt',
          solution: 'Spread by cucumber beetles. Remove infected plants and control beetles. Use resistant varieties.'
        }
      ],
      expertTips: [
        'Plant companion plants like radishes, marigolds, and nasturtiums to deter pests.',
        'Hand-pollinate in greenhouse settings or when pollinators are scarce.',
        'Grow cucumbers vertically to save space and reduce disease problems.',
        'Harvest frequently in the morning when fruits are most crisp.',
        'Choose gynoecious varieties for higher yields and parthenocarpic varieties if pollinators are limited.'
      ]
    },
    recommendedProducts: [
      {
        name: 'Cucumber Trellis Netting',
        description: 'Strong mesh netting to support climbing cucumber vines and keep fruits off the ground.',
        price: 14.99,
        image: 'https://images.pexels.com/photos/1337247/pexels-photo-1337247.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Organic Cucumber Fertilizer',
        description: 'Balanced nutrition with added potassium for strong, productive plants.',
        price: 11.95,
        image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Cucumber Beetle Traps',
        description: 'Effective traps to monitor and reduce cucumber beetle populations naturally.',
        price: 9.50,
        image: 'https://images.pexels.com/photos/6157255/pexels-photo-6157255.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: 'carrot',
    name: 'Carrot',
    category: 'vegetables',
    description: 'A classic root vegetable that\'s nutritious and satisfying to grow.',
    difficulty: 'Intermediate',
    growingTime: '70-80 days',
    waterNeeds: 'Moderate',
    sunlight: 'Full Sun to Partial Shade',
    successRate: 75,
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructions: {
      preparation: [
        'Prepare soil deeply - at least 12 inches to allow for root development.',
        'Remove all rocks, sticks and clumps that could cause misshapen roots.',
        'Ensure soil is loose, well-draining, and rich in organic matter.',
        'Aim for a pH of 6.0-6.8 for optimal growth.'
      ],
      planting: [
        'Direct sow seeds 2-3 weeks before the last spring frost date.',
        'Sow seeds thinly, about ¼ inch deep and 1 inch apart.',
        'Space rows 12-18 inches apart.',
        'Cover with fine soil and firm gently.',
        'Keep soil consistently moist until germination (typically 14-21 days).'
      ],
      care: [
        'Thin seedlings to 2-3 inches apart when they reach 2 inches tall.',
        'Water consistently, providing 1 inch of water per week.',
        'Avoid overwatering to prevent splitting and forking.',
        'Apply a light layer of compost as a side dressing midway through the growing season.',
        'Keep area weed-free to minimize competition.',
        'Cover shoulders of carrots with soil or mulch to prevent greening.'
      ],
      harvesting: [
        'Begin harvesting when carrots are finger-sized, or when they reach desired size.',
        'Harvest by gently loosening soil around the carrot and pulling from the base of the tops.',
        'For easier harvest, water the area first.',
        'Twist off tops and clean before storage.',
        'Leave some carrots in the ground for a fall/winter harvest in mild climates - they actually get sweeter after light frost.'
      ]
    },
    growthStages: [
      {
        day: 1,
        name: 'Germination',
        description: 'Seeds begin to sprout. This stage can take 14-21 days, so patience is required.',
        image: 'https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Keep soil consistently moist but not waterlogged',
          'Protect seedbed from crusting with light mulch',
          'Be patient - carrot germination is slower than many vegetables'
        ]
      },
      {
        day: 21,
        name: 'Seedling Stage',
        description: 'Tiny seedlings emerge with delicate, grass-like foliage.',
        image: 'https://images.pexels.com/photos/9246858/pexels-photo-9246858.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Thin seedlings to 1 inch apart initially',
          'Water gently to avoid washing away seedlings',
          'Begin light weeding, being careful not to disturb carrot seedlings'
        ]
      },
      {
        day: 35,
        name: 'Leaf Development',
        description: 'Feathery foliage grows and strengthens as the root begins to form.',
        image: 'https://images.pexels.com/photos/2751755/pexels-photo-2751755.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Thin to final spacing if needed',
          'Begin regular watering schedule',
          'Monitor for cutworms and other early-season pests',
          'Apply light mulch around plants'
        ]
      },
      {
        day: 50,
        name: 'Root Elongation',
        description: 'The carrot root elongates and begins to develop its characteristic shape and color.',
        image: 'https://images.pexels.com/photos/37641/carrots-vegetable-carrot-vegetables-37641.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Ensure soil remains loose around developing roots',
          'Cover any exposed shoulders with soil to prevent greening',
          'Maintain even moisture to prevent splitting',
          'Apply mulch to retain moisture and suppress weeds'
        ]
      },
      {
        day: 65,
        name: 'Root Thickening',
        description: 'Roots continue to grow in diameter and length, storing energy in preparation for harvest.',
        image: 'https://images.pexels.com/photos/2893966/pexels-photo-2893966.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Begin harvesting baby carrots if desired',
          'Continue even watering schedule',
          'Watch for pests like carrot rust fly or aphids',
          'Protect from extreme heat if necessary'
        ]
      },
      {
        day: 80,
        name: 'Maturity',
        description: 'Carrots reach full size and optimal flavor, ready for harvest.',
        image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Test harvest a few carrots to check size and flavor',
          'Harvest entire crop or as needed',
          'Consider leaving some in ground during cool weather for continued harvest',
          'Prepare for storage or immediate use'
        ]
      }
    ],
    tips: {
      commonProblems: [
        {
          name: 'Forked or Misshapen Roots',
          solution: 'Caused by rocky soil, hardpan, or fresh manure. Prepare soil deeply and thoroughly remove obstacles before planting.'
        },
        {
          name: 'Carrot Rust Fly',
          solution: 'Cover crops with floating row covers. Plant resistant varieties and practice crop rotation.'
        },
        {
          name: 'Splitting',
          solution: 'Caused by inconsistent watering. Maintain even soil moisture and avoid sudden heavy watering after dry periods.'
        },
        {
          name: 'Hairy or Bitter Carrots',
          solution: 'Often caused by poor growing conditions or leaving in ground too long. Improve soil, maintain proper watering, and harvest at optimal time.'
        }
      ],
      expertTips: [
        'Mix carrot seeds with radish seeds for quicker germination marking and natural soil aeration.',
        'Sow successively every 2-3 weeks for continuous harvest throughout the season.',
        'Choose shorter varieties for heavy or clay soils, longer varieties for sandy or well-prepared soil.',
        'Plant carrots where you\'ve previously grown onions or leeks to deter carrot pests.',
        'Harvest after a light frost for sweeter flavor due to increased sugar content.'
      ]
    },
    recommendedProducts: [
      {
        name: 'Garden Claw Cultivator',
        description: 'Perfect for preparing deep, loose soil for carrot growing without damaging soil structure.',
        price: 24.99,
        image: 'https://images.pexels.com/photos/5797908/pexels-photo-5797908.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Fine Mesh Seed Tape',
        description: 'Biodegradable tape with perfectly spaced carrot seeds for easier planting and reduced thinning.',
        price: 5.95,
        image: 'https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Root Vegetable Fertilizer',
        description: 'Low-nitrogen, high-potassium formula specifically designed for root crop development.',
        price: 13.50,
        image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: 'lettuce',
    name: 'Lettuce',
    category: 'vegetables',
    description: 'A quick-growing leafy green perfect for beginners and small spaces.',
    difficulty: 'Beginner',
    growingTime: '30-60 days',
    waterNeeds: 'Moderate',
    sunlight: 'Partial Shade to Full Sun',
    successRate: 90,
    image: 'https://images.pexels.com/photos/1352243/pexels-photo-1352243.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructions: {
      preparation: [
        'Choose a location with morning sun and afternoon shade in hot climates, or full sun in cooler areas.',
        'Prepare soil with plenty of compost or well-rotted manure.',
        'Ensure soil pH is between 6.0-7.0.',
        'Lettuce grows best in cool weather, so plan for spring and fall crops in most regions.'
      ],
      planting: [
        'Direct sow seeds 1/8 inch deep and 1 inch apart.',
        'Space rows 12-18 inches apart.',
        'For continuous harvest, sow small amounts every 2 weeks.',
        'In hot weather, sow in the evening and keep soil consistently moist until germination.',
        'Seeds germinate best at temperatures between 55-65°F.'
      ],
      care: [
        'Thin seedlings to appropriate spacing once they develop true leaves (4-12 inches apart depending on variety).',
        'Keep soil consistently moist but not waterlogged.',
        'Apply a light mulch to keep soil cool and moist.',
        'Fertilize lightly with balanced organic fertilizer after thinning.',
        'Provide shade cloth during hot weather to prevent bolting.'
      ],
      harvesting: [
        'Harvest loose-leaf lettuce by picking outer leaves as needed, allowing plant to continue growing.',
        'Harvest head lettuce when heads are firm and have reached full size.',
        'Cut heads at soil level with a knife.',
        'Harvest in morning when leaves are crisp and full of moisture.',
        'Harvest entire crop once plants show signs of bolting (sending up flower stalks).'
      ]
    },
    growthStages: [
      {
        day: 1,
        name: 'Germination',
        description: 'Seeds sprout quickly, usually within 2-5 days in optimal conditions.',
        image: 'https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Keep soil consistently moist',
          'Ensure temperature remains cool (55-65°F ideal)',
          'Provide gentle, filtered light once sprouts emerge'
        ]
      },
      {
        day: 7,
        name: 'Seedling Stage',
        description: 'Small seedlings develop their first true leaves after the cotyledons (seed leaves).',
        image: 'https://images.pexels.com/photos/3094208/pexels-photo-3094208.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Begin thinning to prevent overcrowding',
          'Keep soil consistently moist',
          'Protect from extreme weather and pests'
        ]
      },
      {
        day: 15,
        name: 'Early Growth',
        description: 'Plants develop more leaves and begin to take on the characteristic appearance of their variety.',
        image: 'https://images.pexels.com/photos/2284265/pexels-photo-2284265.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Thin to final spacing',
          'Apply light fertilizer if needed',
          'Monitor for slugs and aphids',
          'Ensure consistent moisture'
        ]
      },
      {
        day: 25,
        name: 'Leaf Development',
        description: 'Rapid leaf growth as plants approach harvest size. Loose-leaf varieties can begin to be harvested.',
        image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Begin harvesting outer leaves from loose-leaf varieties',
          'Continue regular watering',
          'Apply mulch if not already done',
          'Watch for signs of bolting in warm weather'
        ]
      },
      {
        day: 35,
        name: 'Pre-Harvest',
        description: 'Head lettuce varieties begin to form compact centers. Loose-leaf varieties reach full production.',
        image: 'https://images.pexels.com/photos/142520/pexels-photo-142520.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Continue regular harvesting of loose-leaf varieties',
          'Monitor head formation for heading varieties',
          'Provide shade during hot weather',
          'Maintain consistent soil moisture for tender leaves'
        ]
      },
      {
        day: 50,
        name: 'Maturity',
        description: 'Head lettuce reaches full size and firmness. Plants will begin to bolt if not harvested.',
        image: 'https://images.pexels.com/photos/1352243/pexels-photo-1352243.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Harvest entire heads of heading varieties',
          'Complete harvest before hot weather induces bolting',
          'Prepare area for succession planting',
          'Save seeds if desired from one or two bolting plants'
        ]
      }
    ],
    tips: {
      commonProblems: [
        {
          name: 'Bolting (Premature Flowering)',
          solution: 'Caused by heat and long days. Plant heat-resistant varieties, provide afternoon shade, and harvest before hot weather.'
        },
        {
          name: 'Slugs and Snails',
          solution: 'Use copper tape barriers, diatomaceous earth, or beer traps. Hand pick at night when active.'
        },
        {
          name: 'Aphids',
          solution: 'Spray with strong water stream, apply insecticidal soap, or introduce beneficial insects like ladybugs.'
        },
        {
          name: 'Bitter Taste',
          solution: 'Usually caused by heat stress or bolting. Harvest earlier, grow in cooler weather, and choose heat-resistant varieties.'
        }
      ],
      expertTips: [
        'Grow lettuce under taller plants like tomatoes or corn in summer to provide natural shade.',
        'Plant heat-resistant varieties like Batavian types for summer growing.',
        'Grow in containers on patios or decks for easy access and better pest control.',
        'Harvest in the morning when leaves are most crisp and flavorful.',
        'Try growing microgreens or baby lettuce indoors for year-round harvest.'
      ]
    },
    recommendedProducts: [
      {
        name: 'Shade Cloth Kit',
        description: 'Protects lettuce from excess heat and prevents premature bolting during warm weather.',
        price: 19.99,
        image: 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Organic Slug Control',
        description: 'Natural, pet-safe product to protect tender lettuce leaves from slug and snail damage.',
        price: 14.95,
        image: 'https://images.pexels.com/photos/5083242/pexels-photo-5083242.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Lettuce Seed Collection',
        description: 'Variety pack of five different lettuce types for extended harvest and different flavors and textures.',
        price: 9.50,
        image: 'https://images.pexels.com/photos/7469208/pexels-photo-7469208.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: 'spinach',
    name: 'Spinach',
    category: 'vegetables',
    description: 'A nutritious leafy green that thrives in cool weather conditions.',
    difficulty: 'Beginner',
    growingTime: '35-45 days',
    waterNeeds: 'Moderate',
    sunlight: 'Partial Sun to Full Sun',
    successRate: 85,
    image: 'https://images.pexels.com/photos/51372/spinach-vegetables-leaf-green-51372.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructions: {
      preparation: [
        'Choose a location with morning sun and afternoon shade in warm climates, or full sun in cool regions.',
        'Prepare soil with abundant organic matter and ensure good drainage.',
        'Test soil pH and aim for 6.5-7.0 for optimal growth.',
        'Spinach grows best in cool temperatures (45-75°F), making it ideal for spring and fall gardens.'
      ],
      planting: [
        'Direct sow seeds 1/2 inch deep and 2 inches apart.',
        'Space rows 12-18 inches apart.',
        'Plant as soon as soil can be worked in spring, or 6-8 weeks before first fall frost.',
        'Sow succession crops every 2-3 weeks for continuous harvest.',
        'Seeds germinate best at soil temperatures between 45-70°F.'
      ],
      care: [
        'Thin seedlings to 4-6 inches apart when they have two true leaves.',
        'Keep soil consistently moist, as drought stress causes bitter taste and early bolting.',
        'Apply a light layer of compost or balanced fertilizer when plants reach 2 inches tall.',
        'Apply mulch to keep soil cool and reduce weed competition.',
        'Provide shade cloth in warm weather to extend the growing season.'
      ],
      harvesting: [
        'Begin harvesting when leaves are large enough to use (typically 3-5 inches).',
        'Harvest outer leaves first, allowing plant to continue growing from the center.',
        'For baby spinach, harvest entire plants when leaves are 2-3 inches.',
        'For mature harvest, cut plants 1 inch above soil level - they may regrow for a second harvest.',
        'Harvest entire crop once plants show signs of bolting (elongating stem).'
      ]
    },
    growthStages: [
      {
        day: 1,
        name: 'Germination',
        description: 'Seeds sprout and emerge from soil within 5-10 days depending on temperature.',
        image: 'https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Keep soil consistently moist but not waterlogged',
          'Ensure soil remains cool for best germination',
          'Protect from birds with row cover if necessary'
        ]
      },
      {
        day: 10,
        name: 'Seedling Stage',
        description: 'Young plants develop their first true leaves after the seed leaves (cotyledons).',
        image: 'https://images.pexels.com/photos/7728082/pexels-photo-7728082.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Begin thinning to prevent crowding',
          'Remove competing weeds carefully',
          'Monitor soil moisture consistently'
        ]
      },
      {
        day: 20,
        name: 'Leaf Development',
        description: 'Plants develop multiple true leaves and establish strong roots.',
        image: 'https://images.pexels.com/photos/3094208/pexels-photo-3094208.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Thin to final spacing of 4-6 inches',
          'Apply light fertilizer or compost tea',
          'Apply mulch around plants',
          'Monitor for pests like aphids and leaf miners'
        ]
      },
      {
        day: 30,
        name: 'Early Harvest Stage',
        description: 'Plants reach baby spinach size, suitable for tender salads.',
        image: 'https://images.pexels.com/photos/628080/pexels-photo-628080.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Begin harvesting outer leaves if desired',
          'Maintain consistent moisture for tender growth',
          'Watch for signs of nutrient deficiency',
          'Provide shade if temperatures rise above 75°F'
        ]
      },
      {
        day: 40,
        name: 'Full Maturity',
        description: 'Plants reach full size with large, dark green leaves ready for harvest.',
        image: 'https://images.pexels.com/photos/51372/spinach-vegetables-leaf-green-51372.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Harvest entire plants or continue picking outer leaves',
          'Monitor for signs of bolting as temperatures rise',
          'Ensure adequate moisture during harvest period',
          'Begin preparations for succession planting'
        ]
      },
      {
        day: 50,
        name: 'Bolting Stage',
        description: 'Plants send up flower stalks in response to long days and warm temperatures.',
        image: 'https://images.pexels.com/photos/2831192/pexels-photo-2831192.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Complete harvest before flowers develop',
          'Consider allowing some plants to go to seed for saving',
          'Remove bolting plants and replace with heat-tolerant crops',
          'Prepare for fall spinach planting in late summer'
        ]
      }
    ],
    tips: {
      commonProblems: [
        {
          name: 'Bolting (Premature Flowering)',
          solution: 'Plant slow-bolting varieties, grow during cool seasons, provide afternoon shade, and harvest promptly.'
        },
        {
          name: 'Leaf Miners',
          solution: 'Cover plants with floating row covers, remove and destroy affected leaves, and apply neem oil.'
        },
        {
          name: 'Downy Mildew',
          solution: 'Improve air circulation, avoid overhead watering, plant resistant varieties, and apply organic fungicides if necessary.'
        },
        {
          name: 'Yellow Leaves',
          solution: 'Often indicates nitrogen deficiency. Apply balanced organic fertilizer or compost tea.'
        }
      ],
      expertTips: [
        'Grow spinach in partial shade during warmer months to extend harvest season.',
        'Plant bolt-resistant varieties like \'Tyee\' or \'Space\' for spring and summer growing.',
        'Use succession planting every 2-3 weeks for continuous harvest.',
        'Spinach grows well in containers, making it suitable for patios and balconies.',
        'Plant spinach alongside slower-growing plants to maximize garden space efficiency.'
      ]
    },
    recommendedProducts: [
      {
        name: 'Floating Row Cover',
        description: 'Protects spinach from leaf miners, flea beetles, and other pests while allowing light and water through.',
        price: 16.95,
        image: 'https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Organic Spinach Fertilizer',
        description: 'Balanced nitrogen-rich formula specifically designed for leafy greens.',
        price: 12.99,
        image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Bolt-Resistant Spinach Seed Collection',
        description: 'Mix of four heat-tolerant spinach varieties for extended growing season.',
        price: 8.50,
        image: 'https://images.pexels.com/photos/7469208/pexels-photo-7469208.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    category: 'fruits',
    description: 'Sweet, juicy berries that are relatively easy to grow and produce for several years.',
    difficulty: 'Intermediate',
    growingTime: '1-2 years to full production',
    waterNeeds: 'Moderate',
    sunlight: 'Full Sun',
    successRate: 75,
    image: 'https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructions: {
      preparation: [
        'Choose a sunny location with well-draining soil rich in organic matter.',
        'Test soil pH and adjust to 5.5-6.5, ideal for strawberry growth.',
        'Prepare beds by removing weeds and incorporating compost or aged manure.',
        'Consider raised beds for better drainage and easier maintenance.',
        'Plan for adequate spacing based on growing method (matted row or hill system).'
      ],
      planting: [
        'Plant bare-root plants in early spring as soon as soil can be worked.',
        'Dig holes deep and wide enough to accommodate roots without bending them.',
        'Position crown (where stems meet roots) at soil level - not too deep or shallow.',
        'Space plants 12-18 inches apart in rows 3-4 feet apart for matted row systems.',
        'For hill systems, space plants 12 inches apart in rows or clusters.',
        'Water thoroughly after planting.'
      ],
      care: [
        'Keep soil consistently moist but not waterlogged (1-2 inches of water per week).',
        'Remove flowers in first year for June-bearing varieties to encourage strong root establishment.',
        'Apply balanced organic fertilizer after planting and when flowering begins.',
        'Mulch with straw or pine needles to suppress weeds, conserve moisture, and keep fruits clean.',
        'Remove runners as needed based on your growing system.',
        'Protect from birds with netting when fruits begin to ripen.'
      ],
      harvesting: [
        'Harvest fruits when fully red with no white shoulders for best flavor.',
        'Pick with caps (green tops) attached to preserve freshness.',
        'Harvest in morning when fruits are cool and at peak flavor.',
        'Pick every 2-3 days during peak season.',
        'Handle gently to prevent bruising and refrigerate promptly if not consuming immediately.'
      ]
    },
    growthStages: [
      {
        day: 1,
        name: 'Establishment',
        description: 'Newly planted strawberries focus on developing roots and adapting to their location.',
        image: 'https://images.pexels.com/photos/12244379/pexels-photo-12244379.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Keep soil consistently moist while plants establish',
          'Remove any flowers that appear to direct energy to root growth',
          'Monitor for signs of transplant shock',
          'Apply light mulch around plants'
        ]
      },
      {
        day: 30,
        name: 'Vegetative Growth',
        description: 'Plants develop new leaves and begin to spread through runners (stolons).',
        image: 'https://images.pexels.com/photos/2291334/pexels-photo-2291334.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Continue removing flowers in first year for June-bearing varieties',
          'Allow everbearing varieties to flower after initial establishment',
          'Position runners as needed for matted row system or remove for hill system',
          'Apply balanced fertilizer',
          'Maintain consistent watering schedule'
        ]
      },
      {
        day: 90,
        name: 'Runner Production',
        description: 'Plants produce runners (stolons) that develop into new plants when they touch soil.',
        image: 'https://images.pexels.com/photos/175727/pexels-photo-175727.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Guide runners to fill in beds for matted row system',
          'Remove excess runners for hill system',
          'Ensure daughter plants are spaced properly',
          'Keep beds weeded',
          'Apply additional mulch if needed'
        ]
      },
      {
        day: 180,
        name: 'Dormancy (Winter)',
        description: 'Plants go dormant during cold months, storing energy for spring growth.',
        image: 'https://images.pexels.com/photos/4750270/pexels-photo-4750270.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Apply winter mulch after ground freezes (2-3 inches of straw)',
          'Protect from extreme cold in northern regions',
          'Remove old, diseased foliage',
          'Avoid walking on frozen plants',
          'Plan for next season\'s maintenance'
        ]
      },
      {
        day: 270,
        name: 'Spring Growth',
        description: 'Plants break dormancy and produce new foliage in early spring.',
        image: 'https://images.pexels.com/photos/4750271/pexels-photo-4750271.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Remove winter mulch gradually as temperatures warm',
          'Apply balanced fertilizer as new growth appears',
          'Monitor for early-season pests',
          'Clean beds of debris and dead leaves',
          'Thin plants if overcrowded'
        ]
      },
      {
        day: 330,
        name: 'Flowering and Fruiting',
        description: 'Plants produce white flowers that develop into strawberries after pollination.',
        image: 'https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Install bird netting before fruits ripen',
          'Place fresh straw mulch under developing fruits',
          'Ensure adequate water during fruit development',
          'Begin harvesting when fruits are fully red',
          'Monitor for fruit rot and remove affected berries'
        ]
      }
    ],
    tips: {
      commonProblems: [
        {
          name: 'Gray Mold (Botrytis)',
          solution: 'Improve air circulation, avoid overhead watering, use straw mulch, and remove infected fruits promptly.'
        },
        {
          name: 'Slugs and Snails',
          solution: 'Use copper tape barriers, diatomaceous earth, or beer traps. Apply slug bait in severe cases.'
        },
        {
          name: 'Bird Damage',
          solution: 'Cover plants with netting once fruits begin to develop color. Use shiny objects or bird deterrents as supplementary methods.'
        },
        {
          name: 'Leaf Spot Diseases',
          solution: 'Provide good air circulation, avoid overhead watering, remove infected leaves, and consider organic fungicides as needed.'
        }
      ],
      expertTips: [
        'Consider growing day-neutral varieties for extended harvest throughout the growing season.',
        'Renovate June-bearing beds immediately after harvest by mowing foliage and thinning plants.',
        'Replace plantings every 3-4 years as production declines in older plants.',
        'Grow in containers or hanging baskets to save space and reduce pest problems.',
        'Plant near companions like borage, thyme, and spinach to attract pollinators and deter pests.'
      ]
    },
    recommendedProducts: [
      {
        name: 'Strawberry Planting Containers',
        description: 'Tiered planter specially designed for strawberries with excellent drainage and space efficiency.',
        price: 29.99,
        image: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Organic Berry Fertilizer',
        description: 'Balanced organic formula with added micronutrients specifically designed for strawberries and other berries.',
        price: 14.95,
        image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Bird Netting Kit',
        description: 'Complete kit with fine mesh netting and support stakes to protect ripening strawberries from birds.',
        price: 19.50,
        image: 'https://images.pexels.com/photos/5502238/pexels-photo-5502238.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: 'zucchini',
    name: 'Zucchini',
    category: 'vegetables',
    description: 'A prolific summer squash that\'s easy to grow and versatile in the kitchen.',
    difficulty: 'Beginner',
    growingTime: '45-55 days',
    waterNeeds: 'Moderate',
    sunlight: 'Full Sun',
    successRate: 90,
    image: 'https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructions: {
      preparation: [
        'Choose a sunny location with at least 6-8 hours of direct sunlight daily.',
        'Prepare soil by incorporating plenty of compost or aged manure.',
        'Ensure good drainage - zucchini doesn\'t tolerate waterlogged soil.',
        'Create small mounds or hills if planting in rows.',
        'Consider warming soil with black plastic for early planting.'
      ],
      planting: [
        'Direct sow seeds after all danger of frost has passed and soil has warmed to at least 60°F.',
        'Plant seeds 1 inch deep, 3-4 seeds per hill or every 8-10 inches in rows.',
        'Space hills 3-4 feet apart, or rows 3-4 feet apart.',
        'Thin to 2-3 strongest seedlings per hill once they have 2-3 true leaves.',
        'For earlier harvest, start seeds indoors 3-4 weeks before last frost date and transplant carefully to avoid root disturbance.'
      ],
      care: [
        'Water deeply and consistently, providing 1-2 inches per week.',
        'Apply mulch to retain moisture and suppress weeds.',
        'Feed with balanced organic fertilizer when plants begin flowering.',
        'Hand pollinate if necessary in areas with few pollinators (use small brush to transfer pollen between male and female flowers).',
        'Elevate developing fruit off soil with mulch or small supports to prevent rot.',
        'Monitor for pests, especially squash bugs, cucumber beetles, and powdery mildew.'
      ],
      harvesting: [
        'Harvest when fruits are 6-8 inches long and still tender (about the size of a cucumber).',
        'Use a sharp knife or pruners to cut fruit from the plant, leaving a small piece of stem attached.',
        'Harvest frequently (every 1-2 days during peak season) to encourage continued production.',
        'Don\'t allow fruits to grow too large - they become tough and seedy.',
        'Handle carefully to avoid scratching tender skin.'
      ]
    },
    growthStages: [
      {
        day: 1,
        name: 'Germination',
        description: 'Seeds sprout and emerge from soil within 7-10 days in warm conditions.',
        image: 'https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Keep soil consistently moist but not waterlogged',
          'Ensure soil remains warm (at least 60°F)',
          'Protect young seedlings from pests with row covers if needed'
        ]
      },
      {
        day: 14,
        name: 'Seedling Stage',
        description: 'Young plants develop their first true leaves and establish roots.',
        image: 'https://images.pexels.com/photos/1214238/pexels-photo-1214238.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Thin to 2-3 strongest seedlings per hill',
          'Remove row covers when flowers begin to form (to allow pollination)',
          'Begin regular watering schedule',
          'Monitor for early signs of pest damage'
        ]
      },
      {
        day: 25,
        name: 'Vegetative Growth',
        description: 'Plants develop rapidly, producing large leaves and establishing their growing area.',
        image: 'https://images.pexels.com/photos/5528999/pexels-photo-5528999.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Apply mulch around plants',
          'Ensure plants receive 1-2 inches of water weekly',
          'Apply balanced fertilizer',
          'Watch for signs of nutrient deficiencies',
          'Begin monitoring for squash bugs and cucumber beetles'
        ]
      },
      {
        day: 35,
        name: 'Flowering',
        description: 'Plants produce both male and female flowers. Male flowers appear first, followed by females with tiny fruits at their base.',
        image: 'https://images.pexels.com/photos/207470/pexels-photo-207470.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Hand pollinate if necessary (transfer pollen from male to female flowers)',
          'Maintain consistent watering to prevent blossom drop',
          'Monitor for pollinators',
          'Watch for signs of powdery mildew'
        ]
      },
      {
        day: 45,
        name: 'Early Fruiting',
        description: 'Small zucchinis begin developing rapidly after successful pollination.',
        image: 'https://images.pexels.com/photos/5528991/pexels-photo-5528991.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Begin checking plants daily for harvestable fruits',
          'Elevate developing fruits off the ground',
          'Maintain consistent moisture for tender fruits',
          'Continue monitoring for pests and diseases'
        ]
      },
      {
        day: 55,
        name: 'Full Production',
        description: 'Plants produce abundantly, often yielding more than expected.',
        image: 'https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Harvest every 1-2 days to encourage continued production',
          'Watch for signs plant is slowing down',
          'Provide support for plants that become top-heavy',
          'Continue regular watering and pest monitoring',
          'Consider succession planting for extended harvest'
        ]
      }
    ],
    tips: {
      commonProblems: [
        {
          name: 'Squash Vine Borer',
          solution: 'Cover stems with soil to encourage secondary root formation, apply protective collars around stems, and inject Bt into affected stems.'
        },
        {
          name: 'Powdery Mildew',
          solution: 'Improve air circulation, avoid overhead watering, apply preventive treatments like milk spray or potassium bicarbonate.'
        },
        {
          name: 'Blossom End Rot',
          solution: 'Maintain consistent soil moisture, ensure adequate calcium, and mulch to prevent fluctuations in soil moisture.'
        },
        {
          name: 'Poor Fruit Set',
          solution: 'Hand pollinate flowers, attract pollinators with companion plants, and avoid applying insecticides during flowering.'
        }
      ],
      expertTips: [
        'Succession plant every 2-3 weeks for continuous harvest throughout the growing season.',
        'Look for compact bush varieties if garden space is limited.',
        'Harvest flowers (especially male flowers) for cooking - they\'re delicious stuffed or fried.',
        'Pick fruits when small (6-8 inches) for best flavor and texture.',
        'Plant nasturtiums, borage, and marigolds nearby to attract pollinators and repel some pests.'
      ]
    },
    recommendedProducts: [
      {
        name: 'Organic Squash Plant Food',
        description: 'Balanced nutrition with calcium to prevent blossom end rot and promote healthy, productive plants.',
        price: 12.99,
        image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Squash Vine Borer Traps',
        description: 'Pheromone traps to monitor and reduce adult moth populations before they lay eggs.',
        price: 15.95,
        image: 'https://images.pexels.com/photos/6157255/pexels-photo-6157255.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Fruit Support Cradles',
        description: 'Adjustable supports to keep developing zucchini off the ground, reducing rot and pest damage.',
        price: 9.50,
        image: 'https://images.pexels.com/photos/5797908/pexels-photo-5797908.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: 'basil',
    name: 'Basil',
    category: 'herbs',
    description: 'A fragrant culinary herb that adds wonderful flavor to many dishes.',
    difficulty: 'Beginner',
    growingTime: '60-90 days',
    waterNeeds: 'Moderate',
    sunlight: 'Full Sun',
    successRate: 85,
    image: 'https://images.pexels.com/photos/918603/pexels-photo-918603.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructions: {
      preparation: [
        'Choose a warm, sunny location with at least 6-8 hours of direct sunlight.',
        'Prepare well-draining soil enriched with compost.',
        'Ensure soil pH is between 6.0-7.0 for optimal growth.',
        'If growing indoors, select a south-facing window or provide grow lights.',
        'Basil is sensitive to cold - wait until all danger of frost has passed before planting outdoors.'
      ],
      planting: [
        'Direct sow seeds 1/4 inch deep after soil has warmed to at least 60°F.',
        'Space seeds 6-12 inches apart, or thin seedlings to this spacing.',
        'For earlier harvest, start seeds indoors 4-6 weeks before last frost date.',
        'Transplant seedlings carefully to avoid disturbing delicate roots.',
        'If growing in containers, choose pots at least 8 inches deep with drainage holes.'
      ],
      care: [
        'Water deeply when the top inch of soil feels dry, but avoid wetting the foliage.',
        'Apply light mulch to retain moisture and suppress weeds.',
        'Fertilize sparingly - too much nitrogen produces less flavorful leaves.',
        'Pinch back growing tips regularly to encourage bushier growth and prevent flowering.',
        'Remove flower buds promptly unless saving seeds, as flowering diminishes leaf production and flavor.'
      ],
      harvesting: [
        'Begin harvesting when plants have at least 6-8 leaves and are 6-8 inches tall.',
        'Harvest in the morning after dew has dried for best flavor.',
        'Pinch or cut stems just above a pair of leaves to encourage branching.',
        'Never harvest more than 1/3 of the plant at once.',
        'For preserving, freeze leaves in oil, dry them, or make pesto.'
      ]
    },
    growthStages: [
      {
        day: 1,
        name: 'Germination',
        description: 'Seeds sprout within 5-10 days in warm soil.',
        image: 'https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Keep soil consistently moist but not soggy',
          'Maintain warm temperature (70-80°F ideal)',
          'Provide bright, indirect light until sprouting'
        ]
      },
      {
        day: 14,
        name: 'Seedling Stage',
        description: 'Young plants develop their first true leaves after the cotyledons (seed leaves).',
        image: 'https://images.pexels.com/photos/6157297/pexels-photo-6157297.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Thin to final spacing if direct-sown',
          'Begin exposing indoor seedlings to direct sun gradually',
          'Ensure good air circulation to prevent damping off',
          'Begin regular watering routine'
        ]
      },
      {
        day: 28,
        name: 'Vegetative Growth',
        description: 'Plants develop multiple sets of leaves and begin to branch out.',
        image: 'https://images.pexels.com/photos/1437424/pexels-photo-1437424.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Pinch back growing tips to encourage bushiness',
          'Apply light fertilizer if leaves appear pale',
          'Maintain consistent moisture',
          'Watch for signs of pests like aphids'
        ]
      },
      {
        day: 45,
        name: 'Mature Foliage',
        description: 'Plants reach harvestable size with multiple stems and abundant leaves.',
        image: 'https://images.pexels.com/photos/1391080/pexels-photo-1391080.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Begin regular harvesting to encourage continued growth',
          'Remove any flower buds as they appear',
          'Continue pinching top growth to maintain bushiness',
          'Watch for signs of nutrient deficiencies'
        ]
      },
      {
        day: 60,
        name: 'Peak Production',
        description: 'Plants reach maximum leaf production with intense flavor and aroma.',
        image: 'https://images.pexels.com/photos/918603/pexels-photo-918603.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Harvest regularly to maintain production',
          'Continue removing flower buds unless saving seeds',
          'Monitor water needs carefully, especially in containers',
          'Apply light fertilizer if growth slows'
        ]
      },
      {
        day: 80,
        name: 'Flowering/Seed Production',
        description: 'If allowed to flower, plants produce white to purple flower spikes followed by seeds.',
        image: 'https://images.pexels.com/photos/5649262/pexels-photo-5649262.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Allow flowers to develop fully if saving seeds',
          'Reduce watering slightly as plants flower',
          'Collect seeds when flower heads turn brown',
          'Consider starting replacement plants as flavor diminishes',
          'Take cuttings to propagate favorite varieties'
        ]
      }
    ],
    tips: {
      commonProblems: [
        {
          name: 'Fusarium Wilt',
          solution: 'Plant resistant varieties, avoid overhead watering, and use clean soil. Remove and destroy infected plants promptly.'
        },
        {
          name: 'Aphids',
          solution: 'Spray with strong water stream, apply insecticidal soap, or introduce beneficial insects like ladybugs.'
        },
        {
          name: 'Leaf Spots',
          solution: 'Improve air circulation, avoid overhead watering, and remove affected leaves. Apply organic fungicide if necessary.'
        },
        {
          name: 'Slugs and Snails',
          solution: 'Apply diatomaceous earth around plants, set up beer traps, or manually remove at night.'
        }
      ],
      expertTips: [
        'Companion plant basil with tomatoes - they grow well together and basil may improve tomato flavor.',
        'Grow several varieties for different culinary uses (Thai, lemon, cinnamon, etc.).',
        'Take cuttings to root indoors for winter growing.',
        'Harvest entire stems rather than individual leaves for faster regrowth.',
        'Protect from temperatures below 50°F, which can damage plants and reduce flavor.'
      ]
    },
    recommendedProducts: [
      {
        name: 'Herb Plant Food',
        description: 'Gentle liquid fertilizer formulated specifically for culinary herbs, enhancing flavor and growth.',
        price: 9.99,
        image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Self-Watering Herb Pot',
        description: 'Decorative container with water reservoir for consistent moisture, perfect for indoor basil.',
        price: 18.95,
        image: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Gourmet Basil Seed Collection',
        description: 'Set of five premium basil varieties including Genovese, Thai, Purple, Lemon, and Cinnamon.',
        price: 12.50,
        image: 'https://images.pexels.com/photos/7469208/pexels-photo-7469208.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: 'corn',
    name: 'Corn',
    category: 'grains',
    description: 'A staple grain crop that produces delicious ears perfect for summer enjoyment.',
    difficulty: 'Intermediate',
    growingTime: '60-100 days',
    waterNeeds: 'High',
    sunlight: 'Full Sun',
    successRate: 70,
    image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructions: {
      preparation: [
        'Choose a location with full sun and protection from strong winds.',
        'Prepare soil by incorporating compost or aged manure.',
        'Ensure soil pH is between 6.0-6.8 for optimal nutrient availability.',
        'Plan for block planting rather than single rows for better pollination.',
        'Wait until soil has warmed to at least 60°F before planting.'
      ],
      planting: [
        'Direct sow seeds 1-2 inches deep after last frost date when soil has warmed.',
        'Space seeds 8-12 inches apart in rows 30-36 inches apart.',
        'For better pollination, plant in blocks of at least 4 rows rather than long single rows.',
        'Consider succession planting every 2 weeks for extended harvest.',
        'For earliest harvest, use black plastic to pre-warm soil and plant through slits.'
      ],
      care: [
        'Water deeply and consistently, providing 1-2 inches per week, especially during tasseling and ear formation.',
        'Apply mulch to retain moisture and suppress weeds.',
        'Side-dress with nitrogen-rich fertilizer when plants are 12 inches tall and again when tassels form.',
        'Hill soil around base of stalks when plants are 12-18 inches tall for added support.',
        'Hand pollinate if necessary by shaking stalks or transferring pollen from tassels to silks.',
        'Monitor for pests, especially corn earworms and raccoons.'
      ],
      harvesting: [
        'Harvest when silks have turned brown and ears feel full and rounded.',
        'Test for ripeness by puncturing a kernel - milky juice indicates perfect ripeness.',
        'Twist ears downward and pull to remove from stalk.',
        'Harvest in morning for best flavor and immediate refrigeration if not consuming right away.',
        'Process or consume sweet corn promptly as sugars convert to starch quickly after harvest.'
      ]
    },
    growthStages: [
      {
        day: 1,
        name: 'Germination',
        description: 'Seeds sprout within 7-10 days in warm soil, sending up a single spike-like leaf.',
        image: 'https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Keep soil consistently moist until emergence',
          'Protect from birds with row cover if necessary',
          'Monitor soil temperature - should be at least 60°F'
        ]
      },
      {
        day: 14,
        name: 'Early Growth',
        description: 'Young plants develop their first true leaves and establish roots.',
        image: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Thin to final spacing if needed',
          'Begin regular watering schedule',
          'Monitor for cutworms and other early-season pests',
          'Apply light mulch around plants'
        ]
      },
      {
        day: 30,
        name: 'Vegetative Growth',
        description: 'Plants grow rapidly, developing strong stalks and multiple leaves.',
        image: 'https://images.pexels.com/photos/974313/pexels-photo-974313.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Apply first side-dressing of nitrogen fertilizer',
          'Hill soil around base of plants for support',
          'Ensure consistent moisture (1-2 inches per week)',
          'Monitor for signs of nutrient deficiencies'
        ]
      },
      {
        day: 60,
        name: 'Tasseling',
        description: 'Plants develop tassels (male flowers) at the top of stalks, which release pollen.',
        image: 'https://images.pexels.com/photos/1459331/pexels-photo-1459331.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Apply second side-dressing of fertilizer',
          'Ensure adequate water during this critical stage',
          'Shake plants gently on still mornings to aid pollination',
          'Watch for corn earworm moths laying eggs on silk'
        ]
      },
      {
        day: 70,
        name: 'Silking',
        description: 'Silks (female flower parts) emerge from developing ears and catch pollen from tassels.',
        image: 'https://images.pexels.com/photos/2909822/pexels-photo-2909822.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Maintain consistent watering',
          'Hand pollinate if needed by transferring pollen to silks',
          'Apply mineral oil to silk tips to prevent earworms',
          'Continue monitoring for pests'
        ]
      },
      {
        day: 90,
        name: 'Ear Development and Ripening',
        description: 'Fertilized ears fill out with kernels that progress from watery to milky stage as they ripen.',
        image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=800',
        tasks: [
          'Begin checking ears for ripeness when silks brown',
          'Protect ripening ears from birds and raccoons if necessary',
          'Continue regular watering until harvest',
          'Prepare for harvest and processing'
        ]
      }
    ],
    tips: {
      commonProblems: [
        {
          name: 'Corn Earworms',
          solution: 'Apply few drops of mineral oil or Bt to silk tips after pollination. Choose resistant varieties and practice crop rotation.'
        },
        {
          name: 'Poor Kernel Development',
          solution: 'Improve pollination by planting in blocks, hand pollinating, and ensuring adequate water during silking stage.'
        },
        {
          name: 'Raccoon and Bird Damage',
          solution: 'Use physical barriers like fencing or netting. Radio or motion-activated deterrents may help temporarily.'
        },
        {
          name: 'Corn Smut',
          solution: 'Remove and destroy infected parts, practice crop rotation, and improve air circulation. Note that smut is considered a delicacy in some cuisines!'
        }
      ],
      expertTips: [
        'Plant the three sisters – corn, beans, and squash together in Native American tradition for natural support and soil benefits.',
        'Choose varieties suited to your climate and growing season length - super-sweet varieties need warmer soil than standard types.',
        'Preserve freshness after harvest by cooling ears immediately in ice water.',
        'Save seeds only from open-pollinated varieties, not hybrids.',
        'Grow popcorn and ornamental corn varieties for fun alternatives to sweet corn.'
      ]
    },
    recommendedProducts: [
      {
        name: 'Corn-Specific Fertilizer',
        description: 'High-nitrogen formula specifically balanced for corn\'s heavy feeding requirements.',
        price: 15.99,
        image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Corn Ear Protection Sleeves',
        description: 'Breathable mesh sleeves that protect developing ears from insects while allowing pollination.',
        price: 12.95,
        image: 'https://images.pexels.com/photos/5797908/pexels-photo-5797908.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Sweet Corn Seed Collection',
        description: 'Mix of four premium sweet corn varieties with staggered maturity dates for extended harvest.',
        price: 9.50,
        image: 'https://images.pexels.com/photos/7469208/pexels-photo-7469208.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  }
]