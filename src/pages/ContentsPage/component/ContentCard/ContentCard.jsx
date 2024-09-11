
import {useContentsDetail} from "../../../../hooks/useContentsDetail.jsx";
import  "./ContentCard.css"
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
const ContentCard = ({content}) => {
    const navigator = useNavigate();
    const {data : detailData} = useContentsDetail(content?.mt20id);
    const detailContent = detailData?.dbs.db;

    useEffect(() => {
        const cards = document.querySelectorAll('.ContentsPage_Card_Container');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.3}s`;
        });
    }, []);

    return (
        <div className={"ContentsPage_Card_Container"} onClick={() => navigator(`${content?.mt20id}`)}>
            <img className={"ContentsPage_Card_Image"} src={detailContent?.poster} alt={""}></img>
            <div className={"ContentsPage_Card_Info"}>
                <p className={"ContentsPage_Title"}>{content?.prfnm}</p>
                <p className={"ContentsPage_Info"}>{content?.fcltynm}</p>
            </div>
        </div>
    );
}

export default ContentCard;