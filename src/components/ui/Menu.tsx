export const Menu = () => {
	return (
		<>
			<button
				id="dropdownUserAvatarButton"
				data-dropdown-toggle="dropdownAvatar"
				className="flex text-sm cursor-pointer rounded-full md:me-0 "
				type="button"
			>
				<span className="sr-only">Open user menu</span>
				<img
					className="w-12 h-12 rounded-full"
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ1-tiy7YDb83_KFy-AySQBYfkuEAN75tg5Q&s"
					alt="user photo"
				/>
			</button>

			{/* <!-- Dropdown menu --> */}
			<div
				id="dropdownAvatar"
				className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
			>
				<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
					<div>Bonnie Green</div>
					<div className="font-medium truncate">name@flowbite.com</div>
				</div>
				<ul
					className="py-2 text-sm text-gray-700 dark:text-gray-200"
					aria-labelledby="dropdownUserAvatarButton"
				>
					<li>
						<a
							href="#"
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Dashboard
						</a>
					</li>
					<li>
						<a
							href="#"
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Settings
						</a>
					</li>
					<li>
						<a
							href="#"
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Earnings
						</a>
					</li>
				</ul>
				<div className="py-2">
					<a
						href="#"
						className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
					>
						Sign out
					</a>
				</div>
			</div>
		</>
	);
};
