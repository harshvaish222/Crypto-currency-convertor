import React from 'react'
import "../App.css";
import Axios from 'axios'
import { useState, useEffect } from 'react'
import Coin from '../components/Coin'
import Refresh from "../Images/refresh.png"

function Home() {

    const [coins, setCoins] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        refreshPage();
    }, [])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const filterCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const refreshPage = () => {
        setIsLoading(true);
        Axios.get(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        ).then((response) => {
            console.log(response.data);
            setIsLoading(false)
            setCoins(response.data);
        });
    };

  return (
    <div className='Apps'>
        <div className='headerContainer'>
            <h1>Check your Crypto</h1>
            <div className='buttonContainer'>
                <input 
                    type="text"
                    placeholder="Search for a coin"
                    onChange={handleSearch}
                />
                <img onClick={refreshPage} src={Refresh} alt='Refresh'></img>
            </div>
        </div>
        <div className='coinContainer'>
            {isLoading && <h1 className='loadingMsg'>Data Loading...</h1>}
            {filterCoins.map((coins) => {
                return (
                    <Coin 
                    key={coins.id}
                        id={coins.id}
                        icon={coins.image}
                        coinName={coins.name}
                        coinSymbol={coins.symbol}
                        price={coins.current_price}
                        marketCap={coins.market_cap}
                        priceChange={coins.price_change_percentage_24h}
                    />
                )
            })}
        </div>
    </div>
  )
}

export default Home