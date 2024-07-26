import nats from 'node-nats-streaming';

const stan = nats.connect('tickening','abc',{
    url: 'http://localhost:4222'
});

stan.on('connect', ()=>{
    console.log("connected");

    const data=JSON.stringify({
        id:'123',
        title:'show',
        price: 42
    });

    stan.publish('titket:created',data,()=>{
        console.log('Event published');
    });
})