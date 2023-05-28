const fakeNetworkDelay = (callback: () => void, delay = 500) => {
  setTimeout(callback, delay);
};

export default fakeNetworkDelay;
