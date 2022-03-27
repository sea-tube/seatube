module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"primary-color": "#12121E",
				"secondary-color": "#19192B",
				"special-color": "#39AABB"
			},
			spacing: {
				19: "4.8rem",
				21: "5.1rem",
				23: "6.1rem",
				37: "9.5rem",
				47: "11.7rem",
				49: "12.2rem",
				491: "12.5rem",
				51: "12.5rem",
				53: "13.3rem",
				"7x11": "82rem",
			},
		},
	},
	plugins: [require("tw-elements/dist/plugin")],
}