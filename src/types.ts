export type showMaskType = {
    'status': string,
    'tomato': tomatosType,
    'websiteType': string,
    'showMask': boolean
}

export type tomatosType = {
    'total': number,
    'balance': number
}

export type tomatosDataType = {
    earn: Array<{ date: string, value: number }>,
    spend: Array<{ date: string, value: number }>
}