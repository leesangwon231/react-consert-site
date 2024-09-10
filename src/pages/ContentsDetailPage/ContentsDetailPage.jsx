import { useContentsDetailQuery } from "../../hooks/useContentsDetailPage";
import { Alert } from "bootstrap";
import { useParams } from "react-router-dom";


const ContentsDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useContentsDetailQuery({id});
  console.log("detail", data)

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div>
      
    </div>
  );
};

export default ContentsDetailPage;