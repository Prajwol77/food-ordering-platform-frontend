import landingImage from "../assets/landing.png"
import appDownloadImage from "../assets/appDownload.png"
import SearchBar, {SearchForm} from "@/components/SearchBar.tsx";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate()
    const handleSearchSubmit = (searchFormValues: SearchForm)=>{
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`
        })
    }
    return (
        <div className="flex flex-col gap-12">
            <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-4xl font-bold tracking-tight text-orange-500">
                    Let's have a good meal today
                </h1>
                <span className="text-xl">Food is just a click away!</span>
                <SearchBar placeHolder="Search by City or Town" onSubmit={handleSearchSubmit}/>
                <img src={landingImage} alt="landing-image"/>
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tighter">
                        Order your food even faster!
                    </span>
                    <span>
                        Download the EveryoneEats.com App for faster ordering.
                        <h3 className="text-black text-0xl font-bold"> Coming Soon!</h3>

                    </span>
                    <img src={appDownloadImage} alt="App-download-icons"/>
                </div>
            </div>
        </div>
    )
}
export default HomePage
