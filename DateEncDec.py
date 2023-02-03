import datetime


def encode(date):
    if len(date) != 6:
        print("Invalid date format | YYMMDD")
        exit()

    year = int(date[0:2])
    month = int(date[2:4])
    day = int(date[4:])

    try:
        datetime.datetime(year=year, month=month, day=day)
    except ValueError as e:
        print("Invalid date type: \n", e)
        exit()

    compressed = 0x200 * year + 0x20 * month + day
    parsed = hex(compressed).upper()[2:]

    return parsed


def decode(date):
    if len(date) != 6:
        print("Invalid date format | YYMMDD")
        exit()
    year, month, day = None, None, None

    date = int(date, 16)
    year = int(date / 0x200)
    month = int((date & 0x1E0) / 0x20)
    day = int(date & 0x1F)

    try:
        datetime.datetime(year=year, month=month, day=day)
    except ValueError as e:
        print("Invalid date type: \n", e)
        exit()

    return f'{year} {month} {day}'


if __name__ == '__main__':
    print(encode('220531'))
