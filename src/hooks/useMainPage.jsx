import {useQuery} from '@tanstack/react-query';
import xml2js from 'xml2js';
import api from '../utils/api.jsx';

const parseXml = async (xml) => {
  const parser = new xml2js.Parser({explicitArray: false});
  try {
    const result = await parser.parseStringPromise(xml);
    return result;
  } catch (err) {
    throw new Error('XML 파싱 오류: ' + err.message);
  }
};

export const useContentsList = ({itemNum, genreCode, signgucode, kidState, performanceState}) => {
  const fetchContentsList = async () => {
    try {
      const response = await api.get('pblprfr', {
        params: {
          stdate: '20240101',
          eddate: '20241231',
          cpage: 1,
          rows: itemNum,
          shcate: genreCode,
          signgucode: signgucode,
          kidstate: kidState,
          prfstate: performanceState,
        },
      });
      return await parseXml(response.data);
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ['contents-list', itemNum, genreCode, kidState, performanceState],
    queryFn: fetchContentsList,
    select: (result) => result.dbs.db,
    retry: 3,
    staleTime: 600000,
  });
};

export const useBoxOfficeList = (period, date, categoryCode) => {

  const fetchBoxOfficeList = async () => {
    try {
      const response = await api.get('boxoffice', {
        params: {
          ststype: period,
          date: date.toString(),
          catecode: categoryCode,
        },
      });
      return await parseXml(response.data);
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ['boxOffice', period, date, categoryCode],
    queryFn: fetchBoxOfficeList,
    select: (result) => result.boxofs.boxof,
    retry: 1,
    // staleTime: 600000,
  });
};
