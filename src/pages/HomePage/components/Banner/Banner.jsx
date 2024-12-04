import ErrorBox from '../../../../common/ErrorBox/ErrorBox';
import LoadingSpinner from '../../../../common/LoadingSpinner/LoadingSpinner';
import {useContentsList} from '../../../../hooks/useMainPage';
import PosterCard from '../PosterCard/PosterCard';
import './BannerStyle.css';

const Banner = () => {
  const bannerParams = {
    itemNum: 12,
    genreCode: '',
    signgucode: 11,
    kidState: 'N',
    performanceState: '01',
  };
  const {data, isLoading, isError, error} = useContentsList(bannerParams);
  // console.log(data);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <ErrorBox error={error} />;
  }

  return (
    <div className="banner-container global-mx py-4">
      {data?.map((item, i) => (
        <PosterCard key={i} item={item} gridArea={`card${i}`} />
      ))}
    </div>
  );
};
export default Banner;
