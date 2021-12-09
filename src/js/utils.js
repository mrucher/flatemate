function getLandlords(context, user) {
    // console.log(user.landlords)
    for (let index = 0; index < user.landlords.length; ++index) {
        getApartments(context, user.landlords[index].apartmentId)

        // let apart = {
        //     id: user.landlords[index].apartmentId
        // }
        // let json = JSON.stringify(apart)
        // context.apartsId.push(json)
        // console.log(user.landlords[index].apartmentId);
        // console.log(JSON.stringify(apart))
    }
    // console.log(context.apartsId)
}

export function getUserByLogin(context, login, isLandlords = false) {
    var that = context
    var xhr = new XMLHttpRequest();
    let json
    xhr.open("GET", 'http://localhost:8080/user?login=' + login, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    xhr.send()
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            json = null
        } else {
            json = JSON.parse(xhr.response)
            // return json
            that.users.push(json)
            if (isLandlords) {
                getLandlords(that, json)
            }
            // console.log(json)
            sessionStorage.setItem('id', json.id);
            // console.log(that.users[0])
            // console.log(that.users[0].landlords[0].id)
        }
    };
}

export function getApartments(context, id) {
    var that = context
    let isId = id !== undefined
    var xhr = new XMLHttpRequest();

    let url = 'http://localhost:8080/apartment'
    if (isId) {
        url += '/' + id
    }

    xhr.open("GET", url, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    xhr.send()
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            let json = JSON.parse(xhr.response)
            if (!isId) {
                for (let key in json) {
                    that.apartments.push(json[key])
                }
            } else {
                that.apartments.push(json)
            }
            // console.log(that.apartments)
        }
    };
}

export function getApartmentsFilter(context, rooms, lodgers, maxPrice) {
    var that = context
    var xhr = new XMLHttpRequest();

    let url = 'http://localhost:8080/apartment?min=0&max=' + maxPrice + '&count_room=' + rooms + '&count_lodger=' + lodgers


    xhr.open("GET", url, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    xhr.send()
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            let json = JSON.parse(xhr.response)

            for (let key in json) {
                that.apartments.push(json[key])
            }

            // console.log(that.apartments)
        }
    };
}

export function postApartment(context, apart) {
    var xhr = new XMLHttpRequest();
    // var that = context
    let apartment_id
    xhr.open("POST", 'http://localhost:8080/apartment', true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    xhr.send(apart);
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            apartment_id = JSON.parse(xhr.response)["id"]
            // console.log(apartment_id)

            let landlord = {
                apartment_id: apartment_id,
                user_id: sessionStorage.getItem("id")
            }

            let json = JSON.stringify(landlord)
            // console.log(json)

            var xhr2 = new XMLHttpRequest();
            xhr2.open("POST", 'http://localhost:8080/landlord', true)
            xhr2.setRequestHeader('Content-type', 'application/json; charset=utf-8')
            xhr2.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
            xhr2.send(json);
        }
    };

}

export function getFeedbacks(context, id) {
    if (id === undefined) {
        return
    }
    var that = context
    var xhr = new XMLHttpRequest();
    let json
    xhr.open("GET", 'http://localhost:8080/apartment/feedback?apart_id=' + id, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    xhr.send()
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            json = null
        } else {
            json = JSON.parse(xhr.response)
            for (let key in json) {
                that.feedbacks.push(json[key])
            }
            // return json
            // that.feedbacks.push(json)
            // console.log(json)
            // console.log(that.feedbacks)
            // console.log(that.users[0])
            // console.log(that.users[0].landlords[0].id)
        }
    };
}

export function postPenter(context, renter) {
    var xhr = new XMLHttpRequest();

    xhr.open("POST", 'http://localhost:8080/renter', true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    xhr.send(renter);
    // console.log(renter)
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        }
    };

}