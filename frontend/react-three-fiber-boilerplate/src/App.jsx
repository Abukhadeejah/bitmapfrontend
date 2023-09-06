/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import React from 'react';
import { sendBtcTransaction } from "sats-connect";
import { addUser, checkBitmap, saveColor, saveTeam } from './util'
import { getAddress } from 'sats-connect'
import { Discord, Twitter } from './components/SvgList'
import LoadingIcons from 'react-loading-icons'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useControls } from 'react-zoom-pan-pinch';
import Footer from './components/Footer';
import './js/script';

export default function App() {

  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [holder, setHolder] = useState('0')
  const [selectedButton, setSelectedButton] = useState(0);
  const [fee, setFee] = useState(0);
  const [selectedBitmap, setSelectedBitmap] = useState()
  const [choosedBitmap, setChoosedBitmap] = useState(2500)
  const [isModal, setIsModal] = useState(false);
  const [paymentAddress, setPaymentAddress] = useState("");
  const [ordinalsAddress, setOrdinalsAddress] = useState("");
  const [paymentPublicKey, setPaymentPublicKey] = useState("");
  const [ordinalsPublicKey, setOrdinalsPublicKey] = useState("");
  const isReady =
    !!paymentAddress &&
    !!paymentPublicKey &&
    !!ordinalsAddress &&
    !!ordinalsPublicKey;
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [accounts, setAccounts] = useState([]);
  const unisat = window.unisat;
  const [flag, setFlag] = useState(false);
  const [bitmapData, setBitmapData] = useState(new Array());
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Initialize menu state as closed
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };


  //////
  useEffect(() => {
    if (selectedBitmap === undefined) {
      return;
    }
    const getdata = async () => {
      const response = await fetch(`https://www.geniidata.com/api/dashboard/chart/public/data?chartId=125976&pageSize=20&page=1&searchKey=bitmap&searchValue=${selectedBitmap}`);
      const data = await response.json();
      console.log(data.data.list[0].holder)
      setHolder(data.data.list[0].holder)
    }
    getdata();
  }, [selectedBitmap])
  const Example = () => {
    const [grids, setGrids] = useState([]);

    const updateGrid = (ref) => {
      if (ref.state.scale > 99) {
        const newData = [-Math.floor(ref.state.positionX / ref.state.scale), -Math.floor(ref.state.positionY / ref.state.scale)];
        // console.log(ref.state.positionX / 100, "-", ref.state.positionY / 100)
        setGrids(newData);
      } else {
        setGrids([])
      }

    }
    return (
      <TransformWrapper
        maxScale={100}
        doubleClick={false}
        className="transform-wrapper"
        wheel={{
          step: 0.2, smoothStep: 0.05
        }}
        onZoom={(ref, event) => {
          updateGrid(ref, event);
        }}
        onTransformed={(ref, event) => {
          updateGrid(ref, event)
        }}
        onPanningStart={(ref, event) => {
          let pos = -Math.floor(ref.state.positionX / ref.state.scale) - Math.floor(ref.state.positionY / ref.state.scale) * 1000;

          console.log(pos + Math.floor(event.clientX / 100) - 1 + (Math.floor(event.clientY / 100) - 2) * 1000)
          setSelectedBitmap(pos + Math.floor(event.clientX / 100) - 1 + (Math.floor(event.clientY / 100) - 2) * 1000)
        }}
      >
        <Test />
        <TransformComponent>
          <img src="/img/map.svg" alt="test" />
          <svg width="1000" height="800" style={{ position: 'absolute', left: 0, top: 0 }}>
            <defs>
              <pattern id="smallGrid" width="1" height="1" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="gray" strokeWidth="0.1" />
              </pattern>
              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="url(#smallGrid)" />
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" strokeWidth="0.1" />
              </pattern>
            </defs>
            {myData && myData.map((item, index) => (
              <rect
                key={index}
                y={Math.floor(parseInt(item.bitmap) / 1000)}
                x={Math.floor(parseInt(item.bitmap) % 1000) - 1}
                width="1"
                height="1"
                fill={result.includes(item.bitmap) ? "#37ff00" : "red"}
              />
            ))}
            <rect width="100%" height="100%" fill="url(#grid)" />
            {Array.from({ length: 30 }, (_, index) => (
              grids[0] && grids[1] && <text x={grids[0] + 0.3 + index} y={grids[1] + 0} fontSize="0.2" fill="white">{grids[0] + index + 1 + (grids[1] - 1) * 1000}</text>
            ))}
            {Array.from({ length: 30 }, (_, index) => (
              grids[0] && grids[1] && <text x={grids[0] + 0.3 + index} y={grids[1] + 1} fontSize="0.2" fill="white">{grids[0] + index + 1 + (grids[1] - 1 + 1) * 1000}</text>
            ))}
            {Array.from({ length: 30 }, (_, index) => (
              grids[0] && grids[1] && <text x={grids[0] + 0.3 + index} y={grids[1] + 2} fontSize="0.2" fill="white">{grids[0] + index + 1 + (grids[1] - 1 + 2) * 1000}</text>
            ))}
            {Array.from({ length: 30 }, (_, index) => (
              grids[0] && grids[1] && <text x={grids[0] + 0.3 + index} y={grids[1] + 3} fontSize="0.2" fill="white">{grids[0] + index + 1 + (grids[1] - 1 + 3) * 1000}</text>
            ))}
            {Array.from({ length: 30 }, (_, index) => (
              grids[0] && grids[1] && <text x={grids[0] + 0.3 + index} y={grids[1] + 4} fontSize="0.2" fill="white">{grids[0] + index + 1 + (grids[1] - 1 + 4) * 1000}</text>
            ))}
            {Array.from({ length: 30 }, (_, index) => (
              grids[0] && grids[1] && <text x={grids[0] + 0.3 + index} y={grids[1] + 5} fontSize="0.2" fill="white">{grids[0] + index + 1 + (grids[1] - 1 + 5) * 1000}</text>
            ))}
            {Array.from({ length: 30 }, (_, index) => (
              grids[0] && grids[1] && <text x={grids[0] + 0.3 + index} y={grids[1] + 6} fontSize="0.2" fill="white">{grids[0] + index + 1 + (grids[1] - 1 + 6) * 1000}</text>
            ))}
            {Array.from({ length: 30 }, (_, index) => (
              grids[0] && grids[1] && <text x={grids[0] + 0.3 + index} y={grids[1] + 7} fontSize="0.2" fill="white">{grids[0] + index + 1 + (grids[1] - 1 + 7) * 1000}</text>
            ))}

          </svg>
        </TransformComponent>
      </TransformWrapper>
    );
  };

  const Test = () => {
    const { instance, zoomIn, zoomOut, ...rest } = useControls();

    useEffect(() => {
      if (!flag) {
        return
      } else {
        instance.setTransformState(100, -(posX - 6) * 100, -(posY - 3) * 100);
      }

    }, [posX, posY])

    return (
      <>

      </>
    )
  }
  const onConnectClick = async () => {
    console.log(isReady)
    await getAddress({
      payload: {
        purposes: ['ordinals', 'payment'],
        message: "SATS Connect Demo",
        network: {
          type: "Mainnet",
        },
      },
      onFinish: (response) => {
        console.log(response)
        const paymentAddressItem = response.addresses.find(
          (address) => address.purpose === "payment"
        );
        const ordinalsAddressItem = response.addresses.find(
          (address) => address.purpose === "ordinals"
        );
        localStorage.setItem("XverseWallet", paymentAddressItem)
        setPaymentAddress(paymentAddressItem?.address);
        setPaymentPublicKey(paymentAddressItem?.publicKey);
        setOrdinalsAddress(ordinalsAddressItem?.address);
        setOrdinalsPublicKey(ordinalsAddressItem?.publicKey);
        console.log(paymentAddressItem, ordinalsAddressItem)

        console.log(!!paymentAddress,
          !!paymentPublicKey,
          !!ordinalsAddress,
          !!ordinalsPublicKey)
        localStorage.setItem("walletType", "xverse");

      },
      onCancel: () => alert("Request canceled"),
    });
  };
  const onWalletDisconnect = () => {
    setPaymentAddress(undefined);
    setPaymentPublicKey(undefined);
    setOrdinalsAddress(undefined);
    setOrdinalsPublicKey(undefined);
    console.log("Xverse wallet disconnected");
  };
  //Unisat wallet connection

  const selfRef = useRef({
    accounts: [],
  });
  const self = selfRef.current;
  const getBasicInfo = async () => {
    const unisat = window.unisat;
    const [address] = await unisat.getAccounts();
    console.log(address)
    setAddress(address);
    console.log(address)
  };
  const handleAccountsChanged = async (_accounts) => {
    await window.unisat.switchNetwork("livenet");
    if (self.accounts[0] === _accounts[0]) {
      // prevent from triggering twice
      return;
    }
    self.accounts = _accounts;
    if (_accounts.length > 0) {
      setAccounts(_accounts);
      setConnected(true);
      setAddress(_accounts[0]);
      getBasicInfo();
    } else {
      setConnected(false);
    }
  };
  function Header() {

    //xverse wallet conncetion


    return (
      // Hero
      <section id="hero">
        {/* Hero container */}
        <div className="container max-6xl bg-zinc-700 mx-auto px-6 py-12">
          {/* Menu/Logo container */}
          <nav className="flex items-center justify-between font-bold text-white">
            {/* Logo */}
            <img src="/img/logo.png" alt="" className="w-60"/>
            {/* Menu */}
            <div className="hidden h-10 font-alata text-yellow-700 md:flex md:space-x-8">
              <div className='group'>
                <a href="">Minting</a>
                <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
              </div>
              <div className='group'>
                <a href="">Team</a>
                <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
              </div>
              <div className='group'>
                <a href="">Whitepaper</a>
                <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
              </div>
                         
          </div>
          {/* <!-- Hamburger Button --> */}
          <div className="md:hidden">
            <button id="menu-btn"
            type="button"
            className="z-40 block hamburger md:hidden focus:outline-none"
            onClick={toggleMenu} // Add click event handler to toggle menu
            >              
              <span className="hamburger-top"></span>
              <span className="hamburger-middle"></span>
              <span className="hamburger-bottom"></span>
            </button>
          </div>
          
        </nav>

        {/* <!-- Mobile Menu --> */}
        <div
          id="menu"
          className={`absolute top-0 bottom-0 left-0 ${
            isMenuOpen ? 'flex' : 'hidden'
          } flex-col self-end w-full min-h-screen py-1 pt-40 pl-12 space-y-3 text-lg text-white uppercase bg-black`}
        >
          <a href="#" className="hover:text-pink-500">Minting</a>
          <a href="#" className="hover:text-pink-500">Team</a>
          <a href="#" className="hover:text-pink-500">Whitepaper</a>
          <a href="#" className="hover:text-pink-500"><img src="img/twitter.webp" alt="" className="h-6" /></a>
          <a href="#" className="hover:text-pink-500"><img src="/img/discord.svg" alt="" className="h-6" /></a>
          <div className="wallet hover:text-pink-500"
            onClick={() => setIsModal(!isModal)}
            style={{
              pointerEvents: isReady || connected ? "none" : "auto"
            }}
          >
            {isReady ? (paymentAddress.slice(0, 4) + "...." + paymentAddress.slice(-4)) : connected ? (address.slice(0, 4) + "..." + address.slice(-4)) : "Connect wallet"}
            {isModal &&
              <div className="wallet-modal">
                <div className="modal">
                  <button className="wallet"
                    onClick={() => {
                      setIsModal(false)
                      onConnectClick()
                    }}
                  >Xverse Wallet</button>
                  <button className="wallet"
                    onClick={async () => {
                      setIsModal(false)
                      const result = await unisat.requestAccounts();
                      if (result) {
                        localStorage.setItem("walletType", "unisat");
                      }
                      handleAccountsChanged(result);
                    }}
                  >Unisat Wallet</button>
                </div>
              </div>
            }
          </div>
        </div>
        
        <div class="max-w-lg mt-32 mb-32 p-4 font-sans text-4xl text-white uppercase border-2 md:p-10 md:m-32 md:mx-0 md:text-6xl">
          Build your Bitmap Empire around the globe
        </div>
        

      </div>
        {/* <div class="flex">
        <div className="flex justify-between items-center ml20">
          <button>
            <img src="/img/logo.png" className="wb" />
          </button>
        </div>
        <div className="flex justify-between items-center gap-4 mr20">
          <button>
            <img src="/img/twitter.webp" alt="" className="twitter" />
          </button>
          <button onClick={() => { }}>
            <Discord />
          </button>
          <div className="wallet"
            onClick={() => setIsModal(!isModal)}
            style={{
              pointerEvents: isReady || connected ? "none" : "auto"
            }}
          >
            {isReady ? (paymentAddress.slice(0, 4) + "...." + paymentAddress.slice(-4)) : connected ? (address.slice(0, 4) + "..." + address.slice(-4)) : "Connect wallet"}
            {isModal &&
              <div className="wallet-modal">
                <div className="modal">
                  <button className="wallet"
                    onClick={() => {
                      setIsModal(false)
                      onConnectClick()
                    }}
                  >Xverse Wallet</button>
                  <button className="wallet"
                    onClick={async () => {
                      setIsModal(false)
                      const result = await unisat.requestAccounts();
                      if (result) {
                        localStorage.setItem("walletType", "unisat");
                      }
                      handleAccountsChanged(result);
                    }}
                  >Unisat Wallet</button>
                </div>
              </div>
            }
          </div>
        </div>


      </div> */}

      

      </section>
      
    )
  }

  const [data, setData] = useState([]);
  const [bmpcount, setBmpcount] = useState(0);
  const [myData, setMyData] = useState([]);

  const [bmp, setBmp] = useState(0);
  const [txid, setTxid] = useState("");
  const onSendBtcClick = async (bmp) => {
    const address = localStorage.getItem("XverseWallet");
    console.log(bmp)
    await sendBtcTransaction({
      payload: {
        network: {
          type: "Mainnet",
        },
        recipients: [
          {
            address: "bc1pc2vwcl6r95hu3jctujzj94scuar6wf0ph99l0sw4an4f7kva5nnsgle45a",
            amountSats: 15000,
          },
          // you can add more recipients here
        ],
        senderAddress: address
      },
      onFinish: (response) => {

        console.log(response);
      },
      onCancel: (err) => console.log(err),
    });

    await addUser(address, bmp)
    // saveData();
  };
  const onUnisatSend = async (bmp) => {
    const toAddress = "bc1pc2vwcl6r95hu3jctujzj94scuar6wf0ph99l0sw4an4f7kva5nnsgle45a";
    const satoshis = 15000
    console.log(bmp)
    try {
      const txid = await window.unisat.sendBitcoin(
        toAddress,
        satoshis,
        fee
      );
      setTxid(txid);
    } catch (e) {
      console.log(e)
    }
    const result = await addUser(address, bmp)
    console.log(result)
    if (result) {
      alert('Successfully added')
    }
    // saveData()

  }
  useEffect(() => {
    const fetchData = async () => {
      let pagenumber = 1;
      let allData = [];

      while (true) {
        const response = await fetch(
          `https://www.geniidata.com/api/dashboard/chart/public/data?chartId=125976&pageSize=100&page=${pagenumber}&searchKey=holder&searchValue=${address}`);
        const data = await response.json();
        if (!data.data.list || data.data.list.length === 0) {
          break;
        }
        allData = allData.concat(data.data.list);
        pagenumber++;
      }
      setMyData(allData)
    };
    if (address !== undefined && address !== "") {

      fetchData();
    }
  }, [address]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [regData, setRegData] = useState([]);
  const [result, setresult] = useState([]);
  const getRegData = useCallback(async () => {
    const data = [];
    filteredData.map((index) => {
      data.push(index.bitmap);
    })
    const result = await checkBitmap(data);
    let empty = [];
    result && result.map((index) => {
      empty.push(index.value)
    })
    setresult(empty)
  }, [filteredData, address]);

  useEffect(() => {
    getRegData().then((dataList) => {
      console.log("------>", dataList);
    });
  }, [filteredData]);

  useEffect(() => {
    setFilteredData(myData)
  }, [address, myData])

  const handleSearchChange = (e) => {
    const inputText = e.target.value;
    setSearchText(inputText);

    if (inputText.trim() === '') {
      setFilteredData(myData);
    } else {
      const filteredResults = myData.filter((index) =>
        index.bitmap.toString().includes(inputText)
      );
      setFilteredData(filteredResults);
    }
  };

  return (
    <div className="info">
      <Header />
      <div className='flex between'>
        <div className='map'>
          <Example />
        </div>
        <div className='list'>
          <div className='fee-select'>
            <p>Fee</p>
            <div className='menu1'>
              <button className={`${selectedButton == 1 ? "bg-yellow" : ""}`} onClick={() => {
                setFee(13);
                setSelectedButton(1)
              }}>Slow</button>
              <button className={`${selectedButton == 2 ? "bg-yellow" : ""}`} onClick={() => {
                setFee(15);
                setSelectedButton(2)
              }}>Avg</button>
              <button className={`${selectedButton == 3 ? "bg-yellow" : ""}`} onClick={() => {
                setFee(17);
                setSelectedButton(3)
              }}>Fast</button>
              <button className={`${selectedButton == 4 ? "bg-yellow" : ""}`} onClick={() => {
                setSelectedButton(4)
              }}>Custom</button>
            </div>
            <input type="number" min={10} disabled={selectedButton !== 4} onChange={(e) => {
              setFee(e.target.value);
            }} />

          </div>
          <button
            className="holder"
            onClick={async () => {
              let pagenumber = 1;
              let allData = [];
              while (true) {
                const response = await fetch(
                  `https://www.geniidata.com/api/dashboard/chart/public/data?chartId=125976&pageSize=100&page=${pagenumber}&searchKey=holder&searchValue=${holder}`
                );

                const data = await response.json();

                if (!data.data.list || data.data.list.length === 0) {
                  // No more data on this page, break the loop
                  break;
                }

                allData = allData.concat(data.data.list);
                pagenumber++;
              }
              setData(allData)
            }}>
            <p>
              Selected Bitmap
            </p>
            <p>
              {selectedBitmap}
            </p>
            <p className='text-yellow'>

              {holder.substring(0, 16) + "..."}
            </p>
          </button>
          <div className='register'>
            <p className='mybmpa'>My Bitmap</p>
            <div className='search'>
              <p className='mybmp'>{myData.length}&nbsp;bitmaps</p>
              <input
                type="text"
                placeholder='search...'
                value={searchText}
                onChange={handleSearchChange}
              />
            </div>
            <div className='registerdiv'>
              {myData.length > 0 ?
                <div className="myinfo">
                  <div className='myinfolist'>
                    {myData.map((index, key) => {
                      if (parseInt(index.bitmap) < 800000) {
                        return (
                          <div className='regdiv' key={index.bitmap}>
                            <button
                              onClick={() => {
                                setFlag(true);
                                setPosY((parseInt(index.bitmap) / 1000 - 0.5))
                                setPosX((parseInt(index.bitmap) % 1000 - 1))
                              }}
                              style={{
                                color: result.includes(index.bitmap) ? "yellow" : "white"
                              }}
                            >
                              {index.bitmap}.bmp
                            </button>
                            <button className='regBtn'
                              onClick={async () => {
                                setBmp(index.bitmap);

                                if (localStorage.getItem("walletType") === "xverse") {
                                  onSendBtcClick(index.bitmap);
                                } else if (localStorage.getItem("walletType") === "unisat") {
                                  onUnisatSend(index.bitmap);
                                }
                              }}
                              disabled={result.includes(index.bitmap)}
                            >
                              {result.includes(index.bitmap) ? "Done" : "Register"}
                            </button>
                          </div>
                        )
                      }
                    }
                    )}
                  </div>
                </div> :
                <div className='loading'>
                  {address ?
                    <LoadingIcons.BallTriangle /> : <p>Not connected..</p>
                  }
                </div>

              }
            </div>
          </div>
        </div>
      </div>
      {/* Render the footer */}
      <Footer />
    </div>    
  )
}