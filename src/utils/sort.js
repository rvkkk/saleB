//products
export const sortNewest = (gallery) => {
  return gallery[0]
    ? gallery.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    : [];
};

export const sortPopularAuction = (gallery) => {
  return gallery[0]
    ? gallery.sort((a, b) => {
        try {
          return b.offers.length - a.offers.length;
        } catch (err) {
          return parseInt(b.currentPrice) - parseInt(a.currentPrice);
        }
      })
    : [];
};

export const sortPriceDown = (gallery) => {
  return gallery[0]
    ? gallery.sort((a, b) => {
        return parseInt(b.currentPrice) - parseInt(a.currentPrice);
      })
    : [];
};

export const sortPriceUp = (gallery) => {
  return gallery[0]
    ? gallery.sort((a, b) => {
        return parseInt(a.currentPrice) - parseInt(b.currentPrice);
      })
    : [];
};

export const sortMostBuyProducts = (products) => {
  return products[0]
    ? products.sort((a, b) => {
        return parseInt(a.numOfBuy) - parseInt(b.numOfBuy);
      })
    : [];
};

export const sortProductsByCategory = (products, category) => {
  return products[0] ? products.filter((p) => p.category === category) : [];
};

//categories

export const sortPopularCategories = (categories) => {
  return categories[0]
    ? categories.sort((a, b) => {
        return parseInt(a.number) - parseInt(b.number);
      })
    : [];
};

export const sortAlphabetCategories = (categories) => {
  return categories[0]
    ? categories.sort((a, b) => a.name.localeCompare(b.name))
    : [];
};

//orders

export const sortOpenOrders = (orders) => {
  return orders[0] ? orders.filter((o) => o.status === "open") : [];
};

export const sortInProcessOrders = (orders) => {
  return orders[0] ? orders.filter((o) => o.status === "in process") : [];
};

export const sortCloseOrders = (orders) => {
  return orders[0] ? orders.filter((o) => o.status === "close") : [];
};

export const lastHalfYearOrders = (orders) => {
  const currentDate = new Date();
  const lastHalfYear = new Date(currentDate);
  lastHalfYear.setMonth(currentDate.getMonth() - 6);
  return orders[0] ? orders.filter((o) => o.updatetAt <= lastHalfYear) : [];
};

//auctionProduct

export const sortNoOffersAp = (auctionProducts) => {
  return auctionProducts[0]
    ? auctionProducts.filter((ap) => ap.offers === null)
    : [];
};

export const sortOpenAuctions = (auctionProducts) => {
  return auctionProducts[0]
    ? auctionProducts.filter(
        (ap) =>
          ap.product.pin === true &&
          new Date(ap.product.startTime) <= new Date()
      )
    : [];
};

export const sortCloseAuctions = (auctionProducts) => {
  return auctionProducts[0]
    ? auctionProducts.filter((ap) => ap.product.pin === false)
    : [];
};

export const sortFutureAuctions = (auctionProducts) => {
  return auctionProducts[0]
    ? auctionProducts.filter(
        (ap) =>
          ap.product.pin === true && new Date(ap.product.startTime) > new Date()
      )
    : [];
};
//address
export const sortDefultAddress = (shippingAddresses) => {
  return shippingAddresses[0]
    ? shippingAddresses.sort((a, b) => {
        return a.defaultAddress ? -1 : b.defaultAddress ? 1 : 0;
      })
    : [];
};
//credit cards
export const sortDefultCC = (creditCards) => {
  return creditCards[0]
    ? creditCards.sort((a, b) => {
        return a.defaultCC ? -1 : b.defaultCC ? 1 : 0;
      })
    : [];
};
