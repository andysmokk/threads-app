"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  createReaction,
  fetchReactions,
  getReactionOfUser,
} from "@/lib/actions/thread.actions";

import { usePathname } from "next/navigation";

interface Props {
  threadId: string;
  userId: string;
  // isLiked: boolean;
}

const ReactionThread = ({ threadId, userId }: Props) => {
  // const [likeCount, setLikeCount] = useState(0);
  const [likeOfUser, setLikeOfUser] = useState(false);
  // console.log("🚀 ~ ReactionThread ~ likeOfUser:", likeOfUser);

  const pathname = usePathname();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const countLikes = await fetchReactions({ threadId, path: pathname });
  //     setLikeCount(countLikes);

  //     // const isLiked = await getReactionOfUser(threadId, userId);
  //     // setLikeOfUser(isLiked);
  //   };

  //   // const isLikedOfCurrentUser = async () => {
  //   //   const isLiked = await getReactionOfUser(threadId, userId);
  //   //   console.log("🚀 ~ isLikedOfCurrentUser ~ isLiked:", isLiked);
  //   //   setLikeOfUser(isLiked);
  //   // };

  //   // isLikedOfCurrentUser();
  //   fetchData();
  // }, [threadId, pathname]);

  useEffect(() => {
    const fetchLikeOfUser = async () => {
      const isLiked = await getReactionOfUser({
        threadId,
        userId,
        // path: pathname,
      });
      console.log("🚀 ~ fetchLikeOfUser ~ isLiked:", isLiked);
      setLikeOfUser(isLiked);
    };

    fetchLikeOfUser();
  }, [threadId, userId]);

  const handleClick = async () => {
    await createReaction({ threadId, userId, path: pathname });
    await fetchReactions({ threadId });
    // setLikeCount(updatedLikeCount);

    // const updatedLikeOfUser = !likeOfUser;
    // setLikeOfUser(updatedLikeOfUser);
    setLikeOfUser(!likeOfUser);
  };

  return (
    <>
      <Image
        src={`/assets/heart-${likeOfUser ? "filled" : "gray"}.svg`}
        alt="heart"
        width={24}
        height={24}
        onClick={handleClick}
        className="cursor-pointer"
      />
      {/* <span>{likeCount}</span> */}
    </>
  );
};

export default ReactionThread;
