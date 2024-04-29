"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  authorId: string;
  currentUserId: string;
  threadId: string;
}

const EditThread = ({ authorId, currentUserId, threadId }: Props) => {
  const pathname = usePathname();

  if (currentUserId !== authorId || pathname === "/") return null;

  return (
    <Link href={`/edit-thread/${threadId}`}>
      <Image
        src="/assets/edit.svg"
        alt="edit image"
        width={28}
        height={28}
        className="cursor-pointer object-contain p-1"
      />
    </Link>
  );
};

export default EditThread;
