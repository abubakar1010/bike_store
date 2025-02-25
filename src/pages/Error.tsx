import { Link } from "react-router-dom";
import Button from "../components/ui/shared/Button";


const Error = () => {
    return (
        <>
        <div className=" bg-[url('https://i.postimg.cc/kMfg17Jj/21586054-Na-Nov-26.jpg')] w-full h-screen bg-cover bg-center bg-no-repeat relative ">
            
                <div className=" w-full text-center pb-12 flex justify-center items-end h-full">
                  <Link to={"/"}>
                    <Button text="Go Home" />
                  </Link>
                </div>
              
            </div>
          
        </>
    );
};

export default Error;