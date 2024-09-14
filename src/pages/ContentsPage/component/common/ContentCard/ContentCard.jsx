import { useContentsDetail } from "../../../../../hooks/useContentsDetail.jsx";
import "./ContentCard.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";

const ContentCard = ({ content, index }) => {
    const navigate = useNavigate();
    const { data: detailData } = useContentsDetail(content?.mt20id);
    const detailContent = detailData?.dbs.db;
    const maxDelay = 1000;
    const delay = Math.min(index * 100, maxDelay);

    return (
        <Container className="ContentsPage_container" onClick={() => navigate(`${content?.mt20id}`)} data-aos="fade-down" data-aos-delay={delay}>
            <div className="ContentsPage_card-box-container d-flex gap-4 flex-wrap justify-content-between">
                <div className="ContentsPage_card-box border p-3 shadow-sm rounded-3">
                    <div className="ContentsPage_img-box">
                        <img className={"ContentsPage_Card_Image"} src={detailContent?.poster} alt="" />
                    </div>
                    <div className="ContentsPage_text-box mt-3">
                        <h5 className="fw-bold mb-2">{content?.prfnm}</h5>
                        <div className="d-flex flex-column align-items-center gap-2"> {/* flex column 중앙 정렬 */}
                            <span className="text-center">{content?.prfpdfrom} ~ {content?.prfpdto}</span>
                            <span className="text-center">{content?.fcltynm}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ContentCard;