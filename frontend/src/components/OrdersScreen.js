import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';

function OrdersScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (order) => {
    if(loadingDelete)
    {
      return "Loading...";
    }
    else if(errorDelete)
    {
      return error;
    }
    else if(window.confirm("Are you sure?"))
    {
      dispatch(deleteOrder(order._id));
    }
  }

  return loading ? <div className="fa fa-spinner fa-3x fa-spin primary">Loading...</div> :
    error ? <div>{error}</div> :
    <div className="content content-margined">

      <div className="order-header">
        <h3>Orders</h3>
      </div>
      <div className="order-list">

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (<tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt.substring(0,10)}</td>
              <td>{order.totalPrice.toFixed(2)}</td>
              <td>{order.user ? order.user.name : "Not known"}</td>
              <td>{order.isPaid ? "Yes" : "No" }</td>
              <td>{order.isPaid ? order.paidAt.substring(0, 10) : "Not known" }</td>
              <td>{order.isDelivered ? "Yes" : "No" }</td>
              <td>{order.deliveredAt ? order.deliveredAt : "Not done" }</td>
              <td>
                <Link to={"/order/" + order._id} className="button secondary" >Details</Link>
                {' '}
                <button type="button" onClick={() => deleteHandler(order)} className="button secondary">Delete</button>
              </td>
            </tr>))}
          </tbody>
        </table>

      </div>
    </div>
}
export default OrdersScreen;
