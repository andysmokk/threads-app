"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { createReaction, fetchReactions } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  userId: string;
  // isLiked: boolean;
}

const ReactionThread = ({ threadId, userId }: Props) => {
  const [likeCount, setLikeCount] = useState(0);
  console.log("🚀 ~ ReactionThread ~ likeCount:", likeCount);

  useEffect(() => {
    const fetchData = async () => {
      const countLikes = await fetchReactions(threadId);
      setLikeCount(countLikes);
    };

    fetchData();
  }, [threadId]);

  const handleClick = async () => {
    await createReaction(threadId, userId);
    const updatedLikeCount = await fetchReactions(threadId);
    setLikeCount(updatedLikeCount);
  };

  return (
    <div>
      <Image
        src={`/assets/heart-${likeCount ? "filled" : "gray"}.svg`}
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
