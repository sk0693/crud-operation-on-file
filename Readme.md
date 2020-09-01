# Introduction

This project is made for creating, manipulating and access the items (hotels) for the user (hotelier) by which they can update the items on the Trivago website.

## Tech I have used

- Node js (Server/ backend)
- Swagger (OpenApi)
- Mocha and Chai for unit test cases

## Installing

1. Clone the repository using :

```bash
git clone https://github.com/sk0693/trivago_hotelier.git
```

2. Change the repository directory :

```bash
cd trivago_hotelier
```

3. Install the needed node packges/modules :

```bash
npm install
```

4. Start the development server :

```bash
npm start
```

I have made some test cases using Mocha and chai. To run the test cases...

```bash
npm test
```

## Authorization

All API expect `/auth` and `/bookings` requests require the use of a generated Authorization Token `(JWT)`. You have to register and then login the application using `register` and `login` routes respectively. These APIs are not required the jwt token.

To authenticate an API request, you must provide your API key in the `Authorization` header.

Alternatively, you may use cookies in the browser for the requests to authorize yourself to the API. But note that this is likely to leave traces in things like your history, if accessing the API through a browser.

### In headers

```http
jwt :  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWI4NGQ2YzNmOGIwMDc1ZGRmYzhmYTAiLCJpYXQiOjE1ODkxMzY3NjJ9.
```

<!-- | Parameter | Type | Description |
| :--- | :--- | :--- |
| `jwt` | `string` | **Required**. JWT Token | -->

# Availaible Routes

```http
/api-docs
```

To get the `swagger editor` which I have made for open api specifications.

## Auth

### register

```http
POST /v1/auth/register
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `name`          | `string` | **Required**. The Name                        |
| `contactNumber` | `string` | **Required**. The Name                        |
| `email`         | `string` | **Required**. The valid email address         |
| `password`      | `string` | **Required**. min 8 and max 16 digit password |

#### Responses

```javascript
{
    "success": true,
    "user" : {
        "_id": String,
        "email": String,
        "name": String,
        "contactNumber": String,
        "createdAt": Date,
        "updatedAt": Date,
    }

}
```

### login

```http
POST /v1/auth/login
```

| Parameter  | Type     | Description                           |
| :--------- | :------- | :------------------------------------ |
| `email`    | `String` | **Required**. The valid email address |
| `password` | `String` | **Required**. 8 digit password        |

#### Response

```javascript
{
    "success": true,
    "user": {
        "id": String,
        "email": String,
        "name": String,
        "createdAt": Date,
        "updatedAt": Date,
    },
    "token": String
}
```

## USER (Hotelier)

### Get user details /v1/user

To get the user details

```http
GET /v1/user
```

#### Response

```javascript
{
    "success": true,
    "user": {
        "_id": "5f4d2496804c5379496475a6",
        "name": "sourabh",
        "email": "sourabh@gmail.com",
        "contactNumber": "111234",
        "createdAt": "2020-08-31T16:25:58.126Z",
        "updatedAt": "2020-08-31T16:46:21.830Z",
        "__v": 0
    }
}
```

## ITEMS

### v1/items/createItem

```http
POST /v1/items/createItem
```

| Parameter      | Type     | Description                                            |
| :------------- | :------- | :----------------------------------------------------- |
| `name`         | `String` | **Required**. The name of the hotel, min 10 characters |
| `ratings`      | `Number` | **Required**. between 0 and 5                          |
| `location`     | `object` | **Required**. the valid location object                |
| `category`     | `String` | **Required**. it is one, from predefined categories    |
| `image`        | `String` | **Required**. the valid image url                      |
| `reputation`   | `Number` | **Required**. the valid number                         |
| `price`        | `Number` | **Required**. the price of the booking                 |
| `availability` | `Number` | **Required**. curently availability                    |

\*While creating item, the location will be stored in different collection.

#### Response

```javascript
{
    "success": true,
    "item": {
        "category": "hotel",
        "reputationBadge": "green",
        "_id": "5f4de72b5596ee2234b3c11d",
        "name": "The Taz hotel 234",
        "ratings": 0,
        "location": "5f4de72b5596ee2234b3c11c",
        "image": "www.image.com",
        "reputation": 900,
        "price": 1000,
        "availability": 2,
        "user_id": "5f4d2496804c5379496475a6",
        "createdAt": "2020-09-01T06:16:11.429Z",
        "updatedAt": "2020-09-01T06:16:11.429Z",
        "__v": 0
    }
}
```

### Get the single item /v1/items/[:item_id]

To get the item with the item_id

```http
GET /v1/items/5f4de72b5596ee2234b3c11d
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `item_id` | `string` | **Required**. The valid item id |

#### Response

```javascript
{
    "success": true,
    "item": {
        "_id": "5f4de72b5596ee2234b3c11d",
        "name": "The Taz hotel",
        "category": "hotel",
        "reputationBadge": "green",
        "ratings": 0,
        "location": {
            "_id": "5f4de72b5596ee2234b3c11c",
            "city": "Mumbai",
            "state": "Maharashtra",
            "country": "India",
            "zip_code": 40997,
            "address": "Apollo Bandar, Colaba",
            "createdAt": "2020-09-01T06:16:11.425Z",
            "updatedAt": "2020-09-01T06:16:11.425Z",
            "__v": 0,
            "id": "5f4de72b5596ee2234b3c11c"
        },
        "image": "www.image.com",
        "reputation": 900,
        "price": 1000,
        "availability": 2,
        "user_id": "5f4d2496804c5379496475a6",
        "createdAt": "2020-09-01T06:16:11.429Z",
        "updatedAt": "2020-09-01T06:16:11.429Z",
        "__v": 0
    }
}
```

### Get all items /v1/items

To get all items

```http
GET /v1/items
```

#### Response

```javascript
{
    "success": true,
    "item": [{
        "_id": "5f4de72b5596ee2234b3c11d",
        "name": "The Taz hotel",
        "category": "hotel",
        "reputationBadge": "green",
        "ratings": 0,
        "location": {
            "_id": "5f4de72b5596ee2234b3c11c",
            "city": "Mumbai",
            "state": "Maharashtra",
            "country": "India",
            "zip_code": 40997,
            "address": "Apollo Bandar, Colaba",
            "createdAt": "2020-09-01T06:16:11.425Z",
            "updatedAt": "2020-09-01T06:16:11.425Z",
            "__v": 0,
            "id": "5f4de72b5596ee2234b3c11c"
        },
        "image": "www.image.com",
        "reputation": 900,
        "price": 1000,
        "availability": 2,
        "user_id": "5f4d2496804c5379496475a6",
        "createdAt": "2020-09-01T06:16:11.429Z",
        "updatedAt": "2020-09-01T06:16:11.429Z",
        "__v": 0
    }
    ...
    ]
}
```

### Update the item /v1/items/[:item_id]

```http
PATCH /v1/items/5eb97457f2130e4060365dd4
```

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `body`    | `Object` | **Required**. all keys which you want to update |

#### Response

```javascript
{
    "success": true,
    "message": "Item updated successfully",
    "item": {
        "category": "resort",
        "reputationBadge": "green",
        "_id": "5f4de72b5596ee2234b3c11d",
        "name": "The Taz hotel",
        "ratings": 0,
        "location": {
            "_id": "5f4de72b5596ee2234b3c11c",
            "city": "Mumbai",
            "state": "Maharashtra",
            "country": "India",
            "zip_code": 40009,
            "address": "Apollo Bandar, Colaba",
            "createdAt": "2020-09-01T06:16:11.425Z",
            "updatedAt": "2020-09-01T06:16:11.425Z",
            "__v": 0,
            "id": "5f4de72b5596ee2234b3c11c"
        },
        "image": "www.image.com",
        "reputation": 900,
        "price": 1000,
        "availability": 2,
        "user_id": "5f4d2496804c5379496475a6",
        "createdAt": "2020-09-01T06:16:11.429Z",
        "updatedAt": "2020-09-01T06:29:15.343Z",
        "__v": 0
    }
}
```

### Delete the item /v1/items/[:item_id]

```http
DELETE /v1/items/5eb97457f2130e4060365dd4
```

Delete the item using `[item_id]` params

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `item_id` | `string` | **Required**. The valid item id |

### user/

```http
GET /v1/user/
```

Getting the user details.

#### Response

```javascript
{
    "result": {
        "id": String,
        "email": String,
        "name": String
    }
}
```

## BOOKINGS

### Book a item. /v1/bookings/bookItem

```http
POST /v1/bookings/bookItem
```

| Parameter | Type     | Description                                 |
| :-------- | :------- | :------------------------------------------ |
| `name`    | `String` | **Required**. The name of the customer      |
| `item_id` | `String` | **Required**. The valid item id for booking |

#### Response

```javascript
{
    "success": true,
    "message": 'Booking done successfull',
    "booking": {
        "_id": "5f4de72b5596ee2234b3c11d",
        "name": "Sourabh khurana",
        "item_id": "5f4de72b5596ee2234b3c11c",
        "price": 1000,
        "createdAt": "2020-09-01T06:16:11.429Z",
        "updatedAt": "2020-09-01T06:29:15.343Z",
        "__v": 0
    }
}
```

### Get all bookings /v1/bookings

To get all bookings

```http
GET /v1/bookings
```

#### Response

```javascript
{
    "success": true,
    "bookings": [{
        "_id": "5f4de72b5596ee2234b3c11d",
        "name": "Sourabh khurana",
        "item_id": "5f4de72b5596ee2234b3c11c",
        "price": 1000,
        "createdAt": "2020-09-01T06:16:11.429Z",
        "updatedAt": "2020-09-01T06:29:15.343Z",
        "__v": 0
    }
    ...
    ]
}
```

## Author

- **Sourabh Khurana**

* [GitHub](https://github.com/sk0693)
* [LinkedIn](https://linkedin.com/sk0693)
* [Portfolio](https://sourabhkhurana.com/resume.html)
