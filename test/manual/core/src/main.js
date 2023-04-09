import "../../../../dist/bundle.css";
import {
	Button,
	Checkbox,
	Input, 
	Radio, 
	TreeSelect, 
	ComboBox,
	Select
} from "../../../../dist/";

new Select({
	options: [
		{
			label: "🍉 Karpuz",
			value: 1,
		},
		{
			label: "🍌 Muz",
			value: 2,
		},
		{
			label: "🍎 Elma",
			value: 3,
		},
		{
			label: "🍑 Şeftali",
			value: 4,
		},
		{
			label: "🍋 Limon",
			value: 5,
		},
		{
			label: "🍍 Ananas",
			value: 6,
		},
		{
			label: "🍓 Çilek",
			value: 7,
		},
		{
			label: "🍒 Kiraz",
			value: 8,
		},
		{
			label: "🥝 Kivi",
			value: 9,
		},
		{
			label: "🍐 Armut",
			value: 10,
		},
		{
			label: "🍇 Üzüm",
			value: 11,
		}
	],
	allowSearch: true,
	info: "true",
	label: "My Select",
	selected: {
		value: 2,
		label: "🍌 Muz"
	},
	size: "small",
	status: "warning",
}, document.getElementById("select")).on("select", (o) => console.log(o));
