import React from 'react';
import { connect } from 'react-redux';
const DetailedView = function(props) {
  // const record = props.report_data[5];
  // console.log(record);
  const record = props.report_data[props.record_index];

  console.log(props.report_data, '---- report data ----');
  console.log(props.record_index);
  return (
    <div>
      <h3>Customer</h3>
      <table>
        <thead>
          <tr
            style={{
              backgroundColor: 'grey',
              color: 'blue'
            }}
          >
            <th rowSpan='1'>id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Adress</th>
            <th>card Number</th>
            <th>card end date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{record.customer._id}</td>
            <td>{record.customer.firstName}</td>
            <td>{record.customer.lastName}</td>
            <td>{record.customer.email}</td>
            <td>{record.customer.gender}</td>
            <td>{record.customer.address}</td>
            <td>{record.customer.paymentInfo.cardNumber}</td>
            <td>
              {new Date(record.customer.paymentInfo.endDate).getFullYear() +
                '/' +
                new Date(record.customer.paymentInfo.endDate).getMonth()}
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <h3>Guests</h3>
      <table>
        <thead>
          <tr
            style={{
              backgroundColor: 'grey',
              color: 'blue'
            }}
          >
            <th rowSpan='1'>Guest id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {record.guests.length > 0
            ? record.guests.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{element._id}</td>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.gender}</td>
                  </tr>
                );
              })
            : 'no guests for this flight'}
        </tbody>
      </table>
      <hr />
      <h3>Flight</h3>
      <table>
        <thead>
          <tr
            style={{
              backgroundColor: 'grey',
              color: 'blue'
            }}
          >
            <th rowSpan='1'>id</th>
            <th>Type</th>
            <th>Vehicle</th>
            <th>pilot</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{record.flight._id}</td>
            <td>{record.flight.type}</td>
            <td>{record.flight.vehicle}</td>
            <td>{record.flight.pilot}</td>
            <td>{record.from}</td>
            <td>{record.to}</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <h3>Info</h3>
      <table>
        <thead>
          <tr
            style={{
              backgroundColor: 'grey',
              color: 'blue'
            }}
          >
            <th>Extra Baggage in Kg</th>
            <th>Date</th>
            <th>Time</th>
            <th>Total Payment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{record.extraBaggage} Kg</td>
            <td>{new Date(record.date).getFullYear() +
                      '-' +
                      new Date(record.date).getMonth() +
                      '-' +
                      new Date(record.date).getDate()}</td>
            <td>{record.time}</td>
            <td>${record.totalPayment}</td>
          </tr>
        </tbody>
      </table>
      <hr />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    report_data: state.report_data,
    record_index: state.record_index
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setData: data => dispatch(setData(data)),
    setIndex: index => dispatch(setIndex(index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailedView);
