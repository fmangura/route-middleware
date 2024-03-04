process.env.NODE_ENV = "test";
const request = require('supertest');

const app = require('./app')
const items = require('./fakeDb')


beforeEach(function(){
    let item = {
        name: "Soda",
        price: "1.49"
    }
    this.item = item
    items.push(item)
});

afterEach(function(){
    items.length = 0;
})

describe("GET /items", function(){
    test("Get all items", async function(){
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({items:[this.item]})
    })
})

describe("POST /items", function(){
    test("Creates new items", async function(){
        const resp = await request(app)
            .post('/items')
            .send({
                name: "Pickles",
                price: "2.00"
            });
        expect(resp.statusCode).toBe(201);

        expect(resp.body).toEqual({
            "added": {
                name: "Pickles",
                price: "2.00"
            }
        });
    })
})

describe("PATCH /items/:name", function(){
    test("Updates an item", async function(){
        let resp = await request(app)
        .patch(`/items/Soda`)
        .send({
            name: "Pillow",
            price:"2.00"
        });
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({
            "Updated": {
                name: "Pillow",
                price: "2.00"
            }
        })
    })
})

describe("DELETE /items/:name", function(){
    test("Deletes an item", async function(){
        let resp = await request(app).delete('/items/Soda');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual(
            {message: "Deleted"}
        );
    })
})
