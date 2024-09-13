
import {useContentsDetail} from "../../../../hooks/useContentsDetail.jsx";
import  "./ContentCard.css"
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import Container from "react-bootstrap/Container";
const ContentCard = ({content,index}) => {
    const navigator = useNavigate();
    const {data : detailData} = useContentsDetail(content?.mt20id);
    const detailContent = detailData?.dbs.db;


    /*
      useEffect(() => {
        const cards = document.querySelectorAll('.ContentsPage_container');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
        });
    }, []);

    *  <div className={"ContentsPage_Card_Container"} onClick={() => navigator(`${content?.mt20id}`)}>
            <img className={"ContentsPage_Card_Image"} src={detailContent?.poster} alt={""}></img>
            <div className={"ContentsPage_Card_Info"}>
                <p className={"ContentsPage_Title"}>{content?.prfnm}</p>
                <p className={"ContentsPage_Info"}>{content?.fcltynm}</p>
            </div>
        </div>
    *
    * */
    return (
        <Container className="ContentsPage_container" onClick={() => navigator(`${content?.mt20id}`)} data-aos="fade-down"  data-aos-delay={`${index * 100}`}>
            <div className="ContentsPage_card-box-container d-flex gap-3 flex-wrap justify-content-between">
                <div className="ContentsPage_card-box border p-3 shadow-sm rounded-3">
                    <div className="ContentsPage_img-box">
                        <img className={"ContentsPage_Card_Image"} src={detailContent?.poster} alt={""}></img>
                    </div>
                    <div className="ContentsPage_text-box mt-3">
                        <h5 className="fw-bold mb-3">{content?.prfnm}</h5>
                        <span className="me-2">{content?.prfpdfrom} ~ {content?.prfpdto}</span>
                        <span>{content?.fcltynm}</span>
                    </div>
                </div>
            </div>
        </Container>


    );
}

export default ContentCard;