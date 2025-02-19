import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Banner = () => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const carImages = [
		"https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmljeWNsZXxlbnwwfHwwfHx8MA%3D%3D",
		"https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmljeWNsZXxlbnwwfHwwfHx8MA%3D%3D",
		"https://plus.unsplash.com/premium_photo-1677564814058-34cb8d95e4d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJpY3ljbGUlMjAzZCUyMGltYWdlfGVufDB8fDB8fHww",
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carImages.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [carImages.length]);

	return (
		<motion.div
			className="w-full "
			initial={{ opacity: 0, x: 100 }}
			animate={{ opacity: 0.9, x: 0 }}
			transition={{ duration: 0.7, delay: 0.4 }}
		>
			<div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
				{carImages.map((src, index) => (
					<motion.img
						key={src}
						src={src}
						alt={`Luxury car ${index + 1}`}
						className="absolute inset-0 w-full h-full object-cover"
						initial={{ opacity: 0 }}
						animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
						transition={{ duration: 0.5 }}
					/>
				))}
			</div>
		</motion.div>
	);
};

export default Banner;
