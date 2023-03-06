const perform = async (z, bundle) => {
   let body ={
      'id':[bundle.inputData.orderId],
      status:bundle.inputData.status
   }

   if(bundle.inputData.carrier){
      body.carrier = bundle.inputData.carrier
   }
   if(bundle.inputData.carrierService){
      body['carrier_service'] = bundle.inputData.carrierService
   }
   if(bundle.inputData.trackingNumber){
      body['tracking_number'] = bundle.inputData.trackingNumber
   }
   if(bundle.inputData.shippedEmail){
      body['dispatch_shipped_email'] = bundle.inputData.shippedEmail
   }

   const response = await z
      .request(`https://www.subbly.co/api/v1/orders/`, {
         method: "PATCH",
         body:JSON.stringify(body),
         headers: {
         "Content-Type": "application/json",
         },
      })
      .then((res) => res.json);

      return response;
   };

module.exports = {
  key: "updateOrder",

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: "Order",
  display: {
    label: "Update Order",
    description: "Update Order by ID.",
  },

  // `operation` is where we make the call to your API to do the search
  operation: {
    // This search only has one search field. Your searches might have just one, or many
    // search fields.
    inputFields: [
      {
        key: "orderId",
        type: "string",
        label: "Order ID",
        required:true,
        dynamic:'order.id.name'
      },
      {
         key: "status",
         type: "string",
         label: "Status",
         required:true,
         choices:{
            'awaiting_delivery':'Awaiting Delivery',
            'shipped':'Shipped',
            'returned':'Returned',
            'disputed':'Disputed',
            'future_order':'Future Order',
            'cancelled':'Cancelled'
         }
       },
       {
         key: "carrier",
         type: "string",
         label: "Carrier",
         required:false,
       },
       {
         key: "carrierService",
         type: "string",
         label: "Carrier Service",
         required:false,
       },
       {
         key: "trackingNumber",
         type: "string",
         label: "Tracking Number",
         required:false,
       },
       {
         key: "shippedEmail",
         type: "string",
         label: "Send Shipped Email",
         required:false,
         choices:{
          0:'Do Not Send',
          1:'Send'
         }
       },
    ],

    perform: perform,

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: {
      "message":"Successfully updated"
   },

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    /*outputFields: [
      { key: "id", label: "ID" },
      { key: "createdAt", label: "Created At" },
      { key: "name", label: "Name" },
      { key: "directions", label: "Directions" },
      { key: "authorId", label: "Author ID" },
      { key: "style", label: "Style" },
    ],*/
  },
};