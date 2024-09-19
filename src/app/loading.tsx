import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Image
        src={"/icons/logo.svg"}
        alt="Logo Image"
        width={500}
        height={500}
        className="animate-pulse"
      />
      <h1 className="text-4xl text-black-1 font-bold font-ibm-plex-serif">
        Horizan
      </h1>
    </div>
  );
};
export default Loading;
