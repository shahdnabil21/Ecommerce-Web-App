import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { CartContext } from '../Context/CartContextProvider';
import toast, { Toaster } from 'react-hot-toast';
import { useContext } from 'react';

export default function ProductDetails() {
let {addItem , setNumsCartItems} = useContext(CartContext);
  const { id } = useParams();
  function getProductDetails(){
    return axios(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  
  let { isLoading , data} = useQuery({
    queryKey:["prodcutDetails", id],
    queryFn:getProductDetails
  })
 

  function onChangeImg(e) {
    let imgSrc = e.target.getAttribute("src")
    document.getElementById("myImg").setAttribute("src",imgSrc)
  }
  const product = data?.data?.data
   function addCart(id){
  addItem(id).then((res)=>{
    setNumsCartItems(res.data.numOfCartItems);
    toast.success("Item added to cart successfully",{
      duration: 2500,
    })
    
  }).catch((err)=>{
    toast.err("Failed to add item to cart")
    
  })
 }
  if(isLoading){
    return <>
     <div className='h-screen flex justify-center items-center'>
          <span className="loader"></span>
      </div>
    </>
  }


  return (
    <>
    <Toaster></Toaster>
    <div className='flex md:flex-row flex-col items-center justify-between containerL'>
      <div className='md:w-3/12 w-12/12 mt-1'>
        <img className='w-full' src={product?.imageCover} id='myImg' alt="" />
        <div className='flex'>
          {product?.images.map((image,i) =>{
            return(
              <div onClick={onChangeImg} key={i}>
                <img src={image} className='my-4 cursor-pointer' alt=""/>
                </div>
            )
          })}

        </div>
      </div>
      <div className='md:w-8/12 w-12/12'>
        <h2 className='text-active font-bold'>{product?.title}</h2>
        <p className='text-gray-600 my-6'>{product?.description}</p>
        <div className='flex justify-between mb-6'>
          <span>{product?.price}EGP</span>
          <span><i className='fa-solid fa-star text-yellow-300'></i> {product?.ratingsAverage}</span>
        </div>
        <button onClick={()=>addCart(id)} className='btn mt-2 hover:bg-green-700'>Add to cart</button>
      </div>

    </div>
    </>
  )

}
  // let { id, name } = useParams()
  // let [product, setProduct] = useState(null)

  // function getProductDetails(id) {
  //   axios(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  //     .then((req) => {
  //       console.log(req.data.data);
  //       setProduct(req.data.data)
  //     })
  //     .catch((err) => { })
  // }
  // useEffect(() => {
  //   getProductDetails(id)
  // }, [id])
