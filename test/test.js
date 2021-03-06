
const { assert, expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()

chai.use(chaiHttp)

// TODO: Figure out how to parse from test_image.csv instead of this monster
const test_pic = Buffer.from(
    [255,216,255,224,0,16,74,70,73,70,0,1,2,0,0,1,0,1,0,0,255,219,0,
    67,0,3,2,2,3,2,2,3,3,3,3,4,3,3,4,5,8,5,5,4,4,5,10,7,7,6,8,12,10,12,12,11,10,
    11,11,13,14,18,16,13,14,17,14,11,11,16,22,16,17,19,20,21,21,21,12,15,23,24,
    22,20,24,18,20,21,20,255,219,0,67,1,3,4,4,5,4,5,9,5,5,9,20,13,11,13,20,20,
    20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,
    20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,255,
    192,0,17,8,0,56,0,56,3,1,34,0,2,17,1,3,17,1,255,196,0,31,0,0,1,5,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,255,196,0,181,16,0,2,1,3,3,2,4,3,
    5,5,4,4,0,0,1,125,1,2,3,0,4,17,5,18,33,49,65,6,19,81,97,7,34,113,20,50,129,
    145,161,8,35,66,177,193,21,82,209,240,36,51,98,114,130,9,10,22,23,24,25,26,
    37,38,39,40,41,42,52,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,
    87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,
    131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,
    164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,
    197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,225,226,227,228,
    229,230,231,232,233,234,241,242,243,244,245,246,247,248,249,250,255,196,0,
    31,1,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,255,196,0,
    181,17,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,119,0,1,2,3,17,4,5,33,49,6,18,65,81,7,
    97,113,19,34,50,129,8,20,66,145,161,177,193,9,35,51,82,240,21,98,114,209,10,
    22,36,52,225,37,241,23,24,25,26,38,39,40,41,42,53,54,55,56,57,58,67,68,69,
    70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,
    116,117,118,119,120,121,122,130,131,132,133,134,135,136,137,138,146,147,148,
    149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,
    182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,
    215,216,217,218,226,227,228,229,230,231,232,233,234,242,243,244,245,246,247,
    248,249,250,255,218,0,12,3,1,0,2,17,3,17,0,63,0,252,170,171,58,126,153,121,
    171,92,45,189,141,164,247,147,183,72,173,227,46,199,130,122,1,158,128,254,
    85,221,124,53,248,19,226,143,137,203,109,119,101,4,90,126,141,52,207,7,246,
    173,243,108,135,122,40,103,85,3,44,236,20,131,133,7,211,169,175,119,241,150,
    149,161,124,45,248,33,103,225,47,11,160,109,67,81,212,25,245,239,16,42,129,
    113,125,26,72,209,164,57,25,17,192,48,205,177,88,228,133,102,207,21,203,82,
    188,98,212,35,171,103,68,40,202,81,114,122,35,230,6,240,71,136,18,242,206,
    212,232,215,191,104,188,149,96,183,140,66,196,203,35,28,42,15,86,39,183,90,
    251,127,225,231,236,121,240,179,225,39,131,31,86,248,187,125,113,227,15,28,
    204,165,109,188,17,160,94,145,31,152,200,8,133,166,140,2,210,33,36,187,164,
    158,90,97,190,254,1,62,73,240,129,109,124,18,37,241,41,81,22,160,241,168,
    135,202,202,201,20,44,113,242,128,71,207,38,71,190,10,142,50,107,215,252,43,
    169,221,77,37,230,191,169,176,125,94,247,247,49,198,24,20,180,132,96,249,
    113,246,235,212,255,0,17,30,213,231,215,173,86,114,229,78,201,118,234,119,
    208,161,77,46,103,171,59,235,63,2,120,62,63,11,79,167,222,120,99,64,99,168,
    220,69,28,58,78,159,111,228,88,36,249,5,16,224,153,102,85,9,189,228,149,152,
    149,140,240,63,139,87,198,159,23,124,37,251,34,252,39,68,240,189,157,129,
    186,188,118,54,17,165,159,217,63,181,174,215,253,100,210,152,194,254,234,34,
    193,138,140,18,60,184,129,0,177,78,10,199,81,109,119,197,198,213,2,200,45,
    96,142,43,102,94,130,123,135,218,78,71,251,40,23,254,6,120,230,190,89,253,
    164,188,126,62,36,124,86,213,13,188,171,38,135,163,3,164,233,190,88,1,90,8,
    221,179,39,29,76,142,89,203,117,59,135,160,21,199,78,135,214,43,114,77,251,
    177,213,252,206,170,213,85,24,39,5,171,209,12,248,215,227,175,16,124,84,240,
    188,58,207,138,53,219,191,16,235,22,58,147,21,189,187,193,99,5,218,25,54,12,
    0,18,52,146,23,217,24,1,87,205,32,0,48,40,174,122,202,95,63,225,127,136,150,
    70,44,203,111,109,180,96,255,0,203,59,149,92,254,2,92,126,61,56,162,190,130,
    146,73,56,174,135,135,83,86,159,115,187,248,35,226,169,23,193,118,86,137,32,
    136,105,215,151,10,74,100,49,19,34,158,78,122,124,184,233,90,30,40,212,34,
    215,52,168,52,215,59,226,23,12,72,83,143,145,91,121,7,253,237,219,127,31,99,
    94,73,240,195,89,107,97,171,233,160,168,107,152,68,241,110,254,252,89,115,
    255,0,142,111,63,80,43,173,210,94,226,72,4,174,224,205,60,155,99,39,238,162,
    142,51,252,201,245,192,174,58,148,146,155,104,236,167,82,240,81,59,61,30,67,
    113,124,238,249,17,70,248,80,6,1,112,14,91,254,3,156,15,246,137,254,237,119,
    73,173,162,218,44,65,198,57,202,19,141,190,130,188,255,0,74,184,130,51,182,
    50,21,21,112,1,235,180,116,252,73,36,159,118,169,223,83,112,231,105,36,231,
    25,62,220,127,58,205,192,222,50,178,59,173,27,198,17,248,113,117,205,101,92,
    165,196,16,207,115,8,46,2,171,164,1,83,156,240,119,48,32,251,154,249,50,20,
    242,227,192,234,72,201,175,100,212,117,127,55,195,26,212,44,0,121,108,110,
    37,246,229,192,245,244,31,165,120,245,187,96,163,14,199,60,244,226,182,195,
    195,147,153,247,177,207,94,124,220,167,77,111,49,131,225,14,189,201,81,53,
    204,80,244,200,96,102,47,248,127,171,253,13,21,71,94,190,22,255,0,13,160,
    180,18,178,201,113,169,22,116,32,13,226,52,99,156,250,102,97,197,21,215,79,
    171,243,56,230,239,111,67,152,240,149,196,246,190,39,210,164,181,143,207,
    159,237,49,170,195,159,245,153,96,54,126,57,199,227,94,177,175,66,116,109,
    78,231,78,8,216,178,99,106,114,8,57,83,181,186,243,219,21,226,150,243,201,
    109,60,115,68,230,57,99,96,232,195,168,35,144,107,232,61,91,79,159,85,41,
    173,220,200,146,77,169,196,154,132,223,38,213,13,48,14,113,237,185,152,15,
    165,101,86,202,73,179,90,91,52,98,65,169,170,169,5,185,235,143,76,84,175,
    171,121,65,196,68,147,141,160,159,231,250,83,111,52,169,109,140,159,186,
    225,112,15,202,114,191,90,207,117,32,112,188,133,252,235,61,30,198,183,104,
    181,230,163,233,119,109,33,221,20,150,134,51,219,130,216,60,254,39,154,222,
    248,109,251,56,235,158,53,241,116,86,87,16,201,107,225,251,107,49,170,223,
    106,72,62,68,179,28,182,15,65,33,228,5,39,175,63,116,19,88,235,2,159,7,207,
    54,207,156,68,216,238,27,247,163,0,250,215,186,120,59,64,214,82,195,196,122,
    14,135,227,25,151,194,246,186,124,115,106,26,53,213,187,218,106,151,246,190,
    95,155,61,189,179,72,171,132,192,3,230,42,24,56,64,72,99,187,10,147,148,98,
    249,93,141,169,193,73,174,101,115,228,191,136,154,156,122,141,240,104,1,91,
    103,185,185,158,16,9,40,17,164,218,187,115,219,17,129,248,126,69,77,241,70,
    5,177,212,52,139,45,193,174,33,211,214,75,133,82,10,172,146,201,36,216,82,
    56,35,108,169,143,173,21,232,211,183,42,177,231,79,89,59,156,207,246,76,150,
    250,183,216,111,155,236,5,31,108,178,72,11,8,199,115,199,222,227,145,142,
    188,99,173,122,231,137,62,56,232,215,122,47,246,102,145,225,185,109,108,146,
    221,244,248,26,226,232,188,235,2,162,172,46,196,38,9,35,118,225,146,1,206,
    49,69,20,229,74,51,105,203,160,163,55,29,142,46,227,226,86,171,47,134,224,
    180,55,147,62,160,183,44,205,57,81,254,167,96,1,15,31,54,73,99,207,160,170,
    122,167,141,101,185,186,129,237,226,104,82,5,1,118,185,12,237,180,6,102,193,
    199,92,145,140,99,52,81,77,83,138,216,159,105,39,212,245,121,60,77,225,244,
    248,43,104,203,61,135,246,203,91,145,45,186,220,41,156,183,219,27,248,115,
    145,242,133,61,51,183,29,106,11,111,138,250,148,30,17,191,214,239,13,150,
    171,123,172,52,182,16,91,193,124,233,123,96,145,196,170,166,100,0,249,144,
    186,183,67,130,90,32,67,12,98,138,43,143,217,69,222,253,217,216,234,75,75,
    118,71,143,234,215,58,151,140,124,72,210,189,177,251,109,209,68,72,17,118,
    133,85,80,170,6,122,40,85,3,39,128,5,20,81,93,169,36,172,142,77,245,103,255,
    217])

describe('/GET item name', () => {
    it('it should GET a list of item names', (done) => {
        chai.request(server)
            .get('/item_list/name/')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.include.all.keys(['results'])
                res.body['results'].length.should.be.above(0)
                res.body['results'].should.be.a('array')
                res.body['results'].forEach(value => {
                    expect(value.should.include.all.keys(['item_name']))
                })
            done()
        })
    })
    it('it should GET an item name with item ID 38', (done) => {
        chai.request(server)
            .get('/item_list/name/?id=38')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.include.all.keys(['results'])
                res.body['results'].length.should.be.eql(1)
                res.body['results'].should.be.a('array')
                res.body['results'][0].should.have.property('item_name')
                res.body['results'][0]['item_name'].should.be.eql(
                    "Recruit's Shirt")
            done()
        })
    })
    it('it should GET an empty array', (done) => {
        chai.request(server)
            .get('/item_list/name/?id=154')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.include.all.keys(['results'])
                res.body['results'].length.should.be.eql(0)
                res.body['results'].should.be.a('array')
            done()
        })
    })
    it('it should return a 400 error with an item ID string with non-number ' + 
    'characters', (done) => {
        chai.request(server)
            .get('/item_list/name/?id=a')
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.have.property('error')
                res.body['error'].should.include.all.keys(['status', 'message'])
                res.body['error']['status'].should.be.eql(400)
                res.body['error']['message'].should.be.eql("Bad Request")
            done()
            })
    })
})

describe('/GET item image', () => {
    it('it should GET an item picture with item ID 38', (done) => {
        chai.request(server)
            .get('/item_list/image/38')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.include.all.keys(['results'])
                res.body['results'].length.should.be.eql(1)
                res.body['results'].should.be.a('array')
                res.body['results'][0].should.have.property('item_pic')
                res.body['results'][0]['item_pic'].should.include.all.keys([
                    'type', 'data'])
                res.body['results'][0]['item_pic']['type'].should.be.equal(
                    'Buffer')
                assert(!Buffer.compare(Buffer.from(res.body['results'][0][
                    'item_pic']), test_pic))
            done()
        })
    })
    it('it should GET an empty array', (done) => {
        chai.request(server)
            .get('/item_list/image/154')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.include.all.keys(['results'])
                res.body['results'].length.should.be.eql(0)
                res.body['results'].should.be.a('array')
            done()
        })
    })
    it('it should return a 400 error with an item ID string with non-number' +
        'characters', (done) => {
        chai.request(server)
            .get('/item_list/image/a')
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.have.property('error')
                res.body['error'].should.include.all.keys(['status', 'message'])
                res.body['error']['status'].should.be.eql(400)
                res.body['error']['message'].should.be.eql("Bad Request")
            done()
            })
    })
})

describe('/GET item list', () => {
    it('it should return a list of items ordered by id', (done) => {
        chai.request(server)
            .get('/item_list')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.include.all.keys(['results'])
                res.body['results'].length.should.be.above(0)
                res.body['results'].should.be.a('array')
                res.body['results'][0].should.include.all.keys(['item_id',
                    'item_name'])
                res.body['results'][0]['item_id'].should.be.below(res.body[
                    'results'][1]['item_id'])
            done()
            })
    })
})

describe('/GET search item list', () => {
    it('it should return a list of items matching a string', (done) => {
        chai.request(server)
            .get('/item_list/?q=thunder')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.include.all.keys(['results'])
                res.body['results'].length.should.above(0)
                res.body['results'].should.be.a('array')
                res.body['results'][0].should.include.all.keys(['item_id',
                    'item_name'])
                res.body['results'].forEach(value => {
                    expect(value['item_name'].includes('thunder'))
                })
            done()
            })
    })
})

describe('/GET item history', () => {
    it('it should return a historical list of an item of ID ordered by time',
        (done) => {
        chai.request(server)
            .get('/wowdb/area_52/?id=38')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.include.all.keys(['results'])
                res.body['results'].length.should.be.above(0)
                res.body['results'].should.be.a('array')
                res.body['results'][0].should.include.all.keys(['interval',
                    'item_id', 'quantity', 'avg_unit_price', 'std_dev',
                    'high_price', 'low_price'])
                res.body['results'].forEach(value => {
                    expect(new Date(value['interval']) < new Date(value[
                        'interval']))
                })
            done()
            })
    })
    it('it should return the most recent update timestamp of a specific id',
        (done) => {
        chai.request(server)
            .get('/wowdb/area_52/?id=38&last_update=true')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.include.all.keys(['results'])
                res.body['results'].length.should.be.equal(1)
                res.body['results'].should.be.a('array')
                res.body['results'][0].should.include.all.keys('interval')
            done()
            })
    })
    it('it should return a the most recent update timestamp of all items',
        (done) => {
        chai.request(server)
            .get('/wowdb/area_52/?last_update=true')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.include.all.keys(['results'])
                res.body['results'].length.should.be(1)
                res.body['results'].should.be.a('array')
                res.body['results'][0].should.include.all.keys('interval')
            })
            done()
    })
    it('it should return a 400 error with an item ID string with non-number ' + 
    'characters', (done) => {
        chai.request(server)
            .get('/wowdb/area_52/?id=a')
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.have.property('error')
                res.body['error'].should.include.all.keys(['status', 'message'])
                res.body['error']['status'].should.be.eql(400)
                res.body['error']['message'].should.be.eql("Bad Request")
            done()
            })
    })
})