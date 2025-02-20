"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "./ui/shared/Button";

const Banner = () => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const navigate = useNavigate();
	// const parallaxOffset = useParallax(0.5);

	const bannerData = [
		{
			image: "https://images.unsplash.com/photo-1596687760372-4c0d266059a7?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			title: "Ride the Future",
			description:
				"Explore our latest collection of electric and hybrid bikes designed for efficiency and speed.",
		},
		{
			image: "https://images.unsplash.com/photo-1572452571879-3d67d5b2a39f?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			title: "Adventure Awaits",
			description:
				"Find your perfect companion for off-road adventures with our durable and high-performance mountain bikes.",
		},
		{
			image: "https://plus.unsplash.com/premium_photo-1661955488707-44a1a455c252?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			title: "Speed Meets Style",
			description:
				"Experience the thrill of racing with our lightweight and aerodynamic road bikes.",
		},
		{
			image: "https://images.unsplash.com/photo-1616239278102-7bd9286c5fb2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			title: "Urban Commuting Made Easy",
			description:
				"Discover stylish and comfortable commuter bikes for your daily city rides.",
		},
		{
			image: "https://images.unsplash.com/photo-1624535478774-c7269849fec4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			title: "Unmatched Performance",
			description:
				"Upgrade your ride with the latest technology and premium components for a smooth biking experience.",
		},
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [bannerData.length]);

	return (
		<div className="relative  bg-gradient-to-b from-gray-800 to-gray-800 text-white overflow-hidden rounded-3xl ">
			<div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
				{bannerData.map((data, index) => (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
						transition={{ duration: 0.5 }}
						className="absolute inset-0 z-10 flex justify-center items-center w-full"
						style={{
							backgroundImage: `url(${data.image})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}
					>
						<div className="absolute inset-0 bg-black opacity-20" />

						{/* Content Container */}
						<div className="relative left-36 z-10 w-[100%] md:w-[100%] mx-auto flex flex-col lg:flex-row items-center justify-center">
							{/* Text Content */}
							<motion.div
								className="w-full flex-col justify-center items-center "
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
							>
								<h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
									{data.title}
								</h1>
								<p className="text-base text-gray-300 max-w-xl py-3">
									{data.description}
								</p>
								<Button
									text="Explore Our Collection"
									handleClick={() => navigate("/shop")}
								/>
							</motion.div>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default Banner;
