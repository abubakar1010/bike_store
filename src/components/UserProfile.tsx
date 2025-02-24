import {  selectUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/store/hook";

const UserProfile = () => {
  const currentUser = useAppSelector(selectUser);
  return (
    <div className="max-w-[100%] mx-auto w-80">
      <div className="rounded-lg  bg-transparent px-4 py-8 text-center shadow-lg">
        <figure className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
        <img
					className="w-16 h-16 rounded-full"
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ1-tiy7YDb83_KFy-AySQBYfkuEAN75tg5Q&s"
					alt="user photo"
				/>
          <figcaption className="sr-only">{currentUser?.name}</figcaption>
        </figure>
        <h2 className="mt-4 text-xl font-bold text-primary dark:text-green-400">
          {currentUser?.name}
        </h2>
        <p className="mb-4 text-gray-600">
          Email:{" "}
          <span className="font-bold text-primary">
            {currentUser?.email}
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
