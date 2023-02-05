// function jsonToXml(json) {
//     let xml = '';
//     for (let key in json) {
//         if (json.hasOwnProperty(key)) {
//             xml += "<" + key + ">";
//             if (typeof json[key] === "object") {
//                 xml += jsonToXml(json[key]);
//             } else {
//                 xml += json[key];
//             }
//             xml += "</" + key + ">";
//         }
//     }
//     return xml;
// }

// const json = {
//     website: {
//         name: "example",
//         url: "https://www.example.com",
//         pages: [
//             {
//                 pageName: "home",
//                 pageUrl: "/"
//             },
//             {
//                 pageName: "about",
//                 pageUrl: "/about"
//             }
//         ],
//         nested: {
//             inside: {
//                 another: {

//                 }
//             }
//         }
//     }
// };

// const xml = "<website>" + jsonToXml(json.website) + "</website>";
// console.log(xml);