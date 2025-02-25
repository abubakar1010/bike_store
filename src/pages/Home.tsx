import Banner from "../components/Banner";
import { FeaturedProducts } from "../components/FeaturedProduct";
import Team from "../components/Team";

export const Home = () => {
	return (
		<div>
			<Banner />
			<FeaturedProducts />
			<Team />
		</div>
	);
};
