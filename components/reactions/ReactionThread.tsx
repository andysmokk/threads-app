"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import {
  createReaction,
  fetchReactions,
  getReactionOfUser,
} from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  userId: string;
  // isLiked: boolean;
}

const ReactionThread = ({ threadId, userId }: Props) => {
  const [likeCount, setLikeCount] = useState(0);
  const [likeOfUser, setLikeOfUser] = useState(false);
  // console.log("🚀 ~ ReactionThread ~ likeOfUser:", likeOfUser);
  // console.log("🚀 ~ ReactionThread ~ likeOfUser:", likeOfUser);

  // console.log("🚀 ~ ReactionThread ~ likeCount:", likeCount);

  useEffect(() => {
    const fetchData = async () => {
      const countLikes = await fetchReactions(threadId);
      setLikeCount(countLikes);

      // const isLiked = await getReactionOfUser(threadId, userId);
      // setLikeOfUser(isLiked);
    };

    // const isLikedOfCurrentUser = async () => {
    //   const isLiked = await getReactionOfUser(threadId, userId);
    //   console.log("🚀 ~ isLikedOfCurrentUser ~ isLiked:", isLiked);
    //   setLikeOfUser(isLiked);
    // };

    // isLikedOfCurrentUser();
    fetchData();
  }, [threadId]);

  useEffect(() => {
    const fetchLikeOfUser = async () => {
      const isLiked = await getReactionOfUser(threadId, userId);
      console.log("🚀 ~ fetchLikeOfUser ~ isLiked:", isLiked);
      setLikeOfUser(isLiked);
    };

    fetchLikeOfUser();
  }, [threadId, userId]);

  const handleClick = async () => {
    await createReaction(threadId, userId);
    const updatedLikeCount = await fetchReactions(threadId);
    setLikeCount(updatedLikeCount);

    // const updatedLikeOfUser = !likeOfUser;
    // setLikeOfUser(updatedLikeOfUser);
    setLikeOfUser(!likeOfUser);
  };

  return (
    <div>
      <Image
        src={`/assets/heart-${likeOfUser ? "filled" : "gray"}.svg`}
        alt="heart"
        width={24}
        height={24}
        onClick={handleClick}
        className="cursor-pointer"
      />
      <span>{likeCount}</span>
    </div>
  );
};

export default ReactionThread;
