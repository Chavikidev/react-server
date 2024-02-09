const stripeAPI=require('../stripe');

const webHookHandkers={
    'checkout.session.completed':(data)=>{
        console.log('Checkout completed successfully', data);
        // other buissness logic
    },
    'payment_intent.succeeded':(data)=>{
        console.log('Payment succeeded',data);
    },
    'payment_intent.payment_failed':(data)=>{
        console.log('Payment failed',data);
    }
}

function webhook(req,res){
    const sig=req.headers['stripe-signature'];
    let event;

    const payload = req.body
    const payloadString = JSON.stringify(payload, null, 2);
    const secret=process.env.WEB_HOOK_SECRET;
    const header = stripeAPI.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret,
    });

    try {
        event=stripeAPI.webhooks.constructEvent(
            payloadString,header, secret);
    } catch (error) {
        console.log(error);
        return res.status(400).send(`Webhook error ${error.message}`);
    }
    
    if(webHookHandkers[event.type]){
        webHookHandkers[event.type](event.data.object);
    }
}

module.exports=webhook;