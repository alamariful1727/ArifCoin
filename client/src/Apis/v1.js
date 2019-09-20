import axios from "axios";

export default axios.create({
	baseURL: "https://d7b72119.ngrok.io/api/v1/"
	// baseURL: "http://192.168.1.3:5050/api/v1/"
});
