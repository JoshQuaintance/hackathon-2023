
const headers = {
    "11110111": "SGTIN",
    "11111011": "DSGTIN+",
    "11111001": "SSCC+",
} as { [key: string]: string };

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

export function decodeHexValues(hex_value: string) {
    let binary = "";
    for (let i = 0; i < hex_value.length; i++) {
        binary.concat(parseInt(hex_value[i], 16).toString(2).padStart(4, "0"));
    }
    const header = binary.substring(0, 8);
    binary = binary.substring(8);
    const aidc = binary.charAt(0);
    binary = binary.substring(1);
    const filter_value = parseInt(binary.substring(0, 3), 2);
    binary = binary.substring(3);
    const headerValue = "";
    let serial_encoding
    let serial_number
    if (header === "SGTIN") {
        for (let i = 0; i < 14; i++) {
            headerValue.concat((binary.substring(0, 4), 2).toString(16));
            binary = binary.substring(4);
        }
        serial_encoding = parseInt(binary.substring(0, 3), 2);
        binary = binary.substring(3);
    }
    // Create elements map
    const gs1_elements = {
        header: (headers[header
),
        aidc: aidc == "1",
        filter_value: filter_value,
    }  