import { useEffect } from 'react';
import Header from '../components/Header.jsx';
import Banner from '../components/Banner.jsx';
import Categories from '../components/Categories.jsx';
import FeatureProducts from '../components/products/FeatureProducts.jsx';
import Products from '../components/products/Products.jsx';
import Footer from '../components/Footer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { get_products } from '../store/reducers/homeReducer.js';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const dispatch = useDispatch();
  const { products, latest_product, topRated_product, discount_product } = useSelector((state) => state.home);
  const location = useLocation();

  useEffect(() => {
    dispatch(get_products());
  }, [dispatch, location.pathname]); // Add location.pathname as a dependency

  return (
    <div className='w-full'>
      <Header />
      <Banner />
      <Categories />
      <div className='py-[45px]'>
        <FeatureProducts products={products} />
      </div>

      <div className='py-10'>
        <div className='w-[85%] flex flex-wrap mx-auto'>
          <div className='grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7'>
            <div className='overflow-hidden'>
              <Products title='Latest Product' products={latest_product} />
            </div>

            <div className='overflow-hidden'>
              <Products title='Top Rated Product' products={topRated_product} />
            </div>

            <div className='overflow-hidden'>
              <Products title='Discount Product' products={discount_product} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}