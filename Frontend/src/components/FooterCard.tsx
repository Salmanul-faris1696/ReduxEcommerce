
interface propsType {
    title : string 
    icon : React.ReactNode;
}

const FooterCard :React.FC<propsType> = ({ title ,icon }) => {
  return (
    <div className="flex items-center gap-4 ">
        <div className="bg-gray-300 w-[50px] h-[50px] text-accentDark text-[24px] grid items-center justify-center rounded-full">{icon}</div>
        <div>
            <h3 className="text-accent font-medium text-xl">{title} </h3>
            <p className="text-gray-400 text-[14px]">Lorem, ipsum.</p>
        </div>

    </div>
  )
}

export default FooterCard