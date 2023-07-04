import React, { useState, useEffect } from 'react'

const PurchaseHistory = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([])

  // Simulated purchase history data
  const fakePurchaseHistory = [
    {
      id: 1,
      productName: 'Product A',
      brand: 'Brand X',
      price: 10,
      quantity: 5,
    },
    {
      id: 2,
      productName: 'Product B',
      brand: 'Brand Y',
      price: 15,
      quantity: 3,
    },
    {
      id: 3,
      productName: 'Product C',
      brand: 'Brand Z',
      price: 20,
      quantity: 2,
    },
  ]

  useEffect(() => {
    // Simulate fetching purchase history data
    const fetchPurchaseHistory = () => {
      // Simulated API call or data retrieval from storage
      setPurchaseHistory(fakePurchaseHistory)
    }

    fetchPurchaseHistory()
  }, [])

  return (
    <div>
      <h2>Purchase History</h2>
      <div>
        <h3>Previous Purchases</h3>
        {purchaseHistory.map((purchase) => (
          <div key={purchase.id}>
            <h4>Product: {purchase.productName}</h4>
            <p>Brand: {purchase.brand}</p>
            <p>Price: {purchase.price}</p>
            <p>Quantity: {purchase.quantity}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PurchaseHistory
