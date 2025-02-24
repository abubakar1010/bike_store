const Loading = () => {
	return (
		<div className="w-full gap-x-2 flex justify-center items-center min-h-[calc(100vh-100px)]">
			<div className="w-5 h-5 bg-[#82c91e] rounded-full animate-bounce"></div>{" "}
			{/* Light Green */}
			<div className="w-5 h-5 bg-[#40c057] rounded-full animate-bounce"></div>{" "}
			{/* Primary Green */}
			<div className="w-5 h-5 bg-[#2f9e44] rounded-full animate-bounce"></div>{" "}
			{/* Dark Green */}
		</div>
	);
};

export default Loading;
