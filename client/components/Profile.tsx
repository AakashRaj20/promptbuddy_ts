import PromptCard from "./PromptCard";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux_store/hooks";
import { selectUserAuth, userAuthLoading } from "@/redux_store/slices/userAuthSlice";
import { Prompts } from "@/redux_store/slices/allPromptsSlice";
import {
  loggedUserLoading,
  loggedUserPrompts,
} from "@/redux_store/slices/loggedUserPostsSlice";
import {
  savedPrompts,
  savedPromptLoading,
  fetchSavedPrompts,
} from "@/redux_store/slices/savedPromptSlice";
import { useEffect, useState } from "react";

interface ProfileProps {
  name: string | null;
  desc: string;
  data: Prompts[];
}

const Profile = ({ name, desc, data }: ProfileProps) => {
  const [profileData, setProfileData] = useState<Prompts[]>(data);
  const [activeBtn, setActiveBtn] = useState<boolean>(true);
  const userAuth = useAppSelector(selectUserAuth);
  const dispatch = useAppDispatch();
  const isLoggedUserLoading = useAppSelector(loggedUserLoading);
  const isUserLoading = useAppSelector(userAuthLoading);
  const savedPrompt = useAppSelector(savedPrompts);
  const loggedUserPrompt = useAppSelector(loggedUserPrompts);
  const pathName = usePathname();

  const handleMyPost = async () => {
    setProfileData(loggedUserPrompt);
    setActiveBtn(true);
  };

  const handleSavedPost = async () => {
    setProfileData(savedPrompt);
    setActiveBtn(false);
  };

  useEffect(() => {
    !isUserLoading && dispatch(fetchSavedPrompts({ userId: userAuth?.session?._id }));
  }, [isUserLoading]);

  console.log({ data });

  console.log({ profileData });

  useEffect(() => {
    setProfileData(data);
  }, [data]);

  const activeStyle = "bg-orange-400 text-white rounded-full px-7";
  const inActiveStyle =
    "dark:bg-transparent hover:before:bg-redborder-red-500 relative rounded-full px-7 overflow-hidden border-2 dark:border-orange-400 bg-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-orange-400 before:transition-all before:duration-500 hover:text-white hover:shadow-orange-400 hover:before:left-0 hover:before:w-full";

  return (
    <section className="lg:px-10 w-full">
      <h1 className="text-6xl font-bold text-left px-2">
        <span className="green_gradient capitalize">{name} Profile</span>
      </h1>
      <p className="desc text-left px-2">{desc}</p>
      {pathName === "/profile" && (
        <div className="flex justify-evenly mt-9">
          <Button
            className={activeBtn ? activeStyle : inActiveStyle}
            onClick={handleMyPost}
            variant={activeBtn ? "default" : "outline"}
          >
            <span className="relative z-10">My Posts</span>
          </Button>
          <Button
            className={!activeBtn ? activeStyle : inActiveStyle}
            onClick={handleSavedPost}
            variant={!activeBtn ? "default" : "outline"}
          >
            <span className="relative z-10">Saved Post</span>
          </Button>
          <Button
            type="button"
            onClick={() => {
              // signOut();
            }}
            className="sm:hidden dark:bg-transparent hover:before:bg-redborder-red-500 relative rounded-full px-7 overflow-hidden border-2 dark:border-orange-400 bg-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-orange-400 before:transition-all before:duration-500 hover:text-white hover:shadow-orange-400 hover:before:left-0 hover:before:w-full"
          >
            <span className="relative z-10">Sign Out</span>
          </Button>
        </div>
      )}
      {isLoggedUserLoading ? (
        // <Loading />
        <div>Loading...</div>
      ) : (
        <div className="mt-10 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data &&
            profileData &&
            profileData.length > 0 &&
            profileData.map((post) => (
              <PromptCard
                key={post._id}
                post={post}
                //handleEdit={() => handleEdit && handleEdit(post)}
              />
            ))}
        </div>
      )}
      {/* {!isLoggedUserLoading &&
        loggedPrompts &&
        loggedPrompts.length === 0 &&
        activeBtn === "myposts" && (
          <div className="flex justify-center mt-10">
            <p className="text-2xl text-center">
              No prompts created yet. Create some awesome prompts and share with
              the community.
            </p>
          </div>
        )} */}
      {/* {(!savedPromptIsLoading ||
        savedPrompt === undefined ||
        savedPrompt[0]?.prompts.length === 0) &&
        activeBtn === "savedposts" && (
          <div className="flex justify-center mt-10">
            <p className="text-2xl text-center">
              No saved prompts yet. Explore and save amazing prompts
            </p>
          </div>
        )} */}
    </section>
  );
};

export default Profile;
