import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import '../../assets/css/main.css';
import axios from 'axios';

// Fetch data first
async function fetchData(symbol) {
  try {
    const res = await axios.get(`http://localhost:5000/api/get_data?symbol=${symbol}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}
const ChartCard = ({ ChartText, symbol }) => {
  const [news, setNews] = useState([]);
  const [isFullView, setIsFullView] = useState(false); // State for full-view mode
  const [serdata, setSerdata] = useState([]);
  const [serdate, setSerdate] = useState([]);
  let newsData = {};
  if (String(symbol).includes('ADANIENT.NS')) {
    newsData = {
      '2025-02-24': [
        'Adani Group plans to invest Rs 1.1 trillion in Madhya Pradesh Source: https://www.business-standard.com/companies/news/gis-2025-adani-group-plans-to-invest-rs-1-1-trillion-in-madhya-pradesh-125022400612_1.html',
        'Adani Group to invest ₹1.10 lakh crore in Madhya Pradesh Source: https://www.livemint.com/market/stock-market-news/adani-group-to-invest-rs-1-10-lakh-crore-in-madhya-pradesh-additional-rs-1-lakh-crore-in-pipeline-11740377941307.html'
      ],
      '2025-02-23': [
        'Adani Group pays ₹58,104 crore tax in FY24, up 25% from last year Source: https://www.onmanorama.com/news/business/2025/02/23/adani-group-pays-rs-58104-crore-tax-fy24-twenty-five-percent-increase-last-year.html'
      ],
      '2025-02-18': [
        "US SEC seeks India's help in Adani fraud probe Source: https://www.reuters.com/business/us-sec-seeks-indias-help-adani-fraud-probe-2025-02-18/"
      ],
      '2025-02-14': [
        'Adani Group pulls out of $440mn wind power projects in Sri Lanka Source: https://www.ft.com/content/0542fb79-6f4a-43f4-b08a-77b08340839a',
        'Science Museum received £4m from energy firm accused of fraud Source: https://www.thetimes.co.uk/article/science-museum-adani-green-energy-klw203xs2'
      ],
      '2025-02-13': [
        "Adani-backed firm among three finalists in India's small satellite launch rocket privatisation Source: https://www.reuters.com/technology/space/adani-backed-firm-among-three-finalists-indias-small-satellite-launch-rocket-2025-02-14/"
      ],
      '2025-02-12': [
        'Tycoon profited after India relaxed border security rules for energy park Source: https://www.theguardian.com/world/2025/feb/12/tycoon-profited-after-india-relaxed-border-security-rules-for-energy-park'
      ]
    };
  } else if (String(symbol).includes('RELIANCE.NS')) {
    newsData = {
      '2025-02-24': [
        'Reliance Industries shares slip 1.05% to ₹1,214.75, outperforming the broader market decline. Source: https://www.marketwatch.com/story/reliance-industries-slips-monday-still-outperforms-market-ecbb9875-da6e065855b5',
        "Reliance Industries closed today at ₹1,214.30, down 1.09% from yesterday's ₹1,227.70. Source: https://www.livemint.com/market/live-blog/reliance-industries-share-price-today-latest-live-updates-on-24-feb-2025-11740364394003.html"
      ],
      '2025-02-19': [
        'PDVSA and Reliance resume oil swap under US authorization. Source: https://www.reuters.com/business/energy/pdvsa-reliance-resume-oil-swap-under-us-license-document-shows-2024-12-19/'
      ],
      '2025-02-12': [
        'India tightens its crude bear hug of Russia with Reliance signing a $13 billion annual deal. Source: https://www.reuters.com/breakingviews/india-tightens-its-crude-bear-hug-russia-2024-12-12/'
      ],
      '2025-02-28': [
        "Reliance's US unit buys $12 million stake in helium explorer Wavetech Helium. Source: https://www.reuters.com/markets/deals/reliances-us-unit-buys-12-mln-stake-helium-explorer-wavetech-helium-2024-11-28/"
      ],
      '2025-02-14': [
        'RIL, Viacom18, and Disney complete merger to create a ₹70,352 crore joint venture. Source: https://www.economictimes.indiatimes.com/industry/media/entertainment/ril-viacom18-and-disney-complete-merger-to-create-a-rs-70352-cr-jv/articleshow/1050000000.cms'
      ],
      '2025-02-04': [
        "Ambani's Reliance Jio IPO set for 2025, retail debut much later. Source: https://www.reuters.com/world/india/ambanis-reliance-jio-ipo-set-2025-retail-debut-much-later-sources-say-2024-11-04/"
      ],
      '2025-02-03': [
        "Disney-Reliance Indian media giant says TV 'is not dead' following $8.5bn merger. Source: https://www.ft.com/content/fe860e58-5412-469e-9444-5a79627e908e"
      ],
      '2025-02-28': [
        'Indian watchdog approves $8.5bn Disney-Reliance entertainment merger. Source: https://www.ft.com/content/47bbbfa3-f94f-4bd6-b775-99c531f016b6'
      ]
    };
  } else if (String(symbol).includes('BAJAJFINSV.NS')) {
    newsData = {
      '2025-02-24': [
        "Bajaj Finserv's stock fell by 1.11% to ₹1,857.55, yet outperformed the market as BSE SENSEX declined by 1.14%. Source: https://www.marketwatch.com/story/bajaj-finserv-falls-monday-still-outperforms-market-3c42f570-8643e4294c32",
        "Zomato's market cap surpasses Tata Motors and Bajaj Auto, reaching ₹2.78 trillion. Source: https://www.business-standard.com/markets/news/zomato-m-cap-pips-that-of-tata-motors-bajaj-auto-analysts-stay-bullish-124121900590_1.html",
        'Analysts project over 20% gains for Zomato and Bajaj Finance in 2025. Source: https://www.business-standard.com/markets/news/zomato-bajaj-fin-5-largecaps-that-can-gain-over-20-in-2025-time-to-buy-124121600284_1.html'
      ],
      '2025-02-19': [
        "Bajaj Finserv's shares dipped 0.99% to ₹1,874.65, underperforming compared to competitors. Source: https://www.marketwatch.com/story/bajaj-finserv-underperforms-wednesday-when-compared-to-competitors-69deda0e-3b83ad480ae4"
      ],
      '2025-02-05': [
        'Fund manager Sunil Shah highlights HDFC Bank, SBI, Bajaj Twins, Zomato, and Swiggy as key picks. Source: https://www.bizzbuzz.news/markets/equity/hdfc-bank-sbi-bajaj-twins-zomato-and-swiggy-key-picks-sunil-shah-a-fund-manager-at-sre-pms-1351170'
      ],
      '2025-01-30': [
        "Bajaj Finance's shares reached a record high after reporting an 18% increase in quarterly profits, driven by strong loan growth. Source: https://www.reuters.com/business/finance/indias-bajaj-finance-jumps-record-strong-q3-earnings-light-up-growth-path-2025-01-30/",
        'Sensex opens 270 points higher; Zomato and Bajaj Finserv lead gains. Source: https://www.zeebiz.com/market-news/news-first-trade-sensex-opens-270-pts-higher-nifty-reclaims-23000-zomato-bajaj-finserv-lead-gains-342555'
      ],
      '2024-12-12': [
        'India orders Zomato to pay $95 million in taxes and fines. Source: https://www.reuters.com/business/india-orders-zomato-pay-95-mln-taxes-fines-latest-setback-2024-12-12/'
      ]
    };
  } else if (String(symbol).includes('TATAMOTORS.NS')) {
    newsData = {
      '2025-02-24': [
        "Tata Motors closed today at ₹668.25, down -0.69% from yesterday's ₹672.90 Source: https://www.livemint.com/market/live-blog/tata-motors-share-price-today-latest-live-updates-on-24-feb-2025-11740364255269.html",
        'Tata Motors Celebrates 27 Years of Tata Safari; Launches Exclusive STEALTH Edition limited to just 2700 units Source: https://www.marketscreener.com/quote/stock/TATA-MOTORS-LIMITED-46728680/news/Tata-Motors-Celebrates-27-Years-of-Tata-Safari-Launches-Exclusive-STEALTH-Edition-limited-to-just-2-49142782/',
        'Indian carmakers count on SUV sales to ride out slowdown Source: https://www.ft.com/content/f02f7de2-7574-4c0f-870a-126c114d5500'
      ],
      '2025-02-21': [
        "Tata Motors closed today at ₹672.90, down -2.46% from yesterday's ₹689.90 Source: https://www.livemint.com/market/live-blog/tata-motors-share-price-today-latest-live-updates-on-21-feb-2025-11740105011362.html",
        'Tata Motors Share Price Highlights: Tata Motors Stock Price History Source: https://m.economictimes.com/markets/stocks/stock-liveblog/tata-motors-stock-price-live-updates-24-feb-2025/liveblog/118517847.cms'
      ],
      '2025-02-20': [
        'Tata Motors Ltd: Live Stock Update and Price as of February 20, 2025 Source: https://www.angelone.in/live-blog/tata-motors-ltd-20-feb-2025-500570',
        'Tata Motors Stock Price - Live Updates and News Source: https://www.stockgro.club/live-blog/stock/tata-motors-share-price-today-live-updates-and-news-february-19-2025-1739926800/'
      ],
      '2025-02-13': [
        "India's Tata Motors plans to more than double EV charging stations Source: https://www.reuters.com/business/autos-transportation/indias-tata-motors-plans-more-than-double-ev-charging-stations-2025-02-13/",
        "What are India's EV makers' plans for their charging networks? Source: https://www.reuters.com/business/autos-transportation/what-are-indias-ev-makers-plans-their-charging-networks-2025-02-13/"
      ],
      '2025-02-12': [
        'Tata Motors announces special offers on EVs as Tesla prepares India entry Source: https://www.business-standard.com/companies/news/tata-motors-ev-offers-45-days-tesla-entry-india-125022000910_1.html'
      ]
    };
  } else if (String(symbol).includes('ZOMATO.NS')) {
    newsData = {
      '2025-02-24': [
        "Zomato's market cap surpasses Tata Motors and Bajaj Auto, reaching ₹2.78 trillion. Source: https://www.business-standard.com/markets/news/zomato-m-cap-pips-that-of-tata-motors-bajaj-auto-analysts-stay-bullish-124121900590_1.html",
        'Analysts project over 20% gains for Zomato and Bajaj Finance in 2025. Source: https://www.business-standard.com/markets/news/zomato-bajaj-fin-5-largecaps-that-can-gain-over-20-in-2025-time-to-buy-124121600284_1.html'
      ],
      '2025-02-05': [
        'Fund manager Sunil Shah highlights HDFC Bank, SBI, Bajaj Twins, Zomato, and Swiggy as key picks. Source: https://www.bizzbuzz.news/markets/equity/hdfc-bank-sbi-bajaj-twins-zomato-and-swiggy-key-picks-sunil-shah-a-fund-manager-at-sre-pms-1351170'
      ],
      '2025-01-29': [
        'Sensex opens 270 points higher; Zomato and Bajaj Finserv lead gains. Source: https://www.zeebiz.com/market-news/news-first-trade-sensex-opens-270-pts-higher-nifty-reclaims-23000-zomato-bajaj-finserv-lead-gains-342555'
      ],
      '2024-12-12': [
        'India orders Zomato to pay $95 million in taxes and fines. Source: https://www.reuters.com/business/india-orders-zomato-pay-95-mln-taxes-fines-latest-setback-2024-12-12/'
      ],
      '2024-10-22': [
        'Zomato misses Q2 profit estimates due to expansion costs. Source: https://www.reuters.com/business/retail-consumer/indias-zomato-misses-q2-profit-estimates-hurt-by-store-expansion-costs-2024-10-22/'
      ],
      '2024-08-21': [
        "Zomato acquires Paytm's movie and event ticketing businesses for $244 million. Source: https://www.reuters.com/markets/deals/indias-zomato-buy-paytm-ticketing-units-244-mln-2024-08-21/"
      ],
      '2024-08-22': [
        'Zomato shuts down inter-city food-delivery service. Source: https://www.reuters.com/world/india/indias-zomato-shuts-inter-city-food-delivery-service-2024-08-22/'
      ]
    };
  }
  useEffect(() => {
    async function getData() {
      const data = await fetchData(symbol);
      console.log(data.values);
      setSerdata(data.values.map((x) => parseFloat(x).toFixed(2)));
      setSerdate(data.dates);
    }
    getData();
  }, []);
  const options = {
    chart: {
      id: 'area-chart',
      type: 'line',
      events: {
        click: (event, chartContext, config) => {
          const dataPointIndex = config.dataPointIndex;
          const data = serdate[dataPointIndex];
          const date = new Date(data);
          date.setFullYear(2025);
          const dateFormatted = new Date(date.getTime() + 1000 * 60 * 60 * 24).toISOString().split('T')[0];
          console.log(dateFormatted, newsData[dateFormatted], dateFormatted === '2025-02-23');
          setNews(newsData[dateFormatted]?.map((x) => x.split(' #')[0]));
        }
      }
    },
    title: {
      text: ChartText,
      align: 'left',
      style: {
        fontSize: '18px',
        fontWeight: 400,
        color: '#000'
      }
    },
    stroke: {
      curve: 'straight',
      width: 2
    },
    xaxis: {
      categories: serdate,
      labels: { show: false },
      title: { text: undefined }
    },
    yaxis: {
      labels: { show: false },
      title: { text: undefined }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: { enabled: true }
  };

  const series = [
    {
      name: 'Close',
      data: serdata
    }
  ];

  // Function to toggle full-view mode
  const toggleFullView = () => {
    setTimeout(() => {
      const pages = document.querySelector('.MuiPaper-root.css-1rcxgiw-MuiPaper-root-MuiDrawer-paper');
      pages.style.display = 'none';
    }, 0);
    setIsFullView(!isFullView);
  };

  return (
    <div>
      <button
        onClick={toggleFullView}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          marginBottom: '10px',
          backgroundColor: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {isFullView ? 'Exit Full View' : 'Full View'}
      </button>
      <div
        style={{
          width: isFullView ? '100vw' : '100%',
          height: isFullView ? '100vh' : 'auto',
          position: isFullView ? 'fixed' : 'static',
          top: isFullView ? '0' : 'auto',
          left: isFullView ? '0' : 'auto',
          zIndex: isFullView ? 1000 : 'auto',
          backgroundColor: isFullView ? '#fff' : 'transparent',
          padding: isFullView ? '20px' : '0',
          display: 'flex',
          flexDirection: isFullView ? 'column' : 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ width: '100%', height: isFullView ? '70%' : '350px' }}>
          <ApexCharts options={options} series={series} type="area" height={isFullView ? '100%' : '100%'} />
        </div>
        {
          <div
            style={{
              width: '100%',
              height: isFullView ? '30%' : 'auto',
              marginTop: isFullView ? '20px' : '10px',
              padding: isFullView ? '20px' : '0',
              overflowY: 'auto'
            }}
          >
            <div className="news-container">
              <div className="news-header">
                <div className="header-text">Related News</div>
              </div>
              <div className="news-content">
                <div className="news-items">
                  {news &&
                    news.map((item, index) => (
                      <div className="news-item" key={index}>
                        {index === 0 ? (
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/2491px-Logo_of_Twitter.svg.png"
                            width={30}
                            height={30}
                            alt="twitter"
                          />
                        ) : (
                          <img
                            src="https://static.vecteezy.com/system/resources/previews/031/737/215/non_2x/twitter-new-logo-twitter-icons-new-twitter-logo-x-2023-x-social-media-icon-free-png.png"
                            width={30}
                            height={30}
                            alt="facebook"
                          />
                        )}
                        <span className="news-title">{item}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default ChartCard;
