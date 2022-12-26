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

				"background": "#fff",
				"background-muted": "#f8fafc",

				"primary": "#39AABB",
				"primary-light": "#6bc4cc",
				"primary-dark": "#388084",
				"primary-dark-muted": "#459a9c",
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
			screens: {
				'3xl': '1729px',
			}
		},
	},
	plugins: [
		require("tw-elements/dist/plugin"),
		require('@tailwindcss/forms')
	],
}