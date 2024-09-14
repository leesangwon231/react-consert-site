const MainContentsLine = ({title, genreCode, kidState}) => {
  const contentsLineParams = {
    itemNum: 10,
    genreCode: genreCode,
    kidState: kidState,
    performanceState: '',
  };
  return (
    <div className="py-4">
      <h2 className='text-center'>{title}</h2>
      
    </div>
  );
};
export default MainContentsLine;
