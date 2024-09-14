import Carousel from 'react-multi-carousel';
import { useContentsList } from '../../../../hooks/useMainPage';

const responsive = {
  superLargeDesktop: {
    breakpoint: {max: 3000, min: 1600},
    items: 6,
    slidesToSlide: 6,
  },
  LargeDesktop: {
    breakpoint: {max: 1400, min: 1200},
    items: 5,
    slidesToSlide: 5,
  },
  desktop: {
    breakpoint: {max: 1200, min: 992},
    items: 4,
    slidesToSlide: 4,
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

  return (
    <div className="py-4">
      <h2 className="text-center mb-3">{title}</h2>
      <Carousel responsive={responsive}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </Carousel>
    </div>
  );
};
export default MainContentsLine;
