import { useState } from 'react'
import Banner from '../components/Banner'
import BlogSections from '../components/BlogSections'
import Cart from '../components/Cart'
import Category from '../components/Category'
import FeatureSection from '../components/FeatureSection'
import Footer from '../components/Footer'
import FooterEnd from '../components/FooterEnd'
import Hero from '../components/Hero'
import MobileNav from '../components/MobileNav'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'

type Props = {}

export default function Home({}: Props) {
     const [ showCart , setShowCart] =useState<any>(false);
  return (
    <div>
          <main>
      <Navbar setShowCart = {setShowCart}/>
      <MobileNav setShowCart = {setShowCart}/>
     
      <Hero/>
 <Category/>
 
<section>

 <FeatureSection/>
</section>
 {/* <FeatureSection2/> */}
 <Banner/>
 <BlogSections/>
 <Newsletter/>
 <Footer/>
 <FooterEnd/>
      {
        showCart && <Cart showCart={showCart} setShowCart={setShowCart}/>
        
      }
      
   </main>

    </div>
  )
}