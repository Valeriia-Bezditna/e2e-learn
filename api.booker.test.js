const axios = require('axios');
//const expect = require("expect");
import expect from "expect";

async function getToken() {
    const basUrl = 'https://restful-booker.herokuapp.com';
    const credentials = { username: 'admin', password: 'password123' };

    const response = await axios.post(basUrl + '/auth', credentials, {
        headers: { 'Content-Type': 'application/json' }
    });

    const token = response.data["token"];
    console.log(`Auth token: ${token}`);

    return token;
}

describe('API testing', () => {
    const basUrl = 'https://restful-booker.herokuapp.com';

    it('Get Booking', async () => {

        const token = "token=" + await getToken();

        const bookings_response = await axios.get(basUrl + '/booking', {
            headers: {
                'Cookie' : `token=${token}`,
                'Accept': 'application/json'
            }
        });
        console.log(bookings_response.data);

        const booking_response = await axios.get(basUrl + '/booking/51', {
            headers: { 'Accept': 'application/json' }
        });

        console.log(booking_response.data);
        console.log(booking_response.data["lastname"]);
        expect(booking_response.data["lastname"]).toBe('Smith');


    });

it('Creat Booking', async () => {


    const params = { firstname: 'Testing', lastname: 'Dance', totalprice: 307, depositpaid: true,
        bookingdates: { checkin: '2024-04-16', checkout: '2024-04-20'},
        additionalneeds: 'Breakfast'};

    const creat_response = await axios.post(basUrl + '/booking', params, {
        headers: { 'Accept': 'application/json'}
    });
    console.log(creat_response.data);


    const updating_booking = { firstname: 'POOJATest', lastname: 'Kalyankar', totalprice: 9000, depositpaid: true,
           bookingdates: { checkin: '2024-07-01', checkout: '2024-07-10' },
           additionalneeds: 'Breakfast'};

    const update_response = await axios.put(basUrl + '/booking/160', updating_booking,{
       headers: {
           'Content-Type' :'application/json',
           'Accept' : 'application/json',
           'Authorization' : `Basic YWRtaW46cGFzc3dvcmQxMjM=`


       }

   });
   console.log(update_response.data);
   console.log(update_response.data["firstname"]);
   expect(update_response.data["firstname"]).toBe('POOJATest');
   console.log(update_response.data["lastname"]);
   expect(update_response.data["lastname"]).toBe('Kalyankar');

   const delete_response = await axios.delete(basUrl + '/booking/51',  {
       headers: {'Content-Type' : 'application/json','Authorization' : `Basic YWRtaW46cGFzc3dvcmQxMjM=`}
   });
    console.log(delete_response.data["booking"]);
    expect(delete_response.data["booking"]).toBe('51');
});

});