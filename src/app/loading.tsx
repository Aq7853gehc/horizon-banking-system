import Image from "next/image"

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
        <Image src={"/icon/logo.svg"} alt="Logo Image" width={500} height={500} className="animate-pulse"/>
        
    </div>
  )
}
export default Loading