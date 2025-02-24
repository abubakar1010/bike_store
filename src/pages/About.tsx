import { ScrollRestoration } from "react-router-dom";
import AboutBanner from "../components/AboutBanner";
import Service from "../components/Service";
import WhyUs from "../components/WhyUs";

const About = () => {
	return (
		<div>
			<AboutBanner />
			<WhyUs />
			<Service />
			<ScrollRestoration />
		</div>
	);
};

export default About;
