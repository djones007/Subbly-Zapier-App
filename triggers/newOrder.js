const perform = async (z, bundle) => {
   let d = new Date(),
      delay = parseInt(bundle.inputData.delay,10),
      start = new Date(d.getTime() - (8.64e+7+delay*60000)),
      end = new Date(d.getTime() - (delay*60000));

   const params = {
      start_created_on:start.toISOString(),
      end_created_on:end.toISOString(),
      per_page:1000
   }

   if(bundle.inputData.status){
      params.status = bundle.inputData.status
   }

   const response = await z
    .request(`https://www.subbly.co/api/v1/orders/`, {
      method: "GET",
      params:params,
      headers: {
        "Content-Type": "application/json",
      },
   })
   .then((res) => res.json);

   let orders =[],
      skus = bundle.inputData.sku;

   if(bundle.inputData.sku){
      orders = response.data.filter((o) => {
         let c =false;
         if(o.shipping_items){
            o.shipping_items.forEach((i) =>{
               if(i.item && i.item.sku && skus.includes(i.item.sku)){
                  c = true;
               }
            })
         }

         return c;
      })
   } else {
      orders = response.data
   }

  return orders;
};

module.exports = {
  key: "newOrder",

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: "Order",
  display: {
    label: "Get Orders",
    description: "Get New Orders",
  },

  // `operation` is where we make the call to your API to do the search
  operation: {
    // This search only has one search field. Your searches might have just one, or many
    // search fields.
    inputFields: [
      {
         key: "delay",
         label: "Delay Time",
         required:true,
         choices:{
            '10':'10 Minutes',
            '30':'30 Minutes'
         }
      },
      {
         key: "status",
         type: "string",
         label: "Status",
         required:false,
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
         key: "sku",
         label: "Restrict Orders to specific SKUS",
         required:false,
         list:true
      },
   ],

    perform: perform,

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: {  
      "id":205912,
      "internal_id":"1205912",
      "status":"1",
      "status_name":"awaiting_delivery",
      "survey":{  
         "version":2,
         "survey_id":3123,
         "data":{  
            "questions":[  
               {  
                  "id":8128,
                  "type":"multiple",
                  "name":"Multiple select",
                  "answers":[  
                     {  
                        "id":8128,
                        "content":"Multiple #1",
                        "price_modifier":1
                     },
                     {  
                        "id":8129,
                        "content":"Multiple #2",
                        "price_modifier":2
                     }
                  ]
               },
               {  
                  "id":8129,
                  "type":"select",
                  "name":"Single choise",
                  "answers":{  
                     "id":8130,
                     "content":"Single #1",
                     "price_modifier":1
                  }
               },
               {  
                  "id":8130,
                  "type":"quantity",
                  "name":"Quantity choise",
                  "answers":[  
                     {  
                        "id":8132,
                        "content":"Quantity #1",
                        "price_modifier":1,
                        "quantity":1
                     },
                     {  
                        "id":8133,
                        "content":"Quantity #1",
                        "price_modifier":2,
                        "quantity":1
                     }
                  ]
               }
            ]
         }
      },
      "created_on":"2019-07-05 21:49:05",
      "due_date":"2019-07-05 21:49:04",
      "subtotal":"0.00",
      "total":"0.00",
      "carrier":null,
      "carrier_service":null,
      "tracking_number":null,
      "shipping_cost":null,
      "updated_on":"",
      "archived":"0",
      "is_gift":"0",
      "tax_amount":"0.00",
      "tax_rate":0,
      "refunded":"0",
      "refunded_amount":"0.00",
      "delivery_address":{  
         "id":54826,
         "first_name":"Dev",
         "last_name":"Dev",
         "phone":"+180630000000",
         "address_1":"Address 1",
         "address_2":"Address 2",
         "city":"City",
         "state":"State",
         "zip":"00701",
         "country":"Country",
         "default":"0"
      },
      "customer":{  
         "id":54004,
         "notes":null,
         "created_on":"2019-06-25 15:02:43",
         "marketing_consent":null,
         "user":{  
            "id":75792,
            "email":"test@test.com",
            "created_on":"2019-06-25 15:02:43",
            "first_name":"Test name",
            "last_name":"Test last name"
         },
         "tags":[  
   
         ]
      },
      "shop":{  
         "country":{  
            "id":1,
            "name":"United States",
            "code":"US",
            "currency_code":"USD"
         }
      },
      "subscription":{  
         "id":53750,
         "active":"1",
         "past_due":"0",
         "created_on":"2019-06-25 15:02:48",
         "cancelled_on":"",
         "gift":"0",
         "status":"active",
         "next_payment_date":"2019-07-08 03:00:00"
      },
      "line_items":[  
   
      ],
      "tags":[  
   
      ],
      "shipping_items":[  
         {  
            "id":57,
            "order_id":"205912",
            "inventory_item_id":"1",
            "quantity":"1",
            "created_on":"2019-07-16 22:58:26",
            "updated_on":"2019-07-16 22:58:26",
            "deleted_on":"",
            "item":{  
               "id":1,
               "sku":"111",
               "name":"Beta",
               "description":"",
               "photo_url":"",
               "buy_price":"1.00",
               "sell_price":"1.00",
               "stock_count":"-34",
               "status":"1",
               "created_on":"2019-03-10 21:14:05",
               "updated_on":"2019-07-16 22:58:50",
               "width":null,
               "height":null,
               "depth":null,
               "weight":null
            }
         },
         {  
            "id":58,
            "order_id":"205912",
            "inventory_item_id":"2",
            "quantity":"1",
            "created_on":"2019-07-16 22:58:26",
            "updated_on":"2019-07-16 22:58:26",
            "deleted_on":"",
            "item":{  
               "id":2,
               "sku":"2222",
               "name":"Getta",
               "description":"",
               "photo_url":"",
               "buy_price":"1.00",
               "sell_price":"1.00",
               "stock_count":"190",
               "status":"1",
               "created_on":"2019-03-10 21:14:05",
               "updated_on":"2019-07-16 22:58:50",
               "width":null,
               "height":null,
               "depth":null,
               "weight":null
            }
         },
         {  
            "id":59,
            "order_id":"205912",
            "inventory_item_id":"1",
            "quantity":"2",
            "created_on":"2019-07-16 22:58:50",
            "updated_on":"2019-07-16 22:58:50",
            "deleted_on":"",
            "item":{  
               "id":1,
               "sku":"111",
               "name":"Name #1",
               "description":"",
               "photo_url":"",
               "buy_price":"1.00",
               "sell_price":"1.00",
               "stock_count":"-34",
               "status":"1",
               "created_on":"2019-03-10 21:14:05",
               "updated_on":"2019-07-16 22:58:50",
               "width":null,
               "height":null,
               "depth":null,
               "weight":null
            }
         },
         {  
            "id":60,
            "order_id":"205912",
            "inventory_item_id":"2",
            "quantity":"2",
            "created_on":"2019-07-16 22:58:50",
            "updated_on":"2019-07-16 22:58:50",
            "deleted_on":"",
            "item":{  
               "id":2,
               "sku":"2222",
               "name":"Name #2",
               "description":"",
               "photo_url":"",
               "buy_price":"1.00",
               "sell_price":"1.00",
               "stock_count":"190",
               "status":"1",
               "created_on":"2019-03-10 21:14:05",
               "updated_on":"2019-07-16 22:58:50",
               "width":null,
               "height":null,
               "depth":null,
               "weight":null
            }
         }
      ]
   }
   ,

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