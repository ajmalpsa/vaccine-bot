const pincoe_url = "https://api.postalpincode.in/pincode/";
const session_url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=306&date=";
const user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15';

const header = {
    'Accept': 'application/json',
    'Accept-Language': 'hi_IN',
    'User-Agent': user_agent
  };

  const error_message = "An error occured please try again after sometime...";



module.exports = {pincoe_url, session_url, header, error_message}