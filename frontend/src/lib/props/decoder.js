import BigNumber from "bignumber.js";

const headers = {
    "11110111": "SGTIN",
    "11111011": "DSGTIN+",
    "11111001": "SSCC+",
};

const filters = {
    0: "other",
    1: "POS",
    2: "Case",
};

const encoding_indicators = {
    "000": "Integer",
    "001": "4-Bit 0-9 a-f",
    "010": "4-Bit 0-9 A-F",
    "011": "6-Bit File-Safe URI-Safe base64",
    "100": "7-Bit ASCII",
    "101": "URN Code 40 (16 bits per 3 chars)",
};

const seven_bit_encodings = {
    "0100001": "!",
    "0100010": '"',
    "0100011": "#",
    "0100101": "%",
    "0100110": "&",
    "0100111": "'",
    "0101000": "(",
    "0101001": ")",
    "0101010": "*",
    "0101011": "+",
    "0101100": ",",
    "0101101": "-",
    "0101110": ".",
    "0101111": "/",
    "0110000": "0",
    "0110001": "1",
    "0110010": "2",
    "0110011": "3",
    "0110100": "4",
    "0110101": "5",
    "0110110": "6",
    "0110111": "7",
    "0111000": "8",
    "0111001": "9",
    "0111010": ":",
    "0111011": ";",
    "0111100": "<",
    "0111101": "=",
    "0111110": ">",
    "0111111": "?",
    "1000001": "A",
    "1000010": "B",
    "1000011": "C",
    "1000100": "D",
    "1000101": "E",
    "1000110": "F",
    "1000111": "G",
    "1001000": "H",
    "1001001": "I",
    "1001010": "J",
    "1001011": "K",
    "1001100": "L",
    "1001101": "M",
    "1001110": "N",
    "1001111": "O",
    "1010000": "P",
    "1010001": "Q",
    "1010010": "R",
    "1010011": "S",
    "1010100": "T",
    "1010101": "U",
    "1010110": "V",
    "1010111": "W",
    "1011000": "X",
    "1011001": "Y",
    "1011010": "Z",
    "1011111": "_",
    "1100001": "a",
    "1100010": "b",
    "1100011": "c",
    "1100100": "d",
    "1100101": "e",
    "1100110": "f",
    "1100111": "g",
    "1101000": "h",
    "1101001": "i",
    "1101010": "j",
    "1101011": "k",
    "1101100": "l",
    "1101101": "m",
    "1101110": "n",
    "1101111": "o",
    "1110000": "p",
    "1110001": "q",
    "1110010": "r",
    "1110011": "s",
    "1110100": "t",
    "1110101": "u",
    "1110110": "v",
    "1110111": "w",
    "1111000": "x",
    "1111001": "y",
    "1111010": "z",
};

const code_40_encodings = [
    null,
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "-",
    ".",
    ":",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
];

const date_types = [
    "(11) Production Date",
    "(13) Packaging Date",
    "(15) Best Before Date",
    "(16) Sell By Date",
    "(17) Expiration Date",
    "(7006) First Freeze Date",
    "(7007) Harvest Date",
];

function decodeHexValues(hex_value) {
    var binary = "";
    for (let i = 0; i < hex_value.length; i++) {
        binary += parseInt(hex_value[i], 16).toString(2).padStart(4, "0");
    }

    //  Create elements map
    let gs1_elements = {};

    //  Add header to element and crop from binary string
    gs1_elements["header"] = headers[binary.substring(0, 8)];
    binary = binary.substring(8);

    //  Add aidc bit
    if (binary.substring(0, 1) === "1") {
        gs1_elements["aidc"] = true;
    } else {
        gs1_elements["aidc"] = false;
    }
    binary = binary.substring(1);

    //  Add filter value
    gs1_elements["filter_value"] = parseInt(binary.substring(0, 3), 2);
    binary = binary.substring(3);

    //  Operation now splits based upon the encoding scheme
    if (gs1_elements["header"] === "SGTIN") {
        //      Adds GTIN
        var gtin = "";
        for (let i = 0; i < 14; i++) {
            gtin += parseInt(binary.substring(0, 4), 2).toString(16);
            binary = binary.substring(4);
        }
        gs1_elements["gtin"] = gtin;

        //      Adds serial encoding indicator
        gs1_elements["serial_encoding"] = parseInt(binary.substring(0, 3), 2);
        binary = binary.substring(3);

        //      Adds serial number
        const { decoded, num_to_subtract } = decoder(
            gs1_elements["serial_encoding"],
            binary
        );
        gs1_elements["serial_number"] = decoded;
        binary = binary.substring(num_to_subtract);

        if (gs1_elements["aidc"] && parseInt(binary, 2) !== 0) {
            let ai = "";
            while (binary.length > 0) {
                // TODO: Potentially translate AI to object-friendly string?
                ai =
                    String(parseInt(binary.substring(0, 4))) +
                    String(parseInt(binary.substring(4, 8)));
                binary = binary.substring(8);
                let encoding = parseInt(binary.substring(0, 3));
                binary = binary.substring(8);
                const { decoded, num_to_subtract } = decoder(encoding, binary);
                gs1_elements[ai] = decoded;
                binary = binary.substring(num_to_subtract);
            }
        }
    }

    if (gs1_elements["Header"] === "DSGTIN") {

        // Add date and date type
        gs1_elements["Date_Type"] = date_types[parseInt(binary.substring(0, 4))];
        binary = binary.substring(4);
        gs1_elements["Date"] = String(parseInt(binary(0, 7))) + String(parseInt(binary(7, 11))) + String(parseInt(binary(11, 16)));
        binary = binary.substring(16);

        // Adds serial encoding indicator
        gs1_elements["serial_encoding"] = parseInt(binary.substring(0, 3), 2);
        binary = binary.substring(3);


        // Add serial number
        const { decoded, num_to_subtract } = decoder(
            gs1_elements["serial_encoding"],
            binary
        );
        gs1_elements["serial_number"] = decoded;
        binary = binary.substring(num_to_subtract);


    }

    if (gs1_elements["header"] === "SSCC+") {
        let sscc = "";
        for (let i = 0; i < 18; i++) {
            sscc += parseInt(binary.substring(0, 4), 2).toString(16);
            binary = binary.substring(4);
        }
        gs1_elements["SSCC"] = sscc;
        if (gs1_elements["aidc"] && parseInt(binary, 2) !== 0) {
            let ai = "";
            while (binary.length > 0) {
                // TODO: Potentially translate AI to object-friendly string?
                ai =
                    String(parseInt(binary.substring(0, 4))) +
                    String(parseInt(binary.substring(4, 8)));
                binary = binary.substring(8);
                let encoding = parseInt(binary.substring(0, 3));
                binary = binary.substring(8);
                const { decoded, num_to_subtract } = decoder(encoding, binary);
                gs1_elements[ai] = decoded;
                binary = binary.substring(num_to_subtract);
            }
        }
    }
    for (const property in gs1_elements) {
        console.log(`${property} :  ${gs1_elements[property]}`);
    }
    return gs1_elements
}

function decoder(encoding, binary) {
    if (encoding === 0) {
        let result = "";
        for (let i = 0; i < parseInt(binary.substring(0, 5), 2); i++) {
            result += 9;
        }
        let decimalNumber = new BigNumber(result);
        return {
            decoded: decodeInteger(
                binary.substring(5, decimalNumber.toString(2).length + 5)
            ),
            num_to_subtract: decimalNumber.toString(2).length + 5,
        };
    } else if (encoding === 1 || encoding === 2) {
        return {
            decoded: decodeHex(
                binary.substr(5, parseInt(binary.substring(0, 5), 2) * 4)
            ),
            num_to_subtract: parseInt(binary.substring(0, 5), 2) * 4 + 5,
        };
    } else if (encoding === 3) {
        //  Not currently supported
        // return {
        //     serial_number: ,
        //     num_to_subtract:
        // }
    } else if (encoding === 4) {
        return {
            decoded: decode7Bit(
                binary.substr(5, parseInt(binary.substring(0, 5), 2) * 7 + 5)
            ),
            num_to_subtract: parseInt(binary.substring(0, 5), 2) * 7 + 5,
        };
        //   } else if (encoding === 5) {
        //     decodeCode40(binary);
        // return {
        //     // TODO: Fix this function
        //     decoded: ,
        //     num_to_subtract:
        // }
    } else {
        // Add some error case
    }
}

function decodeInteger(binary) {
    // TODO: Test to see if this actually works
    let decimalNumber = new BigNumber(binary, 2);
    return String(decimalNumber["c"]);
}

function decodeHex(binary) {
    let hex = "";
    for (let i = 0; i < binary.length; i += 4) {
        let decimal = parseInt(binary.substr(i, 4), 2);
        let hexPart = decimal.toString(16);
        hex += hexPart;
    }
    return hex;
}

function decode7Bit(binary) {
    let ascii = "";
    for (let i = 0; i < binary.length; i += 7) {
        ascii += seven_bit_encodings[binary.substr(i, 7)];
    }
    return ascii;
}

// Taking this code out because for the purposes of the challenge we'll be forcing hex encoding
// function decodeCode40(binary) {
//   // TODO: Get clarification on this algorithm- Something is off
//   ascii = "";
//   let i3 = 0;
//   let i2 = 0;
//   let i1 = 0;
//   let L = parseInt(binary.substring(0, 5));
//   for (let i = 0; i < Math.ceil(L / 3); i++) {
//     let r = new BigNumber(binary.substr(5, 40 * (i + 1) + 5), 2);
//     i3 = (r - 1) % 40;
//     i2 = ((r - 1 - i3) / 40) % 40;
//     ascii += code_40_encodings[i1];
//     if (i2 > 0) {
//       ascii += code_40_encodings[i2];
//     }
//     if (i3 > 0) {
//       ascii += code_40_encodings[i3];
//     }
//   }
//   return {
//     a: ascii,
//     b: (L * 40) / 3,
//   };
// }

decodeHexValues("f7a10810055939197291ff00100517335f1026ce2001");

decodeHexValues("F96085002031790000012000");