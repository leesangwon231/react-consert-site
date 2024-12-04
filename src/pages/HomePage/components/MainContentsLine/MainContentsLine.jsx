/* eslint-disable react/prop-types */
import Carousel from 'react-multi-carousel';
import {useContentsList} from '../../../../hooks/useMainPage';
import LoadingSpinner from '../../../../common/LoadingSpinner/LoadingSpinner';
import ErrorBox from '../../../../common/ErrorBox/ErrorBox';
import TextCard from '../TextCard/TextCard';
import 'react-multi-carousel/lib/styles.css';
import './MainContentsLineStyle.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: {max: 3000, min: 1600},
    items: 5,
    slidesToSlide: 5,
  },
  LargeDesktop: {
    breakpoint: {max: 1400, min: 1200},
    items: 4,
    slidesToSlide: 4,
  },
  desktop: {
    breakpoint: {max: 1200, min: 992},
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: {max: 992, min: 576},
    items: 3,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: {max: 576, min: 0},
    items: 2,
    slidesToSlide: 2,
  },
};

const MainContentsLine = ({title, genreCode, kidState}) => {
  const contentsLineParams = {
    itemNum: 20,
    genreCode: genreCode,
    kidState: kidState,
  };
  const {data, isLoading, isError, error} = useContentsList(contentsLineParams);
  console.log(data);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <ErrorBox error={error} />;
  }

  return (
    <div className="main-contents-line-container py-4">
      <h2 className="text-center fw-bold mb-3">{title}</h2>
      <Carousel responsive={responsive} autoPlay={false}>
        {data?.map((item, i) => (
          <TextCard key={i} item={item} />
        ))}
      </Carousel>
    </div>
  );
};
export default MainContentsLine;
