import logo from './logo.svg';
import './App.css';
import StockGraph from './Stock';
import {useState} from 'react';
import {AiOutlineClose } from 'react-icons/ai';
import {GiHamburgerMenu} from 'react-icons/gi';


function App() {
  let Links =[
    {name:"AAPL"},
    {name:"MSFT"},
    {name:"TSLA"},
    {name:"AMZN"},
    {name:"META"},
    
  ];
  let [open,setOpen]=useState(false);
  const [selectedStock, setSelectedStock] = useState('AAPL');

  const handleStockClick = (stockSymbol) => {
    setSelectedStock(stockSymbol);
  };
  return (
    <div className="App bg-[#05050f] ">

      {/* navbar code starts here */}
       <nav className=" w-[100%] h-[10vh] flex items-center justify-between  bg-[#191932] shadow-md font-sans sticky top-0 left-0 z-100 py-1 ">
      {/* First div */}
      <div className="flex items-center space-x-2 pl-[4vw] ">
       
        <div className="text-[#6a6a9f] font-bold   text-2xl ">StockData</div>
      </div>

      {/* Second div */}
      <div className="flex-grow flex justify-end">
        <div className="flex items-around space-x-4 xs:space-x-0  w-[50vw] ">
         

          <div onClick={()=>setOpen(!open)} className=' absolute right-[18vw] cursor-pointer md:hidden text-purple-blue z-50'>
      {open ? <AiOutlineClose className='h-6 w-6'/> : <GiHamburgerMenu className='h-6 w-6'/>}
      </div>
        

      <ul className={`md:flex items-center  md:pb-0  absolute md:static list-none text-base opacity-100  left-[-1] right-0 w-[100vw] md:w-auto md:pl-0  bg-[#191932] xs:max-md:w-[100%] transition-all duration-500 ease-in ${open ? 'top-[-10px] ':'top-[-490px]'} `}>
        {
          Links.map((link)=>(
            <li key={link.name}  onClick={() => handleStockClick(link.name)} className='md:ml-8 md:max-lg:ml-3 text-lg md:my-0 my-5 mx-[2vw] nav font-semibold  hover:text-black text-[#6a6a9f] duration-500 no-underline'>
              {link.name}
            </li>
          ))
        }</ul>
        </div>
      </div>

     
     
    </nav>
    {/* <----navbar code ends here----> */}
     <StockGraph stockSymbol={selectedStock}/>
    </div>
  );
}

export default App;
