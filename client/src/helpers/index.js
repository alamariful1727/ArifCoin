export const dateFormatter = d => {
	const months = [
		"JAN",
		"FEB",
		"MAR",
		"APR",
		"MAY",
		"JUN",
		"JUL",
		"AUG",
		"SEP",
		"OCT",
		"NOV",
		"DEC"
	];
	const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
	let hours = d.getHours();
	let minutes = d.getMinutes();
	let am_pm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;
	hours = hours ? hours : 12;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	let time = hours + ":" + minutes + " " + am_pm;
	let date = d.getDate();
	let day = days[d.getDay()];
	let month = months[d.getMonth()];
	let year = d.getFullYear();
	return {
		time,
		date,
		day,
		month,
		year,
		format: time + " | " + month + " " + date
	};
};
