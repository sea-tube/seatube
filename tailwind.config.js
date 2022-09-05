module.exports = {
	darkMode: 'class',
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				'inter': ['Inter', 'sans-serif']
			},
			colors: {
				"primary-color": "#f8fafc",
				"secondary-color": "#6bc4cc",
				"special-color": "#39AABB",

				"dark-primary-color": "#12121E",
				"dark-secondary-color": "#19192B",
				"dark-special-color": "#39AABB",

				"aqua": "#6bc4cc",
				"teal": "#388084",
				"teal-muted": "#459a9c",
				"green": "#18b894",
				"charcoal": "#34373f"
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
	plugins: [
		require("tw-elements/dist/plugin"),
		require('@tailwindcss/forms')
	],
}