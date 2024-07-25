import React, { useEffect, useState } from 'react';
import './App.css';
import Arrow from './icons/Arrow';
import { bear, coin, highVoltage, rocket, trophy, catcoin3, wallet1, coincat } from './images'; // Import the wallet image

function App() {
  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(6500);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false); // State for Wallet Modal
  const [rank, setRank] = useState('Gold');
  const [maxEnergy, setMaxEnergy] = useState(6500);
  const [pointsToAdd, setPointsToAdd] = useState(1);
  const [energyToReduce, setEnergyToReduce] = useState(1);
  const [subscribeClickCount, setSubscribeClickCount] = useState(0);
  const [followClickCount, setFollowClickCount] = useState(0);
  const [claimedMessage, setClaimedMessage] = useState('');

  const energyRecoveryRate = rank === 'Diamond' ? 6 : rank === 'Heroic' ? 7 : rank === 'Elite Heroic' ? 8 : rank === 'Master' ? 9 : rank === 'Elite Master' ? 10 : rank === 'Grand Master' ? 11 : 1;

  const handleClick = (x: number, y: number) => {
    if (energy - energyToReduce < 0) {
      return;
    }

    setPoints(points + pointsToAdd);
    setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleMouseClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    handleClick(x, y);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + energyRecoveryRate, maxEnergy));
    }, 600);

    return () => clearInterval(interval);
  }, [maxEnergy, energyRecoveryRate]);

  useEffect(() => {
    if (points >= 5000000) {
      setRank('Grand Master');
      setMaxEnergy(20000);
      setPointsToAdd(7);
      setEnergyToReduce(7);
    } else if (points >= 1000000) {
      setRank('Elite Master');
      setMaxEnergy(18000);
      setPointsToAdd(6);
      setEnergyToReduce(6);
    } else if (points >= 500000) {
      setRank('Master');
      setMaxEnergy(15000);
      setPointsToAdd(5);
      setEnergyToReduce(5);
    } else if (points >= 100000) {
      setRank('Elite Heroic');
      setMaxEnergy(12000);
      setPointsToAdd(4);
      setEnergyToReduce(4);
    } else if (points >= 50000) {
      setRank('Heroic');
      setMaxEnergy(9000);
      setPointsToAdd(3);
      setEnergyToReduce(3);
    } else if (points >= 25000) {
      setRank('Diamond');
      setMaxEnergy(7500);
      setPointsToAdd(2);
      setEnergyToReduce(2);
    }
  }, [points]);

  const handleSubscribeClick = () => {
    if (subscribeClickCount === 1) {
      // Second click: Redirect
      window.open('https://www.youtube.com/@IHATEYOUFF/videos', '_blank');
      
      // Schedule points addition after 15 seconds
      setTimeout(() => {
        setPoints(prevPoints => prevPoints + 20000);
        setClaimedMessage('');
      }, 15000);
  
      // Show the modal to confirm action
      setShowModal(true);
    } else if (subscribeClickCount > 1) {
      // Subsequent clicks: Show claimed message
      setClaimedMessage('You are already claimed');
      setTimeout(() => setClaimedMessage(''), 5000);
    }
  
    // Update click count
    setSubscribeClickCount(prevCount => prevCount + 1);
  };
  
  const handleFollowClick = () => {
    if (followClickCount === 1) {
      // Second click: Redirect
      window.open('https://www.instagram.com/lubay_india/?igsh=MTd6Znh1aXdzbHZrZg%3D%3D', '_blank');
      
      // Schedule points addition after 15 seconds
      setTimeout(() => {
        setPoints(prevPoints => prevPoints + 20000);
        setClaimedMessage('');
      }, 15000);
  
      // Show the modal to confirm action
      setShowModal(true);
    } else if (followClickCount > 1) {
      // Subsequent clicks: Show claimed message
      setClaimedMessage('You are already claimed');
      setTimeout(() => setClaimedMessage(''), 5000);
    }
  
    // Update click count
    setFollowClickCount(prevCount => prevCount + 1);
  };

  const handleEarnClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleWalletClick = () => {
    setShowWalletModal(true); // Show the wallet modal
  };

  const handleCloseWalletModal = () => {
    setShowWalletModal(false); // Close the wallet modal
  };

  return (
    <div className="bg-gradient-main min-h-screen px-4 flex-col items-center text-white font-medium">
      <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="radial-gradient-overlay"></div>
      </div>

      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
        <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
          <div className="w-full flex justify-between items-center">
            <div className="text-lg font-bold" style={{ fontFamily: 'ginger peachy nf', color: 'white' }}>
              CS - COIN
            </div>
            <div className="flex gap-4">
              <button onClick={handleWalletClick} className="cursor-pointer">
                <img src={wallet1} alt="Wallet" width={24} height={24} /> {/* Updated button */}
              </button>
            </div>
          </div>
          <div className="mt-8 text-center">
            <span className="text-white text-lg block">Your Balance:</span>
            <div className="text-5xl font-bold flex item-center justify-center">
              <img src={coincat} width={44} height={44} alt="Coin" />
              <span className="ml-2">{points.toLocaleString()}</span>
            </div>
          </div>
          <div className="text-base mt-2 flex items-center">
            <img src={trophy} width={24} height={24} alt="Trophy" />
            <span className="ml-1">{rank} <Arrow size={0} className="ml-0 mb-1 inline-block" /></span>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
          <div className="w-full flex justify-between gap-2">
            <div className="w-1/3 flex items-center justify-start max-w-32">
              <div className="flex items-center justify-center">
                <img src={highVoltage} width={44} height={44} alt="High Voltage" />
                <div className="ml-2 text-left">
                  <span className="text-white text-2xl font-bold block">{energy}</span>
                  <span className="text-white text-large opacity-75">/ {maxEnergy}</span>
                </div>
              </div>
            </div>
            <div className="flex-grow flex items-center max-w-60 text-sm">
              <div className="w-full bg-[#729762] py-4 rounded-2xl flex justify-around">
                <button className="flex flex-col items-center gap-1" onClick={() => {}}>
                  <img src={bear} width={24} height={24} alt="Friends" />
                  <span>Friends</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <button className="flex flex-col items-center gap-1" onClick={handleEarnClick}>
                  <img src={coin} width={24} height={24} alt="Earn" />
                  <span>Earn</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <button className="flex flex-col items-center gap-1" onClick={() => {}}>
                  <img src={rocket} width={24} height={24} alt="Boosts" />
                  <span>Boosts</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#f9c035] rounded-full mt-4">
            <div className="bg-gradient-to-r from-[#f3c45a] to-[#fffad0] h-4 rounded-full" style={{ width: `${(energy / maxEnergy) * 100}%` }}></div>
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center">
          <div
            className="relative mt-4"
            onClick={handleMouseClick}
          >
            <img src={catcoin3} width={256} height={256} alt="carsuper" />
            {clicks.map((click) => (
              <div
                key={click.id}
                className="absolute text-5xl font-bold opacity-0"
                style={{
                  top: `${click.y - 42}px`,
                  left: `${click.x - 28}px`,
                  animation: `float 1s ease-out`
                }}
                onAnimationEnd={() => handleAnimationEnd(click.id)}
              >
                12
              </div>
            ))}
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-20">
            <div className="p-8 rounded-lg flex flex-col items-center gap-4 relative w-full max-w-lg h-full" style={{ backgroundColor: '#E7F0DC', color: 'black' }}>
              <button className="absolute top-2 right-2 bg-transparent border-none text-xl" onClick={handleCloseModal}>
                ☒
              </button>
              <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
                <button
                  className="py-2 px-4 rounded border w-full"
                  style={{ backgroundColor: '#E7F0DC', color: 'black', borderColor: 'black' }}
                  onClick={handleSubscribeClick}
                >
                  Subscribe On Youtube +20,000 coins
                </button>
                <button
                  className="py-2 px-4 rounded border w-full"
                  style={{ backgroundColor: '#E7F0DC', color: 'black', borderColor: 'black' }}
                  onClick={handleFollowClick}
                >
                  Follow us on Instagram +20,000 coins
                </button>
                {claimedMessage && (
                  <div className="mt-4 text-center" style={{ color: 'gray' }}>
                    {claimedMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showWalletModal && (
          <div className="fixed inset-0 flex items-center justify-center z-20" style={{ backgroundColor: '#E7F0DC', border: '1px solid black' }}> {/* Set background color and border directly */}
            <div className="w-full max-w-md text-black p-8 rounded-lg relative flex flex-col h-full">
              <button className="absolute top-2 right-2 text-black bg-transparent border-none text-xl" onClick={handleCloseWalletModal}>
                ☒
              </button>
              <h1 className="text-center text-4xl font-bold mb-4" style={{ fontFamily: 'Playful' }}>Wallet</h1>
              <div className="text-center mb-6">
                <span className="text-1xl font-bold flex items-center justify-center mt-2">Your Balance:</span>
                <div className="text-3xl font-bold flex items-center justify-center mt-2">
                  <img src={coincat} width={32} height={32} alt="Coin" />
                  <span className="ml-2">{points.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex-grow"></div>
              <div className="text-center mt-6">
                <button className="bg-white text-[#A020F0] border border-[#A020F0] py-2 px-4 rounded w-full">
                  Connect Wallet
                  <div className="text-xs mt-1">not available now</div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
