const stripeAPI=require('../stripe');
const getCustomer=require('../helpers/getCustomer');

async function getCards(req,res){
    const {currentUser}=req;
    const customer=await getCustomer(currentUser.uid);

    let cards;
    try {
        cards=await stripeAPI.paymentMethods.list({
            customer:customer.id,
            type:'card',
        });
        res.status(200).json(cards.data);
    } catch (error) {
        res.status(400).json({error:'Error on getting stripe cards'});
    }
}

module.exports=getCards;