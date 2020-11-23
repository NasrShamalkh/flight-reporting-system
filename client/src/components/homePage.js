import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setIndex, setData } from '../redux';

const ReportingSystem = function(props) {
  const [date, setDate] = React.useState('');

  const get_records = function() {
    axios
      .get(`http://localhost:5600/get_records/${date}`)
      .then(result => {
        console.log('Date recived ', result.data);
        props.setData(result.data);
      })
      .catch(err => {
        console.log('Error in getting data', err);
      });
  };

  // const generate_table = () => {
  //   return (

  //   );
  // };

  return (
    <div>
      <h1>Node.js flights Reporting System</h1>
      <p>
        Enter Date bellow. <code>YYYY-MM-DD</code>
      </p>
      <input
        type='text'
        name='date'
        value={date}
        onChange={e => {
          setDate(e.target.value);
        }}
      />
      <br />
      <br />
      <button onClick={get_records}>Get this date's report</button>
      <hr />
      <table>
        <thead>
          <tr>
            <th colSpan='2'>CUSTOMER</th>
            <th>GUESTS</th>
            <th colSpan='5'>FLIGHT</th>
            <th colSpan='4'>INFO</th>
          </tr>
        </thead>
        <thead>
          <tr
            style={{
              backgroundColor: 'grey',
              color: 'blue'
            }}
          >
            <th>Name</th>
            <th>Email</th>
            <th>Number of guests</th>
            <th>From</th>
            <th>To</th>
            <th>Pilot</th>
            <th>Type</th>
            {/* <th>ExtraBagging</th> */}
            <th>Payment total</th>
            <th>Time</th>
            <th>Date</th>
            <th>details</th>
          </tr>
        </thead>
        <tbody>
          {props.report_data.length > 0 ? (
            props.report_data.map((element, index) => {
              return (
                <tr key={index}>
                  <td>
                    {element.customer.firstName +
                      ' ' +
                      element.customer.lastName}
                  </td>
                  <td>{element.customer.email}</td>
                  <td>{element.guests.length}</td>
                  <td>{element.from}</td>
                  <td>{element.to}</td>
                  <td>{element.flight.pilot}</td>
                  <td>{element.flight.type}</td>
                  {/* <td>{element.extraBaggage} Kg</td> */}
                  <td>${element.totalPayment}</td>
                  <td>{element.time}</td>
                  <td>{element.date}</td>
                  <td>
                    <NavLink
                      onClick={() => {
                        props.setIndex(index);
                      }}
                      to='/detailed_view'
                    >
                      More details
                    </NavLink>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>`no data`</td>
            </tr>
          )}
        </tbody>
      </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportingSystem);
