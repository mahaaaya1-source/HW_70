'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from '@/store/store';
import { fetchOrders, completeOrder } from '@/store/orders/ordersThunks';
import { fetchDishes } from '@/store/dishes/dishesThunks';

const AdminOrdersPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const orders = useSelector((s: RootState) => s.orders.items);
  const loading = useSelector((s: RootState) => s.orders.loading);

  const dishes = useSelector((s: RootState) => s.dishes.items);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchDishes()); // нужно для названий/цен
  }, [dispatch]);

  const dishesMap = useMemo(() => {
    return dishes.reduce((acc: Record<string, any>, d: any) => {
      acc[d.id] = d;
      return acc;
    }, {});
  }, [dishes]);

  return (
    <div>
      <h2 className="h5 mb-3">Orders</h2>

      {loading && <p>Loading...</p>}
      {!loading && orders.length === 0 && <p>No orders</p>}

      <div className="d-flex flex-column gap-2">
        {orders.map((order) => {
          const itemsEntries = Object.entries(order.items);

          const productsTotal = itemsEntries.reduce((sum, [dishId, qty]) => {
            const dish = dishesMap[dishId];
            const price = dish ? Number(dish.price) : 0;
            return sum + price * Number(qty);
          }, 0);

          const delivery = 150;
          const total = productsTotal + delivery;

          return (
            <div key={order.id} className="border rounded p-2">
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div className="flex-grow-1">
                  {itemsEntries.map(([dishId, qty]) => {
                    const dish = dishesMap[dishId];
                    const title = dish ? dish.title : `Unknown (${dishId})`;
                    const price = dish ? dish.price : 0;

                    return (
                      <div key={dishId} className="d-flex justify-content-between">
                        <div>
                          {qty}x {title}
                        </div>
                        <div style={{ fontWeight: 700 }}>{price} KGS</div>
                      </div>
                    );
                  })}

                  <div className="d-flex justify-content-between mt-2">
                    <div>Delivery</div>
                    <div style={{ fontWeight: 700 }}>{delivery} KGS</div>
                  </div>
                </div>

                <div style={{ minWidth: 160 }}>
                  <div style={{ fontWeight: 700 }}>Order total</div>
                  <div style={{ fontWeight: 800 }}>{total} KGS</div>

                  <button
                    className="btn btn-link p-0 mt-2"
                    onClick={() => dispatch(completeOrder(order.id))}
                  >
                    Complete order
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
