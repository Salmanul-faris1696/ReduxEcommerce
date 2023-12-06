
interface propsType {
    img : string 
    title : string 
    comments :  number
    date : string
}

const BlogCard:React.FC <propsType>= ({img , title , comments ,date }) => {
  return (
    <div className="space-y-4">
        <img src={img} alt="post " className="rounded-lg hover:scale-105 transition-transform "/>
        <div className="text-accent font-medium">
            <span> {date} / </span>
            <span>{comments} comments</span>
        </div>
            <h3 className="font-bold text-xl">{title}</h3>

    </div>
  )
}

export default BlogCard