const initMap = () => {
  const ak = 'n5YwEz2K8mW1phA7gxVWmQlXbXfZu1sl';
  const url = `https://api.map.baidu.com/api?type=webgl&v=1.0&ak=${ak}&callback=onMapCallback`;
  return new Promise((resolve, reject) => {
    if (typeof window.BMapGL !== 'undefined') {
      resolve(window.BMapGL);
    }
    window.onMapCallback = () => {
      resolve(window.BMapGL);
    };
    const scriptNode = document.createElement('script');
    scriptNode.setAttribute('type', 'text/javascript');
    scriptNode.setAttribute('src', url);
    scriptNode.onerror = reject;
    document.body.appendChild(scriptNode);
  });
};

const getCityName = () => {
  return initMap().then((BMapGL) => {
    return new Promise((resolve) => {
      const geo = new BMapGL.Geolocation();
      geo.getCurrentPosition((result) => {
        if (result && result.address && result.address.city) {
          const cityName = result.address.city;
          resolve(cityName.slice(0, cityName.length - 1));
        }
      });
    });
  });
};

export { initMap, getCityName };
