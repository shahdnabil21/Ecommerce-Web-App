import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function BrandDetails() {
  let { id } = useParams(); 
  console.log(id);
  

  function getBrandDetails() {
    return axios(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);

  }
  let { isLoading, data } = useQuery({
    queryKey: ["brandDetails", id],
    queryFn: getBrandDetails,
  });
  console.log(data?.data?.data);
  

  let brand = data?.data?.data;

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="containerL">
      <div>
        <h2>{brand?.name}</h2>
        <img src={brand?.image} alt={brand?.name} className="w-full md:w-70 object-cover" />
      </div>
    </div>
  );
}
