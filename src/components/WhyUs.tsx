const WhyUs = () => {
	const whyChooseUs = [
		{
			icon: "🔧", // You can replace this with an actual icon name if using an icon library
			title: "Experienced Technicians",
			description:
				"Our certified mechanics have years of expertise in motorcycle repair, maintenance, and performance tuning.",
		},
		{
			icon: "🏆",
			title: "Quality Service",
			description:
				"We use high-quality tools and genuine parts to ensure the best results for your motorcycle.",
		},
		{
			icon: "🤝",
			title: "Customer Satisfaction",
			description:
				"We prioritize customer trust with transparent pricing, honest service, and a friendly approach.",
		},
		{
			icon: "💰",
			title: "Affordable Pricing",
			description:
				"Get top-quality services at fair and competitive prices without compromising on quality.",
		},
		{
			icon: "⚡",
			title: "Fast & Reliable",
			description:
				"Our efficient workflow ensures quick turnarounds so you can get back on the road as soon as possible.",
		},
		{
			icon: "🛠️",
			title: "Custom Modifications",
			description:
				"Upgrade your ride with personalized performance and aesthetic modifications tailored to your needs.",
		},
	];

	return (
		<>
			<h1 className=" text-6xl font-bold mb-36 text-center">Why Choose Us</h1>
			<div className=" lg:flex items-center justify-between gap-12">
				<div className=" space-y-20">
					{whyChooseUs?.slice(0, 3).map((item) => (
						<div>
							<p className=" text-[#6dc234] text-5xl">{item.icon}</p>
							<h1 className=" font-bold text-3xl mt-6 text-[#222121d3]">
								{item.title}
							</h1>
							<p className=" text-[#393838e7] mt-2">{item.description}</p>
						</div>
					))}
				</div>
				<div>
					<img
						src={
							"https://img.freepik.com/free-vector/skeleton-rigind-motorbike_1415-115.jpg?t=st=1740006712~exp=1740010312~hmac=7bbab307a781ce2022102ab205ab002bfe058468f0a1f4b253ff472162294eac&w=740"
						}
						alt=""
					/>
				</div>
				<div className=" space-y-20">
					{whyChooseUs?.slice(3, 6).map((item) => (
						<div>
							<p className=" text-[#6dc234] text-5xl">{item.icon}</p>
							<h1 className=" font-bold text-3xl mt-6 text-[#222121d3]">
								{item.title}
							</h1>
							<p className=" text-[#393838e7] mt-2">{item.description}</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default WhyUs;
