import {useContentsList} from '../../../../hooks/useMainPage';
import PosterCard from '../PosterCard/PosterCard';
import './BannerStyle.css';

const Banner = () => {
  const bannerParams = {
    itemNum: 12,
    genreCode: '',
    kidState: 'N',
    performanceState: '01',
  };
  const {data, isLoading, isError, error} = useContentsList(bannerParams);
  console.log(data);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  if (error) {
    console.log('home error:', error);
    return <div className="error-box">home Error {error}</div>;
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
