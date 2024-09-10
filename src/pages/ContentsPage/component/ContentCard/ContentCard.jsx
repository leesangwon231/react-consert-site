
import {useContentsDetail} from "../../../../hooks/getContentsDetail.jsx";
import  "./ContentCard.css"
const ContentCard = ({content}) => {
    const {data : detailData} = useContentsDetail(content?.mt20id);
    const detailContent = detailData?.dbs.db;

  return (
       <div className={"ContentsPage_Card_Container"}>
           <img className={"ContentsPage_Card_Image"} src={detailContent?.poster} alt={""}></img>
           <div className={"ContentsPage_Card_Info"}>
               <p>{content?.prfnm}</p>
               <p>a</p>
               <p>{content?.fcltynm}</p>
           </div>
       </div>
  );
}

export default ContentCard;