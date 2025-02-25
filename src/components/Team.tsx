import {
	Card,
	CardBody,
	Avatar,
	IconButton,
	Typography,
} from "@material-tailwind/react";

const Team = () => {
	function TeamCard({
		img,
		name,
		title,
	}: {
		img: string;
		name: string;
		title: string;
	}) {
		return (
			<Card
				className="rounded-lg bg-[#FAFAFA]"
				shadow={false}
				children={
					<CardBody
						className="text-center"
						children={
							<>
								<Avatar
									src={img}
									alt={name}
									variant="circular"
									size="xxl"
									className="mx-auto mb-6 object-top"
									placeholder={undefined}
									onPointerEnterCapture={undefined}
									onPointerLeaveCapture={undefined}
								/>
								<Typography
									variant="h5"
									color="blue-gray"
									className="!font-medium text-lg"
									children={name}
									placeholder={undefined}
									onPointerEnterCapture={undefined}
									onPointerLeaveCapture={undefined}
								></Typography>
								<Typography
									color="blue-gray"
									className="mb-2 !text-base !font-semibold text-gray-600"
									children={title}
									placeholder={undefined}
									onPointerEnterCapture={undefined}
									onPointerLeaveCapture={undefined}
								></Typography>
								<div className="flex items-center justify-center gap-1.5">
									<IconButton
										variant="text"
										color="gray"
										children={<i className="fa-brands fa-twitter text-lg" />}
										placeholder={undefined}
										onPointerEnterCapture={undefined}
										onPointerLeaveCapture={undefined}
									></IconButton>
									<IconButton
										variant="text"
										color="gray"
										children={<i className="fa-brands fa-linkedin text-lg" />}
										placeholder={undefined}
										onPointerEnterCapture={undefined}
										onPointerLeaveCapture={undefined}
									></IconButton>
									<IconButton
										variant="text"
										color="gray"
										children={<i className="fa-brands fa-dribbble text-lg" />}
										placeholder={undefined}
										onPointerEnterCapture={undefined}
										onPointerLeaveCapture={undefined}
									></IconButton>
								</div>
							</>
						}
						placeholder={undefined}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}
					></CardBody>
				}
				placeholder={undefined}
				onPointerEnterCapture={undefined}
				onPointerLeaveCapture={undefined}
			></Card>
		);
	}

	const members = [
		{
			img: `https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80`,
			name: "Khaled Ibrahim",
			title: "Co-Founder & CEO",
		},
		{
			img: `https://www.material-tailwind.com/img/avatar2.jpg`,
			name: "Hasan Rahman",
			title: "Head of Bike Sales",
		},
		{
			img: `https://i.postimg.cc/TwqP80d1/bohemian-man-with-his-arms-crossed.jpg`,
			name: "Arif Hossain",
			title: "Product Research Analyst",
		},
		{
			img: `https://www.material-tailwind.com/img/avatar4.jpg`,
			name: "Farhan Ahmed",
			title: "Sales & Marketing Manager",
		},
		{
			img: `https://i.postimg.cc/1X7sPYLm/young-bearded-man-with-striped-shirt.jpg`,
			name: "Mahir Khan",
			title: "Customer Support Lead",
		},
		{
			img: `https://www.material-tailwind.com/img/avatar3.jpg`,
			name: "Arafat Ali",
			title: "Supply Chain Manager",
		},
		{
			img: "https://www.material-tailwind.com/image/avatar7.svg",
			name: "Nurul Amin",
			title: "Bike Mechanic Supervisor",
		},
		{
			img: "https://i.postimg.cc/vBPp6xXX/handsome-confident-smiling-man-with-hands-crossed-chest.jpg",
			name: "Saifur Rahman",
			title: "Operations Manager",
		},
	];

	return (
		<div>
			<section className="min-h-screen py-8 px-8 lg:py-28">
				<div className="container mx-auto">
					<div className="mb-16 text-center lg:mb-28">
						<Typography
							variant="h6"
							color="blue-gray"
							className="text-lg"
							children={"Meet the Team"}
							placeholder={undefined}
							onPointerEnterCapture={undefined}
							onPointerLeaveCapture={undefined}
						></Typography>
						<Typography
							variant="h1"
							color="blue-gray"
							className="my-2 !text-2xl lg:!text-4xl"
							children={"Behind the Success: Our Dedicated Team"}
							placeholder={undefined}
							onPointerEnterCapture={undefined}
							onPointerLeaveCapture={undefined}
						></Typography>
						<Typography
							variant="lead"
							className="mx-auto w-full !text-gray-500 max-w-4xl"
							children={`From visionary leadership to creative talent, 
            each team member plays a pivotal role in delivering the exceptional 
            service and innovative solutions.`}
							placeholder={undefined}
							onPointerEnterCapture={undefined}
							onPointerLeaveCapture={undefined}
						></Typography>
					</div>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
						{members.map((props, key) => (
							<TeamCard key={key} {...props} />
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Team;
