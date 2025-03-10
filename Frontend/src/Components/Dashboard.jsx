import React from "react";
import HeroSection from '../Components/HeroSection';
import MainContent from "../Components/MainContent.jsx";
import Navbar from './Navbar'
import Footer from './Footer';
import InstaLink from './InstaLink';
import Blogs from './Blogs';
function Dashboard(params) {
    

    return (<>
        <Navbar  />
        <HeroSection />
        <MainContent />
        <Blogs />
        <InstaLink />
        <Footer />
    </>);
}
export default Dashboard;