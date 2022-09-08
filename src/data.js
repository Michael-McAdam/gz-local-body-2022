const data = {
  scorecard: [
    { name: "Hello", overall: "C" },
    { name: "Hello", overall: "C" },
    { name: "Hello", overall: "C" },
    { name: "Hello", overall: "C" },
    { name: "Hello", overall: "C" },
    { name: "Hello", overall: "C" },
    { name: "Hello", overall: "C" },
    { name: "Hello", overall: "C" },
    { name: "Hello", overall: "C" },
    { name: "Hello", overall: "C" },
  ],
  locations: {
    Auckland: ["area 1", "area 2", "area 3", "area 4", "area 5"],
    Wellington: [
      "Wellington Central",
      "Kapiti Coast",
      "Hutt Valley",
      "Wairarapa",
    ],
    Christchurch: ["area 1", "area 2", "area 3", "area 4"],
  },
  loc: {
    Auckland: {
      center: {
        lat: -36.893234,
        lng: 174.771345,
      },
      zoom: 11,
      locations: [
        { name: "Test", lat: -36.890125, lng: 174.761232 },
        { name: "Test 2", lat: -36.868143, lng: 174.748997 },
      ],
    },
    Wellington: {
      center: {
        lat: -41.310693,
        lng: 174.782655,
      },
      zoom: 13,
      locations: [
        { name: "Test", lat: -41.292451, lng: 174.772704 },
        { name: "Southern Cross Bar", lat: -41.297279, lng: 174.774635 },
        {
          name: "Wellington Museum",
          lat: -41.28502374425767,
          lng: 174.77813175782288,
          link: "https://goo.gl/maps/NBG52ADiyxdQpVkv9",
        },
        {
          name: "Aro Valley Community Centre",
          lat: -41.294915531447835,
          lng: 174.76860341009504,
          link: "https://goo.gl/maps/MCcyUB4ctZK9PYoU7",
        },
      ],
    },
    Christchurch: {
      center: {
        lat: -43.532253,
        lng: 172.636588,
      },
      zoom: 15,
      locations: [
        { name: "Mall", lat: -43.533007, lng: 172.635794 },
        { name: "Downtown KFC", lat: -43.532089, lng: 172.636953 },
      ],
    },
  },
};

export default data;
