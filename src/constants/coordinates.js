export const Level1 = [
  { x: -100, y: 200, indicatorColor: "#FCB4E3", ai: "chase" },
  { x: 600, y: 500, indicatorColor: "#221A4D", ai: "chase" },
  { x: -200, y: 800, indicatorColor: "#E73A2E", ai: "conditionalChase" },
];

export const Level2 = [
  { x: 200, y: 200, indicatorColor: "#FCB4E3", ai: "chase" },
  { x: -200, y: 400, indicatorColor: "#221A4D", ai: "chase" },
  { x: -200, y: 800, indicatorColor: "#E73A2E", ai: "conditionalChase", centerX: -100, centerY: 500 },
  { x: -500, y: 500, indicatorColor: "#E7DC2E", ai: "conditionalChase", centerX: -40, centerY: 500 },
];

export const Level3 = [
  { x: 200, y: 200, indicatorColor: "#FCB4E3", ai: "chase" },
  { x: 400, y: 400, indicatorColor: "#221A4D", ai: "chase" },
  { x: 600, y: 500, indicatorColor: "#E73A2E", ai: "conditionalChase", centerX: -40, centerY: 500 },
  { x: -200, y: 800, indicatorColor: "#E73A2E", ai: "conditionalChase", centerX: -100, centerY: 500 },
  { x: 800, y: 800, indicatorColor: "#FCB4E3", ai: "chase" },
];

export const Clouds = [
  { x: 1300, y: 400 },
  { x: 0, y: 0 },
  { x: -800, y: 200 },
  { x: 600, y: 150 },
  { x: -1300, y: 600 },
];
