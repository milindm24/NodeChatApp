var expect =require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () =>{
    it('Should generate correct message object', ()=>{
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from,text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,text});

    })
});

describe('generateLocationMessage',()=>{
    it('Should generate correct location object'), ()=>{

        var from = 'Milind';
        var lat = 15;
        var long = 19;
        var url = 'https://www.google.com/maps?q=15,19';
        var message = generateLocationMessage(from,lat,long);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,url});
    }
});