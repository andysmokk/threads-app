"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  authorId: string;
  currentUserId: string;
  // authorId: string;
  // parentId: string | null;
  // isComment?: boolean;
}

const EditThread = ({ authorId, currentUserId }: Props) => {
  const pathname = usePathname();

  if (currentUserId !== authorId || pathname === "/") return null;

  return (
    <Link href={""}>
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
