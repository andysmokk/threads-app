import Image from "next/image";
import Link from "next/link";

const EditThread = () => {
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
